import type { Algorithm, CompatEntry, CompatStatus, ResolvedDevice } from './types';

/**
 * A rig (pump + sensor) only closes the loop under an algorithm if that
 * algorithm can drive BOTH devices. So a combined status is the weaker of the
 * two. This module holds that combine logic, shared by the matrix.
 */

const RANK: Record<CompatStatus, number> = { no: 0, planned: 1, partial: 2, yes: 3 };
const BY_RANK: CompatStatus[] = ['no', 'planned', 'partial', 'yes'];

export interface RigContext {
	kind: 'pump' | 'sensor';
	label: 'Pump' | 'Sensor';
	item: ResolvedDevice;
}

export interface RigPart extends RigContext {
	cell: CompatEntry;
}

export interface RigCell {
	status: CompatStatus;
	note?: string;
	link?: string;
	/** One entry per contributing device (row, and held device when present). */
	parts: RigPart[];
}

const cellFor = (item: ResolvedDevice, algoId: string): CompatEntry =>
	item.compat[algoId as keyof typeof item.compat] ?? { status: 'no' };

/**
 * Combine one algorithm's support across a row device and an optional held
 * device. With no held device, returns the row device's raw support.
 */
export function combineCompat(
	algo: Algorithm,
	rowCtx: RigContext,
	heldCtx: RigContext | null
): RigCell {
	const rowCell = cellFor(rowCtx.item, algo.id);

	if (!heldCtx) {
		return {
			status: rowCell.status,
			note: rowCell.note,
			link: rowCell.link ?? algo.docs,
			parts: [{ ...rowCtx, cell: rowCell }]
		};
	}

	const heldCell = cellFor(heldCtx.item, algo.id);
	const rRank = RANK[rowCell.status];
	const hRank = RANK[heldCell.status];
	const status = BY_RANK[Math.min(rRank, hRank)];

	let note: string;
	if (rRank === 3 && hRank === 3) {
		note = `${rowCtx.label} and ${heldCtx.label} both fully supported.`;
	} else {
		const limiters: string[] = [];
		if (rRank < 3) limiters.push(`${rowCtx.label}: ${rowCell.note ?? `${rowCtx.item.name} unsupported.`}`);
		if (hRank < 3) limiters.push(`${heldCtx.label}: ${heldCell.note ?? `${heldCtx.item.name} unsupported.`}`);
		note = limiters.join('  ');
	}

	return {
		status,
		note,
		link: rowCell.link ?? heldCell.link ?? algo.docs,
		parts: [
			{ ...rowCtx, cell: rowCell },
			{ ...heldCtx, cell: heldCell }
		]
	};
}
