'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Inquiry.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inquiry',
  });

  Inquiry.associate = function(models) {
    Inquiry.belongsTo(models.Artwork);
  };

  return Inquiry;
};
