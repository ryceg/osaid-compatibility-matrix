import type { CommunityGroup } from './types';

/**
 * Global communities, country-agnostic. Shown under every country's local
 * groups (the country overlay carries only its location-specific ones). Stated
 * once here so they don't drift between country files.
 */
export const globalGroups: CommunityGroup[] = [
	{
		name: 'Looped',
		platform: 'Facebook',
		size: '33k+ members',
		blurb: 'The original and largest do-it-yourself looping community, covering Loop, OpenAPS and AndroidAPS.',
		link: 'https://www.facebook.com/groups/TheLoopedGroup'
	},
	{
		name: 'Loop and Learn',
		platform: 'Website / Facebook / Discord',
		blurb: 'Volunteer-run group that helps people build and use the Loop and Trio do-it-yourself systems, with build help, live sessions, a Facebook group and a Discord server.',
		link: 'https://www.loopandlearn.org/'
	},
	{
		name: 'AndroidAPS Users',
		platform: 'Facebook',
		blurb: 'Global support group for AndroidAPS setup, pump pairing and troubleshooting.',
		link: 'https://www.facebook.com/groups/AndroidAPSUsers/'
	},
	{
		name: 'CGM in the Cloud',
		platform: 'Facebook',
		size: '39k+ members',
		blurb: 'Global Nightscout community for setting up and viewing CGM data in the cloud.',
		link: 'https://www.facebook.com/groups/cgminthecloud/'
	},
	{
		name: 'r/diabetes_t1',
		platform: 'Reddit',
		size: 'Global',
		blurb: 'Type 1 diabetes community covering glucose management, pumps, sensors and looping.',
		link: 'https://www.reddit.com/r/diabetes_t1/'
	}
];
