const dotenv = require('dotenv')
dotenv.config()

const Discord = require('discord.js')
const client = new Discord.Client()

// TODO load subscribed channels from DB

client.once('ready', () => {
  console.log('Ready!')
})

client.login(process.env.TOKEN)

client.on('message', async message => {
  // TODO check channel by ID
  if (message.attachments.size > 0) {
    console.log('oh hello', message.content)
    console.log('message attachments', message.attachments)

    try {
      await message.react('⬆️')
      await message.react('🔄')
    } catch (err) {
      console.error('Attachment reaction error:', err)
    }
  }
})
