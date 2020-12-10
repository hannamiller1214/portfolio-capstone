'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Artwork.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artwork',
  });

  Artwork.associate = function(models) {
    Artwork.hasMany(models.Inquiry);
    Artwork.belongsTo(models.User);
  };

  return Artwork;
};
