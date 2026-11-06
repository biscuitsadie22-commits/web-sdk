<script lang="ts">
	import type { TwinImpactPreviewFrame } from '../game/twinImpactPreviewAdapter';
	import TwinImpactSymbolLibrary from './TwinImpactSymbolLibrary.svelte';

	type Props = {
		frames: TwinImpactPreviewFrame[];
	};

	let { frames }: Props = $props();
	let selectedIndex = $state(0);
	let playing = $state(false);
	let current = $derived(frames[selectedIndex] ?? null);
	let prior = $derived(frames[selectedIndex - 1] ?? null);
	let bonusSpinNumber = $derived(frames.slice(0, selectedIndex + 1).filter((frame) => frame.type === 'bonusSpin').length);

	const positions = [0, 1, 2] as const;
	const reels = [0, 1, 2, 3, 4] as const;
	const originalDemoSymbols = new Set(['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4', 'L5', 'W', 'SW', 'S']);
	const symbolHref = (symbol: string | undefined) => symbol && originalDemoSymbols.has(symbol) ? `#icon-${symbol}` : null;
	const frameDelayMs = (frame: TwinImpactPreviewFrame) => {
		if (frame.type === 'mysteryReveal') return 2100;
		if (frame.type === 'bonusSpin') return 1850;
		if (frame.type === 'roundSettle') return 2200;
		return 1250;
	};

	const gridAt = (reel: number, row: number) => current?.goldenGrid?.[reel]?.[row] ?? 1;
	const upgradedAt = (reel: number, row: number) =>
		gridAt(reel, row) > (prior?.goldenGrid?.[reel]?.[row] ?? 1);
	const strikeAt = (reel: number, row: number) =>
		current?.strikeWilds.find((wild) => wild.reel === reel && wild.row === row) ?? null;

	$effect(() => {
		if (!playing || !current || selectedIndex >= frames.length - 1) return;
		const timeout = setTimeout(() => {
			selectedIndex += 1;
			if (selectedIndex >= frames.length - 1) playing = false;
		}, frameDelayMs(current));
		return () => clearTimeout(timeout);
	});

	const changeFrame = (offset: number) => {
		playing = false;
		selectedIndex = Math.max(0, Math.min(frames.length - 1, selectedIndex + offset));
	};

	const restart = () => {
		playing = false;
		selectedIndex = 0;
	};
</script>

