'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Artworks', 'imgUrl', { type: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Artworks', 'imgUrl');
  }
};
