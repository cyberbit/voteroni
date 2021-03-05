const table = 'Subscriptions'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(table, 'guildId', Sequelize.STRING)
    await queryInterface.addIndex(table, ['guildId'])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(table, 'guildId')
  }
}
