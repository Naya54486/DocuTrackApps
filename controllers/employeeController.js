var Employee = require('../models/employee');
var models = require('../models');

var async = require('async');

// Display employe create form on GET.
exports.employee_create_get =  function(req, res, next) {
        // create employee GET controller logic here 
        res.render('forms/employee_form', { title: 'Create Employee',    layout: 'layouts/detail'});
};

// Handle employee create on POST.
exports.employee_create_post = function(req, res, next) {
     // create employee POST controller logic here
     // If an employee gets created successfully, we just redirect to employees list
     // no need to render a page
      models.Employee.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password:req.body.password
        }).then(function() {
            console.log("Employee created successfully");
           // check if there was an error during post creation
            res.redirect('/employees');
      });
};

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
                username: req.body.username
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