'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Inquiries', // name of source model
      'ArtworkId', // name of key we are adding
      {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Artworks',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Inquiries', 'ArtworkId');
  }
};
