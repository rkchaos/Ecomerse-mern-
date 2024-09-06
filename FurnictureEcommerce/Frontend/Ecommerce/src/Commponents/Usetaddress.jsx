import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
import "./useaddress.css"
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
function Usetaddress({ prevStep, nextStep, step }) {
    const navigate = useNavigate()
    let [update, setUpdate] = useState({ displayName: "", Address: "", OptionalAdrress: "", city: "", state: "", zip: "" })
    let parm = useParams()

    useEffect(() => {
        async function data() {
            let userId = localStorage.getItem("userid")
            let res = await axios.get(`http://localhost:8080/user/${userId}`)
            setUpdate(res.data)
        }
        data()
    }, [])

    async function handleSubmit(e) {
        try {
            let userId = localStorage.getItem("userid")
            let res = await axios.patch(`http://localhost:8080/user/update/${userId}`, update)
            navigate(`/profile/${parm.id}`)
        }
        catch (err) {
            console.log(err)
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


    const makepayment = async () => {
        let userId = localStorage.getItem("userid")
        const stripe = await loadStripe("pk_test_51PHlj2SArbXApH71lARclPWBlqCHLZAGmAXMlrkodhdepEagkHg6f1mbjVf3o6PSQycDvEORRmQmgPvRykqwD6oJ00ccfh1363");
        const body = {
            product: cart,
            userId: userId,
            total: total
        }

        const header = {
            "Content-Type": "application/json",
        }
        const response = await fetch(`http://localhost:8080/create-checkout-session`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        })
        const session = await response.json()
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
        if (result.error) {
            console.log(result.error)
        }
    }

    return (
        <div>
            <div className="container">
                {
                    step === 2 ? <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style={{ width: "100%" }}>100%</div>
                    </div> : null
                }
                <br />
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body">
                                <ol className="activity-checkout mb-0 px-4 mt-3">
                                    <li className="checkout-item">
                                        <div className="avatar checkout-icon p-1">
                                            <div className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bxs-receipt text-white font-size-20" />
                                                <RiBillLine />
                                            </div>
                                        </div>
                                        <div className="feed-item-list">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Billing Info</h5>

                                                <div className="mb-3">
                                                    <form>
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="billing-name"
                                                                        >
                                                                            Name
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="billing-name"
                                                                            placeholder="Enter name"
                                                                            value={update.displayName} onChange={e => setUpdate({ ...update, displayName: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="billing-email-address"
                                                                        >
                                                                            Email Address
                                                                        </label>
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            id="billing-email-address"
                                                                            placeholder="Enter email"
                                                                            value={update.email}
                                                                            disabled

                                                                        />
                                                                    </div>
                                                                </div>
                                                               
                                                            </div>
                                                            <div className="mb-3">
                                                                <label
                                                                    className="form-label"
                                                                    htmlFor="billing-address"
                                                                >
                                                                    Address
                                                                </label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="billing-address"
                                                                    rows={3}
                                                                    placeholder="Enter full address"
                                                                    value={update.Address} onChange={e => setUpdate({ ...update, Address: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label
                                                                    className="form-label"
                                                                    htmlFor="billing-address"
                                                                >
                                                                 Optional Address
                                                                </label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="billing-address"
                                                                    rows={3}
                                                                    placeholder="Enter full address"
                                                                    value={update.OptionalAdrress} onChange={e => setUpdate({ ...update, OptionalAdrress: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="mb-4 mb-lg-0">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="billing-city"
                                                                        >
                                                                            State
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="billing-city"
                                                                            placeholder="Enter City"
                                                                            value={update.state} onChange={e => setUpdate({ ...update, state: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-4 mb-lg-0">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="billing-city"
                                                                        >
                                                                            City
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="billing-city"
                                                                            placeholder="Enter City"
                                                                            value={update.city} onChange={e => setUpdate({ ...update, city: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="mb-0">
                                                                        <label className="form-label" htmlFor="zip-code">
                                                                            Zip / Postal code
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="zip-code"
                                                                            placeholder="Enter Postal code"
                                                                            value={update.zip} onChange={e => setUpdate({ ...update, zip: e.target.value })}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                    <div class="form-group mb-4">
                                        <button style={{ width: "150px" }} type="button" class="btn btn-primary" data-bs-toggle="modal" id="deleteButton" data-bs-target="#updateModal">Update Acount</button>
                                        <button onClick={prevStep} style={{ width: "70px", marginLeft: "10px" }} class="btn btn-secondary">Back</button>
                                    </div>
                                    <div class="modal fade" tabindex="-1" role="dialog" id="updateModal">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <div class="modal-title">You are about to update the profile.</div>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>
                                                        This will update your profile <b class="fw-bold"></b><br />
                                                        Are you sure?
                                                    </p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button style={{ width: "70px" }} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <form class="position-relative" onSubmit={handleSubmit}>
                                                        <button type="submit" class="btn btn-primary">Yes</button>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <li className="checkout-item">
                                        <div className="avatar checkout-icon p-1">
                                            <div className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bxs-truck text-white font-size-20" />
                                                <MdOutlineLocalShipping />
                                            </div>
                                        </div>
                                        <div className="feed-item-list">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Shipping Info</h5>

                                                <div className="mb-3">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-sm-6">
                                                            <div data-bs-toggle="collapse">
                                                                <label className="card-radio-label mb-0">
                                                                    <input
                                                                        type="radio"
                                                                        name="address"
                                                                        id="info-address1"
                                                                        className="card-radio-input"
                                                                        defaultChecked=""
                                                                    />
                                                                    <div className="card-radio text-truncate p-3">
                                                                        <span className="fs-14 mb-4 d-block">
                                                                            Address 1
                                                                        </span>
                                                                        <span className="fs-14 mb-2 d-block">
                                                                            {update.displayName}
                                                                        </span>
                                                                        <span className="text-muted fw-normal text-wrap mb-1 d-block">
                                                                            {update.Address}
                                                                        </span>
                                                                        <span className="text-muted fw-normal d-block">
                                                                            {update.zip}
                                                                        </span>
                                                                        <span className="text-muted fw-normal d-block">
                                                                            {update.state}
                                                                        </span>
                                                                    </div>
                                                                </label>
                                                                <div className="edit-btn bg-light  rounded">
                                                                    <a
                                                                        href="#"
                                                                        data-bs-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-bs-original-title="Edit"
                                                                    >
                                                                        <i className="bx bx-pencil font-size-16" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-sm-6">
                                                            <div>
                                                                <label className="card-radio-label mb-0">
                                                                    <input
                                                                        type="radio"
                                                                        name="address"
                                                                        id="info-address2"
                                                                        className="card-radio-input"
                                                                    />
                                                                    <div className="card-radio text-truncate p-3">
                                                                        <span className="fs-14 mb-4 d-block">
                                                                            Address 2
                                                                        </span>
                                                                        <span className="fs-14 mb-2 d-block">
                                                                            {update.displayName}
                                                                        </span>
                                                                        <span className="text-muted fw-normal text-wrap mb-1 d-block">
                                                                            {update.OptionalAdrress}
                                                                        </span>
                                                                        <span className="text-muted fw-normal d-block">
                                                                            {update.zip}
                                                                        </span>
                                                                        <span className="text-muted fw-normal d-block">
                                                                            {update.state}
                                                                        </span>
                                                                    </div>
                                                                </label>
                                                                <div className="edit-btn bg-light  rounded">
                                                                    <a
                                                                        href="#"
                                                                        data-bs-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-bs-original-title="Edit"
                                                                    >
                                                                        <i className="bx bx-pencil font-size-16" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="checkout-item">
                                        <div className="avatar checkout-icon p-1">
                                            <div className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bxs-wallet-alt text-white font-size-20" />
                                                <MdOutlinePayment />
                                            </div>
                                        </div>
                                        <div className="feed-item-list">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Payment Info</h5>
                                               
                                            </div>
                                            <div>
                                                <h5 className="font-size-14 mb-3">Payment method :</h5>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div data-bs-toggle="collapse">
                                                            <label className="card-radio-label">
                                                                <input
                                                                    type="radio"
                                                                    name="pay-method"
                                                                    id="pay-methodoption1"
                                                                    className="card-radio-input"
                                                                />
                                                                <span className="card-radio py-3 text-center text-truncate">
                                                                    <CiCreditCard1 />
                                                                    <i className="bx bx-credit-card d-block h2 mb-3" />

                                                                    Credit / Debit Card
                                                                </span>

                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <button onClick={prevStep} style={{ width: "70px", marginLeft: "10px" }} class="btn btn-secondary">Back</button>
                            </div>{" "}
                            <div className="col">
                                <Link to={"/ALLproducts"} className="btn btn-secondary">
                                    <i className="mdi mdi-arrow-left me-1" /> Continue Shopping
                                </Link>
                            </div>{" "}


                            <div className="col">
                                <div className="text-end mt-2 mt-sm-0">
                                <div class="column">   <button onClick={makepayment} style={{ width: "100px" }} className='btn btn-primary'>Payment</button></div>
                                </div>
                            </div>{" "}

                        </div>{" "}

                    </div>
                    <div className="col-xl-4">
                        <div className="card checkout-order-summary">
                            <div className="card-body">
                                <div className="p-3 bg-light mb-3">
                                    <h5 className="font-size-16 mb-0">
                                        Order Summary <span className="float-end ms-2"></span>
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-centered mb-0 table-nowrap">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="border-top-0"
                                                    style={{ width: 110 }}
                                                    scope="col"
                                                >
                                                    Product
                                                </th>
                                                <th className="border-top-0" scope="col">
                                                    Product Desc
                                                </th>
                                                <th className="border-top-0" scope="col">
                                                    Price
                                                </th>
                                                <th className="border-top-0" scope="col">
                                                Quantity
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((item,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                        <th scope="row">
                                                          <Link to={`/products/by/${item.product._id}`} >  <img
                                                                src={item.product.img}
                                                                alt="product-img"
                                                                title="product-img"
                                                                className="avatar-lg rounded"
                                                            /></Link>
                                                        </th>
                                                        <td>
                                                            <h5 className="font-size-16 text-truncate">
                                                                <Link to={`/products/by/${item.product._id}`} className="text-blue">
                                                                    {item.product.name}
                                                                </Link>
                                                            </h5>
                                                            <p className="text-muted mb-0">
                                                                <i className="bx bxs-star text-warning" />
                                                                <i className="bx bxs-star text-warning" />
                                                                <i className="bx bxs-star text-warning" />
                                                                <i className="bx bxs-star text-warning" />
                                                                <i className="bx bxs-star-half text-warning" />
                                                            </p>
                                                            
                                                        </td>
                                                        <td> ${item.product.price}</td>
                                                        <td> {item.quantity}</td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                           
                                           
                                            {/* <tr>
                                                <td colSpan={2}>
                                                    <h5 className="font-size-14 m-0">Quantity :</h5>
                                                </td>
                                                {
                                                    cart.map((item,index)=>{
                                                        return(
                                                            <td key={index}>{item.quantity}</td>
                                                        )
                                                    })
                                                }
                                               
                                            </tr> */}
                                            <tr>
                                                <td colSpan={2}>
                                                    <h5 className="font-size-14 m-0">Discount :</h5>
                                                </td>
                                                <td>- $ 0</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <h5 className="font-size-14 m-0">Shipping Charge :</h5>
                                                </td>
                                                <td>$ 0</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <h5 className="font-size-14 m-0">Estimated Tax :</h5>
                                                </td>
                                                <td>$ 0</td>
                                            </tr>
                                            <tr className="bg-light">
                                                <td colSpan={2}>
                                                    <h5 className="font-size-14 m-0">Total:</h5>
                                                </td>
                                            
                                                <td>{total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end row */}
            </div>


        </div>
    )
}

export default Usetaddress