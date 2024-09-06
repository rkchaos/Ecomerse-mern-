const express = require("express");
const Product = require("../models/Product");
const Review = require("../models/Review");
const router = express.Router()




router.post("/products/:id/rating", async (req, res) => {
    try {
        let { rating, comments, userId } = req.body;
        let { id } = req.params;
        let product = await Product.findById(id)
        let review = new Review({
            rating: rating,
            comments: comments,
            users: userId,

        })
        product.reviews.push(review)
        await product.save()
        await review.save()
        res.status(201).json({ message: "Review Added Successfully" })
    }
    catch (err) {
        console.log(err)
    }
})
router.get("/review/all", async (req, res) => {
    try {
        let data = await Review.find({}).populate("users")
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
})
router.delete("/review/delete/:productId/:id", async (req, res) => {
    try {

        let { productId, id } = req.params
        let review = await Review.find({})
        let deletereview = await Review.findByIdAndDelete(id)
        let product = await Product.findByIdAndUpdate(productId, {
            $pull: { reviews: id }

        })
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        res.status(200).json({ mag: "Review deleted successfully" })
    }

    catch (err) {
        res.status(400).json({ mag: "Error accured" })
    }
})
router.patch("/review/update/:productId/:id", async (req, res) => {
    try {
        let { productId, id } = req.params
        let { rating, comments } = req.body
        let review = await Review.findByIdAndUpdate(id, { rating, comments }, { new: true })
        if (!review) {
            return res.status(404).json({ message: "Review Not Found" })
        }
        res.status(200).json({ message: "Review Updated Successfully" })
    }
    catch (err) {
        res.status(400).json({ mag: "Error accured" })
    }
})

module.exports = router