import type { Country } from '../types';

/**
 * France overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Reimbursement runs through l'Assurance Maladie via the
 * LPPR (Liste des Produits et Prestations Remboursables); device and sensor
 * listings appear in the Journal Officiel as arrêtés, so the subsidy entries
 * cite those. Availability and funding move; official-position statements are
 * paraphrased from each body's published material, confirm wording at the
 * linked source before relying on it.
 *
 * France-specific traps encoded here: the FreeStyle Libre sensors are the
 * European direct-pairing build (the `:eu` variants), so they pair to the iOS
 * apps directly rather than being read through Juggluco. The t:slim X2 runs
 * Control-IQ (reimbursed with Dexcom G6 since 2022 and with Dexcom G7 since
 * February 2026). Omnipod 5 is reimbursed with the Dexcom G6 (May 2024) and the
 * FreeStyle Libre 2 Plus (effective November 2025). The YpsoPump's mylife
 * CamAPS FX pairs with the Dexcom G6 or the FreeStyle Libre 3.
 *
 * Worth noting for context but out of scope: France is the home of Diabeloop,
 * whose DBLG1 hybrid closed-loop is a CE-marked, reimbursed commercial system.
 * Its pump partners include the SOOIL DANA-i and the Roche Accu-Chek Insight,
 * which is why those two pumps have a French footprint at all. This matrix is
 * about open-source loop, not the Diabeloop product.
 *
 * Deliberately omitted because a French retail or DIY channel could not be
 * verified at review: DANA RS / DANA-R, Tandem Mobi, Medtrum Nano, Diaconn G8,
 * EOPatch2, Equil, the Omnipod Eros and the Dexcom ONE+. Several exist in
 * Europe but were not confirmed as separately sold or loopable in France; add
 * them once a channel is confirmed.
 */
