import type { Country } from '../types';

/**
 * United Kingdom overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Funding runs through the NHS rather than insurance: pumps,
 * CGM and commercial hybrid closed loop (HCL) are prescribed on the NHS against
 * NICE criteria. NICE TA943 (December 2023) recommended HCL for type 1 diabetes,
 * and NHS England began a five-year national rollout from April 2024; CGM is
 * funded under NICE NG17 (adults) and NG18 (children and young people). The four
 * nations (England, Scotland, Wales, Northern Ireland) commission and procure
 * separately, so access and timing differ across the UK. Availability and
 * funding move; official-position statements are paraphrased from each body's
 * published material, confirm wording at the linked source before relying on it.
 *
 * UK-specific traps encoded here: the FreeStyle Libre 2 and 2 Plus sold here are
 * the direct-pairing European build (the `:eu` variants), Omnipod 5 pairs with
 * the Dexcom G6, Dexcom G7 or FreeStyle Libre 2 Plus (you choose the sensor),
 * and the YpsoPump's mylife CamAPS FX (the Cambridge / CamDiab algorithm, a
 * UK product) runs with the Dexcom G6, FreeStyle Libre 3 or Libre 3 Plus.
 *
 * Deliberately omitted because UK retail availability could not be verified at
 * review: Tandem Mobi, DANA-R (superseded by the DANA RS / DANA-i), Omnipod
 * Eros, Accu-Chek Combo, Medtrum Nano, Diaconn G8, EOPatch2, Equil, and
 * Medtronic Simplera Sync. Several are CE/UKCA marked or in phased release but a
 * confirmed UK channel was not established; add them once one is confirmed.
 */
