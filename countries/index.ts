import type { Country, CountryRef } from '../types';
import { au } from './au';
import { nz } from './nz';
import { ca } from './ca';
import { fr } from './fr';
import { de } from './de';
import { ch } from './ch';
import { us } from './us';
import { gb } from './gb';
import { es } from './es';

/**
 * Country registry. Live countries have a full overlay; "soon" countries are
 * placeholders for the switcher until their data lands. Add a country by
 * dropping a Country here, and the route and switcher pick it up automatically.
 */
const live: Country[] = [au, nz, ca, fr, de, ch, us, gb, es];

const soon: CountryRef[] = [
	{ code: 'MX', name: 'Mexico', status: 'soon' },
	{ code: 'SE', name: 'Sweden', status: 'soon' },
	{ code: 'CN', name: 'China', status: 'soon' },
	{ code: 'JP', name: 'Japan', status: 'soon' }
];

const byCode = new Map(live.map((c) => [c.code.toLowerCase(), c]));

export function getCountry(code: string): Country | undefined {
	return byCode.get(code.toLowerCase());
}

/** All country codes with a live overlay, for prerender entries(). */
export function liveCountryCodes(): string[] {
	return live.map((c) => c.code.toLowerCase());
}

/** Switcher list: live countries first, then the "soon" placeholders. */
export function countryRefs(): CountryRef[] {
	return [...live.map((c) => ({ code: c.code, name: c.name, status: c.status })), ...soon];
}
