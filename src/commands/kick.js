const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'kicks a user',
	usage: '[command]',
	aliases: ['command', 'commands'],
	example: 'kick v8',
	args: false,
	execute(client, message, args, log, { config }) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You can\'t use that.');
        const logChannel = client.guilds.cache.get(config.mod_log);

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);
        
        if(!target) return message.channel.send('Pick somebody');

        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot kick someone equal to or higher than yourself.');

        let reason = args.slice(1).join(' ') || 'Don\'t forget a reason.';

        const kickEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Kicked')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                {name: 'ID', value: target.id, inline: true},
                {name: 'Name', value: target.username, inline: true},
                {name: 'Moderator', value: message.member},
                {name: 'When', value: message.createdAt.toLocaleString(), inline: true},
                {name: 'Reason', value: reason}
            )

        mtarget.kick();
        message.channel.send(kickEmbed);
        client.channels.cache.get(logChannel).send(kickEmbed);
    }
}