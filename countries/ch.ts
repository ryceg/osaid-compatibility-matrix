import type { Country } from '../types';

/**
 * Switzerland overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Funding in Switzerland runs through mandatory basic
 * health insurance (KVG / LAMal): pumps, CGM and consumables are reimbursed
 * when listed on the MiGeL (Mittel- und Gegenständeliste / Liste des moyens et
 * appareils, LiMA), maintained by the Federal Office of Public Health
 * (BAG / OFSP). The subsidy entries describe that structure rather than a
 * single device-by-device price. Availability and funding move; official
 * statements are paraphrased from each body's published material, confirm
 * wording at the linked source before relying on it.
 *
 * Switzerland-specific notes encoded here: the YpsoPump is made by Ypsomed in
 * Burgdorf, and its mylife CamAPS FX system ("mylife Loop") reached Switzerland
 * in May 2025 pairing with the FreeStyle Libre 3 Plus and the Dexcom G6, with
 * the Dexcom G7 due by summer 2026. The FreeStyle Libre sensors sold here are
 * the European direct-pairing build (the `:eu` variants). Roche Diabetes Care
 * is based in Basel, so the Accu-Chek Insight is a local product.
 *
 * Deliberately omitted because Swiss availability could not be verified at
 * review: the DANA pumps (DANA-i / DANA RS / DANA-R), the Tandem Mobi, Medtrum
 * Nano, Diaconn G8, EOPatch2, Equil, the Omnipod Eros, the Accu-Chek Combo,
 * Dexcom ONE+ and Medtronic Simplera Sync. Several are CE-marked and so legally
 * placeable on the Swiss market, but a confirmed Swiss retail or distribution
 * channel was not found; add them once one is confirmed.
 */
