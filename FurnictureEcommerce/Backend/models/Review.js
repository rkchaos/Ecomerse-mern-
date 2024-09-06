const mongoose = require("mongoose")

let ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comments: {
        type: String,
        trim: true
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})
const Review=mongoose.model("Review",ReviewSchema)
module.exports = Review;