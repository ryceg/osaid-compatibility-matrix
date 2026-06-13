import type { Device } from '../types';

// Authoritative open-source project docs, reused as per-pairing citations.
const LOOP_CGM = 'https://loopkit.github.io/loopdocs/build/cgm/';
const LOOP_CGM_FAQ = 'https://loopkit.github.io/loopdocs/faqs/cgm-faqs/';
const TRIO_CGM = 'https://triodocs.org/install/build/requirements/devices/cgm/';
const AAPS_CGM = 'https://androidaps.readthedocs.io/en/latest/Getting-Started/CompatiblesCgms.html';
const AAPS_G7 = 'https://androidaps.readthedocs.io/en/latest/CompatibleCgms/DexcomG7.html';
const AAPS_LIBRE2 = 'https://androidaps.readthedocs.io/en/latest/CompatibleCgms/Libre2.html';
const AAPS_LIBRE3 = 'https://androidaps.readthedocs.io/en/latest/CompatibleCgms/Libre3.html';

/**
 * Global CGM catalog. As with pumps, open-source support is a software fact
 * stated once here. The Libre family carries a regional split: the European
 * build can pair directly to the iOS apps, while the build sold in Australia
 * is read on Android through Juggluco. That difference is modelled as a
 * variant, not a duplicated device.
 */
