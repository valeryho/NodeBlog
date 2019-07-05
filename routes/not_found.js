const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    console.log(req);
    res.render('404',{});
});
module.exports = router;