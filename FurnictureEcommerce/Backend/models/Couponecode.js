const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true

    },
    expirationDate: {
        type: String,
        required: true
    },
    usedBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})


const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;