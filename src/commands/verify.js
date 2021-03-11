const Discord = require('discord.js')

module.exports = {
	name: 'verify',
	description: 'Bans a member',
	usage: '<@member>',
	aliases: ['none'],
	example: '.ban v8.',
	args: false,
    async execute(client, message, _args, log, { config, Ticket }) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return ("im sorry, you cant use this embed!")
        const embed = new Discord.MessageEmbed()
        .setTitle('Welcome to Affinity League!')
        .setDescription('To enter please react to this message!')
        .setFooter('AL')
        message.channel.send(embed)
    }
}

