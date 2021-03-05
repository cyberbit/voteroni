const subscriptionService = require('../services/subscription')

module.exports = {
  name: 'list',
  description: 'List channels subscribed to media voting',
  execute (message, args) {
    try {
      subscriptionService.listSubscribedChannels(message)
    } catch (err) {
      console.error('Subscribe Channel Error:', err)
    }
  }
}
