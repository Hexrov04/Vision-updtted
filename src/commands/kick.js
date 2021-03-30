const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'kicks a user',
	usage: '[command]',
	aliases: ['command', 'commands'],
	example: 'kick v8',
	args: true,
    async execute(client, message, _args, log, { config, Ticket }) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You cannot use this command.')
        const mentionedMember = message.mentions.members.first()
        let reason = _args.slice(1).join(" ")
        if(!reason) reason = 'No Reason Given.'

        const kickEmbed = new Discord.MessageEmbed()
        .setTitle(`You were kicked from ${message.guild.name}`)
        .setDescription(`Reason: ${reason}`)
        .setTimestamp()
        .setColor("#5708ab")
        .setFooter(client.user.tag, client.user.displayAvatarURL())
        const kickMessage = new Discord.MessageEmbed()
        .setTitle(`__${message.author.tag} Has removed a member from the guld__`)
        .setDescription(` ${message.author.tag} has ${mentionedMember} from ${message.guild.name}`)
        .addField('Reason:', `${reason}`, 'Mod:', `${message.author.tag} ', Target:`, `${mentionedMember}`)
        .setTimestamp()
        .setColor("#5708ab")
        .setFooter(client.user.tag, client.user.displayAvatarURL())

        if(!_args[0]) return message.channel.send('Please mention a user.')
        if(!_args && !reason) return message.channel.send('Please state a user and/or a reason.')
        if(!mentionedMember) return message.channel.send('Member mentioned is not in the server.')
        try {
            await mentionedMember.send(kickEmbed)
        } catch(e) {
            console.log(`I was unable to message ${mentionedMember}`)
        }
        try {
           await mentionedMember.kick(reason)
           message.channel.send(kickMessage)

        
        } catch(e) {
            console.log(e)
            message.channel.send(`I was unable to kick ${mentionedMember}`)
        }
    }
}