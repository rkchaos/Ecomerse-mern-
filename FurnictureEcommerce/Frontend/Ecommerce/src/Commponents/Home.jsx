import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./home.css"
function Home() {
    let usereef=useRef()

    let[data,setdata]=useState([])
    useEffect(()=>{
async function Alldata(){
    let res=await axios.get("http://localhost:8080/products")
 setdata(res.data)
}
Alldata()
    },[])
    let name="Wooden sofa"
    let name1="Fabric sofa"
    let name2="L shaped sofa"
    let name3="Chester field sofa"
    let name4="3 Seater sofa"
    let name5="Sofa cum bed"
    return (
        <div>
            
            <nav className='bread' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link style={{ textDecoration: "none" }} href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Product</li>
                </ol>
            </nav>
            <div>
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="./img_rectangle_18.png" className="d-block w-100" alt="..." style={{ width: "1920px", height: "500px" }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Summer Collection</h5>
                                <p>Flat 50%off</p>
                                <button className="btn btn-dark" style={{ width: "100px" }}>Buy now</button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/img_rectangle_18.png" className="d-block w-100" alt="..." style={{ width: "1920px", height: "500px" }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Summer Collection</h5>
                                <p>Flat 50%off</p>
                                <button className="btn btn-dark" style={{ width: "100px" }}>Buy now</button>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='parent' style={{ border: "20px solid rgb(238, 237, 235)", backgroundColor: "rgb(238, 237, 235)", display: "flex", gap: "100px" }}>
                <div className='firstimg'>
                    <img src="/img_ticket.svg" alt="some image" style={{ width: "50px", height: "50px" }} />
                    <p>High quality</p>
                </div>
                <div className='second'>
                    <img src="/war.svg" alt="some image" style={{ width: "50px", height: "50px" }} />
                    <p>High quality</p>
                </div>
                <div className='third'>
                    <img src="/free.svg" alt="some image" style={{ width: "50px", height: "50px" }} />
                    <p>High quality</p>
                </div>
                <div className='fourt'>
                    <img src="/cus.svg" alt="some image" style={{ width: "50px", height: "50px" }} />
                    <p>High quality</p>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div>
                <h1 style={{ textAlign: 'center' }}>Sofa set</h1>
                <h6 style={{ textAlign: 'center', color: 'gray' }}>Crafted with love specially for you</h6>
            </div>
            {/* <div className='class="d-flex flex-col mb-3'>
                <div className='firstsofa' >
                    <img src="/first.png" alt="some image" style={{ width: "auto", height: "172px" }} />
                    <p>High quality</p>
                </div>
                <div >
                    <img src="/second.png" alt="some image" style={{ width: "auto", height: "172px" }} />
                    <p>High quality</p>
                </div>
                <div >
                    <img src="/third.png" alt="some image" style={{ width: "auto", height: "172px" }} />
                    <p>High quality</p>
                </div>
                <div >
                    <img src="/fourth.png" alt="some image" style={{ width: "auto", height: "172px" }} />
                    <p>High quality</p>
                </div>
            </div> */}
            <div className="album py-5 bg-body-tertiary">
                <div className="container" style={{ textAlign: "center" }}>
                    <div className=" sofa row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <div>
                                <img id='sofa' src="/first.png" alt="some image" />
                               <Link style={{textDecoration:"none"}} to={`/products/${name}`}><h4>Wooden sofa</h4></Link>
                              
                     
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img id='sofa' src="/second.png" alt="some image" />
                                <Link  style={{textDecoration:"none"}} to={`/products/${name1}`}><h4>Fabric sofa</h4></Link>
                              

                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img id='sofa' src="/third.png" alt="some image" />
                                <Link  style={{textDecoration:"none"}} to={`/products/${name2}`}><h4>L shaped sofa</h4></Link>
                                

                            </div>
                        </div>
                        <div className="col">
                            <div >
                                <img id='sofa' src="/fourth.png" alt="some image" />
                                <Link style={{textDecoration:"none"}} to={`/products/${name3}`}><h4>Chester field sofa</h4></Link>
                               

                            </div>
                        </div>
                        <div className="col">
                            <div >
                                <img id='sofa' src="/fifth.png" alt="some image" />
                                <Link style={{textDecoration:"none"}} to={`/products/${name4}`}> <h4>3 Seater sofa</h4></Link>
                               

                            </div>
                        </div>
                        <div className="col">
                            <div >
                                <img id='sofa' src="/sixth.png" alt="some image" />
                                <Link style={{textDecoration:"none"}} to={`/products/${name5}`}><h4>Sofa cum bed</h4></Link>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div>
                <h1 style={{ textAlign: 'center' }}>Popular pick in sofa</h1>
                <h6 style={{ textAlign: 'center', color: 'gray' }}>Crafted with love specially for you</h6>
            </div>
            <br />
            <br />
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">All</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Woodden</li>
                        <li className="breadcrumb-item active" aria-current="page">Fabric</li>
                        <li className="breadcrumb-item active" aria-current="page">L shaped</li>
                        <li className="breadcrumb-item active" aria-current="page">Sofa cum beds</li>
                        <li className="breadcrumb-item active" aria-current="page">Recliner</li>
                    </ol>
                </nav>
            </div>
            <div className="album py-5 bg-body-tertiary">
                <div className="container" style={{ textAlign: "center" }}>

                    <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 rounded">
                        <div className="col">
                            <div>
                                <img id='popular' src="/popular.png" alt="some image" />
                                <p>Comfy craft</p>
                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img id='popular' src="/popular.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img id='popular' src="/popular.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div >
                                <img id='popular' src="/popular.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div >
                                <img id='popular' src="/popular.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div >
                                <img id='popular' src="/popular.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Recent view</h1>
                <h6 style={{ textAlign: 'center', color: 'gray' }}>Things you are keeping eye on</h6>
            </div>
            <div className="album py-5 bg-body-tertiary">
                <div className="container" style={{ textAlign: "center" }}>

                    <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 rounded">
                        <div className="col">
                            <div>
                                <img id='popular' src="/recent.png" alt="some image" />
                                <p>Comfy craft</p>
                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img id='popular' src="/recent.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img id='popular' src="/recent.png" alt="some image" />
                                <p>Comfy craft</p>

                            </div>
                            <div className="card-body">

                                <div class="d-flex  align-items-center">
                                    <div className="btn-group">
                                        <b id='price'>&#36;500</b>
                                        <p className="text-decoration-line-through">800</p>
                                    </div>
                                    <Link><img id='cart' src="/cart.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            
        </div>


    )
}

export default Home