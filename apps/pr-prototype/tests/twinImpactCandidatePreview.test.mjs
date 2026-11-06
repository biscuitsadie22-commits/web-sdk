import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

import {
	twinStrikeSampleFrames,
	mysterySampleFrames,
	oneSpinSampleFrames,
} from '../src/stories/data/twinImpactCandidatePreview.ts';

test('Twin Strike keeps gold positions and ladder visible between bonus spins', () => {
	const [first, second, third] = twinStrikeSampleFrames.filter((frame) => frame.type === 'bonusSpin');
	assert.equal(first.goldenGrid[1][1], 4);
	assert.equal(second.goldenGrid[1][1], 4);
	assert.equal(third.goldenGrid[1][1], 4);
	assert.equal(third.goldenGrid[0][2], 2);
	assert.deepEqual([first.ladderMultiplier, second.ladderMultiplier, third.ladderMultiplier], [2, 4, 8]);
	assert.ok([first, second, third].every((frame) => frame.strikeWilds[0].sticky));
	assert.equal(twinStrikeSampleFrames.at(-1).payoutMultiplier, 6750);
});

test('Mystery outcome is concealed until the reveal event', () => {
	assert.equal(mysterySampleFrames[0].mysteryResult, null);
	assert.equal(mysterySampleFrames[1].mysteryResult, 'Golden Impact');
	assert.equal(mysterySampleFrames[2].mysteryResult, 'Golden Impact');
});

test('one-spin sample has no Scatter symbols on its stopped reels', () => {
	const stopped = oneSpinSampleFrames.find((frame) => frame.type === 'reelStop');
	assert.ok(stopped.board.every((reel) => !reel.includes('S')));
	assert.equal(oneSpinSampleFrames.at(-1).payoutMultiplier, 740);
});

test('preview uses the original twelve Twin Impact demo symbols', () => {
	const library = readFileSync(new URL('../src/components/TwinImpactSymbolLibrary.svelte', import.meta.url), 'utf8');
	const icons = [...library.matchAll(/<symbol id="icon-([A-Z0-9]+)"/g)].map((match) => match[1]);
	assert.deepEqual(icons, ['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4', 'L5', 'W', 'SW', 'S']);
	assert.match(library, /id="gold-flare"/);
	assert.match(library, /id="strike-core"/);
});
