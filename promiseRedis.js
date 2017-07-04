const redis = require('redis');
var redisServer = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
var redisClient = redis.createClient(redisServer);

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

function _incr(int) {
  return new Promise((resolve, reject) => {
    redisClient.incr(int, (err, result) => {
      if (err) {
        reject('Database error');
      } else {
        resolve(result);
      }
    });
  });
}

function _hmset(hash, collection) {
  return new Promise((resolve, reject) => {
    redisClient.hmset(hash, collection, (err, result) => {
      if (err) {
        reject('Database error');
      } else {
        resolve(result);
      }
    });
  });
}

function _hset(hash, key, value) {
  return new Promise((resolve, reject) => {
    redisClient.hset(hash, key, value, (err, result) => {
      if (err) {
        reject('Database error');
      } else {
        resolve(result);
      }
    });
  });
}

function _lpush(list, value) {
  return new Promise((resolve, reject) => {
    redisClient.lpush(list, value, (err, result) => {
      if (err) {
        reject('Database error');
      } else {
        resolve(result);
      }
    });
  });
}

function _hget(hash, key) {
  return new Promise((resolve, reject) => {
    redisClient.hget(hash, key, (err, result) => {
      if (err) {
        reject('Database error');
      } else if (!result){
        reject('No value for that key');
      } else {
        resolve(result);
      }
    });
  });
}

function _hgetall(hash) {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(hash, (err, result) => {
      if (err) {
        reject('Database error');
      } else if (!result) {
        reject('This hash does not exist');
      } else {
        resolve(result);
      }
    });
  });
}


function _lrange(list, start, end) {
  return new Promise((resolve, reject) => {
    redisClient.lrange(list, start, end, (err, result) => {
      if (err) {
        reject('Database error');
      } else if (!result) {
        reject('This hash does not exist');
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  _incr,
  _hset,
  _hmset,
  _hget,
  _hgetall,
  _lpush,
  _lrange
};