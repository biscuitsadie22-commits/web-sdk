/**
 * Read-only adapter for the Math SDK's CANDIDATE-ONLY Twin Impact book events.
 *
 * This is a development/visualization bridge, NOT a live RGS book player.
 * Do not call wallet APIs or register candidate mode prices from this module.
 * The production exporter and final event schema remain unfinished.
 */

export type StrikeWildDisplay = {
	reel: number;
	row: number;
	factor: number;
	sticky: boolean;
};

export type TwinImpactPreviewFrame = {
	index: number;
	type: string;
	mode: string;
	/** Reel-major, [5 reels][3 rows], for the Web SDK board. */
	board: string[][] | null;
	/** Reel-major persistent Golden Grid levels (1 = inactive, then 2, 4 or 8). */
	goldenGrid: number[][] | null;
	ladderMultiplier: number | null;
	strikeWilds: StrikeWildDisplay[];
	mysteryResult: string | null;
	maxWinWon: boolean | null;
	/** Stake's integer payout multiplier, in hundredths of base wager. */
	payoutMultiplier: number | null;
};

type JsonRecord = Record<string, unknown>;

const record = (value: unknown, name: string): JsonRecord => {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		throw new Error(`${name} must be an object`);
	}
	return value as JsonRecord;
};

const nonemptyString = (value: unknown, name: string): string => {
	if (typeof value !== 'string' || value.length === 0) {
		throw new Error(`${name} must be a nonempty string`);
	}
	return value;
};

const exactNumber = (value: unknown, name: string): number => {
	const amount = record(value, name);
	const numerator = amount.numerator;
	const denominator = amount.denominator;
	if (
		typeof numerator !== 'number' || !Number.isSafeInteger(numerator) ||
		typeof denominator !== 'number' || !Number.isSafeInteger(denominator) ||
		denominator <= 0
	) {
		throw new Error(`${name} must contain an exact fraction`);
	}
	return numerator / denominator;
};

const boardReelMajor = (value: unknown, source: 'row-major' | 'reel-major'): string[][] => {
	const outer = source === 'row-major' ? 3 : 5;
	const inner = source === 'row-major' ? 5 : 3;
	if (!Array.isArray(value) || value.length !== outer) {
		throw new Error(`Expected ${outer} ${source} board rows/reels`);
	}
	const sourceGrid = value.map((part, index) => {
		if (!Array.isArray(part) || part.length !== inner || part.some((symbol) => typeof symbol !== 'string')) {
			throw new Error(`Invalid ${source} board segment ${index}`);
		}
		return part as string[];
	});
	return source === 'row-major'
		? Array.from({ length: 5 }, (_, reel) => Array.from({ length: 3 }, (_, row) => sourceGrid[row][reel]))
		: sourceGrid.map((reel) => [...reel]);
};

const goldenGrid = (value: unknown): number[][] | null => {
	if (value == null) return null;
	if (!Array.isArray(value) || value.length !== 5) throw new Error('Golden Grid must have five reels');
	return value.map((reel, index) => {
		if (!Array.isArray(reel) || reel.length !== 3 || reel.some((level) => ![1, 2, 4, 8].includes(level))) {
			throw new Error(`Invalid Golden Grid reel ${index}`);
		}
		return [...reel] as number[];
	});
};

const sameGrid = (left: number[][], right: number[][]): boolean =>
	left.every((reel, x) => reel.every((level, y) => level === right[x][y]));

const strikeWilds = (value: unknown): StrikeWildDisplay[] => {
	if (value == null) return [];
	if (!Array.isArray(value)) throw new Error('Strike Wild factors must be a list');
	return value.map((entry, index) => {
		const factor = record(entry, `Strike Wild ${index}`);
		const { reel, row } = factor;
		if (
			typeof reel !== 'number' || !Number.isInteger(reel) || reel < 0 || reel >= 5 ||
			typeof row !== 'number' || !Number.isInteger(row) || row < 0 || row >= 3
		) {
			throw new Error(`Invalid Strike Wild coordinate ${index}`);
		}
		const multiplier = exactNumber(factor.factor, `Strike Wild ${index} factor`);
		if (multiplier <= 0) throw new Error('Strike Wild factor must be positive');
		return { reel, row, factor: multiplier, sticky: factor.sticky === true };
	});
};

