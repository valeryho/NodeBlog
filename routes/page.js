const express = require('express');
const router = express.Router();

router.get("1", (req, res, next) => {

    res.render('blog_page', {});
});

module.exports = router;