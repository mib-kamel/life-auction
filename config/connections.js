module.exports.connections = {
  localDiskDb: {
    adapter: 'sails-disk'
  },
  mysql: {
    adapter: 'sails-mysql',
    host: '127.0.0.1',
    user: 'root', //optional
    password: '', //optional
    database: 'life_auction' //optional
  }
};
