const express = require('express');
const router = express.Router();

console.log("admin");

router.get('/admin', (req, res, next) => {
    res.render('admin', {});
});
module.exports = router;