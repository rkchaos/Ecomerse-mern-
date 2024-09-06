const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Product = require("../models/Product")
const Coupon = require("../models/Couponecode")




router.post("/cart", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).populate("cart.product");
        let totalAmount = user.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        res.status(200).json({ cart: user.cart, total: totalAmount });
    } catch (err) {
        res.status(400).json({ msg: "Server error" });
    }
});
// router.post("/apply-coupon", async (req, res) => {
//     try {
//         let { userId, couponCode } = req.body
//         const coupon = await Coupon.findOne({ code: couponCode })
//         if (!coupon) {
//             return res.status(400).json({ msg: "Invalid Coupon Code" })
//         }
//         const currentDate = new Date().toDateString()
//         if (currentDate > coupon.expirationDate) {
//             return res.status(400).json({ msg: "Coupon Expired" })
//         }
//         if (coupon.usedBy.includes(userId)) {
//             return res.status(400).json({ msg: "Coupon Already Used" })
//         }
//         const user = await User.findById(userId).populate("cart.product")
//         if (!user) {
//             return res.status(400).json({ msg: "User not found" })
//         }
//         const totalAmount = user.cart.reduce((sum, curr) => sum + curr.product.price * curr.quantity, 0)
//         const discountAmount = totalAmount * (coupon.discount / 100)
//         const newtotal = totalAmount - discountAmount;
//         coupon.usedBy.push(userId)
//         await coupon.save()
//         res.status(200).json({ discountAmount, newtotal })
//     }
//     catch (err) {
//         res.status(400).json({ msg: "Server error in coupon" })
//     }
// })
router.post("/user/add", async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body
        const user = await User.findById(userId)
        const existingProduct = user.cart.find(item => item.product.toString() === productId)
        if (existingProduct) {
            res.status(200).json({ message: "your product is already in cart" })
        } else {
            user.cart.push({ product: productId, quantity })
            res.status(200).json({ message: "your product is added to cart" })
        }
        await user.save()

    } catch (err) {
        res.status(400).json({ msg: "Failed to add" })
    }
})
router.post("/user/update-quantity", async (req, res) => {
    try {
        let { productId, userId, quantity } = req.body
        let user = await User.findById(userId)
        let cartItem = user.cart.find(item => item.product.toString() === productId)
        if (cartItem) {
            cartItem.quantity = quantity
            await user.save()
            const populatedUser = await User.findById(userId).populate("cart.product")
            res.status(200).json({ msg: "cart Updated", cart: populatedUser.cart })
        } else {
            res.status(400).json({ msg: "Product not found in cart" })
        }
    }
    catch (err) {
        res.status(400).json({ msg: "Failed to update quantity" })
    }
})
router.delete("/cart/delete", async (req, res) => {
    try {
        let productId = req.body.productId
        let userId = req.body.userId
        let user = await User.findById(userId)
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save()
        res.status(200).json({ message: "Product delet from  cart",cart:user.cart })
    }
    catch (err) {
        res.status(400).json({ msg: "Failed too delete" })
    }
})


router.post("/user/all", async (req, res) => {
    try {
        let userId = req.body.userId
        let user = await User.findById(userId)
        user.cart = []
        await user.save()
        res.status(200).json({ message: "Cart is empty" })
    }
    catch (err) {
        res.status(400).json({ msg: "Failed too delete" })
    }
})





module.exports = router