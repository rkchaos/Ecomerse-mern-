import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./myorder.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Myorder() {
    let [order, setOrder] = useState([])
    let navigate = useNavigate()
    useEffect(() => {
        let userId = localStorage.getItem("userid")
        let url = "http://localhost:8080/MYorder"
        let data = { userId }
        async function myorder() {
            let res = await axios.post(url, data)
            try {
                setOrder(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        myorder()
    }, [])

    let [user, setUser] = useState([])
    useEffect(() => {
        let userId = localStorage.getItem("userid")
        let url = "http://localhost:8080/Userdetail"
        let data = { userId }
        async function userdata() {
            let res = await axios.post(url, data)
            try {
                setUser(res.data)


            }
            catch (err) {
                console.log(err)
            }
        }
        userdata()
    }, [])
    let [update, setUpdate] = useState({ displayName: "", Address: "", OptionalAdrress: "", city: "", state: "", zip: "" })

    useEffect(() => {
        async function data() {
            let userId = localStorage.getItem("userid")
            let res = await axios.get(`http://localhost:8080/user/${userId}`)
            setUpdate(res.data)
        }
        data()
    }, [])
    function handleincoice(id) {
        navigate(`/order/${id}`)
    }
    let handelCancelOrder = async (orderId) => {
        try {
            let res = await axios.patch(`http://localhost:8080/order/cancel/${orderId}`)
            if (res.data.msg == "Order cannot be cancelled after 3 days") {
                toast.warn("Order cannot be cancelled after 3 days")
                alert("Order cannot be cancelled after 3 days")
            }
            else if (res.data.msg == "Order not found") {
                toast.warn('Order not found')
            }
            else {
                toast.success("Order cancelled successfully")
                setOrder(order.map(item => item._id === orderId ? { ...item, status: 'canceled' } : item))
               X
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const canCancel = (createdAt) => {
        let creationAt = new Date(createdAt)
        let currentDate = new Date()
        let diff = (currentDate - creationAt) / (1000 * 60 * 60 * 24)
        return diff <= 3
    }
    return (
        <div>
            {
                (order.length > 0) ? (
                    order.map((item, index) => {
                        return (
                            <div key={index}><div className="container-fluid">
                                <div className="container">
                                    <div className="d-flex justify-content-between align-items-center py-3">
                                        <h2 className="h5 mb-0">Order  <Link style={{ color: "blue" }}>{item._id} </Link></h2>

                                    </div>
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                    <div className="mb-3 d-flex justify-content-between">
                                                        <div>
                                                            <span className="me-3">{item.createdAt}</span>

                                                            <span className="me-3">Card</span>
                                                            {
                                                                item.status === "canceled" ? (
                                                                    <span className="badge rounded-pill bg-info">SHIPPING CANCEL</span>
                                                                ) : item.status === 'pending' ? (
                                                                    <span className="badge rounded-pill bg-info">Payment Failed</span>
                                                                ) : <span className="badge rounded-pill bg-info">SHIPPING</span>
                                                            }
                                                        </div>
                                                        <div className="d-flex">
                                                            <button onClick={() => handleincoice(item._id)} className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"><i className="bi bi-download" /> <span className="text">Invoice</span></button>
                                                            {/* <div className="dropdown">
                                                                <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                                                                    <i className="bi bi-three-dots-vertical" />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    <li><a className="dropdown-item" href="#"><i className="bi bi-pencil" /> Edit</a></li>
                                                                    <li><a className="dropdown-item" href="#"><i className="bi bi-printer" /> Print</a></li>
                                                                </ul>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <table className="table table-borderless">
                                                        <tbody>

                                                            {
                                                                item.products.map((product, index) => {
                                                                    return (

                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="d-flex mb-2">
                                                                                    <div className="flex-shrink-0">
                                                                                        <Link to={`/products/by/${product.productid}`}><img src={product.img} alt="" style={{ width: "50px", height: "50px" }} className="img-fluid" /></Link>
                                                                                    </div>
                                                                                    <div className="flex-lg-grow-1 ms-3">
                                                                                        <Link to={`/products/by/${product.productid}`} > <h6 className="small mb-0">{product.name}</h6></Link>

                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>{product.quantity}</td>
                                                                            <td className="text-end">{product.price}</td>
                                                                        </tr>


                                                                    )
                                                                })
                                                            }

                                                        </tbody>
                                                        <tfoot>

                                                            <tr>
                                                                <td colSpan={2}>Subtotal</td>
                                                                <td className="text-end">{item.total}</td>

                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>Shipping</td>
                                                                <td className="text-end">$0</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>Discount</td>
                                                                <td className="text-danger text-end">-$0</td>
                                                            </tr>
                                                            <tr className="fw-bold">
                                                                <td colSpan={2}>TOTAL</td>
                                                                <td className="text-end">{item.total}</td>
                                                            </tr>


                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <h3 className="h6">Payment Method</h3>
                                                            <p>Card<br />
                                                                Total: {item.total}

                                                                {
                                                                    item.status == 'paid' ? <span className="badge bg-success rounded-pill">  PAID</span> : <span className="badge bg-secondary rounded-pill">  Pending</span>
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <h3 className="h6">Billing address</h3>
                                                            {/* {
                                                                user.map((item, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <address>
                                                                                <strong>{item.user.displayName}</strong><br />
                                                                                Address :  {item.user.Address}<br />
                                                                                OptionalAdrress:  {item.user.OptionalAdrress}<br />
                                                                                City:{item.user.city}<br />
                                                                                State:{item.user.state}<br />
                                                                                Zip Code:{item.user.zip}<br />
                                                                            </address>
                                                                        </div>
                                                                    )
                                                                })
                                                            } */}
                                                            <div key={index}>
                                                                <address>
                                                                    <strong>{update.displayName}</strong><br />
                                                                    Address :  {update.Address}<br />
                                                                    OptionalAdrress:  {update.OptionalAdrress}<br />
                                                                    City:{update.city}<br />
                                                                    State:{update.state}<br />
                                                                    Zip Code:{update.zip}<br />
                                                                </address>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                    <h3 className="h6">Customer Notes</h3>

                                                    {
                                                        canCancel(item.createdAt) && item.status === 'paid' ? (
                                                            <>
                                                                <button className="btn btn-danger" onClick={() => handelCancelOrder(item._id)}>Cancle order</button>

                                                            </>
                                                        ) : item.status === 'pending' ? (
                                                            <>
                                                                <div class="alert alert-danger" role="alert">
                                                                    Payment pending
                                                                </div>
                                                                <button className="btn btn-danger" onClick={() => handelCancelOrder(item._id)}>Cancle order</button>
                                                            </>
                                                        ) : item.status === 'canceled' ? (
                                                            <div class="alert alert-danger" role="alert">
                                                                Your order is cancel successfully
                                                            </div>
                                                        ) : null
                                                    }

                                                </div>
                                            </div>
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                    <h3 className="h6">Shipping Information</h3>
                                                    <strong>FedEx</strong>
                                                    {/* <span><a href="#" className="text-decoration-underline" target="_blank">FF1234567890</a> <i className="bi bi-box-arrow-up-right" /> </span> */}
                                                    <hr />
                                                    <h3 className="h6">Address</h3>
                                                    <address>
                                                        <div key={index}>
                                                            <address>
                                                                <strong>{update.displayName}</strong><br />
                                                                Address :  {update.Address}<br />
                                                                OptionalAdrress:  {update.OptionalAdrress}<br />
                                                                City:{update.city}<br />
                                                                State:{update.state}<br />
                                                                Zip Code:{update.zip}<br />
                                                            </address>
                                                        </div>
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                        )
                    })

                ) : <div className='d-flex justify-content-center' style={{ marginTop: "90px" }}>
                    <img style={{ height: '510px', width: "600px" }} src="/order.png" alt="" />
                </div>
            }
            <ToastContainer
                theme='dark'
            />
        </div>

    )
}

export default Myorder