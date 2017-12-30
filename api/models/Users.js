/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'users',
  adapter: 'mysql-adapter',
  migrate: 'safe',
  attributes: {
    user_name: {
      type: 'string',
      required: true
    },
    coins: {
      type: 'integer'
    },
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    }
  }
};

