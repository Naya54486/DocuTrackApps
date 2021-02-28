var Employee = require('../models/employee');
var models = require('../models');

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const { check, validationResult } = require("express-validator");
const urlencodedParser = bodyParser.urlencoded({extended: false});

var async = require('async');

// Display employe create form on GET.
exports.employee_create_get = async function(req, res, next) {
        // create employee GET controller logic here
        res.render('forms/employee_form', { title: 'Create Employee', layout: 'layouts/detail'});
};

// Handle employee create on POST.
exports.employee_create_post = [ urlencodedParser,
  [
    check('first_name', "The first name must be 4 characters long").exists().isAlpha()
    .isLength({min: 4}),
    check('last_name', "The last name must be 4 characters long").exists().isAlpha()
    .isLength({min: 4}),
    check('username', "The username must be 4 characters long").exists()
    .isLength({min: 4}),
    check('email', "Email is not valid").isEmail().normalizeEmail(),
    check('password', "Password must be alphanumeric and also more than 7 characters").isAlphanumeric()
    .isLength({min: 7}),
    check('role', "Enter a valid role").exists(),
    check('department', "Enter a valid department").exists(),


  ],
 async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const notice = errors.array();
    res.render('forms/employee_form', {
      title: 'Create Employee',
      first_name: req.body.first_name, notice,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      department: req.body.department,
      layout: 'layouts/detail'
    });
    
  } else {

    models.Employee.create({

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password:req.body.password,
            role:req.body.role,
            department:req.body.department,
        }).then(function() {

            console.log("Employee created successfully");
          // check if there was an error during post creation
            res.redirect('/employees');
      });
    }
    }
];  


// Display employee delete form on GET.
exports.employee_delete_get = function(req, res, next) {
          models.Employee.destroy({
             where: {
              id: req.params.employee_id
            }
          }).then(function() {
          
            res.redirect('/employees');
            console.log("Employee deleted successfully");
          });
};

// Handle employee delete on POST.
exports.employee_delete_post = function(req, res, next) {
           models.Employee.destroy({
             where: {
              id: req.params.employee_id
            }
          }).then(function() {
 
            res.redirect('/employees');
            console.log("Employee deleted successfully");
          });
};

// Display employee update form on GET.
exports.employee_update_get = function(req, res, next) {
        // Find the employee you want to update
        console.log("ID is " + req.params.employee_id);
        models.Employee.findById(
                req.params.employee_id
        ).then(function(employee) {
               // renders an employee form
               res.render('forms/employee_form', { title: 'Update Employee', employee: employee, layout: 'layouts/detail'});
               console.log("Employee update get successful");
          });
};

exports.employee_update_post = function(req, res, next) {
        console.log("ID is " + req.params.employee_id);
        models.Employee.update(
        // Values to update
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                role:req.body.role,
                department:req.body.department,
            },
          { // Clause
                where: 
                {
                    id: req.params.employee_id
                }
            }
          ).then(function() { 
                
                res.redirect("/employees");  
                console.log("Employee updated successfully");
          });
};

// Display list of all employees.
exports.employee_list = function(req, res, next) {
      
  models.Employee.findAll(
  ).then(function(employees) {
  console.log("rendering employee list");
  res.render('pages/employee_list', { title: 'Employee List', employees: employees, layout: 'layouts/list'} );
  console.log("Employees list renders successfully");
  });
};

// Display detail page for a specific employee.
exports.employee_detail = async function(req, res, next) {
      
   const categories = await models.Category.findAll();
   const types = await models.Type.findAll()
   const applications = await models.Application.findAll()
   
   models.Employee.findById(
          req.params.employee_id, {
          include: [
              {
                model: models.Document
              }
                   ]
          }
  ).then(function(employee) {
  console.log(employee);
  res.render('pages/employee_detail', { title: 'Employee Details', types: types, applications: applications, categories: categories, employee: employee, layout: 'layouts/detail'} );
  console.log("employee deteials renders successfully");
  });
};


