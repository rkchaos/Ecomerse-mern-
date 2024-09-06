const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post("/MYorder", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }
        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving orders" });
    }
});
router.post("/Userdetail", async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ user: userId }).populate("user")
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ msg: "Error retrieving orders" });
    }
})
router.get("/order/:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await Order.findById(id).populate("user")
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ msg: "Error retrieving invoice" });
    }
})
router.patch("/order/cancel/:id", async (req, res) => {
    try {
let{id}=req.params
let order=await Order.findById(id)
if(!order){
    return res.status(404).json({ msg: "Order not found" });
}
let creationAt=new Date(order.createdAt)
let currentDate= new Date()
let diff=(currentDate-creationAt)/(1000*60*60*24)  //milli second
if(diff>3){
    return res.status(404).json({ msg: "Order cannot be cancelled after 3 days" });
}
order.status='canceled'
await order.save()
res.status(200).json({msg:"order cancel successfully"})
    }
    catch (err){
        res.status(500).json({ msg: "Error in cancel the order" });
    }
})
module.exports = router;
