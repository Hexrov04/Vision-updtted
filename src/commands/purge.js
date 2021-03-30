module.exports = {
	name: 'purge',
	description: 'Delete up to 99 messages at one time',
	usage: '#',
	aliases: [''],
	example: 'purge 99',
	args: true,
	async execute(client, message, _args, log, { config, Ticket }) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You cannot use this.');
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have \`MANAGE_MESSAGES\` permssion.');
        if (!_args[0]) return message.channel.send("You must state a number of messages to purge. \`/purge number\`");
        const amountToDelete = Number(_args[0], 10)
       

      

        if (isNaN(amountToDelete)) return message.channel.send("number stated is not  a vaild number.")
        if (!Number.isInteger(amountToDelete)) return message.channel.send("Number stated must be a whole number.")
        if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send("the number stated must be between 2 and 100.")
        const fetched = await message.channel.messages.fetch({
            limit: amountToDelete
        })
        try {
            await message.channel.bulkDelete(fetched)
            .then(messages => message.channel.send(`**Deleted __${messages.size}__ Messages**!`)).then(message => {
                setTimeout(function(){
                    message.delete()
                }, 5000)

            })
        }catch (err) {
            console.log(err)
            message.channel.send(`I was unable to delete the amount stated. Make sure they are within 14 days old.`).then(msg => msg.delete({ timeout: 1000 }));
        }
    }
}
    
