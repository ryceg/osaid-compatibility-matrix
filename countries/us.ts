import type { Country } from '../types';

/**
 * United States overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. The US is the birthplace of Loop and OpenAPS and has the
 * largest open-source AID community. There is no single national funding scheme;
 * coverage runs through private commercial insurance, Medicare, Medicaid and
 * manufacturer assistance, and turns on a pharmacy-benefit versus durable
 * medical equipment (DME) split, so the subsidy entries describe that structure
 * rather than a single payer. Availability and funding move; official-position
 * statements are paraphrased from each body's published material, confirm
 * wording at the linked source before relying on it.
 *
 * US-specific traps encoded here: the FreeStyle Libre sensors sold in the US are
 * the NON-European build, read on Android through Juggluco rather than paired
 * directly, so the bare catalog ids (libre2, libre2-plus) are referenced, not
 * the `:eu` variants. Omnipod 5 pairs with Dexcom G6/G7 and, in the US, the
 * FreeStyle Libre 2 Plus.
 *
 * Deliberately omitted because the device is not in the global catalog: the Beta
 * Bionics iLet and the twiist pump (both US-cleared) — add a listing once each
 * is added to catalog/. Deliberately omitted because they are not FDA-cleared or
 * sold in the US: the SOOIL DANA pumps (DANA-i, DANA RS, DANA-R) and the Ypsomed
 * YpsoPump.
 */
