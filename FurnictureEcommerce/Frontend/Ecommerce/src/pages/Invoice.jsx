import React, { useEffect, useState } from 'react'
import "./invoice.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Invoice() {
    let [order, setOrder] = useState(null)
    let parms = useParams()
    useEffect(() => {
        let url = `http://localhost:8080/order/${parms.id}`
        async function myorder() {
            let res = await axios.get(url)

            try {
                setOrder(res.data)
                console.log(res.data)

            }
            catch (err) {
                console.log(err)
            }
        }
        myorder()
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
    return (
        <div className="container">
            {
                order && order.status == "paid" ? (

                    <div className="row">

                        <div className="col-xs-12">
                            <div className="grid invoice">
                                <div className="grid-body">
                                    <div className="invoice-title">
                                        <div className="row">
                                            <div className="col-xs-12">

                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <h2>
                                                    invoice
                                                    <br />
                                                    <br />
                                                    order <span style={{ color: 'blue' }} className="small">{order._id}</span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <address>
                                                <strong>Billed To:</strong>
                                                <br />
                                                {update.displayName}
                                                <br />
                                                {update.Address}
                                                <br />
                                                Optional Address :{update.OptionalAdrress}
                                                <br />

                                            </address>
                                        </div>
                                        <div className="col-xs-6 text-right">
                                            <address>
                                                <strong>Shipped To:</strong>
                                                <br />
                                                {update.displayName}
                                                <br />
                                                {update.Address}
                                                <br />
                                                Optional Address :{update.OptionalAdrress}
                                                <br />
                                            </address>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <address>
                                                <strong>Payment Method:</strong>
                                                <br />
                                                Card
                                                <br />
                                                {update.email}
                                                <br />
                                            </address>
                                        </div>
                                        <div className="col-xs-6 text-right">
                                            <address>
                                                <strong>Order Date:</strong>
                                                <br />
                                                17/06/14
                                            </address>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3>ORDER SUMMARY</h3>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="line">
                                                        <td>
                                                            <strong>#</strong>
                                                        </td>
                                                        <td className="text-center">
                                                            <strong>PRODUCT</strong>
                                                        </td>

                                                        <td className="text-right">
                                                            <strong>QUANTITY</strong>
                                                        </td>
                                                        <td className="text-right">
                                                            <strong>PRICE</strong>
                                                        </td>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        order.products.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <strong>{item.name}</strong>
                                                                        <br />
                                                                    </td>
                                                                    <td className="text-center">{item.quantity}</td>
                                                                    <td className="text-center">{item.price}</td>

                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td colspan="3"></td>
                                                        <td class="text-right"><strong>Taxes</strong></td>
                                                        <td class="text-right"><strong>N/A</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3">
                                                        </td><td class="text-right"><strong>Total</strong></td> 
                                                        <td class="text-right"><strong>{order.total}</strong></td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div class="alert alert-danger" role="alert">
                        Your payemt is Pending
                    </div>
                )

            }
        </div>



    )
}

export default Invoice