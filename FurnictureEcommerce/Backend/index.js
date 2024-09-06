const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const session = require("express-session")
const path = require('path')
const seed = require("./seed")
const products = require("./api/product")
const user = require("./api/user")
const cart = require("./api/cart")
const myorder=require("./api/order")
const loginwithGoogle = require("./api/loginwithGoogle")
const review =require("./api/review")
const bodyparser = require("body-parser")
const rawBody = require('raw-body')
const stripe = require("stripe")(process.env.STRIPKEY)

require("./auth/passport")

// const api=require("./api")
const passport = require('passport');
const Order = require('./models/Order');
const User = require('./models/User');
mongoose.connect(process.env.MONGOURL)
    .then(() => {
        console.log("connected to db")
    }).catch((err) => {
        console.log(err)
    })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: "GET,POST,PATCH,DELETE,PUT",
    credentials: true
}))
//seed()
// app.use(auth)
// coupdata()



// strip working for payemts
// app.use(bodyparser.json());
app.post("/create-checkout-session", async (req, res) => {
    const { product, userId,total } = req.body
    const lineItems = product.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.product.name,
                images: [item.product.img]
            },
            unit_amount: Math.round(item.product.price * 100)
        },
        quantity: item.quantity
    }))
    const newOrder = new Order({
        user: userId,
        products: product.map(item => ({
            productid: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            img: item.product.img,
            name: item.product.name,
           
        })),
        total:total,
        status: "pending",
    });
    await newOrder.save();
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:5173/My-order",
        cancel_url: "http://localhost:5173/payemtfaild",
        metadata: {
            userId: userId,
            orderId: newOrder._id.toString()
        }

    })
    res.json({ id: session.id })
})
const endpointSecret = process.env.ENDPOINT
app.post('/hooks', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];
    const payload = request.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    });
    let event;
    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Payment for session ${session.id} succeeded.`);
            await saveOrderToDatabase(session);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
});
const saveOrderToDatabase = async (session) => {
    try {
        const orderId = session.metadata.orderId;
const user= await User.findById(session.metadata.userId).populate("cart.product")

      const  order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        
        order.status = 'paid';
        await order.save();
        user.cart=[]
        await user.save()
        console.log('Order saved to database');
    } catch (err) {
        console.error('Error saving order to database:', err);
    }
};
app.use(products)
app.use(user)
app.use(cart)
app.use(myorder)
app.use(loginwithGoogle)
app.use(review)





app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`)
})

