const db = require('../models/index.js')

const subscribeMessageChannel = async (message) => {
  try {
    const sub = await db.Subscription.create({
      guildId: message.guild.id,
      channelId: message.channel.id
    })

    console.log('channel subscribed:', sub.channelId)
    message.channel.send('Channel subscribed successfully.')
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
  const rows = await db.Subscription.destroy({
    where: { channelId: message.channel.id },
    returning: true
  })

  if (Number(rows) === 0) {
    console.warn('channel already unsubscribed', message.channel.id)
    message.channel.send('Channel already unsubscribed!')
    return
  }

  console.log('channel unsubscribed:', message.channel.id)
  message.channel.send('Channel unsubscribed successfully.')
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

const listSubscribedChannels = async (message) => {
  const subs = await db.Subscription.findAll({
    where: { guildId: message.guild.id }
  })
  const channels = subs.map(({ channelId }) => `<#${channelId}>`)

  console.log('sub list:', subs)
  console.log('channel list:', channels)

  message.channel.send(`Currently subscribed channels: ${channels.join(', ')}`)
}

module.exports = {
  subscribeMessageChannel,
  unsubscribeMessageChannel,
  processMessage,
  listSubscribedChannels
}
