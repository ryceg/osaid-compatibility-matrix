import type { Device } from '../types';

// Authoritative open-source project docs, reused as per-pairing citations.
const LOOP_PUMP = 'https://loopkit.github.io/loopdocs/build/pump/';
const LOOP_OMNIPOD = 'https://loopkit.github.io/loopdocs/faqs/omnipod-faqs/';
const OMNIPOD_FIVE_OSS = 'https://nightscout.github.io/omnipod-five/';
const LOOP_DANA = 'https://loopkit.github.io/loopdocs/troubleshooting/dana-faq/';
const TRIO_PUMP = 'https://triodocs.org/install/build/requirements/devices/pump/';
const AAPS_PUMPS = 'https://androidaps.readthedocs.io/en/latest/Getting-Started/CompatiblePumps.html';
const AAPS_DANA = 'https://androidaps.readthedocs.io/en/latest/CompatiblePumps/DanaRS-Insulin-Pump.html';
const AAPS_FUTURE =
	'https://androidaps.readthedocs.io/en/latest/Getting-Started/Future-possible-Pump-Drivers.html';

/**
 * Global pump catalog. Compatibility here is the open-source software fact
 * (does Loop, Trio or AndroidAPS have a driver), independent of country.
 * Availability and funding are layered on per-country in countries/.
 * Statuses and notes are sourced; see each entry's links and sources.
 *
 * `as const` preserves each id as a literal so the catalog's `DeviceId` union
 * (in types.ts) mirrors this list exactly; `satisfies` still type-checks each
 * entry against `Device`.
 */
