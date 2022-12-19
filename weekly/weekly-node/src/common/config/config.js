// default config
module.exports = {
  workers: 0,
  host: '127.0.0.1',
  port: '8362',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
    gcInterval: 10 * 60 * 1000,
  },
};
