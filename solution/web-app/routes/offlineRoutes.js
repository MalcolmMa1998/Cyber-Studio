/**
 * @file offline routes
 * @author Mingze Ma
 */

var express = require('express');
var router = express.Router();

router.get('/not_found', (req, res) => {
  res.render('not_found', { title: 'Not Found' });
});

module.exports = router;