export const pumps = [
	{
		id: 'omnipod-dash',
		kind: 'pump',
		name: 'Omnipod DASH',
		maker: 'Insulet',
		form: 'Tubeless patch',
		image: 'omnipod-dash',
		imageCredit: 'Image © Insulet (omnipod.com)',
		blurb:
			'A tubeless patch pump that holds up to 200 units of U-100 insulin per pod and delivers for up to 72 hours, plus an 8-hour grace period. It is controlled over Bluetooth Low Energy by its Personal Diabetes Manager (PDM); an open-source app stands in for the PDM.',
		specs: { Connectivity: 'Bluetooth LE', Controller: 'PDM (replaced by the loop app)', Reservoir: '200 U', Format: 'Tubeless patch', Wear: '72 h + 8 h grace' },
		compat: {
			loop: { status: 'yes', note: 'Native driver over Bluetooth, no bridge needed.', link: LOOP_OMNIPOD },
			trio: { status: 'yes', note: 'Native driver over Bluetooth, no bridge needed.', link: `${TRIO_PUMP}#omnipod-dash` },
			aaps: {
				status: 'yes',
				note: 'OmnipodDASH driver since AndroidAPS 3.0.',
				link: 'https://androidaps.readthedocs.io/en/latest/CompatiblePumps/OmnipodDASH.html'
			}
		},
		sources: [{ label: 'Omnipod Australia subsidy', url: 'https://www.omnipod.com/en-au/subsidy' }]
	},
	{
		id: 'omnipod-eros',
		kind: 'pump',
		name: 'Omnipod Eros',
		maker: 'Insulet',
		form: 'Tubeless patch',
		image: 'omnipod-eros',
		imageCredit: 'Image: Guus Herbschleb, CC BY 3.0, via Wikimedia Commons',
		blurb:
			'A tubeless patch pump that holds up to 200 units of U-100 insulin per pod and delivers for up to 72 hours, plus an 8-hour grace period. It communicates over a 433 MHz radio link that needs a compatible radio bridge — an OrangeLink Pro or EmaLink, as RileyLinks are no longer sold.',
		specs: { Connectivity: '433 MHz radio (bridge required)', Reservoir: '200 U', Format: 'Tubeless patch', Wear: '72 h + 8 h grace' },
		compat: {
			loop: { status: 'partial', note: 'Requires a radio bridge (OrangeLink Pro or EmaLink).', link: LOOP_OMNIPOD },
			trio: { status: 'partial', note: 'Requires a radio bridge (OrangeLink Pro or EmaLink).', link: `${TRIO_PUMP}#omnipod-eros` },
			aaps: {
				status: 'partial',
				note: 'OmnipodEros driver, requires a radio bridge (OrangeLink Pro or EmaLink).',
				link: 'https://androidaps.readthedocs.io/en/latest/CompatiblePumps/OmnipodEros.html'
			}
		}
	},
	{
		id: 'omnipod-5',
		kind: 'pump',
		name: 'Omnipod 5',
		maker: 'Insulet',
		form: 'Tubeless patch',
		image: 'omnipod-5',
		imageCredit: 'Image © Insulet (omnipod.com)',
		blurb:
			'A tubeless patch pump that holds 85 to 200 units of U-100 insulin per pod and runs an on-pod automated insulin delivery algorithm using readings from an integrated CGM.',
		specs: { Connectivity: 'Bluetooth LE', Reservoir: '85 to 200 U', Format: 'Tubeless patch', Wear: '72 h + 8 h grace' },
		commercialAid: 'SmartAdjust',
		compat: {
			loop: { status: 'planned', note: 'Support is in closed beta, with an open beta anticipated for summer 2026.', link: OMNIPOD_FIVE_OSS },
			trio: { status: 'planned', note: 'Support is in closed beta, with an open beta anticipated for summer 2026.', link: OMNIPOD_FIVE_OSS },
			aaps: { status: 'planned', note: 'In development, not yet released.', link: AAPS_FUTURE }
		},
		variants: [
			{ id: 'g6', name: 'with Dexcom G6', pairsWith: ['dexcom-g6'] },
			{ id: 'g7', name: 'with Dexcom G7', pairsWith: ['dexcom-g7'] },
			{ id: 'l2p', name: 'with Libre 2 Plus', pairsWith: ['libre2-plus'] }
		],
		sources: [
			{ label: 'Omnipod 5 sensor compatibility', url: 'https://www.omnipod.com/current-podders/resources/omnipod-5/device-compatibility' },
			{ label: 'Omnipod Australia subsidy', url: 'https://www.omnipod.com/en-au/subsidy' },
			{ label: 'Omnipod 5 open-source support status', url: OMNIPOD_FIVE_OSS }
		]
	},
	{
		id: 'dana-i',
		kind: 'pump',
		name: 'DANA-i',
		maker: 'SOOIL',
		form: 'Tubed',
		image: 'dana-i',
		imageCredit: 'Image © SOOIL (sooil.com)',
		blurb:
			'A tubed pump with a 300 unit reservoir and built-in Bluetooth Low Energy for smartphone control.',
		specs: { Connectivity: 'Bluetooth LE', Reservoir: '300 U (3.0 mL)', Format: 'Tubed' },
		commercialAid: 'CamAPS FX',
		compat: {
			loop: { status: 'partial', note: 'Supported on an experimental Loop feature branch.', link: LOOP_DANA },
			trio: { status: 'yes', note: 'Built-in Bluetooth, no bridge needed.', link: `${TRIO_PUMP}#dana-i` },
			aaps: { status: 'yes', note: 'Reference pump with a native Bluetooth driver.', link: AAPS_DANA }
		},
		sources: [{ label: 'TGA ARTG 340938 (DANA-i)', url: 'https://www.tga.gov.au/resources/artg/340938' }]
	},
	{
		id: 'dana-rs',
		kind: 'pump',
		name: 'DANA RS',
		maker: 'SOOIL',
		form: 'Tubed',
		image: 'dana-rs',
		imageCredit: 'Image © SOOIL (sooil.com)',
		blurb:
			'A tubed pump with a 300 unit reservoir and built-in Bluetooth Low Energy for smartphone control.',
		specs: { Connectivity: 'Bluetooth LE', Reservoir: '300 U (3.0 mL)', Format: 'Tubed' },
		commercialAid: 'CamAPS FX',
		compat: {
			loop: { status: 'partial', note: 'Experimental branch, DanaRS v3 firmware only.', link: LOOP_DANA },
			trio: { status: 'partial', note: 'DanaRS v3 firmware only.', link: `${TRIO_PUMP}#danars` },
			aaps: { status: 'yes', note: 'Native Bluetooth driver.', link: AAPS_DANA }
		},
		sources: [
			{
				label: 'TGA DANA RS cancellation notice',
				url: 'https://www.tga.gov.au/resources/cancellations-by-sponsors/managing-diabetes-pty-ltd-dana-rs-insulin-pump-infusion-pump-insulin-ambulatory-cancelled-under-section-41gld-act'
			}
		]
	},
	{
		id: 'dana-r',
		kind: 'pump',
		name: 'DANA-R',
		maker: 'SOOIL',
		form: 'Tubed',
		blurb:
			'An earlier tubed pump in the SOOIL DANA family with a 300 unit reservoir and Bluetooth, driven by a native AndroidAPS driver.',
		specs: { Connectivity: 'Bluetooth', Reservoir: '300 U (3.0 mL)', Format: 'Tubed' },
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: { status: 'yes', note: 'Native Bluetooth driver.', link: AAPS_DANA }
		},
		sources: [{ label: 'AndroidAPS compatible pumps', url: AAPS_PUMPS }]
	},
	{
		id: 'accu-chek-combo',
		kind: 'pump',
		name: 'Accu-Chek Combo',
		maker: 'Roche',
		form: 'Tubed',
		image: 'accu-chek-combo',
		imageCredit: 'Image: Wikimedia Commons, CC BY-SA 4.0',
		blurb: 'A tubed pump with a 315 unit cartridge that is operated by a paired Bluetooth handset.',
		specs: { Connectivity: 'Bluetooth handset', Reservoir: '315 U (3.15 mL)', Format: 'Tubed' },
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: {
				status: 'yes',
				note: 'combov2 driver from AndroidAPS 3.2. No extended or multiwave bolus.',
				link: 'https://androidaps.readthedocs.io/en/latest/CompatiblePumps/Accu-Chek-Combo-Pump-v2.html'
			}
		},
		sources: [{ label: 'bionicwookiee, Australian pump choices', url: 'https://bionicwookiee.com/insulin-pump-choices/' }]
	},
	{
		id: 'accu-chek-insight',
		kind: 'pump',
		name: 'Accu-Chek Insight',
		maker: 'Roche',
		form: 'Tubed',
		image: 'accu-chek-insight',
		imageCredit: 'Image © Roche',
		blurb: 'A tubed pump with a 160 unit cartridge that connects directly to a smartphone over Bluetooth.',
		specs: { Connectivity: 'Bluetooth LE', Reservoir: '160 U', Format: 'Tubed' },
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: {
				status: 'yes',
				note: 'Native Bluetooth driver.',
				link: 'https://androidaps.readthedocs.io/en/latest/Configuration/Accu-Chek-Insight-Pump.html'
			}
		}
	},
	{
		id: 'medtronic-paradigm',
		kind: 'pump',
		name: 'Medtronic Paradigm / Veo',
		maker: 'Medtronic',
		form: 'Tubed',
		image: 'medtronic-paradigm',
		imageCredit: 'Image: Wikimedia Commons, CC BY-SA 3.0',
		blurb:
			'A tubed pump that communicates over a proprietary sub-GHz radio. The 180 unit reservoir is discontinued, leaving only the 300 unit models in supply.',
		specs: { Connectivity: '916/868 MHz radio (bridge required)', Reservoir: '300 U (180 U discontinued)', Format: 'Tubed' },
		variants: [
			{
				id: 'fw-old',
				name: 'loopable models',
				compat: {
					loop: { status: 'partial', note: 'Older pre-lockout models only; which model and firmware loops varies by region, so check the linked guide. Needs a radio bridge (OrangeLink Pro or EmaLink).', link: LOOP_PUMP },
					trio: { status: 'partial', note: 'Older pre-lockout models only; which model and firmware loops varies by region, so check the linked guide. Needs a radio bridge (OrangeLink Pro or EmaLink).', link: `${TRIO_PUMP}#medtronic-pumps` },
					aaps: {
						status: 'partial',
						note: 'Older pre-lockout models only; which model and firmware loops varies by region, so check the linked guide. Needs a radio bridge (OrangeLink Pro or EmaLink).',
						link: 'https://androidaps.readthedocs.io/en/latest/Configuration/MedtronicPump.html'
					}
				}
			},
			{
				id: 'fw-new',
				name: 'locked-down models',
				blurb:
					'A tubed pump whose newer firmware blocks external remote-control commands, leaving it controllable only from its own buttons and handheld remote.',
				compat: {
					loop: { status: 'no', note: 'Newer lockout firmware blocks remote control.', link: LOOP_PUMP },
					trio: { status: 'no', note: 'Newer lockout firmware blocks remote control.', link: TRIO_PUMP },
					aaps: {
						status: 'no',
						note: 'Newer lockout firmware blocks remote control.',
						link: 'https://androidaps.readthedocs.io/en/latest/Configuration/MedtronicPump.html'
					}
				}
			}
		],
		sources: [
			{
				label: 'AndroidAPS Medtronic pump',
				url: 'https://androidaps.readthedocs.io/en/latest/Configuration/MedtronicPump.html'
			}
		]
	},
	{
		id: 'tslim-x2',
		kind: 'pump',
		name: 't:slim X2',
		maker: 'Tandem',
		form: 'Tubed',
		image: 'tslim-x2',
		imageCredit: 'Image: Wikimedia Commons, CC0 (public domain)',
		blurb: 'A tubed pump with a touchscreen and a 300 unit cartridge that connects over Bluetooth Low Energy.',
		specs: {
			Connectivity: 'Bluetooth LE',
			Reservoir: '300 U',
			Format: 'Tubed',
			Weight: '112 g',
			Dimensions: '78 × 46 × 16 mm',
			'Water resistance': 'IPX7 · 1 m, 30 min',
			Charging: 'Rechargeable (USB)'
		},
		compat: {
			loop: { status: 'no', note: 'Firmware locked, no DIY driver.' },
			trio: { status: 'no', note: 'Firmware locked, no DIY driver.' },
			aaps: { status: 'no', note: 'Firmware locked, no DIY driver.', link: AAPS_FUTURE }
		},
		variants: [
			{
				id: 'controliq',
				name: 'Control-IQ',
				commercialAid: 'Control-IQ',
				pairsWith: ['dexcom-g6', 'dexcom-g7'],
				blurb:
					'A tubed touchscreen pump with a 300 unit cartridge running the Control-IQ algorithm, which predicts glucose around 30 minutes ahead, adjusts basal insulin and delivers automatic correction boluses.'
			},
			{
				id: 'controliq-plus',
				name: 'Control-IQ+',
				commercialAid: 'Control-IQ+',
				pairsWith: ['dexcom-g6', 'dexcom-g7'],
				blurb:
					'A tubed touchscreen pump with a 300 unit cartridge running the Control-IQ+ algorithm, which uses a wider approved insulin dose and weight range, adjusts basal insulin and delivers automatic correction boluses.'
			}
		],
		sources: [{ label: 'AMSL Diabetes, t:slim X2 (AU)', url: 'https://www.amsldiabetes.com.au/tslim-x2-insulin-pump/' }]
	},
	{
		id: 'tandem-mobi',
		kind: 'pump',
		name: 'Tandem Mobi',
		maker: 'Tandem',
		form: 'Tubed (miniature)',
		image: 'tandem-mobi',
		imageCredit: 'Image © Tandem Diabetes Care',
		blurb:
			'A miniaturised tubed pump with a 200 unit cartridge and no built-in screen, controlled over Bluetooth from a phone app, running the Control-IQ+ automated insulin delivery algorithm.',
		specs: { Connectivity: 'Bluetooth LE', Reservoir: '200 U', Format: 'Tubed (miniature)' },
		commercialAid: 'Control-IQ+',
		pairsWith: ['dexcom-g6', 'dexcom-g7'],
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'planned', note: 'In early development, not released.', link: `${TRIO_PUMP}#tandem-mobi` },
			aaps: { status: 'planned', note: 'Driver in development, not released.', link: AAPS_FUTURE }
		},
		sources: [
			{ label: 'Tandem Mobi', url: 'https://www.tandemdiabetes.com/products/insulin-pumps/tandem-mobi' }
		]
	},
	{
		id: 'minimed-780g',
		kind: 'pump',
		name: 'MiniMed 780G',
		maker: 'Medtronic',
		form: 'Tubed',
		image: 'minimed-780g',
		imageCredit: 'Image: Wikimedia Commons, CC BY-SA 4.0',
		blurb:
			'A tubed pump with a 300 unit reservoir that runs the SmartGuard automated insulin delivery algorithm with automatic correction boluses.',
		specs: { Connectivity: 'Proprietary RF + Bluetooth', Reservoir: '300 U', Format: 'Tubed' },
		commercialAid: 'SmartGuard',
		pairsWith: ['guardian-4', 'simplera-sync'],
		compat: {
			loop: { status: 'no', note: 'Closed system. Only older Medtronic models with legacy firmware are loopable.', link: LOOP_PUMP },
			trio: { status: 'no', note: 'Closed system. Only older Medtronic models with legacy firmware are loopable.', link: TRIO_PUMP },
			aaps: { status: 'no', note: 'Closed system. Only older Medtronic models are AndroidAPS compatible.', link: AAPS_PUMPS }
		},
		sources: [
			{
				label: 'Medtronic Australia, MiniMed 780G',
				url: 'https://www.medtronic-diabetes.com.au/products/minimed-780g-guardian-4-sensor'
			}
		]
	},
	{
		id: 'ypsopump',
		kind: 'pump',
		name: 'YpsoPump',
		maker: 'Ypsomed',
		form: 'Tubed',
		image: 'ypsopump',
		imageCredit: 'Image © Ypsomed',
		blurb:
			'A small tubed pump with a 160 unit cartridge and Bluetooth Low Energy connectivity that forms an automated insulin delivery system through the commercial mylife CamAPS FX app.',
		specs: {
			Connectivity: 'Bluetooth LE',
			Reservoir: '160 U (1.6 mL)',
			Format: 'Tubed',
			Weight: '83 g',
			Dimensions: '80 × 51 × 15 mm',
			'Water resistance': 'IPX8 · 1 m, 60 min',
			Charging: 'AAA battery (~1 month)'
		},
		commercialAid: 'CamAPS FX',
		pairsWith: ['dexcom-g6', 'libre3-plus'],
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: { status: 'no', note: 'Third-party encryption blocks a DIY driver.', link: AAPS_FUTURE }
		},
		sources: [
			{ label: 'mylife Loop (AU)', url: 'https://www.mylife-diabetescare.com/en-AU/mylife-loop.html' }
		]
	},
	{
		id: 'medtrum-nano',
		kind: 'pump',
		name: 'Medtrum Nano',
		maker: 'Medtrum',
		form: 'Tubeless patch',
		blurb:
			'A small tubeless patch pump holding 200 or 300 units of U-100 insulin, controlled over Bluetooth from a phone or a handheld manager, running Medtrum’s TouchCare automated insulin delivery with the Medtrum CGM.',
		specs: {
			Connectivity: 'Bluetooth LE',
			Reservoir: '200 U or 300 U',
			Format: 'Tubeless patch',
			Weight: '13.8 g',
			Dimensions: '40.5 × 31.5 × 11.5 mm',
			'Water resistance': 'IP28 · 2.5 m, 60 min'
		},
		commercialAid: 'TouchCare',
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'yes', note: 'Supported in Trio 0.7 and later over Bluetooth, both the 200 U and 300 U versions.', link: `${TRIO_PUMP}#medtrum-nano` },
			aaps: { status: 'yes', note: 'Native Bluetooth driver, both the Nano and 300 U versions.', link: AAPS_PUMPS }
		},
		sources: [
			{ label: 'Intuitive Therapeutics, Medtrum Nano (NZ)', url: 'https://www.intuitivetherapeutics.co.nz/about/medtrum-nano' }
		]
	},
	{
		id: 'diaconn-g8',
		kind: 'pump',
		name: 'Diaconn G8',
		maker: 'Diaconn',
		form: 'Tubed',
		blurb:
			'A tubed pump from Korean manufacturer Diaconn with built-in Bluetooth, driven by a native AndroidAPS driver.',
		specs: { Connectivity: 'Bluetooth', Format: 'Tubed' },
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: { status: 'yes', note: 'Native Bluetooth driver.', link: AAPS_PUMPS }
		},
		sources: [{ label: 'AndroidAPS compatible pumps', url: AAPS_PUMPS }]
	},
	{
		id: 'eopatch2',
		kind: 'pump',
		name: 'EOPatch2',
		maker: 'EOFlow',
		form: 'Tubeless patch',
		blurb:
			'A tubeless patch pump from Korean manufacturer EOFlow, worn on the body and controlled over Bluetooth, with a native AndroidAPS driver.',
		specs: { Connectivity: 'Bluetooth', Format: 'Tubeless patch' },
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: { status: 'yes', note: 'Native Bluetooth driver.', link: AAPS_PUMPS }
		},
		sources: [{ label: 'AndroidAPS compatible pumps', url: AAPS_PUMPS }]
	},
	{
		id: 'equil',
		kind: 'pump',
		name: 'Equil',
		maker: 'MicroTech Medical',
		form: 'Tubeless patch',
		blurb:
			'A patch pump from MicroTech Medical controlled over Bluetooth, supported by AndroidAPS from firmware 5.3 with a native driver.',
		specs: { Connectivity: 'Bluetooth', Format: 'Tubeless patch' },
		compat: {
			loop: { status: 'no', note: 'No Loop driver.' },
			trio: { status: 'no', note: 'No Trio driver.' },
			aaps: { status: 'yes', note: 'Native Bluetooth driver, firmware 5.3 and later.', link: AAPS_PUMPS }
		},
		sources: [{ label: 'AndroidAPS compatible pumps', url: AAPS_PUMPS }]
	}
] as const satisfies readonly Device[];
