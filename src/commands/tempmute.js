const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'tempmute',
	description: 'temp mute a user',
	usage: '[@member]',
	aliases: ['tmute'],
	args: true,
	async execute(client, message, args, _log, { config, Ticket }) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');

        let target = message.mentions.users.first();
        let mtarget = message.guild.member(target);

        if(!target) return message.reply('Pick somebody.');
        
        if(mtarget.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot mute someone equal to or higher than yourself.');

        let reason = args.slice(2).join(' ') || 'Don\'t forget a reason.';

        let time = ms(args[1]);

        if(time > '2100000000') time = '2100000000';

        if(!time) return message.channel.send('How long?');
        if(isNaN(time)) return message.channel.send('Invalid time.');

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
        .setTitle('Temp mute')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setThumbnail(target.displayAvatarURL())
        .addFields(
            {name: 'Name', value: target.username, inline: true},
            {name: 'Moderator', value: message.member, inline: true},
            {name: 'When', value: message.createdAt.toLocaleString()},
            {name: 'Length', value: args[1], inline: true},
            {name: 'Reason', value: reason},
        )

        let unmuteEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Unmute')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setThumbnail(target.displayAvatarURL())
        .addFields(
            {name: 'Name', value: target.username, inline: true},
            {name: 'Moderator', value: message.author.username, inline: true},
            {name: 'When', value: message.createdAt.toLocaleString()},
            {name: 'Reason', value: 'Temp mute - ' + reason, inline: true},
        )

        mtarget.roles.add(muted.id);
        message.channel.send(muteEmbed);
        client.channels.cache.get('701905087122899054').send(muteEmbed);

        setTimeout(function(){
            try { 
                mtarget.roles.remove(muted.id);
                client.channels.cache.get('701905087122899054').send(unmuteEmbed);
            } catch (error) {
            }
        }, time);
    }
}