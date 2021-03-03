const subscriptionService = require('../services/subscription')

module.exports = {
  name: 'sub',
  description: 'Subscribe this channel to media voting',
  execute (message, args) {
    try {
      subscriptionService.subscribeMessageChannel(message)
    } catch (err) {
      console.error('Subscribe Channel Error:', err)
    }
  }
}
