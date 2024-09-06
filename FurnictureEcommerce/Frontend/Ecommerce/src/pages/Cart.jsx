import React, { useEffect, useState } from 'react'
import "./cart.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { RiDeleteBinFill } from "react-icons/ri";

function Cart({nextStep,step}) {
    async function handleDelete() {
        let userId = localStorage.getItem("userid")
        let confirm = window.confirm("Whould you like too Clear the Cart")
        if (confirm) {
            await axios.post(`http://localhost:8080/user/all`, { userId })
                .then((res) => {
                    location.reload()
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    let [cart, setCart] = useState([])
    let [total, setTotal] = useState(0)
    useEffect(() => {
        async function data() {
            let userId = localStorage.getItem("userid")
            let res = await axios.post("http://localhost:8080/cart", { userId })
                .then((res) => {
                    setCart(res.data.cart)
                    setTotal(res.data.total)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        data()
    }, [])

    const handleQuantityChange = async (productId, quantity) => {
        const userId = localStorage.getItem("userid")
        try {
            const res = await axios.post("http://localhost:8080/user/update-quantity", { userId, productId, quantity })
            setCart(res.data.cart)

            calculateTotal(res.data.cart)
        } catch (err) {
            console.log(err)
        }
    }

    const calculateTotal = (cart) => {
        const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        setTotal(totalPrice)
    }
    // async function applyCoupon() {
    //     let userId = localStorage.getItem("userid")
    //     try {
    //         let res = await axios.post("http://localhost:8080/apply-coupon", { userId, couponCode });
    //         setTotal(res.data.newtotal)
    //         setDiscount(res.data.discountAmount)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }
    async function handlecartdelete(id) {
        let userId = localStorage.getItem("userid")
        let confirm = window.confirm("Whould you like remove the product from cart")
        let productId = id
        let data = { userId, productId }

        if (confirm) {
            await axios.delete(`http://localhost:8080/cart/delete`, { data })
                .then((res) => {
                    location.reload()
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <div>
            {
                cart.length > 0 ? (
                    <div class="container padding-bottom-3x mb-1">
                        {
                            step===1?<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style={{width:"50%"}}>50%</div>
                          </div>:null
                        }
<br />
<br />
                        <div class="alert alert-info alert-dismissible fade show text-center" style={{ "marginBottom": "30px" }}><span class="alert-close" data-dismiss="alert">Thanks for shopping</span></div>
                        <div class="table-responsive shopping-cart">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th class="text-center">Quantity</th>
                                        <th class="text-center">Subtotal</th>
                                        <th class="text-center">Discount</th>
                                        <th class="text-center"><button onClick={handleDelete} className='btn btn-sm btn-outline-danger'>Clear Cart</button></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {

                                        cart.map((item, index) => {
                                            return (

                                                <tr key={index}>
                                                    <td>
                                                        <div class="product-item">
                                                            <Link class="product-thumb" to={`/products/by/${item.product._id}`} ><img src={item.product.img} alt="Product" /></Link>
                                                            <div class="product-info">
                                                                <h4 class="product-title"><Link to={`/products/by/${item.product._id}`}>{item.product.name}</Link></h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-center">
                                                        <div class="count-input">
                                                            <select className="form-control" value={item.quantity} onChange={(e) => handleQuantityChange(item.product._id, Number(e.target.value))}>
                                                                {[...Array(10).keys()].map(i => (
                                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                    </td>
                                                    <td class="text-center text-lg text-medium">${item.product.price * item.quantity}</td>
                                                    <td class="text-center text-lg text-medium">-</td>
                                                    <td class="text-center text-lg text-medium"> <button onClick={() => handlecartdelete(item.product._id)} style={{ border: "none", backgroundColor: "white", width: "30px", height: "30px" }}> <RiDeleteBinFill /> </button>

                                                    </td>
                                                    <td class="text-center">
                                                        <i className="fa fa-trash"></i>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div class="shopping-cart-footer">
                            <div class="column">
                                {/* <form className="coupon-form" onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}>
                            <input className="form-control form-control-sm" type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} required />
                                    <button className="btn btn-outline-primary btn-sm" type="submit" style={{ width: "150px" }} >Apply Coupon</button>
                                </form> */}
                            </div>
                            <div class="column text-lg">Subtotal: <span class="text-medium">${total}</span></div>
                        </div>
                        <div class="shopping-cart-footer">
                            <div class="column"><Link style={{ width: '200px' }} to={"/ALLproducts"} class="btn btn-outline-secondary"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</Link></div>
                            <div class="column">   <button onClick={nextStep} style={{ width: "100px" }} className='btn btn-primary'> Next</button></div>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-center' style={{ marginTop: "90px" }}>
                        <img style={{ height: '510px', width: "600px" }} src="/cartempty.jpg" alt="" />
                    </div>
                )


            }
        </div >
    )
}

export default Cart