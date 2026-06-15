import type { Country } from '../types';

/**
 * Pakistan overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Pakistan is an overwhelmingly out-of-pocket market in a
 * largely private health system, and pump/sensor use is uncommon, so verified
 * supply is thin. Only devices with a sourced in-country channel are surfaced;
 * keep lastReviewed honest. Official-position statements are paraphrased from
 * each body's published material; confirm wording at the linked source.
 *
 * Deliberately omitted because Pakistani availability could not be verified at
 * review: DANA RS / DANA-R, Omnipod (any), Tandem, YpsoPump, Roche pumps,
 * Medtrum, Diaconn, EOFlow, MicroTech, and Medtronic standalone CGMs (Guardian
 * 4 / Simplera Sync). No Pakistan-specific DIY-looping peer group was found.
 * Add any of these once a local supply or DRAP registration is confirmed.
 */
export const pk: Country = {
	code: 'PK',
	name: 'Pakistan',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to people in Pakistan who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Care is overwhelmingly out of pocket in a largely private health system, with charitable organisations filling much of the gap in insulin and supplies, and pump and sensor use remains uncommon. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'minimed-780g', availability: 'limited', availabilityNote: 'Medtronic has a regional distribution presence, but routine in-country supply of the MiniMed 780G is not confirmed. Any pump is self-funded, and pump use is uncommon.' },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Older loopable Medtronic models appear only on second-hand and grey-market listings, not through official supply.' },
		{ ref: 'dana-i', availability: 'unavailable', availabilityNote: 'No Pakistani SOOIL distributor. A unit imported privately is not a supported product.' },

		// Sensors
		{ ref: 'libre2', availability: 'available', availabilityNote: 'Sold officially through M&P, Abbott’s distributor partner in Pakistan, as the sensor and reader.' },
		{ ref: 'libre3-plus', availability: 'limited', availabilityNote: 'Listed by Pakistani retailers but not confirmed as an official Abbott Pakistan product.' },
		{ ref: 'dexcom-g7', availability: 'limited', availabilityNote: 'No official Dexcom distributor in Pakistan; available only as a grey-market import.' }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not registered with the regulator in Pakistan, and care is overwhelmingly out of pocket in a largely private health system. The pump and sensor hardware is regulated separately. No Pakistani body has published a position specific to do-it-yourself systems. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'DRAP',
				full: 'Drug Regulatory Authority of Pakistan',
				stance: 'neutral',
				statement:
					'Regulates medical devices, including insulin pumps and CGMs, under the Medical Device Rules 2017; devices must be registered and importers licensed. Open-source AID software is not a registered device.',
				source: 'https://www.dra.gov.pk/therapeutic-goods/medical-devices/application-process/',
				asOf: '2018'
			},
			{
				name: 'Pakistan Endocrine Society',
				full: 'National clinical society',
				stance: 'neutral',
				statement:
					'Publishes national diabetes management guidelines and is a member of the International Diabetes Federation. It has not published a position specific to do-it-yourself systems.',
				source: 'https://pakendosociety.org/',
				asOf: '2024'
			},
			{
				name: 'Diabetic Association of Pakistan',
				full: 'Peak advocacy and research body',
				stance: 'neutral',
				statement:
					'A national advocacy and research organisation that co-runs the Diabetes Registry of Pakistan. It has not published a position specific to do-it-yourself technology.',
				source: 'http://www.dap.org.pk/'
			}
		]
	},

	subsidies: [
		{
			id: 'sehat-card',
			name: 'Sehat Sahulat Program',
			via: 'Federal and provincial government',
			eligibility: 'Eligible families in participating provinces, on the Sehat Card.',
			covers: 'Inpatient hospitalisation, including diabetes-related admissions, at empanelled hospitals.',
			note: 'An inpatient scheme. It does not cover insulin pumps, CGM sensors or outpatient diabetes supplies, which are paid out of pocket.',
			link: 'https://en.wikipedia.org/wiki/Sehat_Sahulat_Program'
		},
		{
			id: 'ngo-support',
			name: 'Charitable and NGO support',
			via: 'Non-profits and charities',
			eligibility: 'Varies by program; much of it focuses on children with type 1 diabetes.',
			covers: 'Free or subsidised insulin, test strips and supplies through organisations such as Meethi Zindagi.',
			note: 'Aimed at insulin and consumables rather than pumps or CGM.',
			link: 'https://meethizindagi.org/'
		}
	],

	groups: [
		{
			name: 'Meethi Zindagi',
			platform: 'Website',
			blurb: 'Pakistan’s leading type 1 diabetes nonprofit, providing free insulin and supplies, education and peer support across the country.',
			link: 'https://meethizindagi.org/'
		},
		{
			name: 'Baqai Institute of Diabetology and Endocrinology',
			platform: 'Website',
			blurb: 'Karachi-based IDF Centre of Education providing diabetes care, education and research.',
			link: 'https://bide.edu.pk/'
		}
	]
};
