var Application = require('../models/application');
var models = require('../models');

var async = require('async');

// Display application create form on GET.
exports.application_create_get =  function(req, res, next) {
        // create application GET controller logic here 
        res.render('forms/application_form', { title: 'Create Application',    layout: 'layouts/detail'});
};

// Handle application create on POST.
exports.application_create_post = function(req, res, next) {
     // create application POST controller logic here
     // If an application gets created successfully, we just redirect to applications list
     // no need to render a page
      models.Application.create({
        app_type: req.body.app_type,
        }).then(function() {
            console.log("Application created successfully");
           // check if there was an error during post creation
            res.redirect('/applications');
      });
};

// Display application delete form on GET.
exports.application_delete_get = function(req, res, next) {
          models.Application.destroy({
             where: {
              id: req.params.application_id
            }
          }).then(function() {
          
            res.redirect('/applications');
            console.log("Application deleted successfully");
          });
};

// Handle application delete on POST.
exports.application_delete_post = function(req, res, next) {
           models.Application.destroy({
             where: {
              id: req.params.application_id
            }
          }).then(function() {
 
            res.redirect('/applications');
            console.log("Application deleted successfully");
          });
};

// Display application update form on GET.
exports.application_update_get = function(req, res, next) {
        // Find the application you want to update
        console.log("ID is " + req.params.application_id);
        models.Application.findById(
                req.params.application_id
        ).then(function(application) {
               // renders an application form
               res.render('forms/application_form', { title: 'Update Application', application: application, layout: 'layouts/detail'});
               console.log("Application update get successful");
          });
};

exports.application_update_post = function(req, res, next) {
        console.log("ID is " + req.params.application_id);
        models.Application.update(
        // Values to update
            {
                app_type: req.body.app_type,
            },
          { // Clause
                where: 
                {
                    id: req.params.application_id
                }
            }
          ).then(function() { 
                
                res.redirect("/applications");  
                console.log("Application updated successfully");
          });
};

// Display list of all applications.
exports.application_list = function(req, res, next) {
      
        models.Application.findAll(
        ).then(function(applications) {
        console.log("rendering application list");
        res.render('pages/application_list', { title: 'Application List', applications: applications, layout: 'layouts/list'} );
        console.log("Applications list renders successfully");
        });
};

// Display detail page for a specific application.
exports.application_detail = async function(req, res, next) {
            
         const categories = await models.Category.findAll();
         
         models.Application.findById(
                req.params.application_id, {
                include: [
                    {
                      model: models.Document
                    }
                         ]
                }
        ).then(function(application) {
        console.log(application);
        res.render('pages/application_detail', { title: 'Application Details', categories: categories, application: application, layout: 'layouts/detail'} );
        console.log("application deteials renders successfully");
        });
};