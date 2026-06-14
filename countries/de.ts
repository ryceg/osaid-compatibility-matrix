import type { Country } from '../types';

/**
 * Germany overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Germany has one of the largest do-it-yourself looping
 * communities in the world, anchored by the #wearenotwaiting / AndroidAPS
 * scene, so the loopable DANA pumps and the Roche Accu-Chek Insight are
 * surfaced here. Funding runs through statutory health insurance (gesetzliche
 * Krankenversicherung, GKV): pumps and CGM are Hilfsmittel listed in the
 * Hilfsmittelverzeichnis, approved case by case with the Medizinischer Dienst
 * (MD). Availability and funding move; official-position statements are
 * paraphrased from each body's published material, confirm wording at the
 * linked source before relying on it.
 *
 * Germany-specific traps encoded here: the FreeStyle Libre 2 and 2 Plus sold
 * here are the direct-pairing European build (the `:eu` variants), Omnipod 5
 * pairs with Dexcom (G6, with G7 rolled out from 2025) rather than Libre, and
 * the YpsoPump's mylife CamAPS FX runs with the Dexcom G6, FreeStyle Libre 3
 * and Libre 3 Plus.
 *
 * Deliberately omitted because German retail availability could not be verified
 * at review: Tandem Mobi, DANA-R (superseded by the DANA RS / DANA-i), Omnipod
 * Eros, Medtrum Nano, Diaconn G8, EOPatch2, Equil, and Medtronic Simplera Sync.
 * Add them once a German distribution channel is confirmed.
 */
