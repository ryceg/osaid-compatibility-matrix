import type { Country } from '../types';

/**
 * Indonesia overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. The national scheme (JKN / BPJS Kesehatan) covers insulin
 * and routine care but not pumps or sensors, so most technology is bought out of
 * pocket and use is uncommon; verified supply is thin. Only devices with a
 * sourced in-country channel are surfaced; keep lastReviewed honest. Note that
 * medical devices are regulated by the Ministry of Health, not BPOM. Official
 * statements are paraphrased from each body; confirm wording at the source.
 *
 * Deliberately omitted because Indonesian availability could not be verified at
 * review: DANA RS, Omnipod (any), Tandem, YpsoPump, Roche pumps, Medtrum,
 * Diaconn, MicroTech, Libre 2 Plus, Dexcom G7 / ONE+, and Simplera Sync. No
 * Indonesia-specific DIY-looping peer group was found. Add any of these once a
 * local supply or izin edar registration is confirmed.
 */
export const id: Country = {
	code: 'ID',
	name: 'Indonesia',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to people in Indonesia who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. The national health scheme covers insulin and routine care but not pumps or sensors, so the technology is largely bought out of pocket and remains uncommon. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'eopatch2', availability: 'available', availabilityNote: 'EOFlow’s EOPatch holds Indonesian marketing authorisation, distributed exclusively by PT Prasasti Nusantara Sukses.' },
		{ ref: 'minimed-780g', availability: 'limited', availabilityNote: 'PT Medtronic Indonesia supports insulin-pump therapy locally, though routine availability of the MiniMed 780G specifically is not confirmed. Pumps are self-funded.' },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Older loopable Paradigm units appear on local marketplaces as resale items, not through official supply.' },
		{ ref: 'dana-i', availability: 'unavailable', availabilityNote: 'SOOIL’s DANA Diabecare was distributed here from 2012 through Enseval (Kalbe), but current supply of the Bluetooth DANA models used for looping is not confirmed.' },

		// Sensors
		{ ref: 'libre2', availability: 'available', availabilityNote: 'Sold through PT Abbott Products Indonesia and widely listed on local pharmacies and e-commerce.' },
		{ ref: 'libre3-plus', availability: 'limited', availabilityNote: 'Appears on Indonesian marketplaces, but an official Abbott Indonesia launch is not confirmed.' },
		{ ref: 'guardian-4', availability: 'limited', availabilityNote: 'Used with Medtronic’s MiniMed pump therapy, supported locally by PT Medtronic Indonesia.' },
		{ ref: 'dexcom-g6', availability: 'unavailable', availabilityNote: 'No official Dexcom distributor in Indonesia; Dexcom’s only South-East Asian launch is in Singapore. Units appear only as grey-market imports.' }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not registered in Indonesia, and the national health scheme covers insulin and routine care but not pumps or sensors, so most technology is bought out of pocket. Medical devices are regulated by the Ministry of Health rather than the food-and-drug agency. No Indonesian body has published a position specific to do-it-yourself systems. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'Kemenkes',
				full: 'Ministry of Health (Kementerian Kesehatan)',
				stance: 'neutral',
				statement:
					'Regulates medical devices, which require a mandatory marketing licence (izin edar) issued through Regalkes; insulin pumps and CGMs are registered this way. Unlike drugs and food, which fall under BPOM, devices sit with the Ministry. Open-source AID software holds no licence.',
				source: 'https://regalkes.kemkes.go.id/',
				asOf: '2017'
			},
			{
				name: 'PERKENI',
				full: 'Indonesian Society of Endocrinology',
				stance: 'neutral',
				statement:
					'Publishes Indonesia’s main diabetes guideline, which incorporates CGM metrics such as time in range, adapted to local device access. It has not addressed do-it-yourself systems.',
				source: 'https://pbperkeni.or.id/',
				asOf: '2024'
			},
			{
				name: 'IDAI',
				full: 'Indonesian Pediatric Society',
				stance: 'neutral',
				statement:
					'Its national consensus on managing type 1 diabetes in children and adolescents covers insulin pumps and recognises CGM. It has not addressed do-it-yourself systems.',
				source: 'https://www.idai.or.id/professional-resources/pedoman-konsensus/konsensus-nasional-pengelolaan-diabetes-tipe-1'
			}
		]
	},

	subsidies: [
		{
			id: 'jkn',
			name: 'National Health Insurance (JKN)',
			via: 'BPJS Kesehatan',
			eligibility: 'JKN members with diabetes.',
			covers: 'Insulin and routine diabetes management at public facilities, including the Prolanis chronic-disease program.',
			note: 'Does not cover insulin pumps, CGM sensors, test strips or needles, which are paid out of pocket.',
			link: 'https://www.thejakartapost.com/adv/2025/10/31/bpjs-kesehatan-monitors-chronic-disease-among-jkn-participants-through-prolanis.html'
		}
	],

	groups: [
		{
			name: 'Sobat Diabet',
			platform: 'Website',
			blurb: 'Youth-focused Indonesian diabetes-awareness community with chapters across the country, running education campaigns and peer support.',
			link: 'https://sobatdiabet.org/'
		},
		{
			name: 'IKADAR',
			platform: 'Instagram',
			blurb: 'Indonesia’s association of families of children and adolescents with type 1 diabetes, initiated by pediatric endocrinologists.',
			link: 'https://www.instagram.com/ikadar.indonesia/'
		},
		{
			name: 'PERSADIA',
			platform: 'Website',
			blurb: 'National diabetes patient association running education, screening and diabetes-exercise programs across the country.',
			link: 'https://pbpersadiaofficial.org/'
		}
	]
};
