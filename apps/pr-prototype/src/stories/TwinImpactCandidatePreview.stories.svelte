<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	const { Story } = defineMeta({ title: 'TWIN IMPACT / Candidate event preview' });
</script>

<script lang="ts">
	import TwinImpactCandidatePreview from '../components/TwinImpactCandidatePreview.svelte';
	import {
		mysterySampleFrames,
		oneSpinSampleFrames,
		twinStrikeSampleFrames,
	} from './data/twinImpactCandidatePreview';
</script>

<Story name="Twin Strike: sticky Wilds and Ladder">
	<TwinImpactCandidatePreview frames={twinStrikeSampleFrames} />
</Story>

<Story name="Mystery: reveal then bonus">
	<TwinImpactCandidatePreview frames={mysterySampleFrames} />
</Story>

<Story name="One-spin purchase: no Scatter">
	<TwinImpactCandidatePreview frames={oneSpinSampleFrames} />
</Story>
