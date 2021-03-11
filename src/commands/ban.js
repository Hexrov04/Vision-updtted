const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
	name: 'ban',
	description: 'Bans a member',
	usage: '<@member>',
	aliases: ['none'],
	example: '.ban v8.',
	args: false,
    async execute(client, message, _args, log, { config, Ticket }) {
        
if (message.author.bot) return;
if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban someone.");
if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to ban someone.")



let reason = _args.slice(1).join(" ");
const mentionedMember = message.mentions.members.first()

if (!reason) reason = "No reason given."
if (!_args[0]) return message.channel.send('You must state someone to ban.')
if (!mentionedMember.bannable) return message.channeel.send('I cannot ban that member.')

const banEmbed = new Discord.MessageEmbed()
.setTitle(`You have been banned from The Alliance.`)
.setDescription(`Reason for being banned: ${reason}`)
.setColor("#5708ab")
.setTimestamp()

const banEmbed2 = new Discord.MessageEmbed()
.setTitle("**__MEMBER HAS BEEN BANNED!!__**")
.setDescription(`${mentionedMember} has been banned for ${reason}`)
.setColor("#5708ab")
.setTimestamp()

const banChannel = new Discord.MessageEmbed()
 .setTitle("**__MEMBER HAS BEEN BANNED!!__**")
.setDescription(`${mentionedMember} has been bannaed for ${reason}`)
.setColor("#5708ab")
.setFooter("Message will auto delete in 5 seconds. This ban has been logged. ")
.setTimestamp()

await mentionedMember.send(banEmbed).catch(err => console.log(err))
await mentionedMember.ban ({
    days: 7,
    reason: reason

}).catch(err => console.log(err)).then(() => message.channel.send(banChannel).then(message => {
    setTimeout(function(){
        message.delete()
    }, 5000)
}).then(message.channel.bulkDelete(1)).then(mentionedMember.guild.channels.cache.get('').send(banEmbed2)))
}

}
    

