import type { Country } from '../types';

/**
 * New Zealand overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. The funding picture changed sharply when Pharmac began
 * funding CGMs and two commercial AID pumps from 1 October 2024, with staged
 * changes through 2026, so keep lastReviewed honest. Availability and funding
 * move; official-position statements are paraphrased from each body's published
 * material, confirm wording at the linked source before relying on it.
 *
 * Deliberately omitted because NZ availability could not be verified at review:
 * Omnipod 5 and Medtronic Simplera Sync. Add them once a New Zealand supply or
 * Medsafe listing is confirmed.
 */
export const nz: Country = {
	code: 'NZ',
	name: 'New Zealand',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to New Zealanders who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Pharmac began funding continuous glucose monitors and two commercial pumps in October 2024, and New Zealand clinicians led the landmark CREATE trial of open-source automated insulin delivery. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'tslim-x2:controliq-plus', availability: 'available', availabilityNote: 'Funded by Pharmac, supplied by NZMS. Pairs with the Dexcom G7.', subsidy: ['pump', 'consumables'] },
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Funded by Pharmac, supplied by Pharmaco. Runs mylife CamAPS FX with the Dexcom G6 or FreeStyle Libre 3 Plus.', subsidy: ['pump', 'consumables'] },
		{ ref: 'tandem-mobi', availability: 'unavailable', availabilityNote: 'Not yet available in New Zealand. Tandem’s Mobi rollout began in the United States in 2026, with New Zealand supply through NZMS anticipated but not yet confirmed.' },
		{ ref: 'omnipod-dash', availability: 'limited', availabilityNote: 'Not stocked in New Zealand and not on the Pharmac schedule. A small number of users self-fund pods sourced from Australia.' },
		{ ref: 'minimed-780g', availability: 'limited', availabilityNote: 'Self-funded, supplied by InterMed, as Medtronic is wound down in favour of the funded pumps. The funded MiniMed 770G left Pharmac funding for new users on 1 January 2025, and its consumables stay funded only until 1 October 2026, by which point existing users transition to the Tandem t:slim X2 or YpsoPump.' },
		{ ref: 'medtrum-nano', availability: 'available', availabilityNote: 'Self-funded through Intuitive Therapeutics, or funded through Pharmac’s Alternative Brand Allowance for people the two main funded pumps do not suit.', subsidy: ['aba'] },
		{ ref: 'dana-i', availability: 'limited', availabilityNote: 'Very limited to non-existent in New Zealand. Self-funded through Intuitive Therapeutics, being wound down in favour of the Medtrum Nano.' },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-one-plus', availability: 'available', availabilityNote: 'Funded by Pharmac as a standalone CGM, supplied by NZMS.', subsidy: ['cgm'] },
		{ ref: 'libre2-plus', availability: 'available', availabilityNote: 'Funded by Pharmac as a standalone CGM since 1 May 2025.', subsidy: ['cgm'] },
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'Funded by Pharmac for people with a funded insulin pump. Available self-funded otherwise.', subsidy: ['cgm-pump'] },
		{ ref: 'dexcom-g6', availability: 'available', availabilityNote: 'Funded by Pharmac for people with a funded insulin pump.', subsidy: ['cgm-pump'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Funded by Pharmac for people with a funded insulin pump. Pairs with the YpsoPump and t:slim X2.', subsidy: ['cgm-pump'] },
		{ ref: 'libre2', availability: 'limited', availabilityNote: 'Pharmac funding lapsed on 1 May 2026. Users move to the Libre 2 Plus.' },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Self-funded, used with the MiniMed 780G.' }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not a registered medical device in New Zealand, and there is no medical-device premarket approval system here — devices are notified to Medsafe rather than approved. The pump and sensor hardware is on the market and, for two commercial systems, publicly funded. No New Zealand body has published a position specific to do-it-yourself systems, though New Zealand clinicians led the CREATE randomised trial of open-source AID. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'Medsafe',
				full: 'Medicines and Medical Devices Safety Authority',
				stance: 'neutral',
				statement:
					'New Zealand has no premarket approval system for medical devices. Insulin pumps and CGMs are notified to the WAND database under the Medicines Act 1981; notification does not mean Medsafe has assessed their safety or performance. Open-source AID software is not a notified device.',
				source: 'https://www.medsafe.govt.nz/regulatory/wand.asp',
				asOf: '2024'
			},
			{
				name: 'NZSSD',
				full: 'New Zealand Society for the Study of Diabetes',
				stance: 'neutral',
				statement:
					'The clinical society supports access to funded diabetes technology and references the commercial hybrid closed-loop systems. It has not published a position specific to do-it-yourself systems.',
				source: 'https://www.nzssd.org.nz/resources/section/cgms-and-pump-technology',
				asOf: '2025'
			},
			{
				name: 'Diabetes NZ',
				full: 'Peak consumer body',
				stance: 'supportive',
				statement:
					'Ran the #CGMforAll campaign and welcomed Pharmac’s funding of continuous glucose monitors and insulin pumps. It has not published a position specific to do-it-yourself technology.',
				source: 'https://www.diabetes.org.nz/advocacy',
				asOf: '2024'
			},
			{
				name: 'Pharmac',
				full: 'Pharmaceutical Management Agency',
				stance: 'neutral',
				statement:
					'Funds continuous glucose monitors and two commercial automated insulin delivery pumps for people with type 1 and other insulin-deficient diabetes, based on clinical eligibility rather than the algorithm or system a person uses.',
				source: 'https://www.pharmac.govt.nz/news-and-resources/consultations-and-decisions/decision-to-fund-continuous-glucose-monitors-insulin-pumps-and-insulin-pump-consumables',
				asOf: '2026'
			}
		]
	},

	subsidies: [
		{
			id: 'cgm',
			name: 'CGM funding',
			via: 'Pharmac',
			eligibility:
				'Type 1, type 3c, or other insulin-deficient diabetes, on a Special Authority. No age limit and no HbA1c threshold.',
			covers:
				'A fully funded standalone continuous glucose monitor. Listed standalone products are the Dexcom ONE+ and the FreeStyle Libre 2 Plus.',
			note: 'Special Authority renewal requirements were removed on 1 December 2025.',
			link: 'https://www.pharmac.govt.nz/news-and-resources/cgms-and-insulin-pumps/continuous-glucose-monitors-cgms'
		},
		{
			id: 'cgm-pump',
			name: 'Pump-integrated CGM funding',
			via: 'Pharmac',
			eligibility: 'People with funded access to an insulin pump.',
			covers:
				'The CGM paired with a funded pump. Listed products are the Dexcom G6, the Dexcom G7 and the FreeStyle Libre 3 Plus.',
			link: 'https://www.pharmac.govt.nz/news-and-resources/cgms-and-insulin-pumps/summary-whats-funded-for-who'
		},
		{
			id: 'pump',
			name: 'Insulin pump funding',
			via: 'Pharmac',
			eligibility:
				'Type 1, type 3c, or other insulin-deficient diabetes, assessed by a diabetes multidisciplinary team, on a Special Authority. No HbA1c threshold.',
			covers:
				'A funded automated insulin delivery pump: the Tandem t:slim X2 with Control-IQ, or the mylife YpsoPump with CamAPS FX.',
			note: 'The pump is replaced when its four-year warranty expires, if eligibility still applies.',
			link: 'https://www.pharmac.govt.nz/news-and-resources/cgms-and-insulin-pumps/who-can-get-an-insulin-pump/comparing-the-funded-insulin-pumps'
		},
		{
			id: 'consumables',
			name: 'Pump consumables',
			via: 'Pharmac',
			eligibility: 'Funded pump users, on prescription.',
			covers: 'Subsidised infusion sets, reservoirs and cartridges, dispensed through community pharmacy.',
			note: 'Pods are not funded.',
			link: 'https://www.pharmac.govt.nz/news-and-resources/cgms-and-insulin-pumps/who-can-get-an-insulin-pump/new-to-insulin-pumps'
		},
		{
			id: 'aba',
			name: 'Alternative Brand Allowance',
			via: 'Pharmac',
			eligibility:
				'People for whom the two main funded pumps are clinically unsuitable, for example through significant cognitive or physical disability, sensory processing needs or difficult social circumstances.',
			covers: 'An alternative funded pump, such as the Medtrum Nano, applied for case by case.',
			link: 'https://www.intuitivetherapeutics.co.nz/about/pharmac-funding-aba'
		}
	],

	groups: [
		{
			name: 'Nightscout New Zealand',
			platform: 'Website',
			blurb: 'New Zealand advocacy and education non-profit supporting access to open-source diabetes technology, including Loop, AndroidAPS, Trio and Nightscout.',
			link: 'https://nightscout.org.nz/'
		},
		{
			name: 'Type 1 Diabetes New Zealand',
			platform: 'Facebook',
			blurb: 'Peer support group for New Zealanders living with type 1 diabetes and those who support them.',
			link: 'https://www.facebook.com/groups/93863821525/'
		}
	]
};
