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
    tableName: 'items',
    adapter: 'mysql-adapter',
    migrate: 'safe',
    attributes: {
        item_name: {
            type: 'string',
            required: true
        },
        img: {
            type: 'string',
            required: true
        },
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        }
    }
};