const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var moment = require('moment');
const bodyParser = require('body-parser');
const urlecodedParser = bodyParser.urlencoded({
    extended: false
});



router.get("/", (req, res, next) => {

     require('../models/categories.model');
     require('../models/authors.model');
     require('../models/posts.model');
     require('../models/comments.model');

     const Posts = mongoose.model('posts');
     const Author = mongoose.model('author');
     const Categories = mongoose.model('category');
     const Comments = mongoose.model('comments');

     Categories.find({})
         .then(categories => {
             Author.find({})
                 .then((authors) => {
                     Posts.find({})
                         .then((posts) => {
                                Comments.find({})
                                .then((comments) => {

                                    res.render('index', {
                                        authors: authors,
                                        categories: categories,
                                        posts: posts,
                                        comments:comments
                                    });
                                });

                         })
                 })
         })
         .catch(e => console.log(e))
});


router.post('/post_detail', urlecodedParser, function (req, res, next) {
    let post_id = req.body.viewed_post;
    require('../models/categories.model');
    require('../models/authors.model');
    require('../models/posts.model');
    require('../models/comments.model');
    const Posts = mongoose.model('posts');
    const Author = mongoose.model('author');
    const Categories = mongoose.model('category');
    const Comments = mongoose.model('comments')
    Posts.findById(post_id)
        .then(post => {
            Comments.findById(post_id)
                .then(comments => {
                    res.render('postwievs', {
                        post:post,
                        comments: comments
                    });
                })

        })
});



module.exports = router;
