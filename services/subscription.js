const db = require('../models/index.js')

const subscribeMessageChannel = async (message) => {
  try {
    const sub = await db.Subscription.create({ channelId: message.channel.id })

    console.log('channel subscribed:', sub.channelId)
    message.channel.send('Channel subscribed sucessfully.')
  } catch (err) {
    if (err && err.name === 'SequelizeUniqueConstraintError') {
      console.warn('channel already subscribed')
      message.channel.send('Channel already subscribed!')
    } else {
      throw err
    }
  }
}

const unsubscribeMessageChannel = async (message) => {
  await db.Subscription.destroy({
    where: { channelId: message.channel.id }
  })

  console.log('channel unsubscribed:', message.channel.id)
  message.channel.send('Channel unsubscribed sucessfully.')
}

const processMessage = async (message) => {
  if (message.attachments.size > 0 || message.embeds.length > 0) {
    const sub = await db.Subscription.findOne({
      where: {
        channelId: message.channel.id
      }
    })

    if (sub) {
      await message.react('⬆️')
      await message.react('🔄')
    }
  }
}

module.exports = {
  subscribeMessageChannel,
  unsubscribeMessageChannel,
  processMessage
}
