<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	const { Story } = defineMeta({ title: 'TWIN IMPACT / Real math candidate rounds' });
</script>

<script lang="ts">
	import TwinImpactCandidatePreview from '../components/TwinImpactCandidatePreview.svelte';
	import { makeTwinImpactPreviewFrames } from '../game/twinImpactPreviewAdapter';
	import { testOnlyTwinImpactBooks } from './data/twinImpactRealCandidateBooks';

	// These are actual Math SDK events with selected fields, not hand-authored
	// example outcomes. They are still test-only and unweighted.
	const twinStrikeFrames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.twin_strike);
	const mysteryFrames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.mystery_buy);
	const goldenImpactFrames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.golden_impact);
	const goldenSpinFrames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.golden_spin);
	const baseFrames = makeTwinImpactPreviewFrames(testOnlyTwinImpactBooks.base);
</script>

<Story name="Actual Twin Strike bonus trace">
	<TwinImpactCandidatePreview frames={twinStrikeFrames} />
</Story>

<Story name="Actual Mystery Buy reveal and spins">
	<TwinImpactCandidatePreview frames={mysteryFrames} />
</Story>

<Story name="Actual Golden Impact bonus trace">
	<TwinImpactCandidatePreview frames={goldenImpactFrames} />
</Story>

<Story name="Actual Golden one-spin purchase">
	<TwinImpactCandidatePreview frames={goldenSpinFrames} />
</Story>

<Story name="Actual base-game spin">
	<TwinImpactCandidatePreview frames={baseFrames} />
</Story>
