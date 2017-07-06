const _ = require('lodash');
const models = require('../models');
var express = require('express');
var router = express.Router();

/* GET weight data. */
router.post('/', function(req, res) {
  var userTimeOffset = req.body.timezoneOffset*60*60000;
  var userID = 3;
  var timeList = [];
  var weightList = [];
  models.getUserWeights(userID).then((userWeightsData) => {
    userWeightsData.forEach((value) => {
      d = new Date(value.timestamp.toString());
      userDate = new Date(d.getTime() - userTimeOffset);
      fromattedUserDate =
        `${('0' + userDate.getUTCDate()).slice(-2)}/${('0' + (userDate.getUTCMonth()+1)).slice(-2)}/${userDate.getUTCFullYear()} ${('0' + userDate.getUTCHours()).slice(-2)}:${('0' + userDate.getUTCMinutes()).slice(-2)}`;
      timeList.unshift(fromattedUserDate);
      weightList.unshift(value.weight);
    });

    res.send({
      type: 'line',
        data: {
          labels: timeList,
          datasets: [{
            label: 'Weight',
            data: weightList
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