export const de: Country = {
	code: 'DE',
	name: 'Germany',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to Germans who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Germany has one of the largest do-it-yourself looping communities anywhere, and funding runs through statutory health insurance, with pumps and CGM listed as Hilfsmittel and approved case by case. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'Tubeless patch pump sold through German diabetes suppliers; pods are a Hilfsmittel.', subsidy: ['gkv-pump'] },
		{ ref: 'omnipod-5:g6', availability: 'available', availabilityNote: 'Launched with the Dexcom G6 in Germany; pairs with Dexcom, not FreeStyle Libre.', subsidy: ['gkv-pump'] },
		{ ref: 'omnipod-5:g7', availability: 'available', availabilityNote: 'Dexcom G7 compatibility rolled out in Germany from 2025.', subsidy: ['gkv-pump'] },
		{ ref: 'tslim-x2:controliq-plus', availability: 'available', availabilityNote: 'Runs Control-IQ+ with the Dexcom G6 or G7.', subsidy: ['gkv-pump'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Sold by Medtronic with the Guardian 4 sensor.', subsidy: ['gkv-pump'] },
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Forms the mylife Loop with the mylife CamAPS FX app and a Dexcom G6, FreeStyle Libre 3 or Libre 3 Plus sensor.', subsidy: ['gkv-pump'] },
		{ ref: 'dana-i', availability: 'available', availabilityNote: 'Distributed by IME-DC and German diabetes suppliers on prescription. A reference pump for AndroidAPS and supported by Trio.', subsidy: ['gkv-pump'] },
		{ ref: 'dana-rs', availability: 'limited', availabilityNote: 'The earlier DANA model distributed by IME-DC, largely succeeded by the DANA-i. A native AndroidAPS driver pump.', subsidy: ['gkv-pump'] },
		{ ref: 'accu-chek-insight', availability: 'available', availabilityNote: 'Tubed pump from Roche, a German manufacturer, with a native AndroidAPS Bluetooth driver.', subsidy: ['gkv-pump'] },
		{ ref: 'accu-chek-combo', availability: 'limited', availabilityNote: 'Earlier Roche pump, largely superseded by the Accu-Chek Insight; driven by AndroidAPS combov2.', subsidy: ['gkv-pump'] },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'The mainstream Dexcom sensor in Germany, reimbursed as a Hilfsmittel.', subsidy: ['gkv-cgm'] },
		{ ref: 'dexcom-g6', availability: 'limited', availabilityNote: 'Being phased out in favour of the Dexcom G7; still used with the mylife Loop.', subsidy: ['gkv-cgm'] },
		{ ref: 'dexcom-one-plus', availability: 'available', availabilityNote: 'Sold in Germany as the entry Dexcom sensor (Dexcom ONE+).', subsidy: ['gkv-cgm'] },
		{ ref: 'libre2:eu', availability: 'limited', availabilityNote: 'The European build, which pairs directly. Largely superseded by the Libre 2 Plus.', subsidy: ['gkv-cgm'] },
		{ ref: 'libre2-plus:eu', availability: 'available', availabilityNote: 'The European build, which pairs directly to the looping apps.', subsidy: ['gkv-cgm'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Approved for use with the mylife Loop. Read into DIY systems via Juggluco.', subsidy: ['gkv-cgm'] },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Used with the MiniMed 780G.', subsidy: ['gkv-cgm'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not a CE-marked medical device in Germany, though the pump and sensor hardware is. Building a do-it-yourself system for your own use is legal and a matter of personal responsibility, but it falls outside the devices’ intended use, so manufacturer warranty and liability lapse. The bodies below acknowledge people who choose these systems to differing degrees. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'BfArM',
				full: 'Bundesinstitut für Arzneimittel und Medizinprodukte',
				stance: 'neutral',
				statement:
					'Software that controls an insulin pump by calculating a dose is a medical device and must be CE-marked through a notified body to be placed on the market. Open-source AID software is not CE-marked; combining licensed pump and sensor hardware with it falls outside the devices’ intended use.',
				source: 'https://www.bfarm.de/DE/Buergerbereich/Medizinprodukte/_node.html',
				asOf: '2025'
			},
			{
				name: 'G-BA',
				full: 'Gemeinsamer Bundesausschuss',
				stance: 'neutral',
				statement:
					'A 2016 decision made real-time CGM (rtCGM) a statutory health insurance benefit for people on intensive insulin therapy whose individual targets cannot otherwise be met. Eligibility is based on clinical need and the device’s rtCGM approval, not on the algorithm or system a person uses.',
				source: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/623/',
				asOf: '2016'
			},
			{
				name: 'DDG',
				full: 'Deutsche Diabetes Gesellschaft',
				stance: 'cautious',
				statement:
					'The medical society treats DIY looping as a reality of care: people who use do-it-yourself systems still need their diabetes team and full, ongoing education in CGM and pump therapy, rather than being turned away. It notes the community’s own quality bar, such as the AndroidAPS knowledge test.',
				source: 'https://www.ddg.info/diabetes-zeitung/auch-looper-brauchen-gelegentlich-einen-coach',
				asOf: '2020'
			}
		]
	},

	subsidies: [
		{
			id: 'gkv-pump',
			name: 'Insulin pump funding',
			via: 'Gesetzliche Krankenversicherung (GKV)',
			eligibility:
				'A justified medical indication for pump therapy (intensified insulin therapy that cannot otherwise reach individual targets), confirmed by the health insurer, usually with the Medizinischer Dienst (MD).',
			covers:
				'Externally worn insulin pumps and accessories, listed in product group 03 of the Hilfsmittelverzeichnis, plus necessary training, repairs and replacement.',
			note: 'Approval is case by case. Omnipod is supplied as a consumable rather than a durable pump, and DIY use of any pump falls outside its intended use.',
			link: 'https://www.g-ba.de/themen/veranlasste-leistungen/hilfsmittel/'
		},
		{
			id: 'gkv-cgm',
			name: 'CGM coverage',
			via: 'Gesetzliche Krankenversicherung (GKV)',
			eligibility:
				'People on intensive insulin therapy whose individual therapy targets cannot be met without it, following the 2016 G-BA decision. The device must be rtCGM-approved with an alarm function.',
			covers: 'Real-time CGM sensors and the reader, reimbursed as Hilfsmittel.',
			note: 'A prescription and, where the insurer requires it, MD review precede approval.',
			link: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/623/'
		},
		{
			id: 'pkv',
			name: 'Private health insurance',
			via: 'Private Krankenversicherung (PKV)',
			eligibility: 'Members of a private plan covering diabetes devices.',
			covers:
				'Pumps, CGMs and consumables, under the terms of the individual policy, which can differ from statutory coverage.'
		}
	],

	groups: [
		{
			name: 'Looper Community',
			platform: 'Forum',
			blurb: 'The central German-language forum for open-source looping (Loop, Trio, AndroidAPS), with cross-system news and the network of regional Stammtisch meetups.',
			link: 'https://de.loopercommunity.org/'
		},
		{
			name: 'Deutschsprachige Looped-Gruppe',
			platform: 'Facebook',
			blurb: 'German-language peer support for people using or learning the Loop closed-loop app.',
			link: 'https://www.facebook.com/groups/loopedDE/'
		},
		{
			name: 'Insulinclub',
			platform: 'Forum',
			blurb: 'Long-running German diabetes forum with active boards on insulin pumps, CGM and DIY closed-loop systems.',
			link: 'https://insulinclub.de/'
		}
	]
};
