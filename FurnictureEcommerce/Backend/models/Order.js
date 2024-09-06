const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    products: [
        {
            productid: {
                type: String,

            },
            quantity: {
                type: Number,

            },
            price: {
                type: Number
            },
            img: {
                type: String
            },
            name: {
                type: String
            },
            desc: {
                type: String
            },
           
        }
    ],
    total: {
        type: Number,
    },

    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered", "canceled"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    payment_method_types: {
        type: String,

    }

})
const Order = mongoose.model("Order", orderSchema)
module.exports = Order

