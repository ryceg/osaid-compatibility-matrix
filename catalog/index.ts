import type { Device, DeviceId } from '../types';
import { pumps } from './pumps';
import { sensors } from './sensors';

export { algorithms } from './algorithms';
export { pumps } from './pumps';
export { sensors } from './sensors';

/**
 * Every device, both kinds. `as const` keeps each id a literal so the catalog's
 * `DeviceId` union (types.ts) is derived from exactly this list.
 */
export const devices = [...pumps, ...sensors] as const;

const byId = new Map<DeviceId, Device>(devices.map((d) => [d.id, d]));

export function getDevice(id: string): Device | undefined {
	return byId.get(id as DeviceId);
}
