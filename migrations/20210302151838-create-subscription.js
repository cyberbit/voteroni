module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = 'Subscriptions'

    // create table
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channelId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.addIndex(table, ['channelId'], {
      unique: true
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscriptions')
  }
}
