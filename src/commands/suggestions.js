module.exports = {
	name: 'suggestion',
	description: 'Creates a suggestion embed that allows people to vote!',
	usage: '[]',
	aliases: ['none'],
	example: 'suggestion should we add this bot to the server?',
	args: true,
	async execute(client, message, _args, log, { config, Ticket }) {
        let x = args.slice(1).join(" ")
        const exampleEmbed = new Discord.MessageEmbed()
            .setTitle(`***Suggestion by ${message.author.username}***`)
            .setDescription(`${x}`)
            .setImage(`${message.author.displayAvatarURL()}`)
        const channel = message.guild.channels.cache.get('822129676117737512');
        const OwO = await channel.send(exampleEmbed)
        await OwO.react("✅")
        await OwO.react("❎")
        }
    }
