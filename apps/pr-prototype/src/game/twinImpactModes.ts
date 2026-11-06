/**
 * Twin Impact's current integration *targets*, not an active RGS catalog.
 *
 * Keep the existing Lines SAMPLE config wired up until the validated Twin
 * Impact math exporter produces a final event schema and weighted book set.
 * In particular, do not register these names as purchasable betModes yet:
 * these prices and the 96.50% RTP goal are not production certified.
 */
export const TWIN_IMPACT_DEVELOPMENT_LABEL = 'TWIN IMPACT (DEV)';
export const TWIN_IMPACT_STUDIO = 'PUFF ROCKET';
export const TWIN_IMPACT_MAX_WIN_TARGET = 10_000;
export const TWIN_IMPACT_RTP_PERCENT_TARGET = 96.5;

export const TWIN_IMPACT_CANDIDATE_MODES = [
	{ name: 'base', cost: 1, category: 'base' },
	{ name: 'ante_3', cost: 2, category: 'ante' },
	{ name: 'ante_10', cost: 6.5, category: 'ante' },
	{ name: 'golden_spin', cost: 10, category: 'one-spin' },
	{ name: 'strike_spin', cost: 20, category: 'one-spin' },
	{ name: 'collision_spin', cost: 50, category: 'one-spin' },
	{ name: 'golden_impact', cost: 100, category: 'bonus' },
	{ name: 'twin_strike', cost: 300, category: 'bonus' },
	{ name: 'mystery_buy', cost: 485, category: 'mystery' },
	{ name: 'max_win_or_nothing', cost: 1_000, category: 'all-or-nothing' },
] as const;

export type TwinImpactCandidateModeName = (typeof TWIN_IMPACT_CANDIDATE_MODES)[number]['name'];
