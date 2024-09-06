const express = require("express")
const Product = require("../models/Product")
const User = require("../models/User")
const router = express.Router()


router.get("/products", async (req, res) => {
    try {
        let data = await Product.find({})
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Data not found" })
    }

})
router.get("/products/:name", async (req, res) => {
    try {
        let { name } = req.params

        let data = await Product.find({ name })
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Data not found" })
    }
})
router.get("/products/by/:id", async (req, res) => {
    try {
        let { id } = req.params
        let { page = 1, limit = 10 } = req.query
        // convert page and limit to integers
        const pageNum = parseInt(page, 10)
        const limitNum = parseInt(limit, 10)
        // calculate the skip value
        const skip = (pageNum - 1) * limitNum;
        let data = await Product.findById(id).populate({
            path: 'reviews',
            options: {
                skip :skip,
                limit: limitNum,
                sort: { createdAt: -1 }
            },
            populate: {
                path: 'users',
                model: 'User'
            }
        });

        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Data not found" })
    }
})
router.get("/explore-random", async (req, res) => {
    try {
        let count = await Product.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Product.find().skip(random).limit(3)
        res.status(200).json(recipe)
    }
    catch (err) {
        res.status(400).json({ msg: "Data not found" })
    }
})
router.post("/like-product", async (req, res) => {
    let productId = req.body.productId
    let userId = req.body.userId
    let user = await User.findById(userId)
    let isliked = user.whishlist.includes(productId)
    if (isliked) {
        await User.findByIdAndUpdate(userId, { $pull: { whishlist: productId } })
        res.status(201).send('remove');

    } else {
        await User.findByIdAndUpdate(userId, { $addToSet: { whishlist: productId } })
        res.status(201).send('ok');
    }

})
router.post("/like-products", async (req, res) => {
    try {
        let data = await User.findOne({ _id: req.body.userId }).populate("whishlist")
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Data not found" })
    }
})
router.get("/products/byrandom/:id", async (req, res) => {
    try {
        let { id } = req.params
        let data = await Product.findById(id)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Data not found" })
    }
})




module.exports = router