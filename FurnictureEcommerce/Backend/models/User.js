const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    displayName: String,
    image: String,
    Address: String,
    OptionalAdrress: String,
    city: String,
    state: String,
    zip: Number,
    whishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    // appliedCoupon: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Coupon'
    // }

}, { timeseries: true })
const User = new mongoose.model("User", userSchema)
module.exports = User;