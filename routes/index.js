var models  = require('../models');
var express = require('express');
var router  = express.Router();

// router.get('/', function(req, res) {
//   models.User.findAll({
//     include: [ models.Task ]
//   }).then(function(users) {
//     res.render('pages/index', {
//       title: 'Sequelize: Express Example',
//       users: users,
//       page: 'Home'
//     });
//   });
// });

// router.get('/', function(req, res) {
//    res.redirect("/blog");
// });



var employee_controller = require('../controllers/employeeController');
var document_controller = require('../controllers/documentController');
var type_controller = require('../controllers/typeController');
var application_controller = require('../controllers/applicationController');
var category_controller = require('../controllers/categoryController');
var comment_controller = require('../controllers/commentController');



// EMPLOYEE ROUTES 

// GET request for creating Employee
router.get('/employee/create', employee_controller.employee_create_get);

// POST request for creating Employee.
router.post('/employee/create', employee_controller.employee_create_post);

// GET request to delete Employee.
router.get('/employee/:employee_id/delete', employee_controller.employee_delete_get);

// POST request to delete Employee
router.post('/employee/:employee_id/delete', employee_controller.employee_delete_post);

// GET request to update Employee.
router.get('/employee/:employee_id/update', employee_controller.employee_update_get);

// POST request to update Employee.
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);

// GET request for one Employee.
router.get('/employee/:employee_id', employee_controller.employee_detail);

// GET request for list of all Employees.
router.get('/employees', employee_controller.employee_list);


// DOCUMENT ROUTE

// GET request for creating a Document 
router.get('/document/create', document_controller.document_create_get);

// POST request for creating Document.
router.post('/document/create', document_controller.document_create_post);

// GET request to delete Document.
router.get('/document/:document_id/delete', document_controller.document_delete_get);

// POST request to delete Document.
router.post('/document/:document_id/delete', document_controller.document_delete_post);

// GET request to update Document.
router.get('/document/:document_id/update', document_controller.document_update_get);

// POST request to update Document.
router.post('/document/:document_id/update', document_controller.document_update_post);

// GET request for one Document.
router.get('/document/:document_id', document_controller.document_detail);

// GET request for list of all Documents.
router.get('/documents', document_controller.document_list);


// TYPE ROUTE

// GET request for creating a Type 
router.get('/type/create', type_controller.type_create_get);

// POST request for creating Type
router.post('/type/create', type_controller.type_create_post);

// GET request to delete Type
router.get('/type/:type_id/delete', type_controller.type_delete_get);

// POST request to delete Type
router.post('/type/:type_id/delete', type_controller.type_delete_post);

// GET request to update Type
router.get('/type/:type_id/update', type_controller.type_update_get);

// POST request to update Type
router.post('/type/:type_id/update', type_controller.type_update_post);

// GET request for one Type
router.get('/type/:type_id', type_controller.type_detail);

// GET request for list of all Types
router.get('/types', type_controller.type_list);


// APPLICATION ROUTE

// GET request for creating an Application 
router.get('/application/create', application_controller.application_create_get);

// POST request for creating Application
router.post('/application/create', application_controller.application_create_post);

// GET request to delete Application
router.get('/application/:application_id/delete', application_controller.application_delete_get);

// POST request to delete Application
router.post('/application/:application_id/delete', application_controller.application_delete_post);

// GET request to update Application
router.get('/application/:application_id/update', application_controller.application_update_get);

// POST request to update Application
router.post('/application/:application_id/update', application_controller.application_update_post);

// GET request for one Application
router.get('/application/:application_id', application_controller.application_detail);

// GET request for list of all Applications
router.get('/applications', application_controller.application_list);


// CATEGORY ROUTES

// GET request for creating a Category. NOTE This must come before route that displays Category (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category.
router.get('/category/:category_id/delete', category_controller.category_delete_get);

// POST request to delete Category.
router.post('/category/:category_id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:category_id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:category_id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:category_id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);


// COMMENT ROUTES

// GET request for creating Comment. NOTE This must come before route for id (i.e. display comment).
router.get('/comment/create', comment_controller.comment_create_get);

// POST request for creating Comment.
router.post('/comment/create', comment_controller.comment_create_post);

// GET request to delete Comment.
router.get('/comment/:comment_id/delete', comment_controller.comment_delete_get);

// POST request to delete Comment
router.post('/comment/:comment_id/delete', comment_controller.comment_delete_post);

// GET request to update Comment.
router.get('/comment/:comment_id/update', comment_controller.comment_update_get);

// POST request to update Comment.
router.post('/comment/:comment_id/update', comment_controller.comment_update_post);

// GET request for one Comment.
router.get('/comment/:comment_id', comment_controller.comment_detail);

// GET request for list of all Comments.
router.get('/comments', comment_controller.comment_list);

// GET blog home page.
router.get('/', document_controller.index); 

 
module.exports = router;
