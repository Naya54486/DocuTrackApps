var Document = require('../models/document');
var models = require('../models');

var async = require('async');

// Display document create form on GET.
exports.document_create_get = async function(req, res, next) {
        // renders a document form
        const employees = await models.Employee.findAll();
        const types = await models.Type.findAll();
        const applications = await models.Application.findAll();
        const categories = await models.Category.findAll();
        res.render('forms/document_form', { title: 'Create Document', employees: employees, types: types, applications: applications, categories: categories,  layout: 'layouts/detail'});
        console.log("Document form renders successfully")
};

// Handle document create on POST.
exports.document_create_post = async function( req, res, next) {
    console.log("This is employee id " + req.body.employee_id)
    let employee_id = req.body.employee_id;
 
    const document = await models.Document.create({
            subject: req.body.subject,
            description: req.body.description,
            status: "draft",
            EmployeeId: req.body.employee_id,
            TypeId: req.body.type_id,
            ApplicationId:req.body.application_id
        } 
    );
    
    console.log("The document id " + document.id);
    
    // const category = await models.Category.findById(req.body.category_id);
    
    let categoryList = req.body.categories;
    
    // check the size of the category list
    console.log(categoryList.length);
    
   
    // I am checking if only 1 category has been selected
    // if only one category then use the simple case scenario
    if (categoryList.length == 1) {
         // check if we have that category in our database
         const category = await models.Category.findById(req.body.categories);
         if (!category) {
          return res.status(400);
         }
         //otherwise add new entry inside DocumentCategory table
         await document.addCategory(category);
    }
    // Ok now lets do for more than 1 category, the hard bit.
    // if more than one category has been selected
    else {
    // Loop through all the ids in req.body.categories i.e. the selected categories
    await req.body.categories.forEach(async (id) => {
        // check if all category selected are in the database
        const category = await models.Category.findById(id);
        if (!category) {
          return res.status(400);
        }
        // add to DocumentCategory after
        await document.addCategory(category);
        });
    }
    
    // everything done, now redirect....to document listing.
    res.redirect('/employee/' + employee_id);

};



// Display document delete form on GET.
exports.document_delete_get = async function(req, res, next) {
     // find the document
          const document = await models.Document.findById(req.params.document_id);
          
          // Find and remove all associations 
          const categories = await document.getCategories();
          document.removeCategories(categories);
          
        // delete document 
       models.Document.destroy({
            // find the document_id to delete from database
            where: {
              id: req.params.document_id
            }
          }).then(function() {
           // If a document gets deleted successfully, we just redirect to documents list
           // no need to render a page
            res.redirect('/documents');
            console.log("Document deleted successfully");
          });
};

 
  
  
// Handle document delete on POST.
exports.document_delete_post = async function(req, res, next) {
    
          // find the document
          const document = await models.Document.findById(req.params.document_id);
          
          // Find and remove all associations 
          const categories = await document.getCategories();
          document.removeCategories(categories);
          
          // delete document
          models.Document.destroy({
            // find the document_id to delete from database
            where: {
              id: req.params.document_id
            }
          }).then(function() {
           // If a document gets deleted successfully, we just redirect to documents list
           // no need to render a page
            res.redirect('/documents');
            console.log("Document deleted successfully");
          });

 };


// Display document update form on GET.
exports.document_update_get = async function(req, res, next) {
        // Find the document you want to update
        console.log("ID is " + req.params.document_id);
        const categories = await models.Category.findAll();
        models.Document.findById(
                req.params.document_id
        ).then(function(document) {
               // renders a document form
               res.render('forms/document_form', { title: 'Update Document', categories: categories, document: document, layout: 'layouts/detail'});
               console.log("Document update get successful");
          });
        
};


