import type {
	Algorithm,
	Compat,
	CountryListing,
	CountryView,
	DeviceId,
	ResolvedDevice,
	Specs
} from './types';
import { algorithms as allAlgorithms, getDevice } from './catalog';
import { countryRefs, getCountry } from './countries';
import { globalGroups } from './groups';

/** device.compat ← variant.compat ← country override. Later wins per algorithm. */
function mergeCompat(...maps: (Compat | undefined)[]): Compat {
	return Object.assign({}, ...maps.filter(Boolean));
}

function mergeSpecs(...maps: (Specs | undefined)[]): Specs {
	return Object.assign({}, ...maps.filter(Boolean));
}

/** A resolved device before any consumer enrichment. */
type ResolvedBase = Omit<ResolvedDevice, 'ext'>;

/** Resolve a "deviceId" / "deviceId:variantId" listing into a flat device. */
function resolve(listing: CountryListing): ResolvedBase {
	const [deviceId, variantId] = listing.ref.split(':');
	const device = getDevice(deviceId);
	if (!device) throw new Error(`compat: unknown device ref "${listing.ref}"`);

	const variant = variantId ? device.variants?.find((v) => v.id === variantId) : undefined;
	if (variantId && !variant) throw new Error(`compat: unknown variant "${listing.ref}"`);

	return {
		id: listing.ref,
		deviceId: deviceId as DeviceId,
		variantId: variant?.id,
		kind: device.kind,
		name: listing.localName ?? device.name,
		variant: variant?.name,
		maker: device.maker,
		form: device.form,
		blurb: variant?.blurb ?? device.blurb,
		specs: mergeSpecs(device.specs, variant?.specs),
		compat: mergeCompat(device.compat, variant?.compat, listing.compat),
		commercialAid: variant?.commercialAid ?? device.commercialAid,
		pairsWith: variant?.pairsWith ?? device.pairsWith,
		image: device.image,
		imageCredit: device.imageCredit,
		sources: [...(device.sources ?? []), ...(variant?.sources ?? [])],
		availability: listing.availability,
		availabilityNote: listing.availabilityNote
	};
}

/** Attach consumer-specific facts to a resolved device. */
export type Enricher<Ext> = (device: ResolvedDevice, listing: CountryListing) => Ext;

/**
 * Join the global catalog with a country's overlay into the flat shape a page
 * renders. Throws on unknown refs so a typo fails the build.
 *
 * Pass `opts.enrich` to attach consumer-specific facts to each device's `ext`
 * slot, keeping those facts out of the shared catalog. Without it, `ext` is
 * left unset and the view is vendor-neutral.
 */
export function getCountryView<Ext = unknown>(
	code: string,
	opts: { enrich?: Enricher<Ext> } = {}
): CountryView<Ext> | undefined {
	const country = getCountry(code);
	if (!country) return undefined;

	const resolved = country.listings.map((listing): ResolvedDevice<Ext> => {
		const device = resolve(listing);
		if (!opts.enrich) return device;
		return { ...device, ext: opts.enrich(device, listing) };
	});

	const algorithms: Algorithm[] = country.algorithms
		? allAlgorithms.filter((a) => country.algorithms!.includes(a.id))
		: [...allAlgorithms];

	return {
		country: {
			code: country.code,
			name: country.name,
			lastReviewed: country.lastReviewed,
			maintainer: country.maintainer,
			intro: country.intro
		},
		countries: countryRefs(),
		algorithms,
		pumps: resolved.filter((d) => d.kind === 'pump'),
		sensors: resolved.filter((d) => d.kind === 'sensor'),
		officialPosition: country.officialPosition,
		subsidies: country.subsidies,
		groups: country.groups,
		globalGroups
	};
}
