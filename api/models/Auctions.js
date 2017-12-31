/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    tableName: 'auctions',
    adapter: 'mysql-adapter',
    migrate: 'safe',
    attributes: {
        userItemID: {
            type: 'integer',
            model: 'UserItem',
            via: 'id'
        },
        sellerName: {
            type: "string"
        },
        itemName: {
            type: "string"
        },
        itemImage: {
            type: "string"
        },
        quantity: {
            type: 'integer'
        },
        bestPrice: {
            type: 'integer'
        },
        minPrice: {
            type: 'integer'
        },
        isLife: {
            type: 'integer'
        },
        remaining: {
            type: 'integer'
        },
        winnerID: {
            type: 'integer',
            model: 'Users',
            via: 'id'
        },
        sellerID: {
            type: 'integer',
            model: 'Users',
            via: 'id'
        },
        id: {
            type: 'number',
            primaryKey: true,
            autoIncrement: true
        }
    }
};

