'use strict';
module.exports = (sequelize, DataTypes) => {
  var Application = sequelize.define('Application', {
    app_type: DataTypes.STRING
  });
 

  Application.associate = function(models) {
    models.Application.hasMany(models.Document);
  };
  
  return Application;
};
