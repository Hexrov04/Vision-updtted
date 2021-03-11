/**
 * ###############################################################################################
 *  ____                                        _     _____              _             _
 * |  _ \  (_)  ___    ___    ___    _ __    __| |   |_   _| (_)   ___  | | __   ___  | |_   ___
 * | | | | | | / __|  / __|  / _ \  | '__|  / _` |     | |   | |  / __| | |/ /  / _ \ | __| / __|
 * | |_| | | | \__ \ | (__  | (_) | | |    | (_| |     | |   | | | (__  |   <  |  __/ | |_  \__ \
 * |____/  |_| |___/  \___|  \___/  |_|     \__,_|     |_|   |_|  \___| |_|\_\  \___|  \__| |___/
 *
 * ---------------------
 *      Quick Start
 * ---------------------

 *
 * 	> IMPORTANT: Also edit the TOKEN in 'user/.env'
 *
 * ---------------------
 *       Support
 * ---------------------

 *
 * ###############################################################################################
 */

module.exports = {
	prefix: '.',
	name: 'TicketBot',
	presences: [
		{
			activity: '%snew',
			type: 'PLAYING'
		},
		{
			activity: 'with tickets',
			type: 'PLAYING'
		},
		{
			activity: 'for new tickets',
			type: 'WATCHING'
		}
	],
	append_presence: ' | %shelp',
	colour: '#009999',
	err_colour: 'RED',
	cooldown: 3,
	guild: '', // ID of your guild (REQUIRED)
	staff_role: '', // ID of your Support Team role (REQUIRED)
	mod_log: '',


	tickets: {
		category: '', // ID of your tickets category (REQUIRED)
		send_img: false,
		ping: 'here',
		text: `Hello there, {{ tag }}!
		A member of staff will assist you shortly.
			`,
		pin: false,
		max: 3,
		default_topic: {
			command: 'No topic given',
			panel: 'Created via panel'
		}
	},

	commands: {
		close: {
			confirmation: true,
			send_transcripts: true
		},
		delete: {
			confirmation: true
		},
		new: {
			enabled: true
		},
		closeall: {
			enabled: true,
		},
	},

	transcripts: {
		text: {
			enabled: true,
			keep_for: 90,
		},
		web: {
			enabled: false,
			server: '',
		},
		channel: '' // ID of your archives channel
	},

	panel: {
		title: 'Support Tickets',
		description: 'Need help? No problem! React to this panel to create a new support ticket so our Support Team can assist you.',
		reaction: '🧾'
	},

	storage: {
		type: 'sqlite'
	},

	logs: {
		files: {
			enabled: true,
			keep_for: 7
		},
		discord: {
			enabled: false,
			channel: '' // ID of your log channel
		}
	},

	roles: {
		emoji: "✅ ",
		roleID: "",
		channelID: "",
		messageID: ""
	},

	debug: false,
	updater: true 
};
