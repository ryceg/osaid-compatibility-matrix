import type { Country } from '../types';

/**
 * Spain overlay. References catalog devices by ref ("deviceId" or
 * "deviceId:variantId") and layers on local availability, funding, official
 * stance and community. Compatibility itself is inherited from the catalog.
 *
 * Reviewed June 2026. Funding in Spain runs through the Sistema Nacional de
 * Salud (SNS): the Ministerio de Sanidad sets the common services portfolio
 * (cartera común de servicios) and the 17 comunidades autónomas administer and
 * roll it out, so coverage, eligibility and the pace of financing automated
 * systems vary by region rather than following one national scheme. The
 * subsidy entries describe that structure. Availability and funding move;
 * official-position statements are paraphrased from each body's published
 * material, confirm wording at the linked source before relying on it.
 *
 * Spain-specific traps encoded here: the FreeStyle Libre sensors sold in Spain
 * are the European direct-pairing build (referenced as the :eu variants), and
 * the Omnipod 5 pods are sensor-specific (a pod built for Dexcom is not the
 * same pod as the one built for FreeStyle Libre 2 Plus).
 *
 * Deliberately omitted because Spanish availability could not be verified at
 * review: the DANA pumps (the DANA family is reported as not marketed in Spain
 * and hard to obtain), Tandem Mobi, Accu-Chek Insight, Medtrum Nano, Diaconn
 * G8, EOPatch2, Equil and Medtronic Simplera Sync. Add them once a Spanish
 * retail or distribution channel is confirmed.
 */
