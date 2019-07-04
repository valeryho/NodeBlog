    const express=require('express');
    const app=express();
    const path = require ('path');
    const fs=require ('fs');

    app.use(express.static(path.join(__dirname,"public")));
    app.set ('views','views');
    console.log("test");


    
    app.listen(3000);