// Handle document update on POST.
exports.document_update_post = async function(req, res, next) {
        console.log("ID is " + req.params.document_id);
        
        // find the document
        const document = await models.Document.findById(req.params.document_id);
        
        // Find and remove all associations 
        const categories = await document.getCategories();
        document.removeCategories(categories);
        

        // const category = await models.Category.findById(req.body.category_id);
    
        let categoryList = req.body.categories;
    
        // check the size of the category list
        console.log(categoryList.length);
    
   
        // I am checking if only 1 category has been selected
        // if only one category then use the simple case scenario
        if (categoryList.length == 1) {
             // check if we have that category in our database
             const category = await models.Category.findById(req.body.categories);
             if (!category) {
              return res.status(400);
             }
             //otherwise add new entry inside DocumentCategory table
             await document.addCategory(category);
        }
        // Ok now lets do for more than 1 category, the hard bit.
        // if more than one category has been selected
        else {
        // Loop through all the ids in req.body.categories i.e. the selected categories
        await req.body.categories.forEach(async (id) => {
            // check if all category selected are in the database
            const category = await models.Category.findById(id);
            if (!category) {
              return res.status(400);
            }
            // add to DocumentCategory after
            await document.addCategory(category);
            });
        }
        
        // now update
        models.Document.update(
        // Values to update
            {
                subject: req.body.subject,
                description: req.body.description,
                status: req.body.status,
            },
          { // Clause
                where: 
                {
                    id: req.params.document_id
                }
            }
        //   returning: true, where: {id: req.params.document_id} 
         ).then(function() { 
                // If a document gets updated successfully, we just redirect to documents list
                // no need to render a page
                res.redirect("/documents");  
                console.log("Document updated successfully");
          });
};


// Display detail page for a specific document.
exports.document_detail = function(req, res, next) {
        // find a document by the Id
        models.Document.findById(
                req.params.document_id,
                {
                    // make sure include the comment so we can display it
                    include: [
                    {
                      model: models.Comment
                    },
                    {
                      model: models.Employee,
                      attributes: ['id', 'first_name', 'last_name']
                    },
                    {
                      model: models.Type,
                      attributes: ['id', 'type_name']
                    },
                    {
                      model: models.Application,
                      attributes: ['id', 'app_type']
                    },
                    {
                      model: models.Category,
                      as: 'categories',
                      required: false,
                      // Pass in the Category attributes that you want to retrieve
                      attributes: ['id', 'name'],
                      through: {
                        // This block of code allows you to retrieve the properties of the join table DocumentCategories
                        model: models.DocumentCategories,
                        as: 'documentCategories',
                        attributes: ['document_id', 'category_id'],
                      }
                    }
                    
                    ]
                    
                }
        ).then(function(document) {
        console.log(document);
        // renders an inividual document details page
        res.render('pages/document_detail', { title: 'Document Details', document: document, layout: 'layouts/detail'} );
        console.log("Document deteials renders successfully");
        });
};


// Display list of all documents.
exports.document_list = function(req, res, next) {
        // controller logic to display all documents
        models.Document.findAll({
            // Make sure to include the categories
            include: [
                {
                  model: models.Employee,
                  attributes: ['id', 'first_name', 'last_name']
                },
                {
                  model: models.Type,
                  attributes: ['id', 'type_name']
                },
                {
                  model: models.Application,
                  attributes: ['id', 'app_type']
                },
                 {
                      model: models.Category,
                      as: 'categories',
                      required: false,
                      // Pass in the Category attributes that you want to retrieve
                      attributes: ['id', 'name'],
                      through: {
                        // This block of code allows you to retrieve the properties of the join table DocumentCategories
                        model: models.DocumentCategories,
                        as: 'documentCategories',
                        attributes: ['document_id', 'category_id'],
                }
            }]
                
        }).then(function(documents) {
        // renders a document list page
        console.log(documents);
        console.log("rendering document list");
        res.render('pages/document_list', { title: 'Document List', documents: documents, layout: 'layouts/list'} );
        console.log("Documents list renders successfully");
        });
        
};

 
    
// This is the blog homepage.
exports.index = function(req, res) {

      // find the count of documents in database
      models.Document.findAndCountAll(
      ).then(function(documentCount)
      {
      models.Employee.findAndCountAll(
      ).then(function(employeeCount)
      {
      models.Comment.findAndCountAll(
      ).then(function(commentCount)
      {
      models.Category.findAndCountAll(
      ).then(function(categoryCount)
      {
        // find the count of employees in database
 
        // find the count of comments in database
 
        // find the count of categories in database
 
        res.render('pages/index', {
            title: 'Homepage', 
            documentCount: documentCount, 
            employeeCount: employeeCount,
            commentCount: commentCount,
            categoryCount: categoryCount,
            layout: 'layouts/main'
            
        });
        
        // res.render('pages/index_list_sample', { title: 'Document Details', layout: 'layouts/list'});
        // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Document Details', layout: 'layouts/detail'});
      });
      });
      });
      });
    
    
};