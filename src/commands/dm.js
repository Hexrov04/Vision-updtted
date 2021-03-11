const Discord = require('discord.js')


module.exports = {
	name: 'dm',
	description: 'dm a user',
	usage: '<@member>',
	aliases: ['none'],
	example: '.dm v8.',
	args: true,
    async execute(client, message, _args, log, { config, Ticket }) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You do not have the following permission(s) `\ MANAGE_MEMBER\`")
        let user = message.mentions.members.first() || message.guild.members.cache.get(_args[0])
        if(!user) return message.channel.send('You did not mention a user, or gave an invaild id.')
        if(!_args.slice(1).join(" ")) return message.channel.send("You did not specify your message.")
        let dMessage = _args.join(' ').slice(22);
        
        
        let dUser =
        message.guild.member(message.mentions.users.first())
        const dm = new Discord.MessageEmbed()
        //mmessage in channel
        .setTitle("**DM**")
            .setDescription(`Sent ${dUser} that consists of: \n **${dMessage}!**`)
            .addField('Status','Sent')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter('Sent to `\ logs\`')
            .setColor("#ff0000")

            //message sent to dms
            const dmMessage = new Discord.MessageEmbed()
            .setTitle("**__DM__**")
            .setDescription(`Message from ${message.author} that consists of: \n **${dMessage}**`)
            .addField('Status','received')
            .addField('Note:', 'we cannot see reply\'s')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter(`Vision`)
            .setColor("#ff0000")
            
            //dm sent to log channel
            const logDM = new Discord.MessageEmbed()
            .setTitle("**DM**")
            .setDescription(`Sent ${dUser} that consists of: \n **${dMessage}**!`)
            .addField('Status','Sent')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter('This is not the original message. That message was deleted and replaced with this one. ')
            
            .setColor("#ff0000")
        user.user.send(dmMessage).then(() => message.channel.send(dm).then(message.channel.bulkDelete(1).then(message => {
            setTimeout(function(){
                message.delete()
            }, 5000)
        })).then(dUser.guild.channels.cache.get("").send(logDm)))
     
     }
    }
    