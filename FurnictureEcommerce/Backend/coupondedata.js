const mongoose = require("mongoose")
const Coupon = require("./models/Couponecode")




let coup=[
    {
        code:"FCSMajestic",
        discount:10,
        expirationDate: new Date().toDateString()
    }

]



async function coupdata(){
    await Coupon.insertMany(coup)
    console.log("coupdata")
}

module.exports=coupdata