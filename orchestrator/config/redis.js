const Redis = require('ioredis');
const redis = new Redis({
    host: 'redis-11489.c299.asia-northeast1-1.gce.cloud.redislabs.com',
    port: 11489,
    username: 'default',
    password: `FfLxJhSw3ns7jzLkKrHQ78nyWjO6wP8B`
})

module.exports = redis