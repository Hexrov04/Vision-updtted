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
	guild: '816365829812650005', // ID of your guild (REQUIRED)
	staff_role: '816366410745512037', // ID of your Support Team role (REQUIRED)


	tickets: {
		category: '816368366067515423', // ID of your tickets category (REQUIRED)
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
			server: 'https://cupiddevv.000webhostapp.com/transcripts',
		},
		channel: '816367394099560469' // ID of your archives channel
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
			channel: '816367345702404126' // ID of your log channel
		}
	},

	roles: {
		emoji: "✅ ",
		roleID: "816494310479495199",
		channelID: "819320296544403506",
		messageID: "819402637480951810"
	},

	debug: false,
	updater: false //work in progress
};
