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
    tableName: 'user_item',
    adapter: 'mysql-adapter',
    migrate: 'safe',
    attributes: {
        userID: {
            type: 'integer',
            required: true,
            model: 'users',
            via: 'id'
        },
        itemID: {
            type: 'integer',
            required: true,
            model: 'items',
            via: 'id'
        },
        quantity: {
            type: 'integer'
        },
        id: {
            type: 'number',
            primaryKey: true,
            autoIncrement: true
        }
    }
};

