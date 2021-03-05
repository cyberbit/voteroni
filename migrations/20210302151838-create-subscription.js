const table = 'Subscriptions'

module.exports = {
  up: async (queryInterface, Sequelize) => {
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

    // add index
    await queryInterface.addIndex(table, ['channelId'], {
      unique: true
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table)
  }
}
