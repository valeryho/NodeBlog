    const express = require('express');
    const app=express();
    const path = require ('path');
    
    const multer = require('multer');
    const upload = multer({dest: 'uploads/'});
    const moment = require('moment');

    const expressValidator = require('express-validator');

    const mongo = require('mongodb');
    const mongooes = require('mongoose');

    mongooes.connect("mongodb+srv://2015allreal:xq_ZqI18@cluster0-nojjm.mongodb.net/test?retryWrites=true&w=majority")
        .then(() => console.log('Connected...'))
        .catch(e => console.log(e));


    app.use(express.static(path.join(__dirname,"public")));
    app.set("view engine", "pug");
    app.set ('views','views');
   


    app.use(function (req, res, next) {
        req.mongooes = mongooes;
        next();
    });
    
     const home_page = require("./routes/home_page");
     app.use(home_page);
     const about = require("./routes/about");
     app.use(about);
     const contact = require("./routes/contact");
     app.use(contact);  
     const admin = require("./routes/admin");
     app.use(admin);


     
     
      const not_found = require("./routes/not_found");
      app.use(not_found);
     const      page = require("./routes/page");
     app.use(page);
     
        

    app.listen(3000);

