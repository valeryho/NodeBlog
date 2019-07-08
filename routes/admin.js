

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const mongo = require('mongodb');
const mongoose = require('mongoose');
const urlecodedParser = bodyParser.urlencoded({
    extended: false
});
var fs = require('fs');
var path = require('path');


router.get('/admin', (req, res, next) => {
        require('../models/categories.model');
        require('../models/authors.model');
        require('../models/posts.model');
        const Posts = mongoose.model('posts');
        const Author = mongoose.model('author');
        const Categories = mongoose.model('category');
        Categories.find({})
            .then(categories => {
                Author.find({})
                    .then((authors) => {
                        Posts.find({})
                            .then((posts) => {
                                res.render('admin', {
                                    authors: authors,
                                    categories: categories,
                                    posts:posts
                                });
                            })
                    })
            })
            .catch(e => console.log(e))
        });


router.post('/author/add', function (req, res, next) {
    let author = req.body.author;
    require('../models/authors.model');

    const Author = mongoose.model('author');
    const addAuthors = new Author({
        author: author,
    });
    addAuthors.save()
        .then((author) => {
            res.redirect('/admin');
        })
        .catch(e => console.log(e))
});
router.post('/author/del', urlecodedParser, function (req, res, next) {
    let author_id = req.body.author_to_del;
    require('../models/authors.model');
    const Author = mongoose.model('author');
    Author.findById(author_id, function (err, doc) {
        //  res.send(doc);
        doc.remove();
        res.redirect('/admin');
    })
});


router.post('/categories/add', function (req, res, next) {
    let category = req.body.categories;
    require('../models/categories.model');
    const Category = mongoose.model('category');
    const addCategories = new Category({
        category: category,
    });
    addCategories.save()
        .then((category) => {
            res.redirect('/admin');
        })
        .catch(e => console.log(e))
});
router.post('/categories/del', urlecodedParser, function (req, res, next) {
 
    let cat_id = req.body.category_to_del;
    require('../models/categories.model');
    const Category = mongoose.model('category');
    Category.findById(cat_id, function (err, doc) {
        //  res.send(doc);
        doc.remove();
        res.redirect('/admin');
    })
});

router.post('/post/add', upload.single('mainimage'), function (req, res, next) {

     let title = req.body.title;
     let post = req.body.post;
     let author = req.body.author;
     let category = req.body.category;
     let date = new Date();

    if (req.file) {
         var mainimage = req.file.filename;;
          
     } else {
         var mainimage = 'default.png';
     }    
     require('../models/posts.model');
     const Posts = mongoose.model('posts');
     const addPost = new Posts({
            title: title,
            post: post,
            author: author,
            category: category,
            date: date,
            mainimage: mainimage
     });
      
    //   res.send(addPost);
     addPost.save()
         .then((post) => {
             
             res.redirect('/admin');
         })
         .catch(e => console.log(e));

});
router.post('/post/del', urlecodedParser, function (req, res, next) {

    let post_id = req.body.post_to_del;
    require('../models/posts.model');
    const Posts = mongoose.model('posts');
    Posts.findById(post_id, function (err, doc) {
        
        var path_imj = path.join(__dirname, '..', 'public', 'uploads', doc.mainimage);        doc.remove();
        if (fs.existsSync(path_imj))
        {fs.unlinkSync(path_imj);}
        
        res.redirect('/admin');
    });
});
 
router.post('/post/edit', urlecodedParser, function (req, res, next) {
    let post_id = req.body.post_to_del;
    require('../models/posts.model');
    require('../models/categories.model');
    require('../models/authors.model');
    const Posts = mongoose.model('posts');
    const Author = mongoose.model('author');
    const Categories = mongoose.model('category');
    Categories.find({})
        .then(categories => {
            Author.find({})
                .then((authors) => {
                    Posts.findById(post_id, function (err, doc) {
                        res.render('post_ed_page', {
                            post: doc,
                            authors: authors,
                            categories: categories,
                        });
                    });
                })
        })
        .catch(e => console.log(e))
});



router.post('/post_editing', upload.single('mainimage'), function (req, res, next) {

      require('../models/posts.model');
      const Posts = mongoose.model('posts');
    let post_id = req.body.post_to_ed;
    let title = req.body.title;
    let post = req.body.post;
    let author = req.body.author;
    let category = req.body.category;
    let date = new Date();   
    Posts.findById(post_id, function (err, doc) {
        doc._id = post_id;
        doc.title = title;
        doc.post = post;
        doc.author=author;
        doc.category=category;
        doc.date=date;
        let mainimage=doc.mainimage;
        if (req.file) {
             var path_imj = path.join(__dirname, '..', 'public', 'uploads', doc.mainimage);
             if (fs.existsSync(path_imj))
                 {fs.unlinkSync(path_imj);}
             mainimage = req.file.filename;
           
        }     

        doc.mainimage=mainimage;
        doc.save();
        res.redirect('/admin');
    });
});





module.exports = router;