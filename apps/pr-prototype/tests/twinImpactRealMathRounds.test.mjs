import assert from 'node:assert/strict';
import test from 'node:test';

import { makeTwinImpactPreviewFrames } from '../src/game/twinImpactPreviewAdapter.ts';
import { testOnlyTwinImpactBooks } from '../src/stories/data/twinImpactRealCandidateBooks.ts';

const allModes = [
	'base', 'ante_3', 'ante_10', 'golden_spin', 'strike_spin',
	'collision_spin', 'golden_impact', 'twin_strike', 'mystery_buy', 'max_win_or_nothing',
];

test('actual Math SDK preview events adapt for every candidate mode', () => {
	assert.deepEqual(Object.keys(testOnlyTwinImpactBooks), allModes);
	for (const mode of allModes) {
		const book = testOnlyTwinImpactBooks[mode];
		const frames = makeTwinImpactPreviewFrames(book);
		assert.equal(frames.length, book.events.length, mode);
		assert.equal(frames[0].type, 'roundStart', mode);
		assert.equal(frames[0].mode, mode);
		assert.equal(frames.at(-1).type, 'roundSettle', mode);
		assert.equal(frames.at(-1).payoutMultiplier, book.payoutMultiplier, mode);
		assert.ok(book.payoutMultiplier <= 1_000_000, `${mode} breaches the 10,000x cap`);
	}
});

test('actual purchased individual feature-spin reel stops never contain Scatters', () => {
	for (const mode of ['golden_spin', 'strike_spin', 'collision_spin']) {
		const reelStops = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks[mode])
			.filter((frame) => frame.type === 'reelStop');
		assert.equal(reelStops.length, 1, mode);
		assert.ok(reelStops[0].board.every((reel) => !reel.includes('S')), mode);
	}
});

test('actual Mystery Buy activation board transposes 3-by-5 math rows', () => {
	const frames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.mystery_buy);
	const reveal = frames.find((frame) => frame.type === 'mysteryReveal');
	const source = testOnlyTwinImpactBooks.mystery_buy.events.find((event) => event.type === 'mysteryReveal').activationBoard;
	assert.equal(source.length, 3);
	assert.equal(source[0].length, 5);
	assert.deepEqual(reveal.board[0], [source[0][0], source[1][0], source[2][0]]);
	assert.equal(frames[0].mysteryResult, null);
	assert.ok(reveal.mysteryResult);
});

test('actual Golden Impact bonus carries Golden Grid levels through consecutive frames', () => {
	const frames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.golden_impact);
	const bonus = frames.filter((frame) => frame.type === 'bonusSpin');
	assert.ok(bonus.length >= 2);
	for (const frame of bonus) {
		assert.equal(frame.goldenGrid?.length, 5);
		assert.ok(frame.goldenGrid.every((reel) => reel.length === 3));
	}
});

test('actual Twin Strike uses a persistent line Ladder, not a Golden Grid of cells', () => {
	const bonus = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.twin_strike)
		.filter((frame) => frame.type === 'bonusSpin');
	assert.ok(bonus.length >= 2);
	assert.ok(bonus.every((frame) => frame.goldenGrid === null));
	assert.ok(bonus.every((frame) => frame.ladderMultiplier !== null && frame.ladderMultiplier >= 1));
});
