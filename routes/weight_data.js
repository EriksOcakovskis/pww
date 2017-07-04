const _ = require('lodash');
const models = require('../models');
var express = require('express');
var router = express.Router();

/* GET weight data. */
router.get('/', function(req, res) {
  var user_id = 3;
  var time_list = [];
  var weight_list = [];
  models.getUserWeights(user_id).then((userWeightsData) => {

    userWeightsData.forEach((value) => {
      d = new Date(value.timestamp.toString());
      newDate =
        `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth()+1)).slice(-2)}/${d.getFullYear()} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
      time_list.unshift(newDate);
      weight_list.unshift(value.weight);
    });

    res.send({
      type: 'line',
        data: {
          labels: time_list,
          datasets: [{
            label: 'Weight',
            data: weight_list
          }]
        },
        options: {
          animation: {
            duration: 0, // general animation time
          },
          hover: {
            animationDuration: 0, // duration of animations when hovering an item
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
        }
      });
  });
});

module.exports = router;
