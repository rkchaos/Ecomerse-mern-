import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function ALLnaav() {
    const [userdata, setuserdata] = useState({})
    const [Whishlist, setWhish] = useState({})
    const [Cart, setCart] = useState({})
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


    useEffect(() => {
        let userId = localStorage.getItem("userid")
        let url = "http://localhost:8080/like-products"
        let data = { userId }
        async function whish() {
            let res = await axios.post(url, data)
            try{
                setWhish(res.data.whishlist)
                
            }
            catch(err){
                console.log(err)
            }
        }

        whish()
    }, [])
    useEffect(() => {
        let userId = localStorage.getItem("userid")
        let url = "http://localhost:8080/cart"
        let data = { userId }
        async function cart() {
            let res = await axios.post(url, data)
            try{
                setCart(res.data.cart)
                
                
            }
            catch(err){
                console.log(err)
            }
        }

        cart()
    }, [])

    const logout = () => {
        window.open("http://localhost:8080/logout", "_self")
    }
    function handlegoogle() {
        window.open('http://localhost:8080/auth/google/callback', "_self")
    }
    function handleProfile() {
        navigate(`/profile/${userdata?._id}`, { state: { userdata } });
    }
    function handleCart(){
        navigate("/Cart")
    }
    function handleWhish() {
        navigate("/like-products")
    }
    function handleOrder(){
        navigate("/My-order")
    }
    return (

        <div>
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to={"/"} className="nav-link px-2 link-secondary">Home</Link></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Inventory</a></li>
                            <li><Link to={"/customer"} className="nav-link px-2 link-body-emphasis">Customers</Link></li>
                            <li><Link to={"/ALLproducts"} className="nav-link px-2 link-body-emphasis">Products</Link></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        </form>
                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {
                                    (userdata && Object.keys(userdata).length > 0) ? (
                                        <>
                                            <img src={userdata?.image} alt="mdo" style={{ width: "32px", height: "32px" }} className="rounded-circle" />
                                        </>
                                    ) : (
                                        <img src="https://github.com/mdo.png" alt="mdo" style={{ width: "32px", height: "32px" }} className="rounded-circle" />
                                    )
                                }

                            </a>
                            <ul className="dropdown-menu text-small">

                                {
                                    (userdata && Object.keys(userdata).length > 0) ? (
                                        <>

                                            <li><button className="dropdown-item" onClick={handleProfile}>Profile</button></li>
                                    
                                            <button onClick={handleWhish} type="button" class="btn position-relative">
                                                Whislist
                                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {Whishlist.length}
                                                    <span class="visually-hidden">unread messages</span>
                                                </span>
                                            </button>
                                            <button onClick={handleCart} type="button" class="btn position-relative">
                                                Cart
                                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {Cart.length}
                                                    <span class="visually-hidden">unread messages</span>
                                                </span>

                                            </button>
                                            <li><button className="dropdown-item" onClick={handleOrder}>My order</button></li>
                              
                                        </>


                                    ) :
                                        <li><hr className="dropdown-divider" /></li>
                                }

                                <li><hr className="dropdown-divider" /></li>
                                {
                                    (userdata && Object.keys(userdata).length > 0) ? (
                                        <>
                                            <li><button onClick={logout} className="dropdown-item">Logout</button></li>
                                        </>
                                    ) : (
                                        <li><button onClick={handlegoogle} className="dropdown-item">Login</button></li>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default ALLnaav