export const gb: Country = {
	code: 'GB',
	name: 'United Kingdom',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to people in the UK who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Funding runs through the NHS against NICE criteria, and a five-year national rollout of commercial hybrid closed loop began in 2024, with access and timing differing across England, Scotland, Wales and Northern Ireland. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'Tubeless patch pump available on NHS prescription; pods are a pharmacy item.', subsidy: ['nhs-pump'] },
		{ ref: 'omnipod-5:g7', availability: 'available', availabilityNote: 'The first tubeless hybrid closed loop in the UK. Pairs with the Dexcom G7 (also the Dexcom G6 or FreeStyle Libre 2 Plus). On the NHS procurement frameworks for England, Scotland, Wales and Northern Ireland.', subsidy: ['nhs-hcl'] },
		{ ref: 'omnipod-5:g6', availability: 'available', availabilityNote: 'Omnipod 5 paired with the Dexcom G6.', subsidy: ['nhs-hcl'] },
		{ ref: 'omnipod-5:l2p', availability: 'available', availabilityNote: 'Omnipod 5 paired with the FreeStyle Libre 2 Plus, the lower-cost sensor option for the system.', subsidy: ['nhs-hcl'] },
		{ ref: 'tslim-x2:controliq', availability: 'available', availabilityNote: 'Runs Control-IQ with the Dexcom G6 or G7. Funded as a commercial HCL system under the NICE rollout.', subsidy: ['nhs-hcl'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Sold by Medtronic with the Guardian 4 sensor, running SmartGuard.', subsidy: ['nhs-hcl'] },
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Forms the mylife Loop with the mylife CamAPS FX app (the Cambridge / CamDiab algorithm) and a Dexcom G6, FreeStyle Libre 3 or Libre 3 Plus sensor. CamAPS FX is available on iOS in the UK as well as Android.', subsidy: ['nhs-hcl'] },
		{ ref: 'dana-i', availability: 'available', availabilityNote: 'Distributed in the UK by Advanced Therapeutics (UK) Ltd, the exclusive SOOIL distributor, on the NHS. A reference pump for AndroidAPS and supported by Trio.', subsidy: ['nhs-pump'] },
		{ ref: 'dana-rs', availability: 'limited', availabilityNote: 'The earlier DANA model, largely succeeded by the DANA-i. A native AndroidAPS driver pump.', subsidy: ['nhs-pump'] },
		{ ref: 'accu-chek-insight', availability: 'limited', availabilityNote: 'Tubed Roche pump with a native AndroidAPS Bluetooth driver. Available to existing users; check current supply with the supplier.', subsidy: ['nhs-pump'] },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'The mainstream Dexcom sensor in the UK, prescribed on the NHS against NICE criteria.', subsidy: ['nhs-cgm'] },
		{ ref: 'dexcom-g6', availability: 'limited', availabilityNote: 'Being phased out in favour of the Dexcom G7; still used with the mylife Loop.', subsidy: ['nhs-cgm'] },
		{ ref: 'dexcom-one-plus', availability: 'available', availabilityNote: 'The Dexcom ONE+, available on NHS prescription. Replaced the original Dexcom ONE, which was discontinued in 2025.', subsidy: ['nhs-cgm'] },
		{ ref: 'libre2:eu', availability: 'limited', availabilityNote: 'The European build, which pairs directly. Largely superseded by the Libre 2 Plus.', subsidy: ['nhs-cgm'] },
		{ ref: 'libre2-plus:eu', availability: 'available', availabilityNote: 'The European build, which pairs directly to the looping apps. Widely prescribed on the NHS.', subsidy: ['nhs-cgm'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Approved for use with the mylife Loop. Read into DIY systems via Juggluco.', subsidy: ['nhs-cgm'] },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Used with the MiniMed 780G.', subsidy: ['nhs-cgm'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not a CE/UKCA-marked medical device in the UK, though the pump and sensor hardware is, and commercial hybrid closed loop is now funded on the NHS following NICE TA943. The bodies below acknowledge people who choose do-it-yourself systems to differing degrees, with Diabetes UK and the wider clinical community notably pragmatic about continuing to support people who self-build. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'MHRA',
				full: 'Medicines and Healthcare products Regulatory Agency',
				stance: 'neutral',
				statement:
					'The MHRA regulates medical devices placed on the UK market but has no jurisdiction over what an individual builds for their own use. Open-source AID software is not a marketed, regulated device; combining licensed pump and sensor hardware with it falls outside the devices’ intended use and warranty.',
				source: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
				asOf: '2025'
			},
			{
				name: 'NICE',
				full: 'National Institute for Health and Care Excellence',
				stance: 'neutral',
				statement:
					'Technology appraisal TA943 (December 2023) recommends commercial hybrid closed loop systems as an option for type 1 diabetes, underpinning the NHS England rollout from April 2024. NICE appraises commercial HCL systems; it does not assess do-it-yourself open-source AID.',
				source: 'https://www.nice.org.uk/guidance/ta943',
				asOf: '2023'
			},
			{
				name: 'Diabetes UK',
				full: 'National diabetes charity',
				stance: 'supportive',
				statement:
					'A position statement, endorsed by the Royal College of Nursing, says people who choose do-it-yourself closed loop systems should continue to get support and care from their diabetes team, while noting healthcare professionals cannot recommend their use and that people use them at their own risk.',
				source: 'https://www.diabetes.org.uk/about-us/about-the-charity/our-strategy/position-statements/do-it-yourself-closed-loop',
				asOf: '2024'
			}
		]
	},

	subsidies: [
		{
			id: 'nhs-pump',
			name: 'Insulin pump funding',
			via: 'NHS',
			eligibility:
				'A clinical indication for pump therapy under NICE guidance (broadly, intensive insulin therapy where multiple daily injections are impractical or targets are not met), assessed by a specialist diabetes team.',
			covers:
				'The insulin pump and consumables, prescribed and supplied through the NHS. Commissioning and procurement run separately in England, Scotland, Wales and Northern Ireland.',
			note: 'Omnipod is supplied as a pharmacy item rather than a durable pump, and do-it-yourself use of any pump falls outside its intended use.',
			link: 'https://www.diabetes.org.uk/about-diabetes/looking-after-diabetes/treatments/insulin-pumps'
		},
		{
			id: 'nhs-hcl',
			name: 'Hybrid closed loop rollout',
			via: 'NHS',
			eligibility:
				'Type 1 diabetes meeting the NICE TA943 criteria, prioritised through NHS England’s phased programme: children and young people, people who are pregnant, and adults whose targets are not met on other therapy. Access and timing differ across the four nations.',
			covers:
				'A commercial hybrid closed loop system (pump, CGM and the licensed algorithm) supplied through the NHS. The national rollout began in April 2024 and is planned over five years.',
			note: 'Availability depends on your local diabetes service building capacity; ask your team which systems are offered where you live.',
			link: 'https://www.england.nhs.uk/diabetes/digital-innovations-to-support-diabetes-outcomes/hybrid-closed-loop-technology/'
		},
		{
			id: 'nhs-cgm',
			name: 'CGM and flash glucose monitoring',
			via: 'NHS',
			eligibility:
				'People with type 1 diabetes are eligible for real-time or flash CGM under NICE NG17 (adults) and NG18 (children and young people); type 2 on insulin and pregnancy are covered under separate NICE guidance.',
			covers:
				'CGM and flash sensors such as the FreeStyle Libre, Dexcom and Medtronic Guardian ranges, prescribed on the NHS.',
			note: 'A prescription is issued against local formulary choices, which vary by area.',
			link: 'https://www.nice.org.uk/guidance/ng17'
		}
	],

	groups: [
		{
			name: 'Diabetes UK forum',
			platform: 'Forum',
			blurb: 'Diabetes UK’s peer-support forum, with active boards on insulin pumps, CGM and closed-loop systems used in the UK.',
			link: 'https://forum.diabetes.org.uk/boards/'
		},
		{
			name: 'Breakthrough T1D UK — open source and DIY',
			platform: 'Website',
			blurb: 'The UK type 1 charity’s guidance on open-source and DIY closed-loop systems, including its position statement and links into the looping community.',
			link: 'https://breakthrought1d.org.uk/knowledge-support/managing-type-1-diabetes/guide-to-type-1-diabetes-technology/open-source-and-diy-systems/'
		},
		{
			name: 'Diabettech',
			platform: 'Website',
			blurb: 'A long-running UK diabetes-and-technology blog by Tim Street with practical guides to DIY looping (Loop, AndroidAPS) and the kit it needs.',
			link: 'https://www.diabettech.com/looping-a-guide/what-is-it/'
		},
		{
			name: 'Diabetes.co.uk forum',
			platform: 'Forum',
			blurb: 'Large UK diabetes community forum with discussion of hybrid closed loop and DIY looping setups.',
			link: 'https://www.diabetes.co.uk/forum/'
		}
	]
};
