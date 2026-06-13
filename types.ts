/**
 * Per-country open-source AID compatibility data model.
 *
 * Two layers, deliberately separated:
 *
 *   1. CATALOG (global, country-agnostic). Devices, their variants, and their
 *      open-source compatibility. Whether AndroidAPS can drive a DANA-i is a
 *      software fact, true everywhere, so it lives here, stated once. See
 *      catalog/.
 *
 *   2. COUNTRY OVERLAY (per-country). Which catalog devices are surfaced here,
 *      their local availability/subsidy/naming, plus the country's official
 *      position, funding schemes and community groups. See countries/.
 *
 * view.ts joins the two into a CountryView (the shape a page renders).
 *
 * The model is vendor-neutral. A consumer (e.g. a cloud product) attaches its
 * own per-device facts through the `Ext` type parameter and the `ext` slot,
 * without those facts leaking into the shared catalog. See view.ts.
 *
 * The id unions (`AlgorithmId`, `DeviceId`, `DeviceRef`) are derived from the
 * catalog data rather than declared here, so the type system mirrors the
 * catalog exactly and a typo'd reference fails the build.
 */

// Shared vocabulary

export type DeviceKind = 'pump' | 'sensor'; // extensible later: 'cannula' | 'infusion-set'

/** Support of one device (or rig) under one algorithm. */
export type CompatStatus = 'yes' | 'partial' | 'planned' | 'no';

/** A device's support under a single algorithm. */
export interface CompatEntry {
	status: CompatStatus;
	/** Short, specific caveat, e.g. "Via xDrip+ with BLE streaming." */
	note?: string;
	/** Setup docs for this device by algorithm pairing. */
	link?: string;
}

/**
 * Compatibility keyed by Algorithm id. Partial; omitted algorithms read as "no".
 * The key type is `AlgorithmId` (derived from the algorithm catalog), so an
 * unknown algorithm key is a compile error. See catalog/algorithms.ts.
 */
export type Compat = Partial<Record<AlgorithmId, CompatEntry>>;

/** Free-form specifications, e.g. { Connectivity: 'Bluetooth LE', Wear: '14 days' }. */
export type Specs = Record<string, string>;

/** A citation backing a fact on a device or variant. */
export interface Source {
	label: string;
	url: string;
}

// Catalog (global)

/** An open-source automated-insulin-delivery system, a matrix column. */
export interface Algorithm {
	id: string; // narrowed to AlgorithmId once the catalog is declared
	name: string;
	platform: 'iOS' | 'Android' | 'Linux';
	docs: string;
}

/**
 * The overridable facts a device carries, shared by a Device and its Variants.
 * A Variant is a partial override of its parent over exactly these fields;
 * view.ts merges variant over device over country, field by field.
 *
 * `Ext` is a consumer-specific extension payload (default: none). The shared
 * catalog leaves it unset; a downstream product fills it via view.ts.
 */
export interface DeviceProfile<Ext = unknown> {
	specs?: Specs;
	compat?: Compat;
	/** Commercial AID this profile enables, e.g. 'Control-IQ+', 'SmartGuard'. */
	commercialAid?: string;
	/** Sensor refs this profile integrates with (commercial AID). */
	pairsWith?: readonly string[];
	blurb?: string;
	note?: string;
	/** Citations specific to this profile. */
	sources?: readonly Source[];
	/** Consumer-specific extension. Never set in the shared catalog. */
	ext?: Ext;
}

/**
 * A sub-model of a device. The unit that carries differences in specs and
 * open-source compatibility, whether by sensor pairing (Omnipod 5 with G6 vs
 * G7), firmware (Medtronic Veo 2.7A loopable vs 2.7B not), or region (Libre 2
 * European build vs the build sold elsewhere). Its profile fields are merged
 * over the parent device.
 */
export interface Variant<Ext = unknown> extends DeviceProfile<Ext> {
	/** Unique within the device: 'g7' | 'controliq-plus' | 'fw-old' | 'eu'. */
	id: string;
	/** Short qualifier shown alongside the device name, e.g. "with Dexcom G7". */
	name: string;
}

