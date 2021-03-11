const { MessageEmbed, Message, MessageAttachment } = require('discord.js');
const fs = require('fs');
const { join } = require('path');
const config = require(join(__dirname, '../../user/', require('../').config));

module.exports = {
	name: 'new',
	description: 'Create a new support ticket',
	usage: '[brief description]',
	aliases: ['ticket', 'open'],
	example: 'new my server won\'t start',
	args: false,
	disabled: !config.commands.new.enabled,
	async execute(client, message, args, log, { config, Ticket }) {
    if(!message.mebmer.hasPermission('KICK_MEMBERS')) return message.channel.send('You cant use this command.')
    const mentionMember = message.mentions.member.first() || message.guild.members.cache.get(_args[0])
    if (!mentionMember) return message.channel.send(`${message.author.tag}, \n you need to mention a member.`)
    if(mentionMember.id == message.author.id) return message.channel.send('Please dont pull a hex and try to kick yourself.')
    if(mentionMember.id == client.user.id) return message.channel.send('You cant kick me.')
    try {
      await mentionMember.kick()
      message.channel.send(`Successfully kicked ${mentionMember}.`)
    } catch(e) {
      return message.channel.send('There was an error. I will attempt to fix it automatically.')
      
    }
    if(e) await mentionMember.kick() 
      message.channel.send('Fixed the error and kicked the user.')
    
  
  }

}
