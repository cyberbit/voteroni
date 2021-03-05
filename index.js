const dotenv = require('dotenv')
dotenv.config()

const fs = require('fs')
const Discord = require('discord.js')
const subscriptionService = require('./services/subscription')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => {
  // don't process messages from bots
  if (message.author.bot) return

  const { channel } = message
  const trigger = process.env.TRIGGER

  // check commands
  if (message.content.startsWith(trigger)) {
    const args = message.content.slice(trigger.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    // check permissions
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      message.member.send("You don't have permission to use that command.")

      return
    }

    if (!client.commands.has(command)) {
      const commandFields = client.commands.map(({ name, description }) => ({
        name: `${trigger} ${name}`,
        value: description
      }))

      const embed = new Discord.MessageEmbed()
        .setColor('#42a5f5')
        .setTitle('Help Page')
        .addFields(commandFields)

      channel.send(embed)

      return
    }

    try {
      client.commands.get(command).execute(message, args)
    } catch (err) {
      console.error(err)
      message.reply('there was an error executing this command!')
    }

    // halt further processing
    return
  }

  subscriptionService.processMessage(message)
})

// catch automatic attachments and embeds
client.on('messageUpdate', async (oldMessage, message) => {
  // don't process messages from bots
  if (message.author.bot) return

  subscriptionService.processMessage(message)
})

client.login(process.env.TOKEN)
