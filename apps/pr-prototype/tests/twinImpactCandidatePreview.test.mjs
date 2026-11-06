import assert from 'node:assert/strict';
import test from 'node:test';

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
