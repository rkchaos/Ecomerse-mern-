import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Productbyname() {
    const [userdata, setuserdata] = useState({})
    let navigate = useNavigate()
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
    const parms = useParams()
    let [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:8080/products/${parms.name}`);
                setData(res.data)
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        }
        fetchData();
    }, []);
    async function handleClick(id) {
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
    }
    function handleCart() {
        toast.warn("You need too login first");
    }
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={"/ALLproducts"}>All</Link></li>

                    </ol>
                </nav>

            </div>


            {/* <div className='d-flex justify-content-center'  style={{ marginTop: "90px" }}>

                <div class="card mb-3 " style={{ maxWidth: "540px" }}>
                    <div class="row g-0 ">
                        <div class="col-md-4 d-flex justify-content-center">

                            <img src={data.img} class="img-fluid rounded-start" alt="some image" />
                        </div>
                        <div class="col-md-8 ">
                            <div class="card-body">
                                <h5 class="card-title">{data.name}</h5>

                                <p class="card-text"><small class="text-body-secondary">&#36;{data.price}</small></p><span className="text-decoration-line-through">800</span>
                                <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}

            {
                data.map((item, index) => {
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
                                                        <button onClick={() => handleClick(item._id)} style={{ border: "none", backgroundColor: "white" }}><img id='cart' src="/cart.svg" alt="" /></button>
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


        </div >
    )
}

export default Productbyname