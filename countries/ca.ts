import type { Country } from '../types';

/**
 * Canada overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Funding in Canada is a provincial/territorial patchwork
 * rather than one national scheme, plus the federal NIHB program and private
 * insurance, so the subsidy entries describe the structure rather than a single
 * payer. Availability and funding move; official-position statements are
 * paraphrased from each body's published material, confirm wording at the
 * linked source before relying on it.
 *
 * Canada-specific traps encoded here: Omnipod 5 pairs with Dexcom only (no
 * FreeStyle Libre), the t:slim X2 runs Control-IQ (Control-IQ+ is licensed but
 * not yet rolled out), and the YpsoPump's mylife Loop uses the Dexcom G6.
 *
 * Deliberately omitted because Canadian availability could not be verified at
 * review: Tandem Mobi, DANA pumps, the twiist pump, Medtrum, Dexcom ONE+,
 * FreeStyle Libre 2 Plus (standalone) and Medtronic Simplera Sync. Several are
 * Health Canada licensed but not yet sold; add them once a retail channel is
 * confirmed.
 */
export const ca: Country = {
	code: 'CA',
	name: 'Canada',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to Canadians who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Funding is a provincial patchwork rather than one national scheme, and Diabetes Canada is unusual in having published a position that backs clinicians who support people using do-it-yourself systems. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'Licensed by Health Canada, sold online through Diabetes Express.', subsidy: ['provincial-pump'] },
		{ ref: 'omnipod-5:g7', availability: 'available', availabilityNote: 'Launched 2025. Pairs with the Dexcom G6 or G7 in Canada, not FreeStyle Libre.', subsidy: ['provincial-pump'] },
		{ ref: 'tslim-x2:controliq', availability: 'available', availabilityNote: 'Runs Control-IQ with the Dexcom G6 or G7. Control-IQ+ is licensed but not yet rolled out here.', subsidy: ['provincial-pump'] },
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Runs mylife CamAPS FX with the Dexcom G6 (mylife Loop, approved November 2024).', subsidy: ['provincial-pump'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Sold by Medtronic Canada with the Guardian 4 sensor.', subsidy: ['provincial-pump'] },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'The mainstream Dexcom sensor in Canada, sold through pharmacies.', subsidy: ['provincial-cgm'] },
		{ ref: 'dexcom-g6', availability: 'limited', availabilityNote: 'Being phased out through 2026 in favour of the Dexcom G7.', subsidy: ['provincial-cgm'] },
		{ ref: 'libre2', availability: 'available', availabilityNote: 'The 14-day FreeStyle Libre 2, widely covered.', subsidy: ['provincial-cgm'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Covered across Canada since January 2026.', subsidy: ['provincial-cgm'] },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Used with the MiniMed 780G.', subsidy: ['provincial-cgm'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not a licensed medical device in Canada, though the pump and sensor hardware is. Notably, Diabetes Canada has published a position statement supporting health-care professionals who help people use do-it-yourself systems, one of the most supportive national positions internationally. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'Health Canada',
				full: 'Medical Devices Directorate',
				stance: 'neutral',
				statement:
					'Insulin pumps and CGMs are licensed medical devices (Class III and IV) listed in the public MDALL database. Open-source AID software is not a licensed device and does not appear there; users combine licensed hardware with unlicensed, off-label software.',
				source: 'https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/about-medical-devices.html',
				asOf: '2025'
			},
			{
				name: 'Diabetes Canada',
				full: 'National diabetes body',
				stance: 'supportive',
				statement:
					'A 2023 position statement says health-care professionals should support people with type 1 diabetes who choose do-it-yourself automated insulin delivery, alongside commercial systems, and reviews Loop, OpenAPS and AndroidAPS. It is among the most supportive national positions internationally.',
				source: 'https://guidelines.diabetes.ca/cpg/diy-aid',
				asOf: '2023'
			},
			{
				name: 'CDA-AMC',
				full: "Canada's Drug Agency (formerly CADTH)",
				stance: 'cautious',
				statement:
					'A health technology assessment of commercial hybrid closed-loop systems found they improve time in range with safety comparable to other methods, but flagged uncertain subgroup benefit and a large budget impact for funders. It does not assess do-it-yourself systems.',
				source: 'https://www.cda-amc.ca/hybrid-closed-loop-insulin-delivery-systems-people-type-1-diabetes',
				asOf: '2024'
			}
		]
	},

	subsidies: [
		{
			id: 'provincial-pump',
			name: 'Provincial pump programs',
			via: 'Provincial and territorial health plans',
			eligibility:
				'Varies by province. Ontario, British Columbia, Alberta and Manitoba fund pumps for all ages; Quebec funds people diagnosed under 18 only.',
			covers:
				'The pump device and consumables, through programs such as Ontario’s Assistive Devices Program, BC PharmaCare and Quebec’s RAMQ.',
			note: 'Age limits, income tests and cost-sharing differ by province.',
			link: 'https://www.diabetes.ca/advocacy-policies/your-rights/access-to-medication,-supplies-device'
		},
		{
			id: 'provincial-cgm',
			name: 'Provincial CGM coverage',
			via: 'Provincial and territorial health plans',
			eligibility:
				'Varies by province. Most cover people on intensive insulin therapy rather than gating on diabetes type, and coverage expanded across most provinces through 2024 to 2026.',
			covers: 'Dexcom and FreeStyle Libre sensors.',
			note: 'Coverage, age limits and income tests differ by province.',
			link: 'https://www.diabetes.ca/advocacy-policies/your-rights/access-to-medication,-supplies-device'
		},
		{
			id: 'nihb',
			name: 'Non-Insured Health Benefits',
			via: 'Indigenous Services Canada',
			eligibility: 'Registered First Nations and recognised Inuit.',
			covers: 'CGM sensors and some pump consumables, with prior approval.',
			link: 'https://www.sac-isc.gc.ca/eng/1578079214611/1578079236012'
		},
		{
			id: 'private',
			name: 'Private and employer insurance',
			via: 'Extended health plans',
			eligibility: 'Members of a plan that includes diabetes devices.',
			covers:
				'Pumps, CGMs and consumables, often filling gaps where a province covers only children or has yet to list a newer device.'
		}
	],

	groups: [
		{
			name: 'BC Diabetes — Loop program',
			platform: 'Website',
			blurb: 'A Vancouver clinic that helps people set up Loop, Trio and AndroidAPS, and the hub the British Columbia looping community orbits.',
			link: 'https://www.bcdiabetes.ca/welcome-to-loop/'
		},
		{
			name: 'Diabetes Canada Connect',
			platform: 'Online community',
			blurb: 'Diabetes Canada’s free, moderated peer-support community for anyone in Canada affected by diabetes.',
			link: 'https://connection.diabetes.ca/'
		},
		{
			name: 'Breakthrough T1D Canada',
			platform: 'Canada',
			blurb: 'National type 1 peer support through Talk T1D one-to-one matching and virtual meetups.',
			link: 'https://breakthrought1d.ca/community-support/talk-t1d/'
		},
		{
			name: 'BETTER',
			platform: 'Website',
			blurb: 'Pan-Canadian type 1 registry and support platform with webinars and CGM, pump and AID education.',
			link: 'https://type1better.com/en/'
		}
	]
};
