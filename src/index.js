



const version = Number(process.version.split('.')[0].replace('v', ''));
if (version < 12) return console.log('Please upgrade to Node v12 or higher');

const fs = require('fs');
const { join } = require('path');

let dev = fs.existsSync(join(__dirname, '../user/dev.env')) && fs.existsSync(join(__dirname, '../user/dev.config.js'));

require('dotenv').config({ path: join(__dirname, '../user/', dev ? 'dev.env' : '.env') });

module.exports.config = dev ? 'dev.config.js' : 'config.js';
const config = require(join(__dirname, '../user/', module.exports.config));

const Discord = require('discord.js');
const client = new Discord.Client({
	autoReconnect: true,
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member}!`);
  });

client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const utils = require('./modules/utils');
const leeks = require('leeks.js');

require('./modules/banner')(leeks); // big coloured text thing

const Logger = require('leekslazylogger');
const log = new Logger({
	name: config.name,
	logToFile: config.logs.files.enabled,
	maxAge: config.logs.files.keep_for,
	debug: config.debug
});

require('./modules/updater')(); // check for updates
/**
 * storage
 */
const { Sequelize, Model, DataTypes } = require('sequelize');

let sequelize;

switch (config.storage.type) {
case 'mysql':
	log.info('Connecting to MySQL database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mysql',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
case 'mariadb':
	log.info('Connecting to MariaDB database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mariadb',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
case 'postgre':
	log.info('Connecting to PostgreSQL database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'postgres',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
case 'microsoft':
	log.info('Connecting to Microsoft SQL Server database...');
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mssql',
		host: process.env.DB_HOST,
		logging: log.debug
	});
	break;
default:
	log.info('Using SQLite storage');
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: join(__dirname, '../user/storage.db'),
		logging: log.debug
	});
}

class Ticket extends Model {}
Ticket.init({
	channel: DataTypes.STRING,
	creator: DataTypes.STRING,
	open: DataTypes.BOOLEAN,
	topic: DataTypes.TEXT
}, {
	sequelize,
	modelName: 'ticket'
});

class Setting extends Model {}
Setting.init({
	key: DataTypes.STRING,
	value: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'setting'
});

Ticket.sync();
Setting.sync();

/**
 * event loader
 */
const events = fs.readdirSync(join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of events) {
	const event = require(`./events/${file}`);
	client.events.set(event.event, event);
	// client.on(event.event, e => client.events.get(event.event).execute(client, e, Ticket, Setting));
	client.on(event.event, (e1, e2) => client.events.get(event.event).execute(client, log, [e1, e2], {config, Ticket, Setting}));
	log.console(log.format(`> Loaded &7${event.event}&f event`));
}

/**
 * command loader
 */
const commands = fs.readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commands) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	log.console(log.format(`> Loaded &7${config.prefix}${command.name}&f command`));
}

log.info(`Loaded ${events.length} events and ${commands.length} commands`);

const one_day = 1000 * 60 * 60 * 24;
const txt = '../user/transcripts/text';
const clean = () => {
	const files = fs.readdirSync(join(__dirname, txt)).filter(file => file.endsWith('.txt'));
	let total = 0;
	for (const file of files) {
		let diff = (new Date() - new Date(fs.statSync(join(__dirname, txt, file)).mtime));
		if (Math.floor(diff / one_day) > config.transcripts.text.keep_for) {
			fs.unlinkSync(join(__dirname, txt, file));
			total++;
		}
	}
	if (total > 0) log.info(`Deleted ${total} old text ${utils.plural('transcript', total)}`);
};

if (config.transcripts.text.enabled) {
	clean();
	setInterval(clean, one_day);
}


process.on('unhandledRejection', error => {
	log.warn('An error was not caught');
	log.warn(`Uncaught ${error.name}: ${error.message}`);
	log.error(error);
});

const {Client, WebhookClient} = require('discord.js'), config2 = require('../user/config'), cooldown = new Set();
if(config2.roles.length === 0) {
    console.log(`You left the "roles" array empty in the config.js file... until you add roles to it.. the process will keep ending!`);
    return process.exit(1);
}
const Hook = async (hook, data) => {
    if(config2.logging.enabled === false) return null;
    if(!hook) return null;
    if(typeof hook !== "string") return null;
    if(!data) return null;
    if(typeof data !== "object") return null;
    let h = hook.replace(/https:\/\/(discord|discordapp).com\/api\/webhooks\//, '').split("/");
    if(!h[0]) return null;
    if(!h[1]) return null;
    let Hook = new WebhookClient(h[0], h[1]);
    if(!Hook) return null;
    if(data.status === "Success"){
    Hook.send({embeds: [
        {
            color: data.type == "Added" ? 0xFF000 : 0xFF0000,
            title: `Reaction Role Logs`,
            fields: [
                {name: "Action", value: data.type, inline: false},
                {name: `User`, value: `\`@${data.user.tag}\` (${data.user.id})`, inline: false},
                {name: `Reaction`, value: `${data.emoji}`, inline: true},
                {name: `Role`, value: `${data.role} \`@${data.role.name}\` (${data.role.id})`}
            ],
            author: {
                name: data.user.tag,
                icon_url: data.user.displayAvatarURL()
            },
            timestamp: Date.now
        }
    ]}).catch(() => {});
    }else
    if(data.status === "Failed"){
    Hook.send({embeds: [
        {
            color: 0xFF0000,
            title: `Reaction Role Logs`,
            description: data.reason,
            fields: [
                {
                    name: `INFO`,
                    value: `Failed ${data.type} role ${data.type === "added" ? "to" : "from"} ${data.user} (${data.user.id})`
                }
            ],
            author: {
                name: data.user.tag,
                icon_url: data.user.displayAvatarURL()
            },
            timestamp: Date.now
        }
    ]}).catch(() => {});
    }
}
class Reactions extends Client{
    constructor(){
        super({
            fetchAllMembers: false,
            disableEveryone: true,
            presence: {
                status: "dnd",
                activity: {
                    name: `${config2.roles.length} reaction roles`,
                    type: "WATCHING"
                }
            }
        });
        this.on('ready', () =>  console.log(`${this.user.tag} is now ready!`))
        this.on('shardReady', (id) => console.log(`Shard: ${id} is now ready!`))
        this.on('shardResume', (id, replayed) => console.log(`Shard: ${id} has resumed!`))
        this.on('shardReconnecting', (id) => console.log(`Shard: ${id} is now reconnecting!`))
        this.on('shardDisconnect', (event, id) => console.log(`Shard: ${id} has Disconnected!`))
        this.on('shardError', (error, id) => console.log(`Shard: ${id} Error: ${error.stack}`))
        this.on('raw', async (event) => {
            if(!event) return null;
            if(event.t === "MESSAGE_REACTION_ADD"){
            if(config2.roles.length === 0) return null;
            if(!Array.isArray(config2.roles)) return console.log(`config.roles isn't an array!`);
             for await (const data of config.roles){
                if(!data.emoji) return null;
                if(!data.channelID) return null;
                if(!data.roleID) return null;
                let guild = this.guilds.cache.get(event.d.guild_id);
                if(!guild) return null;
                let role = guild.roles.cache.get(data.roleID);
                if(!role) return null;
                let channel = guild.channels.cache.get(data.channelID);
                if(!channel) return null;
                if(channel.id !== event.d.channel_id) return null;
                let member = guild.members.cache.get(event.d.user_id);
                if(!member) return null;
                if(member.user.bot) return null;
                let msg = await channel.messages.fetch(data.messageID);
                if(!msg) return null;
                if(msg.id !== event.d.message_id) return null;
                if(event.d.emoji.name === data.emoji || event.d.emoji.id === data.emoji) {
                    await msg.reactions.cache.get(event.d.emoji.id ? event.d.emoji.id : event.d.emoji.name).users.remove(member.id);
                    if(cooldown.has(member.user.id)) return member.send({embed: {color: 0xFF0000, author: {name: guild.name, icon_url: guild.iconURL()}, title: `Woah there.. you're on a 10s cooldown!`}}).catch(() => {});
                    if(!cooldown.has(member.user.id)) cooldown.add(member.user.id);
                    setTimeout(() => cooldown.delete(member.user.id), 10000);
                    if(member.roles.cache.has(role.id)){
                        member.roles.remove(role.id).then(() => {
                            Hook(config2.logging.webhook, {
                                status: "Success",
                                user: member.user,
                                type: "Removed",
                                role: role,
                                emoji: event.d.emoji.id ? this.emojis.cache.get(event.d.emoji.id) : event.d.emoji
                            })
                        }).catch((error) => {
                            Hook(config2.logging.webhook, {
                                status: "Failed",
                                user: member.user,
                                reason: error.stack,
                                type: "remove"
                            })
                        })
                    }else{
                        member.roles.add(role.id).then(() => {
                            Hook(config2.logging.webhook, {
                                status: "Success",
                                user: member.user,
                                type: "Added",
                                role: role,
                                emoji: event.d.emoji.id ? this.emojis.cache.get(event.d.emoji.id) : event.d.emoji
                            })
                        }).catch(() => {
                            Hook(config2.logging.webhook, {
                                status: "Failed",
                                user: member.user,
                                reason: error.stack,
                                type: "added"
                            })
                        })
                    }
                }
             }   
            }
        })
    }
};
new Reactions()




client.login(process.env.TOKEN)
