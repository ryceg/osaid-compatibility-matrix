import type { Algorithm } from '../types';

/**
 * Open-source automated insulin delivery (AID) systems, the matrix columns.
 * Global: which algorithm drives which device does not change by country.
 *
 * `as const` preserves each id as a literal so `AlgorithmId` (in types.ts) is
 * exactly this set; `satisfies` still checks each entry against `Algorithm`.
 */
export const algorithms = [
	{ id: 'loop', name: 'Loop', platform: 'iOS', docs: 'https://loopkit.github.io/loopdocs/' },
	{ id: 'trio', name: 'Trio', platform: 'iOS', docs: 'https://docs.diy-trio.org/' },
	{ id: 'aaps', name: 'AndroidAPS', platform: 'Android', docs: 'https://androidaps.readthedocs.io/' }
	// OpenAPS (Linux rig) is largely legacy in 2026. Add here if a country wants the column.
] as const satisfies readonly Algorithm[];
