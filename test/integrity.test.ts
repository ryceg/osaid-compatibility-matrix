import { describe, it, expect } from 'vitest';
import { algorithms, devices, getDevice } from '../catalog';
import { liveCountryCodes, getCountry } from '../countries';
import { getCountryView } from '../view';
import type { Device } from '../types';

const deviceIds = new Set(devices.map((d) => d.id));
const algoIds = new Set(algorithms.map((a) => a.id));

describe('catalog', () => {
	it('has unique device ids', () => {
		expect(deviceIds.size).toBe(devices.length);
	});

	it('has unique variant ids within each device', () => {
		for (const d of devices as readonly Device[]) {
			const ids = (d.variants ?? []).map((v) => v.id);
			expect(new Set(ids).size, `duplicate variant id in ${d.id}`).toBe(ids.length);
		}
	});

	it('only references known algorithms in compat keys', () => {
		const check = (d: Device) => {
			for (const key of Object.keys(d.compat ?? {})) {
				expect(algoIds.has(key as never), `${d.id} references unknown algorithm "${key}"`).toBe(true);
			}
			for (const v of d.variants ?? []) {
				for (const key of Object.keys(v.compat ?? {})) {
					expect(algoIds.has(key as never), `${d.id}:${v.id} references unknown algorithm "${key}"`).toBe(true);
				}
			}
		};
		for (const d of devices as readonly Device[]) check(d);
	});

	it('only pairsWith known device ids', () => {
		const refs = (d: { pairsWith?: readonly string[] }) => d.pairsWith ?? [];
		for (const d of devices as readonly Device[]) {
			for (const ref of refs(d)) {
				expect(deviceIds.has(ref as never), `${d.id} pairsWith unknown device "${ref}"`).toBe(true);
			}
			for (const v of d.variants ?? []) {
				for (const ref of refs(v)) {
					expect(deviceIds.has(ref as never), `${d.id}:${v.id} pairsWith unknown device "${ref}"`).toBe(true);
				}
			}
		}
	});
});

describe('countries', () => {
	it('every live country resolves without unknown refs', () => {
		for (const code of liveCountryCodes()) {
			expect(() => getCountryView(code), `getCountryView("${code}") threw`).not.toThrow();
			const view = getCountryView(code);
			expect(view, code).toBeDefined();
		}
	});

	it('every listing subsidy id exists in that country', () => {
		for (const code of liveCountryCodes()) {
			const country = getCountry(code)!;
			const subsidyIds = new Set(country.subsidies.map((s) => s.id));
			for (const listing of country.listings) {
				for (const s of listing.subsidy ?? []) {
					expect(subsidyIds.has(s), `${code} listing ${listing.ref} → unknown subsidy "${s}"`).toBe(true);
				}
			}
		}
	});

	it('every listing ref points at a catalog device', () => {
		for (const code of liveCountryCodes()) {
			const country = getCountry(code)!;
			for (const listing of country.listings) {
				const [deviceId] = listing.ref.split(':');
				expect(getDevice(deviceId), `${code} ref ${listing.ref}`).toBeDefined();
			}
		}
	});
});
