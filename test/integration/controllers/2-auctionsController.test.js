var chai = require('chai');
var request = require('supertest'),
    should = require('should');

var expect = chai.expect;

describe('Auction action tests.', function () {

    const unregisteredUserName = "registered";
    const registeredUserName = "test";

    before(function (done) {
        done(null, sails);
        Items.destroy().exec((err, res) => { });
        Users.destroy().exec((err, res) => { });
        Auction.destroy().exec((err, res) => { });
        UserItem.destroy().exec((err, res) => { });
    });

    it('Should return no live auction where there is not.', function (done) {
        request(sails.hooks.http.app)
            .post('/api/auction/subscribe')
            .send({})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).to.equals("No live auctions");
                done();
            });
    });

    it('Should create an auction immediatly.', function (done) {
        Users.create({
            user_name: "test",
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
                }]).exec((err, userItems) => {
                    request(sails.hooks.http.app)
                        .post('/api/auction/create')
                        .send({
                            userItemID: userItems[0].id,
                            sellerName: "test",
                            itemName: allItems[0].item_name,
                            itemImage: allItems[0].img,
                            quantity: 10,
                            startPrice: 100
                        })
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            expect(res.body.message).to
                                .equals("Selling 10 of carrots for 100 coins or more will start immediately.");
                            done();
                        });
                })
            })
        });
    });




});
