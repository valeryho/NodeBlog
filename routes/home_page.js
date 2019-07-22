const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var moment = require('moment');
const bodyParser = require('body-parser');
const urlecodedParser = bodyParser.urlencoded({
    extended: false
});



router.get("/", urlecodedParser,(req, res, next) => {

     require('../models/categories.model');
     require('../models/authors.model');
     require('../models/posts.model');
     require('../models/comments.model');

     const Posts = mongoose.model('posts');
     const Author = mongoose.model('author');
     const Categories = mongoose.model('category');
     const Comments = mongoose.model('comments');
     let page_n = 1;
     Categories.find({})
         .then(categories => {
             Author.find({})
                 .then((authors) => {
                     Posts.find({})
                         .then((posts) => {
                                Comments.find({})
                                .then((comments) => {
                                    posts.sort(function (a, b) {
                                        return b.date - a.date;
                                    });
                                    let t_p = posts.slice((page_n - 1) * 5, (page_n - 1) * 5 + 5);
                                    res.render('index', {
                                        authors: authors,
                                        categories: categories,
                                        posts: posts,
                                        comments:comments,
                                        page_n:page_n,
                                        posts: t_p,
                                        posts_counter: posts.length,
                                    });
                                });

                         })
                 })
         })
         .catch(e => console.log(e))

});

router.post('/post_detail', urlecodedParser, function (req, res, next) {
    let post_id = req.body.viewed_post;
    require('../models/posts.model');
    require('../models/comments.model');
    const Posts = mongoose.model('posts');
    const Comments = mongoose.model('comments')
    Posts.findById(post_id)
        .then(post => {
            Comments.find({
                    postid: {
                        $eq: post_id
                    }
                })
                .then(comments => {
                    res.render('postwievs', {
                        post: post,
                        comments: comments
                    });
                })
        });
});

router.post('/add_comment', urlecodedParser, function (req, res, next) {
     
    let postid = req.body.postid;
    let name = req.body.name;
    let aproove = false;
     let email = req.body.email;
     let comment=req.body.comment;
     let commentDate = new Date();
     require('../models/comments.model');
     const Comment = mongoose.model('comments');
     require('../models/posts.model');
     const Posts = mongoose.model('posts');
     const addComent = new Comment({
         postid: postid,
         name: name,
         aproove: aproove,
         email: email,
         comment: comment,
         commentDate: commentDate
     });
     addComent.save()
        .then(comment => {
           res.redirect("/");
        })
        .catch(e => console.log(e));

});


router.get('/users', (req, res, next) => {
    res.render('add_users', {});
});

router.post('/users/add_user', (req, res, next) => {
    require('../models/users.model');
    const Users = mongoose.model('users');
    let name = req.body.name;
    let email = req.body.email;
    if (req.body.password == req.body.pass_confirm) {
        let password = req.body.password;
        const addUser = new Users({
            user: name,
            email: email,
            password: password,
            role: 'user',
        });
        addUser.save()
            .then((user) => {
                
                res.redirect("/");
            })
            .catch(e => console.log(e));
    }

});

router.get('/sign_in', (req, res, next) => {
    res.render('sign_in', {});
});

router.post('/users/checkLogin',urlecodedParser, (req, res, next) => {
    require('../models/users.model');
    const Users = mongoose.model('users');
    let user = req.body.name;
    let password = req.body.password;
  
    let check=false;
        Users.find()
            .then(users => {
                users.forEach(us=>{
                     if ((us.user === user)&&(us.password===password))
                    {
                        console.log(us.user);
                    }

                });
                });
   
});

router.post("/", urlecodedParser, (req, res, next) => {
          require('../models/categories.model');
          require('../models/authors.model');
          require('../models/posts.model');
          require('../models/comments.model');
          const Posts = mongoose.model('posts');
          const Author = mongoose.model('author');
          const Categories = mongoose.model('category');
          const Comments = mongoose.model('comments');
          let page_n = 1;
      page_n = req.body.page_number;
          Categories.find({})
              .then(categories => {
                  Author.find({})
                      .then((authors) => {
                          Posts.find({})
                              .then((posts) => {
                                  Comments.find({})
                                      .then((comments) => {
                                          posts.sort(function (a, b) {return b.date - a.date;});
                                          let t_p=posts.slice((page_n - 1) * 5, (page_n - 1) * 5+5);
                                          res.render('index', {
                                              authors: authors,
                                              categories: categories,
                                              posts: t_p,
                                              posts_counter: posts.length,
                                              comments: comments,
                                              page_n: page_n
                                          });
                                      });

                              })
                      })
              })
              .catch(e => console.log(e))
});
module.exports = router;
