
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Allproduct() {
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
  let [data, setdata] = useState([])
  useEffect(() => {
    async function alldata() {
      let res = await axios.get("http://localhost:8080/products")
      setdata(res.data)
    }
    alldata()
  }, [])
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
    <>

      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={"/ALLproducts"}>All</Link></li>

          </ol>
        </nav>

      </div>
      <nav class="navbar bg-body-tertiary " style={{ float: "left" }}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Filter Product</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Filter Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <form class="d-flex mt-3" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>



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



    </>
  )
}

export default Allproduct