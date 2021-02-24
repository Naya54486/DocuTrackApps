'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    type_name: DataTypes.STRING
  });
 

  Type.associate = function(models) {
    models.Type.hasMany(models.Document);
  };
  
  return Type;
};
