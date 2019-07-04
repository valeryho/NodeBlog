const express = require('express');
const router = express.Router();


console.log("about");
router.get("/about", (req, res, next) => {

    res.render('about', {});
});



module.exports = router;