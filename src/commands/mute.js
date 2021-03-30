const Discord = require('discord.js');
const config = require('../../user/config')

module.exports = {
    name: 'mute',
    description: 'Mute a user.',
    aliases: ['m'],
    usage: '.mute <member> [reason]',
    category: 'mod',
    execute: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');
        const logChannel = client.guilds.cache.get(config.mod_log);

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);

        if(!target) return message.reply('Pick somebody.');

        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot mute someone equal to or higher than yourself.');

        let reason = args.slice(1).join(' ') || 'Don\'t forget a reason.';

        let muted = message.guild.roles.cache.find(r => r.name === 'Muted');

        if(!muted)  {
            try {
                muted = await message.guild.roles.create({
                    data: { 
                        name: 'Muted',
                        color: '#000000',
                        permissions: []
                    }
                })
                message.guild.channels.cache.forEach(channel => {
                    channel.createOverwrite(muted, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                })
            } catch(e) {
                console.log(e)
            }
        }

        let muteEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Mute')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setThumbnail(target.displayAvatarURL())
        .addFields(
            {name: 'Name', value: target.username, inline: true},
            {name: 'Moderator', value: message.member, inline: true},
            {name: 'When', value: message.createdAt.toLocaleString()},
            {name: 'Reason', value: reason},
        )

        mtarget.roles.add(muted.id);
        message.channel.send(muteEmbed);
        client.channels.cache.get(logChannel).send(muteEmbed);
    }
}