export const es: Country = {
	code: 'ES',
	name: 'Spain',
	status: 'live',
	lastReviewed: 'June 2026',
	maintainer: 'Nocturne community',
	intro:
		'What is available to people in Spain who want to close the loop. The pumps, the sensors, the algorithms they run, the funding, and where the official bodies stand. Funding runs through the Sistema Nacional de Salud, with the comunidades autónomas administering it, so coverage and the rollout of financed systems vary by region. Maintained by the community and updated as the landscape moves.',

	listings: [
		// Pumps
		{ ref: 'omnipod-dash', availability: 'available', availabilityNote: 'Tubeless patch pump sold by Insulet in Spain. Funding for pumps is administered by each comunidad autónoma.', subsidy: ['sns-pump'] },
		{ ref: 'omnipod-5:g7', availability: 'available', availabilityNote: 'Pairs with the Dexcom G6 or G7. The pods are sensor-specific, so a Dexcom pod differs from the FreeStyle Libre 2 Plus pod.', subsidy: ['sns-pump'] },
		{ ref: 'omnipod-5:l2p', availability: 'available', availabilityNote: 'The version that integrates with the FreeStyle Libre 2 Plus sensor; Omnipod 5 also integrates the FreeStyle Libre 3 Plus.', subsidy: ['sns-pump'] },
		{ ref: 'tslim-x2:controliq', availability: 'available', availabilityNote: 'Distributed in Spain by Novalab (Air Liquide Healthcare) and runs Control-IQ with the Dexcom G6 or G7.', subsidy: ['sns-pump'] },
		{ ref: 'minimed-780g', availability: 'available', availabilityNote: 'Sold by Medtronic in Spain with the Guardian 4 sensor.', subsidy: ['sns-pump'] },
		{ ref: 'ypsopump', availability: 'available', availabilityNote: 'Runs mylife CamAPS FX (mylife Loop). Paired in Spain with the Dexcom G6 or FreeStyle Libre 3 Plus.', subsidy: ['sns-pump'] },
		{ ref: 'accu-chek-combo', availability: 'limited', availabilityNote: 'The Roche Accu-Chek Combo has been accessible through the public health system; check current supply with the distributor.', subsidy: ['sns-pump'] },
		{ ref: 'medtronic-paradigm:fw-old', availability: 'limited', availabilityNote: 'Out of warranty, second-hand units only.' },

		// Sensors
		{ ref: 'dexcom-g7', availability: 'available', availabilityNote: 'The current-generation Dexcom sensor, sold in Spain and used with several pumps.', subsidy: ['sns-cgm'] },
		{ ref: 'dexcom-g6', availability: 'limited', availabilityNote: 'Being phased out in favour of the Dexcom G7.', subsidy: ['sns-cgm'] },
		{ ref: 'dexcom-one-plus', availability: 'available', availabilityNote: 'A simplified real-time Dexcom CGM available in Spain.' },
		{ ref: 'libre2:eu', availability: 'available', availabilityNote: 'The European direct-pairing build of the FreeStyle Libre 2, financed by the SNS for type 1 diabetes.', subsidy: ['sns-cgm'] },
		{ ref: 'libre2-plus:eu', availability: 'available', availabilityNote: 'The European direct-pairing build of the FreeStyle Libre 2 Plus.', subsidy: ['sns-cgm'] },
		{ ref: 'libre3-plus', availability: 'available', availabilityNote: 'The FreeStyle Libre 3 Plus, used standalone and integrated with Omnipod 5 and mylife CamAPS FX.', subsidy: ['sns-cgm'] },
		{ ref: 'guardian-4', availability: 'available', availabilityNote: 'Used with the MiniMed 780G.', subsidy: ['sns-cgm'] }
	],

	officialPosition: {
		summary:
			'Open-source automated insulin delivery is not a CE-marked medical device in Spain, though the pump and sensor hardware is regulated and CE-marked. The bodies below regulate the hardware, finance it through the public system, or speak for clinicians and patients; none endorses do-it-yourself software, and the medical society notes DIY systems sit outside regulatory evaluation. Statements are paraphrased from each body, confirm current wording at the source.',
		bodies: [
			{
				name: 'AEMPS',
				full: 'Agencia Española de Medicamentos y Productos Sanitarios',
				stance: 'neutral',
				statement:
					'Insulin pumps and glucose sensors are regulated medical devices that must carry CE marking before sale; the AEMPS monitors the glucose-control device market and issues safety notices, for example a 2024 notice on a risk of insulin-delivery suspension in certain MiniMed 780G pumps. Open-source AID software is not a CE-marked device.',
				source: 'https://www.aemps.gob.es/informa/la-aemps-informa-de-un-riesgo-de-suspension-de-la-administracion-de-insulina-en-determinadas-bombas-minimed-780g/',
				asOf: '2024'
			},
			{
				name: 'Ministerio de Sanidad',
				full: 'Ministry of Health (SNS common services portfolio)',
				stance: 'neutral',
				statement:
					'The SNS finances glucose-monitoring sensors based on clinical eligibility rather than the algorithm or system a person uses: flash sensors for people with type 1 diabetes (children since 2018, extended to adults), and real-time CGM added to the common services portfolio for adults with type 1 diabetes in 2021, with the comunidades autónomas incorporating it.',
				source: 'https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=5450',
				asOf: '2021'
			},
			{
				name: 'SED',
				full: 'Sociedad Española de Diabetes',
				stance: 'cautious',
				statement:
					'Its Applied Technologies group published a 2025 guide to closed-loop systems focused on the commercial systems available in Spain and their clinical use, and also touches on non-commercial and in-development systems. Published material describes do-it-yourself systems as built by the patient community and not approved or evaluated by any regulatory agency.',
				source: 'https://www.sediabetes.org/publicaciones/publicaciones-sed/guia-de-uso-de-sistemas-de-asa-cerrada/',
				asOf: '2025'
			},
			{
				name: 'FEDE',
				full: 'Federación Española de Diabetes',
				stance: 'neutral',
				statement:
					'The patient federation, representing regional and local diabetes associations, advocates for equitable access to diabetes technology and treatments across Spain and works with regional health authorities to widen access to monitoring and automated systems.',
				source: 'https://fedesp.es/',
				asOf: '2025'
			}
		]
	},

	subsidies: [
		{
			id: 'sns-cgm',
			name: 'SNS glucose-monitoring coverage',
			via: 'Sistema Nacional de Salud (Ministerio de Sanidad + comunidades autónomas)',
			eligibility:
				'Set nationally and applied regionally. Flash glucose sensors for people with type 1 diabetes on intensive insulin therapy (children since 2018, adults from 2019); real-time CGM added to the common services portfolio for adults with type 1 diabetes in 2021. Comunidades autónomas implement and may widen the criteria.',
			covers: 'FreeStyle Libre flash sensors and real-time CGM sensors (Dexcom, Guardian).',
			note: 'Eligibility, age limits and which systems are offered vary by comunidad autónoma.',
			link: 'https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=5450'
		},
		{
			id: 'sns-pump',
			name: 'SNS pump and automated-system funding',
			via: 'Comunidades autónomas (regional health services)',
			eligibility:
				'Determined by each comunidad autónoma through its regional health service, on clinical indication. Several regions are expanding access to automated insulin infusion systems, for example Andalusia guaranteeing access for all children and pregnant women with type 1 diabetes from 2026.',
			covers: 'Insulin pumps and, increasingly, integrated pump-and-sensor automated insulin infusion systems, plus consumables.',
			note: 'Funding, eligibility and rollout differ by region.',
			link: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/todas-noticia/sanidad-garantiza-el-acceso-universal-sistemas-automatizados-de-infusion-de-insulina-desde-2026'
		}
	],

	groups: [
		{
			name: 'República Diabetes',
			platform: 'Website',
			blurb: 'A Spanish-language resource and community covering do-it-yourself artificial pancreas systems (Loop, OpenAPS, AndroidAPS) and the hardware they need.',
			link: 'https://republikadiabetes.com/como-hacer-tu-propio-pancreas-artificial/'
		},
		{
			name: 'Asociación Diabetes Madrid',
			platform: 'Spain',
			blurb: 'A FEDE member association that runs education and conferences on applied diabetes technology, including open-source and commercial automated insulin delivery.',
			link: 'https://diabetesmadrid.org/'
		},
		{
			name: 'Federación Española de Diabetes (FEDE)',
			platform: 'Spain',
			blurb: 'The national federation of regional and local diabetes associations, a route into local peer support and advocacy across Spain.',
			link: 'https://fedesp.es/'
		}
	]
};
