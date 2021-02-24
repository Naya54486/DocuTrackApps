'use strict';
module.exports = (sequelize, DataTypes) => {
    var Employee = sequelize.define('Employee', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }},
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }},
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true,
        }},
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9_\.\@#-]*$/i,
                max: 18,
                min: 7,
            }},
    });



// Association between employee and document
  // an employeee can have many documents
  Employee.associate = function(models) {
    models.Employee.hasMany(models.Document);
  };


    return Employee;
};