/** Reject schema drift before any player-facing animation uses a bad event. */
export function makeTwinImpactPreviewFrames(bookValue: unknown): TwinImpactPreviewFrame[] {
	const book = record(bookValue, 'Candidate book');
	if (!Array.isArray(book.events) || book.events.length < 2) {
		throw new Error('Candidate book needs events');
	}
	let mode = '';
	let board: string[][] | null = null;
	let grid: number[][] | null = null;
	let ladder: number | null = null;
	let factors: StrikeWildDisplay[] = [];
	let mystery: string | null = null;
	let maxWinWon: boolean | null = null;
	let payoutMultiplier: number | null = null;
	let settled = false;

	const frames: TwinImpactPreviewFrame[] = [];
	for (const [index, value] of book.events.entries()) {
		const event = record(value, `Event ${index}`);
		if (event.index !== index) throw new Error(`Unexpected event index at ${index}`);
		const type = nonemptyString(event.type, `Event ${index} type`);
		if ((index === 0 && type !== 'roundStart') || (index > 0 && !mode)) {
			throw new Error('The round must start before any other event');
		}
		if (settled) throw new Error('Events must stop after roundSettle');

		switch (type) {
			case 'roundStart':
				if (index !== 0) throw new Error('Duplicate roundStart');
				mode = nonemptyString(event.mode, 'Round mode');
				if (typeof event.cost !== 'number' || event.cost <= 0) throw new Error('Invalid mode cost');
				grid = goldenGrid(event.goldenGridStart);
				break;
			case 'mysteryReveal':
				mystery = nonemptyString(event.result, 'Mystery outcome');
				// The Math SDK legitimately omits an activation board for some
				// mystery results. Reveal the selected feature now; its first
				// bonusSpin will populate the reels when one is available.
				if (event.activationBoard != null) {
					// The actual Math SDK exports this in 3-row x 5-column order,
					// just like a reelStop and a bonusSpin board.
					board = boardReelMajor(event.activationBoard, 'row-major');
				}
				break;
			case 'reelStop':
				board = boardReelMajor(event.board, 'row-major');
				factors = strikeWilds(event.strikeWildFactors);
				if (['golden_spin', 'strike_spin', 'collision_spin'].includes(mode) &&
					board.some((reel) => reel.includes('S'))) {
					throw new Error('Purchased individual feature spins cannot contain Scatters');
				}
				break;
			case 'bonusStart':
				if (event.goldenGridStart != null) grid = goldenGrid(event.goldenGridStart);
				break;
			case 'bonusSpin': {
				const spin = record(event.spin, 'Bonus spin');
				const before = goldenGrid(spin.golden_grid_before);
				const after = goldenGrid(spin.golden_grid_after);
				if (grid && before && !sameGrid(grid, before)) {
					throw new Error('Persistent Golden Grid does not match previous spin');
				}
				if ((before === null) !== (after === null)) {
					throw new Error('Golden Grid cannot switch on or off during a bonus spin');
				}
				board = boardReelMajor(spin.board, 'row-major');
				grid = after;
				factors = strikeWilds(spin.strike_wild_factors);
				ladder = spin.ladder_active === true
					? exactNumber(spin.ladder_after, 'Multiplier Ladder')
					: null;
				break;
			}
			case 'maxWinReveal':
				if (typeof event.won !== 'boolean') throw new Error('Max Win result must be boolean');
				maxWinWon = event.won;
				break;
			case 'roundSettle':
				if (typeof event.payoutMultiplier !== 'number' ||
					!Number.isSafeInteger(event.payoutMultiplier) ||
					event.payoutMultiplier < 0 || event.payoutMultiplier > 1_000_000) {
					throw new Error('Invalid capped payout multiplier');
				}
				payoutMultiplier = event.payoutMultiplier;
				if (book.payoutMultiplier !== payoutMultiplier) throw new Error('Book payout disagrees with settlement');
				settled = true;
				break;
			default:
				throw new Error(`Unknown candidate event type: ${type}`);
		}
		frames.push({
			index, type, mode,
			board: board?.map((reel) => [...reel]) ?? null,
			goldenGrid: grid?.map((reel) => [...reel]) ?? null,
			ladderMultiplier: ladder,
			strikeWilds: factors.map((item) => ({ ...item })),
			mysteryResult: mystery,
			maxWinWon,
			payoutMultiplier,
		});
	}
	if (!settled) throw new Error('Candidate book is missing roundSettle');
	return frames;
}
