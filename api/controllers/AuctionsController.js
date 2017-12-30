/** 
    The idea is to make a fake auction works as
    a flag to give signal when new auction starting.
*/
const flagAuctionStatus = 10;
module.exports = {

    /**
     * Every user join the app should get the flag to be notified
     * when a new auction starting.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getTheFlag(req, res) {
        let flagAuction = await Auctions.findOne({ isLife: flagAuctionStatus });
        if (!flagAuction) {
            flagAuction = await Auctions.create({
                isLife: flagAuctionStatus
            })
        }

        if (req.socket) {
            Auctions.subscribe(req.socket, flagAuction.id);
        }

        /**
         * Start the auctions interval to get the life auction status.
         */
        _auctionInterval();

        this.subscribeToLifAuction(req, res);
    },

    /**
     * To subscribe in the life auction.
     * 
     * @param {*make} req 
     * @param {*} res 
     */
    async subscribeToLifAuction(req, res) {
        const lifeAuction = await Auctions.findOne({ isLife: 1 })
            .populate("userItemID");
        if (lifeAuction) {
            if (req.socket) {
                Auctions.subscribe(req.socket, lifeAuction.id);
            }
            res.send({
                message: "subsribed",
                auction: lifeAuction
            });
        } else {
            res.send({ message: "No life auctions" });
        }
    },

    async unsubscribe(req, res) {
        if (req.socket) {
            Auctions.unsubscribe(req.socket, req.param('auctionID'));
        }
        res.send({ message: "unsubscribed" });
    },

    async createAuction(req, res) {
        let immediatelyStart = 1;

        let lifeAuction = await Auctions.findOne({ isLife: 1 });

        if (lifeAuction) {
            immediatelyStart = 2;
        }

        let toSellItem = await UserItem.findOne({
            id: req.body.userItemID
        });

        const newAuction = await Auctions.create({
            userItemID: req.body.userItemID,
            sellerName: req.body.sellerName,
            itemName: req.body.itemName,
            itemImage: req.body.itemImage,
            quantity: Number(req.body.quantity),
            /** Start price - 1 to force the winner to put at least the start price */
            bestPrice: Number(req.body.startPrice) - 1,
            isLife: 2,
            remaining: 90,
            winnerID: req.body.winnerID,
            sellerID: req.body.sellerID
        });

        toSellItem = await UserItem.update({
            id: toSellItem.id
        }, { quantity: Number(toSellItem.quantity) - Number(req.body.quantity) });

        /**
         * Immediately start when there is no life auctions.
         */
        if (immediatelyStart === 1) {
            res.send({
                message: `Selling ${Number(req.body.quantity)} of ${req.body.itemName} for ${req.body.startPrice} coins or more will start immediately.`,
                type: 'info'
            });
        } else {
            /**
             * put in the queue if there is another life auction.
             */
            res.send({
                message: `Selling ${Number(req.body.quantity)} of ${req.body.itemName} for ${req.body.startPrice} coins or more is in the queue.`,
                type: 'info'
            });
        }
    },

    /**
     * Bid on auction request.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async bid(req, res) {
        const auction = await Auctions.findOne({ id: req.body.auctionID });
        auction.remaining = Math.max(11, auction.remaining);

        if (Number(req.body.bidValue) > auction.bestPrice) {
            await Auctions.update({ id: auction.id },
                {
                    bestPrice: Number(req.body.bidValue),
                    winnerID: req.body.userID,
                    remaining: auction.remaining
                }
            )
            res.send({ message: "done" });
        } else {
            res.send({ message: "error" })
        }
    }
}

let intervaleStarted = false;

/**
 * Start the auctions interval to get the life auction status.
 * 
 * Singlton throught the current instance.
 */

async function _auctionInterval() {
    let flagAuction = await Auctions.findOne({ isLife: flagAuctionStatus });

    if (!intervaleStarted) {
        intervaleStarted = true;
        setInterval(async () => {
            /**
             * isLife = 0 if it is ended
             *        = 1 if the auction is life
             *        = 2 if it is in the queue
             *        = 10 if it is the flag auction
             */
            let lifeAuction = await Auctions.findOne({ isLife: 1 });

            if (lifeAuction && lifeAuction.remaining > 0) {
                lifeAuction = await Auctions.update({ id: lifeAuction.id },
                    { remaining: lifeAuction.remaining - 1 });
                lifeAuction = lifeAuction[0];

                Auctions.publishUpdate(lifeAuction.id, {
                    flag: false,
                    type: 1,
                    message: "Life Auction updated",
                    auction: {
                        bsetPrice: lifeAuction.bestPrice,
                        remaining: lifeAuction.remaining
                    }
                });
            }
            else if (lifeAuction && lifeAuction.remaining === 0) {
                lifeAuction = await Auctions.update(
                    { id: lifeAuction.id },
                    { isLife: 0 }
                );

                lifeAuction = lifeAuction[0];

                let seller = await Users.findOne({ id: lifeAuction.sellerID });
                let winner = await Users.findOne({ id: lifeAuction.winnerID });

                if (seller.id !== winner.id) {
                    await Users.update(
                        { id: seller.id },
                        { coins: seller.coins + Number(lifeAuction.bestPrice) }
                    )
                    await Users.update(
                        { id: winner.id },
                        { coins: winner.coins - Number(lifeAuction.bestPrice) }
                    )
                }

                const soldUserItem = await UserItem.findOne({ id: lifeAuction.userItemID });

                const soldItem = await Items.findOne({ id: soldUserItem.itemID })

                const toAddUserItem = await UserItem.findOne({
                    userID: winner.id,
                    itemID: soldItem.id
                });

                await UserItem.update({
                    id: toAddUserItem.id
                }, {
                        quantity: toAddUserItem.quantity + lifeAuction.quantity
                    }
                )


                Auctions.publishUpdate(flagAuction.id, {
                    flag: true,
                    type: 2,
                    message: `Current life auction has ended.`
                });
            } else if (!lifeAuction) {
                const queuedAuctions = await Auctions.find({ isLife: 2 });

                if (queuedAuctions && queuedAuctions.length > 0) {
                    const nextAuction = queuedAuctions[0];
                    const startedAuction =
                        await Auctions.update({ id: nextAuction.id },
                            { isLife: 1 }
                        );

                    Auctions.publishUpdate(flagAuction.id, {
                        flag: true,
                        type: 1,
                        message: "New auction started",
                    });
                }

            }
        }, 1000);
    }

}