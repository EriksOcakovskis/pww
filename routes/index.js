const _ = require('lodash');
const models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Personal Weight Watch'
  });
});

router.post('/', (req, res) => {
  user_id = 3;
  weight = (_.pick(req.body, ['weight']));
  models.saveWeight(weight.weight, user_id);
  res.redirect('/');
});

module.exports = router;
