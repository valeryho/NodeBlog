

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const urlecodedParser = bodyParser.urlencoded({
    extended: false
});


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
    Author.findById(author_id,function(err,doc) {
        //  res.send(doc);
         doc.remove();
         res.redirect('/admin');
    })
    

    // Author.remove({_id: author_id});
    //  res.redirect('/admin');
    

    // res.send(Author) ;
    // const addAuthors = new Author({
    //     author: author,
    // });
    // addAuthors.save()
    //     .then((author) => {
    //         res.redirect('/admin');
    //     })
    //     .catch(e => console.log(e))
});



 


module.exports = router;