/** A product family in the global catalog. */
export interface Device<Ext = unknown> extends DeviceProfile<Ext> {
	/** Narrowed to DeviceId once the catalog is declared. */
	id: string;
	kind: DeviceKind;
	name: string;
	maker: string;
	/** Pumps: 'Tubed' | 'Tubeless patch'. */
	form?: string;
	/** Optional sub-models. Absent means the device is its own single variant. */
	variants?: readonly Variant<Ext>[];
	/** Import key for the product shot: a file basename in pump-images (no extension). */
	image?: string;
	/** Source/licence credit for the image, shown on hover. See pump-images/CREDITS.md. */
	imageCredit?: string;
}

// Id unions, derived from the catalog data (see catalog/)

export type AlgorithmId = (typeof import('./catalog/algorithms').algorithms)[number]['id'];

/** Every device id in the catalog. */
export type DeviceId = (typeof import('./catalog/index').devices)[number]['id'];

/** A catalog reference: a device id, optionally suffixed with `:variantId`. */
export type DeviceRef = DeviceId | `${DeviceId}:${string}`;

// Country overlay (per-country)

/** Surfaces one catalog device (optionally pinned to a variant) in a country. */
export interface CountryListing {
	/** 'omnipod-5' or 'omnipod-5:g7', a device id optionally suffixed with :variantId. */
	ref: DeviceRef;
	availability: 'available' | 'limited' | 'unavailable';
	/** Local note, e.g. "TGA approved, subsidised pods". */
	availabilityNote?: string;
	/** If branded differently here. */
	localName?: string;
	/** Subsidy ids (into this country's subsidies). */
	subsidy?: readonly string[];
	/** Escape hatch: rare per-country compat override (e.g. app not released here). */
	compat?: Compat;
}

export interface OfficialBody {
	name: string;
	full: string;
	stance: 'supportive' | 'neutral' | 'cautious' | 'opposed';
	statement: string;
	/** Source URL. Official statements should be sourced. */
	source?: string;
	/** When the statement was published or last confirmed. */
	asOf?: string;
}

export interface Subsidy {
	id: string;
	name: string;
	via: string;
	eligibility: string;
	covers: string;
	note?: string;
	link?: string;
}

export interface CommunityGroup {
	name: string;
	platform: string;
	size?: string;
	blurb?: string;
	link: string;
}

export interface Country {
	code: string; // 'AU'
	name: string;
	status: 'live' | 'soon';
	lastReviewed: string;
	maintainer: string;
	intro: string;
	/** Pumps + sensors surfaced here (refs into the catalog). */
	listings: readonly CountryListing[];
	/** Optional subset of algorithm ids; default is all. */
	algorithms?: readonly AlgorithmId[];
	officialPosition: { summary: string; bodies: readonly OfficialBody[] };
	subsidies: readonly Subsidy[];
	/** Location-specific groups for this country. */
	groups: readonly CommunityGroup[];
}

// Assembled view model (what a page renders)

/** A catalog device + variant + country overlay, flattened for rendering. */
export interface ResolvedDevice<Ext = unknown> {
	/** Stable, unique per listing; equals the listing ref. */
	id: string;
	deviceId: DeviceId;
	variantId?: string;
	kind: DeviceKind;
	/** Display name (localName ?? device name). */
	name: string;
	/** Variant qualifier, when pinned, e.g. "with Dexcom G7". */
	variant?: string;
	maker: string;
	form?: string;
	blurb?: string;
	specs: Specs;
	/** Fully merged: device then variant then country override. */
	compat: Compat;
	commercialAid?: string;
	pairsWith?: readonly string[];
	image?: string;
	imageCredit?: string;
	sources: Source[];
	availability: CountryListing['availability'];
	availabilityNote?: string;
	/** Consumer-attached facts, populated by view.ts when an enricher is given. */
	ext?: Ext;
}

export interface CountryRef {
	code: string;
	name: string;
	status: 'live' | 'soon';
}

export interface CountryView<Ext = unknown> {
	country: {
		code: string;
		name: string;
		lastReviewed: string;
		maintainer: string;
		intro: string;
	};
	/** All countries, for the switcher. */
	countries: CountryRef[];
	algorithms: Algorithm[];
	pumps: ResolvedDevice<Ext>[];
	sensors: ResolvedDevice<Ext>[];
	officialPosition: { summary: string; bodies: readonly OfficialBody[] };
	subsidies: readonly Subsidy[];
	/** Location-specific groups for this country. */
	groups: readonly CommunityGroup[];
	/** Global communities, shared across countries. */
	globalGroups: readonly CommunityGroup[];
}