<section class="preview" aria-label="Twin Impact candidate round preview">
	<TwinImpactSymbolLibrary />
	<header class="heading">
		<div>
			<p class="eyebrow">PUFF ROCKET / DEVELOPMENT PREVIEW</p>
			<h2>TWIN <span>IMPACT</span></h2>
			<p class="subheading">Catch the wilds. Feel the impact. · Read-only sample events</p>
		</div>
		<span class="warning">CANDIDATE-ONLY · NOT FOR UPLOAD</span>
	</header>

	{#if current}
		<div class="summary" aria-live="polite">
			<div class="tag">Mode: {current.mode.replaceAll('_', ' ')}</div>
			<div class="tag">{current.type === 'bonusSpin' ? `Bonus spin ${bonusSpinNumber}` : current.type.replace(/([A-Z])/g, ' $1')}</div>
			{#if current.mysteryResult && current.type === 'mysteryReveal'}
				<div class="reveal">MYSTERY REVEALED: {current.mysteryResult}</div>
			{/if}
		</div>

		<div class="playfield">
			<div class="reels" role="group" aria-label="Five reels of three symbols">
				{#each reels as reel}
					<div class="reel" role="group" aria-label={`Reel ${reel + 1}`}>
						{#each positions as row}
							{@const level = gridAt(reel, row)}
							{@const wild = strikeAt(reel, row)}
							{@const symbol = current.board?.[reel]?.[row]}
							{@const artHref = symbolHref(symbol)}
							<div
								class="cell"
								class:golden={level > 1}
								class:upgraded={upgradedAt(reel, row)}
								class:strike-symbol={symbol === 'SW'}
								class:scatter-symbol={symbol === 'S'}
								aria-label={`Reel ${reel + 1} row ${row + 1}: ${current.board?.[reel]?.[row] ?? 'empty'}; Golden Grid ${level > 1 ? `${level} times` : 'inactive'}${wild ? `; Strike Wild ${wild.factor} times${wild.sticky ? ' sticky' : ''}` : ''}`}
							>
								{#if level > 1}<span class="golden-level">GOLDEN {level}×</span>{/if}
								{#if artHref}
									<svg class="symbol-art" viewBox="0 0 100 100" aria-hidden="true"><use href={artHref}></use></svg>
								{:else}
									<span class="symbol">{symbol ?? '·'}</span>
								{/if}
								{#if wild}
									<span class="strike" class:sticky={wild.sticky}>{wild.sticky ? 'STICKY ' : ''}{wild.factor}× WILD</span>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>

			<div class="side-panel">
				<div class="multiplier-label">MULTIPLIER LADDER</div>
				<div class="ladder" class:lit={current.ladderMultiplier !== null} aria-live="polite">
					{current.ladderMultiplier === null ? '—' : `${current.ladderMultiplier}×`}
				</div>
				<div class="legend">Gold-framed positions remain visible between bonus spins.</div>
				{#if current.payoutMultiplier !== null}
					<div class="settlement">Round payout: {(current.payoutMultiplier / 100).toFixed(2)}× base wager</div>
				{/if}
				{#if current.maxWinWon !== null}
					<div class="settlement">Max Win draw: {current.maxWinWon ? 'WIN' : 'NO WIN'}</div>
				{/if}
			</div>
		</div>

		<nav class="controls" aria-label="Preview playback controls">
			<button onclick={restart} disabled={selectedIndex === 0 && !playing}>Restart</button>
			<button onclick={() => changeFrame(-1)} disabled={selectedIndex === 0}>Previous event</button>
			<button class="primary" onclick={() => (playing = !playing)} disabled={selectedIndex >= frames.length - 1}>
				{playing ? 'Pause' : 'Play events'}
			</button>
			<button onclick={() => changeFrame(1)} disabled={selectedIndex >= frames.length - 1}>Next event</button>
			<span class="counter">Event {selectedIndex + 1} / {frames.length}</span>
		</nav>
	{:else}
		<p>No candidate events have been supplied.</p>
	{/if}
</section>

<style>
	.preview { box-sizing: border-box; max-width: 1180px; margin: 24px auto; padding: 26px; color: #eaf2ff; border: 1px solid #2b3a56; border-radius: 24px; background: radial-gradient(ellipse at top, #203352, #111b2e 65%); font-family: system-ui, sans-serif; }
	.heading { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
	.eyebrow { margin: 0; color: #9faec9; font-size: 11px; font-weight: 750; letter-spacing: 0.18em; }
	h2 { margin: 5px 0; font-size: clamp(25px, 4vw, 40px); letter-spacing: 0.08em; }
	h2 span { color: #8deaff; text-shadow: 0 0 18px #54afff88; }
	.subheading { margin: 0 0 22px; color: #a9bedc; font-size: 13px; }
	.warning { padding: 9px 12px; border-radius: 9px; border: 1px solid #c48a3e; background: #533d21; color: #ffdc9c; font-size: 11px; font-weight: 750; }
	.summary { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 17px; }
	.tag { padding: 8px 12px; border-radius: 20px; background: #293d5e; color: #d9e7ff; text-transform: capitalize; font-weight: 650; font-size: 12px; }
	.reveal { padding: 9px 14px; border-radius: 9px; border: 1px solid #ffc65e; color: #ffdf9b; background: #674823; font-size: 13px; font-weight: 800; animation: reveal 0.5s ease-out; }
	.playfield { display: grid; grid-template-columns: minmax(0, 1fr) 186px; gap: 18px; }
	.reels { min-width: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 9px; padding: 13px; border: 3px solid #3a506e; border-radius: 14px; background: #090e1b; }
	.reel { display: grid; grid-template-rows: repeat(3, minmax(93px, 1fr)); gap: 9px; }
	.cell { position: relative; display: flex; align-items: center; justify-content: center; min-width: 0; overflow: hidden; border-radius: 12px; border: 2px solid #364d68; background: radial-gradient(ellipse at 50% 32%, #4b78b747, transparent 72%), linear-gradient(150deg, #202f4c, #0d1528); }
	.cell.golden { border: 3px solid #ffc44e; background: linear-gradient(145deg, #5a4321, #1b2434); box-shadow: inset 0 0 18px #a87822a8, 0 0 14px #f7b62f65; }
	.cell.strike-symbol:not(.golden) { border-color: #6feaff; box-shadow: inset 0 0 16px #37bdff66, 0 0 13px #7deaff66; }
	.cell.scatter-symbol:not(.golden) { border-color: #f3a2ff; box-shadow: inset 0 0 16px #cf57ff66, 0 0 13px #f5a2ff66; }
	.cell.upgraded { animation: upgrade 1.2s ease-out; }
	.symbol { font-size: clamp(16px, 3vw, 31px); font-weight: 800; letter-spacing: 0.02em; }
	.symbol-art { display: block; width: min(91%, 125px); height: 82%; overflow: visible; filter: saturate(1.12) contrast(1.04) drop-shadow(0 5px 8px #0008) drop-shadow(0 0 5px #82cdff22); }
	.golden-level { position: absolute; top: 5px; left: 5px; font-size: 10px; font-weight: 900; color: #ffdb79; letter-spacing: 0.03em; }
	.strike { position: absolute; bottom: 5px; right: 4px; padding: 4px 5px; border-radius: 5px; background: #722752; color: #ffd6f0; font-size: 9px; font-weight: 850; }
	.strike.sticky { background: #3a205d; border: 1px solid #d0a5ff; }
	.side-panel { display: flex; flex-direction: column; gap: 13px; padding: 16px; border: 1px solid #3b5070; border-radius: 12px; background: #131f36; }
	.multiplier-label { color: #a6bddb; font-size: 11px; letter-spacing: 0.13em; font-weight: 750; }
	.ladder { display: grid; place-items: center; min-height: 96px; border-radius: 12px; border: 2px dashed #354969; color: #8796ad; font-size: 45px; font-weight: 850; }
	.ladder.lit { border: 2px solid #ffca4f; background: #5b3d21; color: #ffe38f; text-shadow: 0 0 14px #f9ba60; }
	.legend { color: #a6b7d1; line-height: 1.45; font-size: 12px; }
	.settlement { margin-top: auto; color: #b8e9c8; line-height: 1.5; font-size: 12px; font-weight: 650; }
	.controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 19px; }
	button { cursor: pointer; padding: 11px 14px; border: 1px solid #526581; border-radius: 9px; background: #2a3e5b; color: white; font-weight: 700; }
	button.primary { background: #edb13d; color: #1b2130; border-color: #edb13d; }
	button:disabled { opacity: 0.35; cursor: not-allowed; }
	button:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
	.counter { margin-left: auto; color: #aabbd4; font-size: 12px; }
	@keyframes upgrade { 0% { box-shadow: 0 0 0 #ffcf63; transform: scale(0.93); } 35% { box-shadow: 0 0 38px #ffcf63; transform: scale(1.035); } 100% { box-shadow: inset 0 0 18px #a87822a8, 0 0 14px #f7b62f65; transform: scale(1); } }
	@keyframes reveal { from { opacity: 0.2; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
	@media (max-width: 750px) { .preview { margin: 8px; padding: 14px; } .playfield { grid-template-columns: 1fr; } .side-panel { display: grid; grid-template-columns: 1fr 1fr; align-items: center; } .reels { gap: 4px; padding: 5px; } .reel { gap: 4px; grid-template-rows: repeat(3, minmax(72px, 1fr)); } .golden-level { font-size: 7px; } .strike { font-size: 7px; } .counter { margin-left: 0; } }
	@media (prefers-reduced-motion: reduce) { .cell.upgraded, .reveal { animation: none; } }
</style>
