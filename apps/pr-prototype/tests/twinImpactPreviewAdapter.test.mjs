import assert from 'node:assert/strict';
import test from 'node:test';

import { makeTwinImpactPreviewFrames } from '../src/game/twinImpactPreviewAdapter.ts';

const rows = [
	['H1', 'H2', 'H3', 'H4', 'L1'],
	['L1', 'SW', 'L3', 'L4', 'L5'],
	['L2', 'L3', 'L4', 'L5', 'L1'],
];
const emptyGrid = () => Array.from({ length: 5 }, () => [1, 1, 1]);
const payout = (numerator, denominator = 1) => ({ numerator, denominator, display: String(numerator / denominator) });
const book = (events, payoutMultiplier = 0) => ({ id: 1, events: events.map((event, index) => ({ index, ...event })), payoutMultiplier });

test('transposes a base reelStop from math rows into Web SDK reels', () => {
	const frames = makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'base', cost: 1 },
		{ type: 'reelStop', board: rows, strikeWildFactors: [{ reel: 1, row: 1, factor: payout(3) }] },
		{ type: 'roundSettle', payoutMultiplier: 25 },
	], 25));
	assert.equal(frames[1].board.length, 5);
	assert.deepEqual(frames[1].board[1], ['H2', 'SW', 'L3']);
	assert.deepEqual(frames[1].strikeWilds[0], { reel: 1, row: 1, factor: 3, sticky: false });
	assert.equal(frames[2].payoutMultiplier, 25);
});

test('persists Golden Grid upgrades and Ladder between bonus frames', () => {
	const initial = emptyGrid();
	initial[1][1] = 2;
	const upgraded = emptyGrid();
	upgraded[1][1] = 4;
	const frames = makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'twin_strike', cost: 300, goldenGridStart: initial },
		{ type: 'bonusStart', initialFreeSpins: 7 },
		{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: initial, golden_grid_after: upgraded, ladder_active: true, ladder_after: payout(2), strike_wild_factors: [{ reel: 1, row: 1, factor: payout(3), sticky: true }] } },
		{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: upgraded, golden_grid_after: upgraded, ladder_active: true, ladder_after: payout(4) } },
		{ type: 'roundSettle', payoutMultiplier: 0 },
	]));
	assert.equal(frames[1].goldenGrid[1][1], 2);
	assert.equal(frames[2].goldenGrid[1][1], 4);
	assert.equal(frames[3].goldenGrid[1][1], 4);
	assert.equal(frames[2].ladderMultiplier, 2);
	assert.equal(frames[3].ladderMultiplier, 4);
	assert.equal(frames[2].strikeWilds[0].sticky, true);
});

test('does not reveal Mystery selection before mysteryReveal', () => {
	const frames = makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'mystery_buy', cost: 485 },
		{ type: 'mysteryReveal', result: 'Twin Strike', activationBoard: rows },
		{ type: 'roundSettle', payoutMultiplier: 0 },
	]));
	assert.equal(frames[0].mysteryResult, null);
	assert.equal(frames[1].mysteryResult, 'Twin Strike');
	assert.deepEqual(frames[1].board[0], ['H1', 'L1', 'L2']);
});

test('permits real Mystery reveals without a separate activation board', () => {
	const frames = makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'mystery_buy', cost: 485 },
		{ type: 'mysteryReveal', result: 'Golden Impact', activationBoard: null },
		{ type: 'bonusStart', initialFreeSpins: 1 },
		{ type: 'bonusSpin', spin: {
			board: rows,
			golden_grid_before: null,
			golden_grid_after: null,
			ladder_active: false,
		} },
		{ type: 'roundSettle', payoutMultiplier: 0 },
	]));
	assert.equal(frames[0].mysteryResult, null);
	assert.equal(frames[1].mysteryResult, 'Golden Impact');
	assert.equal(frames[1].board, null);
	assert.deepEqual(frames[3].board[1], ['H2', 'SW', 'L3']);
});

test('rejects Scatter symbols in one-spin feature purchases', () => {
	const withScatter = rows.map((row) => [...row]);
	withScatter[0][0] = 'S';
	assert.throws(() => makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'golden_spin', cost: 10 },
		{ type: 'reelStop', board: withScatter },
		{ type: 'roundSettle', payoutMultiplier: 0 },
	])), /cannot contain Scatters/);
});

test('rejects a Golden Grid reset between bonus spins', () => {
	const first = emptyGrid();
	first[0][0] = 2;
	assert.throws(() => makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'golden_impact', cost: 100 },
		{ type: 'bonusStart' },
		{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: first, golden_grid_after: first, ladder_active: false } },
		{ type: 'bonusSpin', spin: { board: rows, golden_grid_before: emptyGrid(), golden_grid_after: emptyGrid(), ladder_active: false } },
		{ type: 'roundSettle', payoutMultiplier: 0 },
	])), /does not match previous spin/);
});

test('rejects unsupported event types and inconsistent settlements', () => {
	assert.throws(() => makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'base', cost: 1 },
		{ type: 'unknown' },
		{ type: 'roundSettle', payoutMultiplier: 0 },
	])), /Unknown candidate event type/);
	assert.throws(() => makeTwinImpactPreviewFrames(book([
		{ type: 'roundStart', mode: 'base', cost: 1 },
		{ type: 'roundSettle', payoutMultiplier: 5 },
	], 0)), /disagrees with settlement/);
});