export const us: Country = {
	code: 'US',
	name: 'United States',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to Americans who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. The US is where Loop and OpenAPS began, and where Tidepool Loop became the first FDA-cleared descendant of a do-it-yourself system. Funding runs through private insurance, Medicare and Medicaid rather than one national scheme. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'FDA-cleared tubeless pump from Insulet. Often dispensed through the pharmacy benefit rather than as durable medical equipment.', subsidy: ['commercial-insurance', 'medicare', 'medicaid', 'manufacturer-assistance'] },
		{ ref: 'omnipod-5', availability: 'available', availabilityNote: 'Pairs with the Dexcom G6, Dexcom G7 and FreeStyle Libre 2 Plus in the US. The pod version is chosen for the sensor at the pharmacy — a Dexcom-compatible pod does not work with the FreeStyle Libre 2 Plus and vice versa.', subsidy: ['commercial-insurance', 'medicare', 'medicaid', 'manufacturer-assistance'] },
		{ ref: 'tslim-x2:controliq-plus', availability: 'available', availabilityNote: 'Sold by Tandem Diabetes Care running Control-IQ+ with the Dexcom G6 or G7.', subsidy: ['commercial-insurance', 'medicare', 'medicaid', 'manufacturer-assistance'] },
		{ ref: 'tandem-mobi', availability: 'available', availabilityNote: 'FDA-cleared miniature pump from Tandem running Control-IQ+ with the Dexcom G6 or G7.', subsidy: ['commercial-insurance', 'medicare', 'medicaid', 'manufacturer-assistance'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Sold by Medtronic with the Guardian 4 or Simplera Sync sensor.', subsidy: ['commercial-insurance', 'medicare', 'medicaid', 'manufacturer-assistance'] },
		{ ref: 'omnipod-eros', availability: 'unavailable', availabilityNote: 'Legacy radio-controlled pods, superseded by Omnipod DASH and Omnipod 5.' },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only. Which model and firmware loops varies, so check the build guide.' },

		// Sensors
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'The mainstream Dexcom sensor in the US, dispensed through the pharmacy benefit.', subsidy: ['commercial-insurance', 'medicare', 'medicaid'] },
		{ ref: 'dexcom-g6', availability: 'limited', availabilityNote: 'Being discontinued in favour of the Dexcom G7.', subsidy: ['commercial-insurance', 'medicare', 'medicaid'] },
		{ ref: 'dexcom-one-plus', availability: 'available', availabilityNote: 'A lower-cost Dexcom sensor positioned for people without CGM coverage.' },
		{ ref: 'libre2-plus', availability: 'available', availabilityNote: 'The US build, read on Android through Juggluco rather than paired directly. Integrates with Omnipod 5.', subsidy: ['commercial-insurance', 'medicare', 'medicaid'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Abbott’s 15-day sensor, widely dispensed through the pharmacy benefit.', subsidy: ['commercial-insurance', 'medicare', 'medicaid'] },
		{ ref: 'libre2', availability: 'limited', availabilityNote: 'The US 14-day build, read on Android through Juggluco. Being superseded by the FreeStyle Libre 2 Plus and 3 Plus.' },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Used with the MiniMed 780G.', subsidy: ['commercial-insurance', 'medicare', 'medicaid'] },
		{ ref: 'simplera-sync', availability: 'available', availabilityNote: 'FDA-approved disposable all-in-one sensor for the MiniMed 780G.', subsidy: ['commercial-insurance', 'medicare', 'medicaid'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery software is not FDA-cleared, though the pumps and sensors it drives are regulated separately. The FDA has cleared interoperable components — iCGMs, alternate controller enabled (ACE) pumps and interoperable automated glycemic controllers (iControllers) — and Tidepool Loop, an FDA-cleared commercial descendant of do-it-yourself Loop. The FDA also issued a 2019 safety communication warning against unauthorized devices. The ADA Standards of Care recognise open-source AID as safe and effective when supported. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'FDA',
				full: 'U.S. Food and Drug Administration',
				stance: 'cautious',
				statement:
					'A 2019 safety communication warns patients and clinicians to use only FDA-authorized diabetes devices, after a report of a serious adverse event involving an unauthorized algorithm converting a sensor signal and driving an unauthorized insulin-dosing device. Separately, the FDA has cleared interoperable iCGMs, ACE pumps and iControllers, and in 2023 cleared Tidepool Loop, a commercial system derived from do-it-yourself Loop.',
				source: 'https://www.fda.gov/news-events/press-announcements/fda-warns-against-use-unauthorized-devices-diabetes-management',
				asOf: '2019'
			},
			{
				name: 'ADA',
				full: 'American Diabetes Association',
				stance: 'supportive',
				statement:
					'The Standards of Care in Diabetes (Section 7, Diabetes Technology) recognise open-source AID systems as used by many people and advise health-care professionals to learn how they work so they can help patients optimise settings, and make automated insulin delivery the preferred insulin delivery method.',
				source: 'https://diabetesjournals.org/care/article/49/Supplement_1/S150/163922/7-Diabetes-Technology-Standards-of-Care-in',
				asOf: '2026'
			},
			{
				name: 'Tidepool',
				full: 'Non-profit, Tidepool Loop',
				stance: 'supportive',
				statement:
					'Tidepool Loop, an FDA-cleared interoperable automated insulin dosing app for people aged 6 and over, is a commercial descendant of the do-it-yourself Loop project, cleared by the FDA in January 2023 to work with compatible iCGMs and ACE pumps.',
				source: 'https://www.tidepool.org/tidepool-loop',
				asOf: '2023'
			}
		]
	},

	subsidies: [
		{
			id: 'commercial-insurance',
			name: 'Private commercial insurance',
			via: 'Employer and individual-market health plans',
			eligibility: 'Members of a plan that covers diabetes devices; coverage, deductibles and prior-authorisation rules vary by plan.',
			covers:
				'Pumps, CGMs and consumables. Whether a device is billed under the pharmacy benefit or as durable medical equipment (DME) determines the pharmacy or supplier channel, the copay and the prior-authorisation path. Omnipod and many CGMs are increasingly dispensed through the pharmacy benefit; tubed pumps are typically DME.',
			note: 'The pharmacy-benefit versus DME split is the single biggest driver of out-of-pocket cost and how a device is obtained.'
		},
		{
			id: 'medicare',
			name: 'Medicare',
			via: 'Federal program for people 65+ and some younger people with disabilities',
			eligibility: 'Medicare beneficiaries meeting the coverage criteria for therapeutic CGM and insulin pumps.',
			covers:
				'Insulin pumps and therapeutic CGMs under Part B as durable medical equipment; some supplies and insulins under Part D as a pharmacy benefit. The Part B DME versus Part D pharmacy split determines the supplier and cost-share.',
			link: 'https://www.medicare.gov/coverage/continuous-glucose-monitors'
		},
		{
			id: 'medicaid',
			name: 'Medicaid',
			via: 'State-administered programs (with federal funding)',
			eligibility: 'Low-income residents who qualify; criteria and covered devices vary by state.',
			covers: 'Pumps, CGMs and consumables, with coverage rules, preferred products and prior-authorisation set per state.',
			note: 'Because Medicaid is administered by each state, what is covered and how differs substantially across the country.',
			link: 'https://www.medicaid.gov/medicaid/benefits/prescription-drugs/index.html'
		},
		{
			id: 'manufacturer-assistance',
			name: 'Manufacturer copay and patient-assistance programs',
			via: 'Device manufacturers',
			eligibility: 'Varies by manufacturer and program; some are limited to commercially insured patients and exclude government payers.',
			covers:
				'Copay cards, savings programs and patient-assistance programs run by Insulet, Tandem, Medtronic, Dexcom and Abbott to reduce out-of-pocket cost. Terms differ by vendor and change over time.',
			note: 'Contact the manufacturer directly for current eligibility and terms.'
		}
	],

	groups: [
		{
			name: 'Loop Docs and Zulip',
			platform: 'Documentation / Zulip chat',
			blurb: 'The official Loop documentation, plus the Loop Zulip chat where users discuss issues directly with the developers.',
			link: 'https://loopkit.github.io/loopdocs/'
		},
		{
			name: 'Children with Diabetes',
			platform: 'US non-profit',
			blurb: 'Long-running US non-profit providing education and peer support for families managing type 1 diabetes, including looping and diabetes technology.',
			link: 'https://childrenwithdiabetes.com/'
		}
	]
};
