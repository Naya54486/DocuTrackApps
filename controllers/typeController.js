var Type = require('../models/type');
var models = require('../models');

var async = require('async');

// Display type create form on GET.
exports.type_create_get =  function(req, res, next) {
        // create type GET controller logic here 
        res.render('forms/type_form', { title: 'Create Type',    layout: 'layouts/detail'});
};

// Handle type create on POST.
exports.type_create_post = function(req, res, next) {
     // create type POST controller logic here
     // If an type gets created successfully, we just redirect to types list
     // no need to render a page
      models.Type.create({
        type_name: req.body.type_name,
        }).then(function() {
            console.log("Type created successfully");
           // check if there was an error during post creation
            res.redirect('/types');
      });
};

// Display type delete form on GET.
exports.type_delete_get = function(req, res, next) {
          models.Type.destroy({
             where: {
              id: req.params.type_id
            }
          }).then(function() {
          
            res.redirect('/types');
            console.log("Type deleted successfully");
          });
};

// Handle type delete on POST.
exports.type_delete_post = function(req, res, next) {
           models.Type.destroy({
             where: {
              id: req.params.type_id
            }
          }).then(function() {
 
            res.redirect('/types');
            console.log("Type deleted successfully");
          });
};

// Display type update form on GET.
exports.type_update_get = function(req, res, next) {
        // Find the type you want to update
        console.log("ID is " + req.params.type_id);
        models.Type.findById(
                req.params.type_id
        ).then(function(type) {
               // renders an type form
               res.render('forms/type_form', { title: 'Update Type', type: type, layout: 'layouts/detail'});
               console.log("Type update get successful");
          });
};

exports.type_update_post = function(req, res, next) {
        console.log("ID is " + req.params.type_id);
        models.Type.update(
        // Values to update
            {
                type_name: req.body.type_name,
            },
          { // Clause
                where: 
                {
                    id: req.params.type_id
                }
            }
          ).then(function() { 
                
                res.redirect("/types");  
                console.log("Type updated successfully");
          });
};

// Display list of all types.
exports.type_list = function(req, res, next) {
      
        models.Type.findAll(
        ).then(function(types) {
        console.log("rendering type list");
        res.render('pages/type_list', { title: 'Type List', types: types, layout: 'layouts/list'} );
        console.log("Types list renders successfully");
        });
};

// Display detail page for a specific type.
exports.type_detail = async function(req, res, next) {
            
         const categories = await models.Category.findAll();
         
         models.Type.findById(
                req.params.type_id, {
                include: [
                    {
                      model: models.Document
                    }
                         ]
                }
        ).then(function(type) {
        console.log(type);
        res.render('pages/type_detail', { title: 'Type Details', categories: categories, type: type, layout: 'layouts/detail'} );
        console.log("type deteials renders successfully");
        });
};