const express = require("express")
const User = require("../models/User")
const passport = require('passport')
const router = express.Router()

router.get("/user", async (req, res) => {
    try {
        let data = await User.find({})
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Something went wrong" })
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        let { id } = req.params
        let data = await User.findById(id)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(400).json({ msg: "Something went wrong" })
    }
})

router.patch("/user/update/:id", async (req, res) => {
    try {
        let { id } = req.params
        let { displayName, Address, OptionalAdrress, city, state, zip } = req.body
        let updatestudent = await User.findByIdAndUpdate(id, { displayName, Address, OptionalAdrress, city, state, zip })
        res.status(200).json({ msg: "update successfully" })
    }
    catch (err) {
        res.status(400).json({ msg: "Something went wrong" })
    }
})


router.delete("/user/delete/:id", async (req, res) => {
    try {
        let { id } = req.params
        let del = await User.findByIdAndDelete(id)
        res.status(200).json({ msg: "delete successfully" })

    }
    catch (err) {
        res.status(400).json({ msg: "Something went wrong" })
    }
})
module.exports = router