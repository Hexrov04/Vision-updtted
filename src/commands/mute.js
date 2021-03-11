const Discord = require('discord.js')


module.exports = {
	name: 'mute',
	description: 'Mutes a user.',
	usage: '<@member>',
	aliases: ['m'],
	example: 'mute v8',
	args: true,
	async execute(client, message, _args, log, { config, Ticket }) {
      

        
            if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to mute.')
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I require \`MANAGE_MESSAGES\`')
   
            let reason = _args.slice(1).join(" ")
           const muteRole = message.guild.roles.cache.get('818099668738113586')
           const memberRole = message.guild.roles.cache.get('816480819581157386')
            const mentionedMember = message.mentions.members.first()
            const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`You have been **__Muted__** in ${message.guild.name}`)
            .setDescription(`Reason for being muted: ${reason}`)
            .setColor("#5708ab")
            .setTimestamp()
           
            const muteChannel = new Discord.MessageEmbed()
            .setTitle(`** MUTED USER:**`)
            .setDescription(`${mentionedMember} has been muted for: ${reason}`)
            .setColor("#5708ab")
            .setTimestamp()
   
            if(!_args[0]) return message.channel.send(`\`/mute @member reason\``)
            if (!mentionedMember) return message.channel.send("The member stated is not in the server")
            if (mentionedMember.user == message.author) return message.channel.send('`You cannot mute yourself`')
            if (mentionedMember.user== client.user) return  message.channel.send('`You cant mute me.`')
            if (!reason) reason = 'No reason given'
            if (mentionedMember.roles.cache.has(muteRole)) return message.channel.send('This member is already muted.')
            if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('You cannot mute someone the same role or higher then you.')
           await mentionedMember.send(muteEmbed).then((mentionedMember.guild.channels.cache.get('816367345702404126').send(muteChannel)))
           await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('there was an error giving the mute role')))
 
   
        }
       }
    