export const sensors = [
	{
		id: 'dexcom-g6',
		kind: 'sensor',
		name: 'Dexcom G6',
		maker: 'Dexcom',
		blurb:
			'A real-time continuous glucose monitor worn for up to 10 days that pairs a disposable sensor with a separate reusable Bluetooth transmitter. It is factory calibrated, warms up in 2 hours, and reports a glucose value every 5 minutes.',
		specs: { Calibration: 'Factory', Wear: '10 days', Connectivity: 'Bluetooth LE', Warmup: '2 hours' },
		compat: {
			loop: { status: 'yes', note: 'Native, reads the transmitter directly.', link: LOOP_CGM },
			trio: { status: 'yes', note: 'Native, enter the transmitter ID.', link: TRIO_CGM },
			aaps: { status: 'yes', note: 'Via BYODA or xDrip+.', link: AAPS_CGM }
		},
		sources: [
			{ label: 'Dexcom Australia, subsidised G6', url: 'https://au.provider.dexcom.com/dexcom-cgm/how-access-subsidised-dexcom-g6-cgm' }
		]
	},
	{
		id: 'dexcom-g7',
		kind: 'sensor',
		name: 'Dexcom G7',
		maker: 'Dexcom',
		blurb:
			'A real-time continuous glucose monitor with a single-piece disposable sensor and integrated transmitter, worn for up to 10 days. It is factory calibrated, warms up in 30 minutes, and reports a glucose value every 5 minutes over Bluetooth.',
		specs: { Calibration: 'Factory', Wear: '10 days', Connectivity: 'Bluetooth LE', Warmup: '30 minutes' },
		compat: {
			loop: { status: 'yes', note: 'Native, reads from the Dexcom G7 app on the same phone.', link: LOOP_CGM_FAQ },
			trio: { status: 'yes', note: 'Native, reads from the Dexcom G7 app on the same phone.', link: TRIO_CGM },
			aaps: { status: 'yes', note: 'Via BYODA, xDrip+ or Juggluco.', link: AAPS_G7 }
		},
		sources: [
			{ label: 'NDSS, Dexcom G7 subsidised March 2025', url: 'https://www.ndss.com.au/news/dexcom-g7-subsidised-ndss-march-2025/' }
		]
	},
	{
		id: 'dexcom-one-plus',
		kind: 'sensor',
		name: 'Dexcom ONE+',
		maker: 'Dexcom',
		blurb:
			'A real-time continuous glucose monitor with a single-piece disposable sensor and integrated transmitter, worn for up to 10 days. It is factory calibrated, warms up in 30 minutes, and streams readings every 5 minutes over Bluetooth.',
		specs: { Calibration: 'Factory', Wear: '10 days', Connectivity: 'Bluetooth LE', Warmup: '30 minutes' },
		compat: {
			loop: { status: 'yes', note: 'Handled like a Dexcom G7 class sensor.', link: LOOP_CGM },
			trio: { status: 'yes', note: 'Reads from the Dexcom ONE app on the same phone.', link: TRIO_CGM },
			aaps: { status: 'yes', note: 'Via xDrip+ or Juggluco.', link: AAPS_G7 }
		},
		sources: [
			{ label: 'Dexcom ONE+ launches in Australia', url: 'https://www.dexcom.com/en-au/news/dexcom-oneplus-launches-in-australia' }
		]
	},
	{
		id: 'libre2',
		kind: 'sensor',
		name: 'Libre 2',
		maker: 'Abbott',
		blurb:
			'A factory-calibrated glucose sensor worn on the upper arm for 14 days. It streams readings over Bluetooth Low Energy with optional high and low alarms, warms up in 60 minutes, and can also be read by NFC scan.',
		specs: { Calibration: 'Factory', Wear: '14 days', Connectivity: 'Bluetooth LE + NFC', Warmup: '60 minutes' },
		// Family default = the build sold in Australia. The European build is a variant below.
		compat: {
			loop: { status: 'no', note: 'Direct pairing is for the European build only.', link: LOOP_CGM },
			trio: { status: 'no', note: 'Libre 2 Direct pairing is for the European build only.', link: TRIO_CGM },
			aaps: { status: 'yes', note: 'Via Juggluco. xDrip+ direct BLE is for the European build only.', link: AAPS_LIBRE2 }
		},
		variants: [
			{
				id: 'eu',
				name: 'European build',
				compat: {
					loop: { status: 'yes', note: 'Via the built-in LibreTransmitter.', link: LOOP_CGM },
					trio: { status: 'yes', note: 'Via Libre 2 Direct pairing.', link: TRIO_CGM },
					aaps: { status: 'yes', note: 'Via xDrip+ direct BLE, or Juggluco.', link: AAPS_LIBRE2 }
				}
			}
		],
		sources: [
			{ label: 'NDSS, Libre 2 delisted from 1 July 2026', url: 'https://www.ndss.com.au/news/freestyle-libre-2-sensor-delisted-from-ndss/' },
			{ label: 'AndroidAPS, FreeStyle Libre 2 and 2+', url: AAPS_LIBRE2 }
		]
	},
	{
		id: 'libre2-plus',
		kind: 'sensor',
		name: 'Libre 2 Plus',
		maker: 'Abbott',
		blurb:
			'A factory-calibrated glucose sensor worn on the upper arm for 15 days. It streams a reading each minute over Bluetooth Low Energy with optional high and low alarms, warms up in 60 minutes, and can also be read by NFC scan.',
		specs: { Calibration: 'Factory', Wear: '15 days', Connectivity: 'Bluetooth LE + NFC', Warmup: '60 minutes' },
		compat: {
			loop: { status: 'no', note: 'Direct pairing is for the European build only.', link: LOOP_CGM },
			trio: { status: 'no', note: 'Libre 2 Direct pairing is for the European build only.', link: TRIO_CGM },
			aaps: { status: 'yes', note: 'Via Juggluco.', link: AAPS_LIBRE2 }
		},
		variants: [
			{
				id: 'eu',
				name: 'European build',
				compat: {
					loop: { status: 'yes', note: 'Via LibreTransmitter, Loop 3.4.3 and later.', link: LOOP_CGM },
					trio: { status: 'yes', note: 'Via Libre 2 Direct pairing.', link: TRIO_CGM },
					aaps: { status: 'yes', note: 'Via xDrip+ direct BLE, or Juggluco.', link: AAPS_LIBRE2 }
				}
			}
		],
		sources: [
			{ label: 'NDSS, Libre 2 Plus subsidised April 2025', url: 'https://www.ndss.com.au/news/freestyle-libre-2-plus-subsidised-ndss/' }
		]
	},
	{
		id: 'libre3-plus',
		kind: 'sensor',
		name: 'Libre 3 Plus',
		maker: 'Abbott',
		blurb:
			'A factory-calibrated, single-piece glucose sensor worn on the upper arm for 15 days. It streams a reading each minute over Bluetooth Low Energy, warms up in 60 minutes, and needs no fingerstick or code entry.',
		specs: { Calibration: 'Factory', Wear: '15 days', Connectivity: 'Bluetooth LE', Warmup: '60 minutes' },
		compat: {
			loop: { status: 'partial', note: 'Through LibreLinkUp, no on-phone direct route.', link: LOOP_CGM_FAQ },
			trio: { status: 'partial', note: 'Through LibreLinkUp, needs a constant internet connection.', link: TRIO_CGM },
			aaps: { status: 'yes', note: 'Via Juggluco feeding xDrip+.', link: AAPS_LIBRE3 }
		},
		sources: [
			{ label: 'NDSS, Libre 3 Plus subsidised December 2025', url: 'https://www.ndss.com.au/news/freestyle-libre-3-plus-subsidised-ndss-december-2025/' },
			{ label: 'FreeStyle Libre 3 Plus (AU)', url: 'https://www.freestylelibre.com.au/freestyle-libre-3-plus' }
		]
	},
	{
		id: 'guardian-4',
		kind: 'sensor',
		name: 'Guardian 4',
		maker: 'Medtronic',
		blurb:
			'A real-time continuous glucose monitor worn for 7 days that pairs a disposable sensor with a reusable Bluetooth transmitter. It is factory calibrated, warms up in 2 hours, and reports readings every 5 minutes to the MiniMed 780G.',
		specs: { Calibration: 'Factory', Wear: '7 days', Connectivity: 'Bluetooth LE', Warmup: '2 hours' },
		compat: {
			loop: { status: 'no', note: 'Closed system.', link: LOOP_CGM },
			trio: { status: 'no', note: 'Closed system.', link: TRIO_CGM },
			aaps: { status: 'no', note: 'Not accessible to DIY systems.', link: AAPS_CGM }
		},
		sources: [{ label: 'Medtronic Australia, NDSS', url: 'https://www.medtronic-diabetes.com.au/ndss' }]
	},
	{
		id: 'simplera-sync',
		kind: 'sensor',
		name: 'Simplera Sync',
		maker: 'Medtronic',
		blurb:
			'A real-time, disposable all-in-one continuous glucose monitor worn for 7 days. It is factory calibrated, warms up in 2 hours, uses a two-step insertion, and reports readings every 5 minutes to the MiniMed 780G.',
		specs: { Calibration: 'Factory', Wear: '7 days', Connectivity: 'Bluetooth LE', Warmup: '2 hours' },
		compat: {
			loop: { status: 'no', note: 'Closed system.', link: LOOP_CGM },
			trio: { status: 'no', note: 'Closed system.', link: TRIO_CGM },
			aaps: { status: 'no', note: 'Not accessible to DIY systems.', link: AAPS_CGM }
		},
		sources: [
			{
				label: 'Medtronic, Simplera Sync FDA approval',
				url: 'https://news.medtronic.com/2025-04-18-New-Simplera-Sync-TM-sensor-for-the-MiniMed-TM-780G-System-now-FDA-approved'
			}
		]
	}
] as const satisfies readonly Device[];
