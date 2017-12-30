module.exports = {
    async enter(req, res) {
        let user = await Users.findOne({
            user_name: req.params.name
        });

        /**
         * send back the user if it is found
         */
        if (user) {
            const userInv = await UserItem.find({
                userID: user.id
            }).populate('itemID');

            res.send({ user, userInv });
        } else {
            /**
             * create a new user if it is not found
             */
            let allItems = await Items.find();
            if (!allItems || allItems.length === 0) {
                /**
                 * Create new items if it is not found
                 */
                allItems = await Items.create(
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
                )
            }

            user = await Users.create({
                user_name: req.params.name,
                coins: 1000
            });

            /**
             * Create the new user items
             */
            await UserItem.create([{
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
                quantity: 1
            }]);

            const userInv = await UserItem.find({
                userID: user.id
            }).populate('itemID');

            res.send({ user, userInv });
        }
    }
};

