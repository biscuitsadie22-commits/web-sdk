import { makeTwinImpactPreviewFrames } from '../../game/twinImpactPreviewAdapter.ts';

/** Illustrative, deterministic events for visually checking the UI only.
 * These are NOT weighted books and say nothing about production RTP.
 */
const rows = [
	['H1', 'H2', 'L1', 'H4', 'L5'],
	['L1', 'SW', 'H3', 'L2', 'H1'],
	['H2', 'L5', 'L4', 'H3', 'L3'],
];

const grid = () => Array.from({ length: 5 }, () => [1, 1, 1]);
const fraction = (numerator: number, denominator = 1) => ({ numerator, denominator });
const book = (events: Record<string, unknown>[], payoutMultiplier: number) => ({
	id: 1,
	payoutMultiplier,
	events: events.map((event, index) => ({ index, ...event })),
});

const before = grid();
before[1][1] = 2;
before[3][0] = 2;
const after = grid();
after[1][1] = 4;
after[3][0] = 2;
const later = grid();
later[1][1] = 4;
later[3][0] = 2;
later[0][2] = 2;
const sticky = [{ reel: 1, row: 1, factor: fraction(3), sticky: true }];

export const twinStrikeSampleFrames = makeTwinImpactPreviewFrames(book([
	{ type: 'roundStart', mode: 'twin_strike', cost: 300 },
	{ type: 'bonusStart', initialFreeSpins: 3 },
	{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: null, golden_grid_after: null, ladder_active: true, ladder_after: fraction(2), strike_wild_factors: sticky } },
	{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: null, golden_grid_after: null, ladder_active: true, ladder_after: fraction(4), strike_wild_factors: sticky } },
	{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: null, golden_grid_after: null, ladder_active: true, ladder_after: fraction(8), strike_wild_factors: sticky } },
	{ type: 'roundSettle', payoutMultiplier: 6750 },
], 6750));

export const mysterySampleFrames = makeTwinImpactPreviewFrames(book([
	{ type: 'roundStart', mode: 'mystery_buy', cost: 485 },
	{ type: 'mysteryReveal', result: 'Golden Impact', activationBoard: [
		['H1', 'H2', 'H3', 'H4', 'L1'],
		['S', 'H2', 'S', 'H2', 'S'],
		['H3', 'H4', 'L1', 'H2', 'L3'],
	] },
	{ type: 'bonusStart', initialFreeSpins: 2, goldenGridStart: before },
	{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: before, golden_grid_after: after, ladder_active: false } },
	{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: after, golden_grid_after: later, ladder_active: false } },
	{ type: 'roundSettle', payoutMultiplier: 1520 },
], 1520));

export const oneSpinSampleFrames = makeTwinImpactPreviewFrames(book([
	{ type: 'roundStart', mode: 'collision_spin', cost: 50, goldenGridStart: before },
	{ type: 'reelStop', board: rows, strikeWildFactors: [{ reel: 1, row: 1, factor: fraction(5) }] },
	{ type: 'roundSettle', payoutMultiplier: 740 },
], 740));