export const fr: Country = {
	code: 'FR',
	name: 'France',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to people in France who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Reimbursement runs through l’Assurance Maladie and the LPPR, and France is unusual in that its regulator has published an explicit warning against do-it-yourself systems while its commercial closed-loop options, including the home-grown Diabeloop, are reimbursed. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'Tubeless patch pump without an integrated CGM, supplied by Insulet. It is not an automated insulin delivery system on its own.', subsidy: ['lppr-pump'] },
		{ ref: 'omnipod-5:g6', availability: 'available', availabilityNote: 'Reimbursed with the Dexcom G6 since May 2024, in SmartAdjust closed-loop mode.', subsidy: ['lppr-aid'] },
		{ ref: 'omnipod-5:l2p', availability: 'available', availabilityNote: 'Reimbursement with the FreeStyle Libre 2 Plus took effect in November 2025, with the same indications as the Dexcom G6 pairing.', subsidy: ['lppr-aid'] },
		{ ref: 'tslim-x2:controliq', availability: 'available', availabilityNote: 'Runs Control-IQ. Reimbursed with the Dexcom G6 since 2022; reimbursement with the Dexcom G7 was added by an arrêté of February 2026.', subsidy: ['lppr-aid'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Runs SmartGuard. Reimbursed with the Guardian 4 sensor since November 2022, and with the Simplera Sync sensor from an arrêté of April 2026.', subsidy: ['lppr-aid'] },
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Runs mylife CamAPS FX (the Cambridge algorithm). Reimbursed with the Dexcom G6 since October 2023, and with the FreeStyle Libre 3 from February 2025.', subsidy: ['lppr-aid'] },
		{ ref: 'dana-i', availability: 'limited', availabilityNote: 'Present in France chiefly as a pump partner for the Diabeloop DBLG1 commercial closed-loop, rather than through an independent retail channel for open-source use.' },
		{ ref: 'accu-chek-insight', availability: 'limited', availabilityNote: 'Standalone sale by Roche ended in 2023, though existing users are supported. It also serves as a pump partner for the Diabeloop DBLG1 system.' },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-g6', availability: 'available', availabilityNote: 'Reimbursed through the LPPR. Supplied on prescription rather than freely on pharmacy shelves.', subsidy: ['lppr-cgm'] },
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'CE marked since 2022 and reimbursed; pairs with the t:slim X2 Control-IQ in France from February 2026.', subsidy: ['lppr-cgm'] },
		{ ref: 'libre2-plus:eu', availability: 'available', availabilityNote: 'European direct-pairing build. Reimbursed through the LPPR and used with Omnipod 5 from November 2025.', subsidy: ['lppr-cgm'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'Reimbursed through the LPPR. With the mylife CamAPS FX system, the FreeStyle Libre 3 is reimbursable only when coupled to that pump.', subsidy: ['lppr-cgm'] },
		{ ref: 'libre2:eu', availability: 'limited', availabilityNote: 'European direct-pairing build, being withdrawn from the French market in favour of the FreeStyle Libre 2 Plus.' },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Reimbursed for use with the MiniMed 780G.', subsidy: ['lppr-cgm'] },
		{ ref: 'simplera-sync', availability: 'available', availabilityNote: 'Disposable all-in-one sensor for the MiniMed 780G, listed on the LPPR by an arrêté of April 2026.', subsidy: ['lppr-cgm'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not a CE-marked medical device in France, and the regulator has gone further than most by publishing an explicit warning against do-it-yourself systems. The pump and sensor hardware is regulated and reimbursed separately, and CE-marked commercial closed-loop systems, including the French Diabeloop DBLG1, are reimbursed. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'ANSM',
				full: 'Agence nationale de sécurité du médicament et des produits de santé',
				stance: 'opposed',
				statement:
					'A 2020 point d’information warns people with diabetes against do-it-yourself closed-loop systems found online, noting that no such system carries CE marking and that there is no guarantee of their safety. It points patients towards CE-marked, regulated closed-loop systems instead.',
				source: 'https://archive.ansm.sante.fr/afssaps/S-informer/Points-d-information-Points-d-information/Diabete-prudence-avec-les-applications-permettant-de-creer-soi-meme-un-systeme-de-delivrance-automatisee-d-insuline-Point-d-information',
				asOf: '2020'
			},
			{
				name: 'HAS',
				full: 'Haute Autorité de Santé',
				stance: 'neutral',
				statement:
					'Assesses commercial closed-loop systems for reimbursement through its CNEDiMTS commission, which has recommended listing systems such as Control-IQ with the Dexcom G7 on the LPPR. Its evaluations cover CE-marked commercial devices, not do-it-yourself software.',
				source: 'https://www.has-sante.fr/upload/docs/evamed/CNEDIMTS-7717_CONTROL_IQ_DEXCOM_G7_01%20juillet%202025_7717_avis.pdf',
				asOf: '2025'
			},
			{
				name: 'Fédération Française des Diabétiques',
				full: 'National patient body',
				stance: 'cautious',
				statement:
					'The patient federation relayed the ANSM warning on do-it-yourself systems and campaigns for broader access to reimbursed commercial closed-loop systems. It tracks LPPR reimbursement decisions for patients rather than endorsing open-source loop.',
				source: 'https://www.federationdesdiabetiques.org/federation/actualites/le-systeme-de-boucle-semi-fermee-omnipod-5-rembourse-avec-le-freestyle-libre-2-plus',
				asOf: '2025'
			}
		]
	},

	subsidies: [
		{
			id: 'lppr-aid',
			name: 'Commercial closed-loop reimbursement',
			via: 'Assurance Maladie (LPPR)',
			eligibility:
				'Type 1 diabetes, with eligibility criteria set per system, typically an unmet glycaemic target (often HbA1c ≥ 8%) despite intensive insulin therapy on a pump for at least six months. Age thresholds vary by system, from 2 years for mylife CamAPS FX upward.',
			covers:
				'CE-marked hybrid closed-loop systems listed on the LPPR — the pump, the algorithm and the paired CGM as a bundle. Listed systems include Omnipod 5, t:slim X2 Control-IQ, MiniMed 780G, mylife CamAPS FX and the French Diabeloop DBLG1.',
			note: 'Each system is listed by its own arrêté in the Journal Officiel, which fixes the sensor pairing and the indications. Long-term diabetes (ALD 30) status removes the patient co-payment for related care.',
			link: 'https://www.federationdesdiabetiques.org/information/traitement-diabete/dispositif-dblg1-de-diabeloop'
		},
		{
			id: 'lppr-cgm',
			name: 'CGM reimbursement',
			via: 'Assurance Maladie (LPPR)',
			eligibility:
				'People with diabetes on intensive insulin therapy, with conditions set per sensor; flash and real-time CGM are reimbursed from age 2 for eligible patients.',
			covers:
				'Continuous and flash glucose sensors listed on the LPPR, including the FreeStyle Libre family, Dexcom G6 and G7, Guardian 4 and Simplera Sync. Some sensors are reimbursable only when paired with a specific pump system.',
			note: 'Under long-term diabetes (ALD 30) status the patient share is covered at 100%.',
			link: 'https://www.federationdesdiabetiques.org/federation/actualites/freestyle-libre-2-c-est-officiel-le-dispositif-bientot-pris-en-charge'
		},
		{
			id: 'lppr-pump',
			name: 'Insulin pump and consumables',
			via: 'Assurance Maladie (LPPR)',
			eligibility:
				'People with diabetes for whom continuous subcutaneous insulin infusion is prescribed, through a prestataire (home care provider) that manages the pump and supplies.',
			covers:
				'Standalone insulin pumps and their consumables (reservoirs, infusion sets, or pods for patch pumps) listed on the LPPR, supplied through a forfait paid to the provider.',
			note: 'Under long-term diabetes (ALD 30) status the patient share is covered at 100%.',
			link: 'https://www.ameli.fr/assure/remboursements/rembourse/dispositifs-medicaux'
		},
		{
			id: 'ald',
			name: 'Affection de longue durée (ALD 30)',
			via: 'Assurance Maladie',
			eligibility: 'People recognised with type 1 or insulin-treated diabetes as a long-term condition (ALD 30).',
			covers:
				'Removes the patient co-payment (ticket modérateur) for care related to the diabetes, so eligible pumps, sensors and consumables on the LPPR are reimbursed at 100% of the regulated tariff.',
			note: 'A complementary health insurance (mutuelle) can cover any remaining gap above the regulated tariff.',
			link: 'https://www.ameli.fr/assure/remboursements/rembourse/affections-longue-duree-hospitalisations/affection-longue-duree-ald'
		}
	],

	groups: [
		{
			name: 'Looped France',
			platform: 'Facebook',
			size: '~1,000 members',
			blurb: 'French-language peer support for people building and running do-it-yourself closed-loop systems such as Loop and AndroidAPS.',
			link: 'https://www.facebook.com/groups/loopedfrance/'
		},
		{
			name: 'Fédération Française des Diabétiques',
			platform: 'France',
			blurb: 'The national patient federation, a network of local associations offering information, advocacy and peer support across France.',
			link: 'https://www.federationdesdiabetiques.org/'
		}
	]
};
