const Discord = require('discord.js')

module.exports = {
    name: 'coinflip',
    description: 'flip a coin!',
    usage: [],
    aliases: [],
    example: 'coinflip',
    args: false,
    async execute(client, message, _args, log, { config, Ticket }) {
        const choices = ["heads", "tails"]
        const choice = choices[Math.floor(Math.random() * choices.length)]
        let cfEmbed = new Discord.MessageEmbed()
        .setTitle('CoinFlip!')
        .setDescription(`You flipped a ${choice}!`)
        message.channel.send(cfEmbed)
        if(choice === 'heads') {
            message.cfEmbed.react('😩') 
        }
        if(choice === 'tails') {
          message.react('🍸')
        }
    }
}