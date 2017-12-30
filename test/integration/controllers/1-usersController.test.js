var chai = require('chai');
var request = require('supertest'),
    should = require('should');

var expect = chai.expect;

describe('Users enter tests', function () {

    const unregisteredUserName = "registered";
    const registeredUserName = "test";

    before(function (done) {
        done(null, sails);
        Items.destroy().exec((err, res) => { });
        Users.destroy().exec((err, res) => { });
        Auction.destroy().exec((err, res) => { });
        UserItem.destroy().exec((err, res) => { });
    });

    it('Should create a new user when not registered name enter.', function (done) {
        request(sails.hooks.http.app)
            .post('/api/enter/' + unregisteredUserName)
            .send({})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.haveOwnProperty("user");
                done();
            });
    });

    it('Should Assign 3 items to the create user.', function (done) {
        request(sails.hooks.http.app)
            .post('/api/enter/' + unregisteredUserName)
            .send({})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.userInv.length).to.equals(3);
                done();
            });
    });

    it('Should return the user info when his name is regitered before.', function (done) {
        Users.create({
            user_name: registeredUserName,
            coins: 2000
        }).exec((err, user) => {
            Items.create(
                [{
                    item_name: "carrots",
                    img: "carrots.png"
                },
                {
                    item_name: "breads",
                    img: "bread.png"
                },
                {
                    item_name: "diamonds",
                    img: "diamond.png"
                }]
            ).exec((err, allItems) => {
                UserItem.create([{
                    userID: user.id,
                    itemID: allItems[0].id,
                    quantity: 18
                },
                {
                    userID: user.id,
                    itemID: allItems[1].id,
                    quantity: 30
                },
                {
                    userID: user.id,
                    itemID: allItems[2].id,
                    quantity: 20
                }]).exec(() => {
                    request(sails.hooks.http.app)
                        .post('/api/enter/' + registeredUserName)
                        .send({})
                        .expect(200)
                        .end(async function (err, res) {
                            if (err) return done(err);
                            expect(res.body.user.coins).to.equals(2000);
                            done();
                        });
                })
            })
        });
    });

});
