const redis = require('./promiseRedis');

// user:id {email:..., pass_hash:...}
// weight:id {weight:..., timestamp:...}
// weight user_id weight_id

function saveWeight(weight, user_id) {
  redis._incr('next_weight_id').then((weight_id) => {
    timeNow = new Date().toISOString();
    collection = ['weight', weight, 'timestamp', timeNow];
    return redis._hmset(`weight:${weight_id}`, collection), weight_id;
  }).then((weight_id) => {
    return redis._lpush(`user_weights:${user_id}`, weight_id);
  }).catch((error) => {
    console.log(error);
  });
}

function fetchWeightList(userWeightIdList) {
  userWeightsData = [];
  return userWeightIdList.reduce((pr, wId) => {
    return pr.then(() => {
      return redis._hgetall(`weight:${wId}`).then((result) => {
        userWeightsData.push(result);
        return userWeightsData;
      });
    });
  }, Promise.resolve());
}

function getUserWeights(user_id) {
  return redis._lrange(`user_weights:${user_id}`, 0, -1)
  .then((userWeightIdList) => {
    return fetchWeightList(userWeightIdList);
  }).catch((error) => {
    console.log(error);
  });
}

module.exports = {
  saveWeight,
  getUserWeights
};