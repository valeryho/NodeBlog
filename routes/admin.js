

const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongo = require('mongodb');
const mongoose = require('mongoose');


router.get('/admin', (req, res, next) => {
        require('../models/authors.model');
        const Author = mongoose.model('author');
        Author.find({})
            .then(authors => {
                console.log(authors);
                res.render('admin', {
                    authors: authors
                });
            })
            .catch(e => console.log(e))
});

router.post('/author/add', function (req, res, next) {
    
    let author = req.body.author;
    

    // if (errors) {
    //     res.render('/admin', {
    //         "errors": errors
    //     });
    // } else {
        require('../models/authors.model');
        const Author = mongoose.model('author');
        const addAuthors = new Author({
            author: author,
        });
        addAuthors.save()
            .then((author) => {
                // req.flash('success', 'Authors Added');
                res.redirect('/admin');
            })
            .catch(e => console.log(e))
    // }

});


 


module.exports = router;