export const ch: Country = {
	code: 'CH',
	name: 'Switzerland',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to people in Switzerland who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Switzerland is home to Ypsomed, maker of the YpsoPump, and to Roche Diabetes Care in Basel, so several of these devices are local products. Funding runs through mandatory basic health insurance, with devices reimbursed once they are listed on the MiGeL / LiMA. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Made by Ypsomed in Burgdorf. Runs mylife CamAPS FX ("mylife Loop"), which reached Switzerland in May 2025 pairing with the FreeStyle Libre 3 Plus and the Dexcom G6; the Dexcom G7 is due by summer 2026.', subsidy: ['migel-pump'] },
		{ ref: 'tslim-x2:controliq', availability: 'available', availabilityNote: 'Runs Control-IQ with the Dexcom G6 or G7.', subsidy: ['migel-pump'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Sold by Medtronic with the Guardian 4 sensor, running the SmartGuard algorithm.', subsidy: ['migel-pump'] },
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'Tubeless patch pump controlled by its handset, supplied through Swiss diabetes channels.', subsidy: ['migel-pump'] },
		{ ref: 'omnipod-5', availability: 'available', availabilityNote: 'Launched in Switzerland from spring 2025 with FreeStyle Libre 2 Plus, Dexcom G6 and Dexcom G7 versions — you choose the sensor pairing.', subsidy: ['migel-pump'] },
		{ ref: 'accu-chek-insight', availability: 'available', availabilityNote: 'From Roche Diabetes Care in Basel. Also offered as a hybrid closed loop paired with the Diabeloop DBLG1 algorithm.', subsidy: ['migel-pump'] },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'The current Dexcom sensor in Switzerland, used standalone and with compatible pumps.', subsidy: ['migel-cgm'] },
		{ ref: 'dexcom-g6', availability: 'limited', availabilityNote: 'Being phased out in favour of the Dexcom G7. Still the paired sensor for mylife CamAPS FX until the G7 integration arrives.', subsidy: ['migel-cgm'] },
		{ ref: 'libre2:eu', availability: 'available', availabilityNote: 'The European direct-pairing build of the 14-day FreeStyle Libre 2.', subsidy: ['migel-cgm'] },
		{ ref: 'libre2-plus:eu', availability: 'available', availabilityNote: 'The European direct-pairing build of the 15-day FreeStyle Libre 2 Plus.', subsidy: ['migel-cgm'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Single-piece 15-day sensor. The paired CGM for mylife CamAPS FX in Switzerland.', subsidy: ['migel-cgm'] },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Used with the MiniMed 780G.', subsidy: ['migel-cgm'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not placed on the Swiss market as a regulated medical device, though the pump and sensor hardware is CE-marked and sold here. Switzerland has no pre-market device approval; Swissmedic supervises the market and the BAG / OFSP decides reimbursement through the MiGeL. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'Swissmedic',
				full: 'Swiss Agency for Therapeutic Products',
				stance: 'neutral',
				statement:
					'Medical devices are not authorised by Swissmedic; manufacturers self-certify conformity (with a notified body for higher risk classes) and CE-mark the device, after which Swissmedic supervises the market and handles vigilance. Open-source AID software is not placed on the market this way, so it sits outside that framework while the pumps and sensors it drives remain regulated devices.',
				source: 'https://www.swissmedic.ch/swissmedic/en/home/medical-devices/regulation-of-medical-devices/faq.html',
				asOf: '2025'
			},
			{
				name: 'BAG / OFSP',
				full: 'Federal Office of Public Health',
				stance: 'neutral',
				statement:
					'Reimbursement under mandatory basic insurance is governed by the MiGeL (Mittel- und Gegenständeliste / Liste des moyens et appareils), which lists insulin pumps, CGM and consumables with their cost ceilings and conditions. Coverage follows the listed product and clinical eligibility, not the algorithm or system a person runs on it.',
				source: 'https://www.bag.admin.ch/de/mittel-und-gegenstaendeliste-migel',
				asOf: '2026'
			},
			{
				name: 'SGED / SSED',
				full: 'Swiss Society for Endocrinology and Diabetology',
				stance: 'neutral',
				statement:
					'The 2025 Swiss Diabetes and Technology Recommendations review automated insulin delivery as standard of care for type 1 diabetes and cite real-world evidence covering both commercial and open-source automated insulin dosing systems, while the formal recommendations centre on regulated commercial systems.',
				source: 'https://smw.ch/index.php/smw/article/view/4632',
				asOf: '2025'
			}
		]
	},

	subsidies: [
		{
			id: 'migel-pump',
			name: 'Insulin pump reimbursement',
			via: 'Mandatory basic health insurance (KVG / LAMal), via the MiGeL',
			eligibility:
				'People with diabetes whose treatment meets the clinical conditions set out in the MiGeL listing, on prescription.',
			covers:
				'The insulin pump as a flat rate (including replacement and servicing), plus accessories and consumables such as infusion sets and reservoirs, up to the ceilings fixed in the MiGeL.',
			note: 'Basic insurance reimburses after the annual deductible (Franchise / franchise) and the retained-share co-payment (Selbstbehalt / quote-part); these cost-sharing amounts are the patient’s.',
			link: 'https://www.bag.admin.ch/de/mittel-und-gegenstaendeliste-migel'
		},
		{
			id: 'migel-cgm',
			name: 'CGM reimbursement',
			via: 'Mandatory basic health insurance (KVG / LAMal), via the MiGeL',
			eligibility:
				'People on intensive insulin therapy who meet the clinical conditions in the relevant MiGeL position, on prescription.',
			covers:
				'Continuous and flash glucose monitoring sensors, transmitters and readers, reimbursed up to the amounts and quantities listed in the MiGeL.',
			note: 'As with pumps, the annual deductible and retained-share co-payment apply before insurance pays.',
			link: 'https://www.bag.admin.ch/de/mittel-und-gegenstaendeliste-migel'
		},
		{
			id: 'supplementary',
			name: 'Supplementary and disability insurance',
			via: 'Voluntary supplementary insurance and, for minors, invalidity insurance (IV / AI)',
			eligibility:
				'Holders of a supplementary policy that covers diabetes aids, or children and young people eligible under invalidity insurance.',
			covers:
				'Gaps left by basic insurance, and devices or quantities beyond the MiGeL ceilings, depending on the policy or IV / AI entitlement.',
			note: 'Terms differ by insurer and by case; confirm coverage with the insurer before purchase.'
		}
	],

	groups: [
		{
			name: 'diabetesschweiz / diabètesuisse',
			platform: 'Website',
			blurb: 'The national umbrella association, federating regional diabetes societies across the German-, French- and Italian-speaking regions, with information, advice and a member magazine in all three languages.',
			link: 'https://www.diabetesschweiz.ch/'
		},
		{
			name: 'diabètevaud',
			platform: 'Website',
			blurb: 'Regional diabetes association for French-speaking Vaud, offering information, advice, consultations and peer support, and a member of diabètesuisse.',
			link: 'https://www.diabetevaud.ch/'
		},
		{
			name: 'Open Source Looper Community',
			platform: 'Website',
			blurb: 'German-speaking community for open-source looping (Loop, AndroidAPS, Trio) and Nightscout, with support and local meet-ups relevant to German-speaking Switzerland.',
			link: 'https://de.loopercommunity.org/'
		},
		{
			name: 'Looped-DE',
			platform: 'Facebook',
			blurb: 'German-language peer support for people using or learning do-it-yourself closed-loop systems.',
			link: 'https://www.facebook.com/groups/loopedDE/'
		}
	]
};
