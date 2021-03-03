const subscriptionService = require('../services/subscription')

module.exports = {
  name: 'unsub',
  description: 'Unsubscribe this channel from media voting',
  execute (message, args) {
    try {
      subscriptionService.unsubscribeMessageChannel(message)
    } catch (err) {
      console.error('Unsubscribe Channel Error:', err)
    }
  }
}
