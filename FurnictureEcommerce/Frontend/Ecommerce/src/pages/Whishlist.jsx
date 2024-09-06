import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Whishlist() {
    let [whish, setWhish] = useState([])
    let navigate = useNavigate()
    useEffect(() => {
        let userId = localStorage.getItem("userid")
        let url = "http://localhost:8080/like-products"
        let data = { userId }
        async function alldata() {
            let res = await axios.post(url, data)
            try {
                setWhish(res.data.whishlist)
            }
            catch (err) {
                console.log(err)
            }
        }

        alldata()
    }, [])
    function handleClick(pro) {
        let userId = localStorage.getItem("userid")
        let productId = pro
        console.log(productId)
        let url = "http://localhost:8080/like-product"
        let data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data == "remove") {
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err)
            })


    }
    return (
        <div>
            {
                whish.length > 0 ? (
                    whish.map((item, index) => (
                        <div className='d-flex justify-content-center' key={index} style={{ marginTop: "90px" }}>
                            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center">
                                        <Link to={`/products/by/${item._id}`}>
                                            <img src={item.img} className="img-fluid rounded-start" alt="some image" />
                                        </Link>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">
                                                <small className="text-body-secondary">&#36;{item.price}</small>
                                            </p>
                                            <span className="text-decoration-line-through">800</span>
                                            {/* <button style={{border:"none",backgroundColor:"white"}}><img id='cart' src="/cart.svg" alt="" /></button> */}
                                            <button onClick={() => handleClick(item._id)} type="button" className="btn btn-danger">
                                                Remove
                                            </button>
                                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='d-flex justify-content-center' style={{ marginTop: "90px" }}>
                        <img style={{height:'510px',width:"600px"}} src="/c9193efb2ff431290270b586df00a939.jpg" alt="" />
                    </div>
                )
            }
        </div>
    )
}

export default Whishlist