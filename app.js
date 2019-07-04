    const express = require('express');
    const app=express();
    const path = require ('path');
    const fs=require ('fs');
    app.use(express.static(path.join(__dirname,"public")));
    app.set("view engine", "pug");
    app.set ('views','views');
    console.log(__dirname);

     const home_page = require("./routes/home_page");
     app.use(home_page);

     const about = require("./routes/about");
     app.use(about);

     const contact = require("./routes/contact");
     app.use(contact);
     
     
     const      page = require("./routes/page");
     app.use(page);
     
     

    app.listen(3000);

