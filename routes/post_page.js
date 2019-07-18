const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlecodedParser = bodyParser.urlencoded({
    extended: false
});
router.get('/post_detail', urlecodedParser, function (req, res, next) {
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



module.exports = router;