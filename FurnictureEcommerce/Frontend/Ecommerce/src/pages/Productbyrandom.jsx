import React, { useEffect, useState } from 'react'
import "./productbyrandom.css"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Productbyrandom() {
    const [userdata, setuserdata] = useState({})
    // const [like, setLike] = useState(false)
    useEffect(() => {
        async function getuser() {
            try {
                let res = await axios.get("http://localhost:8080/login/success", { withCredentials: true })
                setuserdata(res.data.user);
                if (res.data.user) {
                    localStorage.setItem("userid", res.data.user._id)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getuser()
    }, [])
    let parms = useParams()
    let [data, setdata] = useState({ name: " ", img: " ", price: "", desc: " " })
    useEffect(() => {
        async function data() {
            let res = await axios.get(`http://localhost:8080/products/byrandom/${parms.id}`)
            let { name, img, price, desc } = res.data
            setdata({ name, img, price, desc })
        }
        data()
    }, [])
    let [ran, setran] = useState([])
    useEffect(() => {
        async function random() {
            let res = await axios.get('http://localhost:8080/explore-random')
            setran(res.data)
        }
        random()
    }, [])
    function handleclick() {
        let userId = localStorage.getItem("userid")
        let productId = parms.id
        let url = "http://localhost:8080/like-product"
        let data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data == "ok") {
                    toast.success("Add to whislist");
                }
                else {
                    toast.warn("Remove from whislist");
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }
    function handleClick1(id) {
        let userId = localStorage.getItem("userid")
        let productId = id
        let data = { userId, productId }
        axios.post("http://localhost:8080/user/add", data)
            .then((res) => {
                if (res.data.message == "your product is already in cart") {
                    toast.warn("your product is already in cart")
                }
                else {
                    console.log("hee")
                    toast.success("Add to Cart");
                }
            })
            .catch((err) => {  
                console.log(err)
            })
    } function handlewhish() {
        toast.warn("You need too login first");

    }
    function handlenot() {
        toast.warn("You need too login first");

    }
    function handleCart() {
        toast.warn("You need too login first");
    }

    return (
        <div>
            <div class="main card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img id='itemimg' src={data.img} class="img-fluid rounded-start" alt="..." />


                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{data.name}</h5>
                            <h6 style={{ color: "gray" }}>3-seat sofa, Knisa medium blue</h6>

                            <br />
                            <br />
                            <p class="card-text">&#36;{data.price}</p><span className="text-decoration-line-through">800</span>
                            <div style={{ gap: "20px" }}>
                                {
                                    (userdata && Object.keys(userdata).length > 0) ? (
                                        <>
                                            <button onClick={handleclick} type="button" class="btn btn-primary">Add to whishlist</button>
                                            <button onClick={() => handleClick1(parms.id)} type="button" class="btn btn-secondary">Add to Cart</button>

                                            <ToastContainer
                                                theme='dark'
                                            />
                                        </>
                                    ) : <>
                                        <button onClick={handlewhish} type="button" class="btn btn-primary">Add to whishlist</button>
                                        <button onClick={handlenot} type="button" class="btn btn-secondary">Add to Cart</button>

                                        <ToastContainer
                                            theme='dark'
                                        /></>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div>
                <h1 className='heading'>Product details</h1>
            </div>
            <div class="card" id='desc'>
                <div class="card-body">
                    <p style={{ color: "gray" }} class="card-text">{data.desc}</p>
                </div>
            </div>
            <h1 className='heading'>Related product</h1>
            {
                ran.map((item, index) => {
                    return (
                        <div className='d-flex justify-content-center' key={index} style={{ marginTop: "90px" }}>

                            <div class="card mb-3 " style={{ maxWidth: "540px" }}>
                                <div class="row g-0 ">
                                    <div class="col-md-4 d-flex justify-content-center">

                                        <Link to={`/products/by/${item._id}`}><img src={item.img} class="img-fluid rounded-start" alt="some image" /></Link>
                                    </div>
                                    <div class="col-md-8 ">
                                        <div class="card-body">
                                            <h5 class="card-title">{item.name}</h5>

                                            <p class="card-text"><small class="text-body-secondary">&#36;{item.price}</small></p><span className="text-decoration-line-through">800</span>
                                            {
                                                (userdata && Object.keys(userdata).length > 0) ? (
                                                    <>
                                                        <button onClick={() => handleClick1(item._id)} style={{ border: "none", backgroundColor: "white" }}><img id='cart' src="/cart.svg" alt="" /></button>
                                                        <ToastContainer
                                                            theme='dark'
                                                        />
                                                    </>

                                                ) : <>
                                                    <button onClick={handleCart} style={{ border: "none", backgroundColor: "white" }}><img id='cart' src="/cart.svg" alt="" /></button>
                                                    <ToastContainer
                                                        theme='dark'
                                                    />
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Productbyrandom