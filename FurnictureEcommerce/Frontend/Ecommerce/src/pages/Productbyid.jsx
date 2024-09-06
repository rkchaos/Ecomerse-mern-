import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./product.css"
import "./review.css"
function Productbyid() {
  const [userdata, setuserdata] = useState({})
  const [rating, setreview] = useState('')
  const [comments, setComment] = useState(' ')
  const [editReviewId, setEditingReviewId] = useState(null)
  const [updateRating, setUpdateRating] = useState(' ')
  const [updateComment, setUpdateComment] = useState(' ')

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
  let [data, setdata] = useState({ name: " ", img: " ", price: " ", desc: " " })
  let [review, setReview] = useState([])
  let parm = useParams()
  useEffect(() => {
    async function data() {
      let res = await axios.get(`http://localhost:8080/products/by/${parm.id}`)
      setReview(res.data.reviews)
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
  // let[heart,setheart]=useState()
  // function handleClick(){
  //   setheart( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  //     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
  //   </svg>)
  // }
  function handleclick() {
    let userId = localStorage.getItem("userid")
    let productId = parm.id
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
        // alert("Added to whislist")

      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function handle(id) {
    let userId = localStorage.getItem("userid")
    let productId = id
    let data = { userId, productId }
    axios.post("http://localhost:8080/user/add", data)
      .then((res) => {

        if (res.data.message == "your product is already in cart") {
          toast.warn("your product is already in cart")
        }
        else {
          toast.success("Add to Cart");
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }
  function handlenot() {
    toast.warn("You need too login first");

  }
  function handlewhish() {
    toast.warn("You need too login first");

  }
  function handleCart() {
    toast.warn("You need too login first");
  }

  function handlereview() {
    let userId = localStorage.getItem("userid")
    let data = { userId, rating, comments }
    axios.post(`http://localhost:8080/products/${parm.id}/rating`, data)
      .then((res) => {
        toast.success("Review submitted")



      }).catch((err) => {
        console.log(err)
      })

  }

  let [usdata, setUsdata] = useState([])
  useEffect(() => {
    async function dta() {
      let res = await axios.get("http://localhost:8080/review/all")
      // console.log(res.data)
      setUsdata(res.data)
    }
    dta()
  }, [])
  function handlereviewdelete(id) {
    axios.delete(`http://localhost:8080/review/delete/${parm.id}/${id}`)
      .then((res) => {
        setReview(review.filter(item => item._id !== id))
        // window.location.reload()
        toast.success("review deleted ")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handlereviewedit(item) {
    setEditingReviewId(item._id)
    setUpdateRating(review.rating)
    setUpdateComment(review.comments)
  }
  async function handlereviewupdate(reviewId) {
    try {
      let data = { rating: updateRating, comments: updateComment }
      await axios.patch(`http://localhost:8080/review/update/${parm.id}/${reviewId}`, data)
      const res = await axios.get(`http://localhost:8080/products/by/${parm.id}`);
      setReview(res.data.reviews);
      setEditingReviewId(null);
    }
    catch (err) {
      console.log(err)

    }
  }
  return (
    <div>
      <div class="main card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img id='itemimg' src={data.img} class="img-fluid rounded-start" alt="someimage" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{data.name}</h5>
              <h6 style={{ color: "gray" }}>3-seat sofa, Knisa medium blue</h6>
              <div class="position-relative">
              </div>
              <br />
              <br />
              <p class="card-text">&#36;{data.price}</p><span className="text-decoration-line-through">800</span>
              {/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */}
              <div style={{ gap: "20px" }}>
                {

                  (userdata && Object.keys(userdata).length > 0) ? (
                    <>
                      <button onClick={handleclick} type="button" class="btn btn-primary">Add to whishlist</button>
                      <button onClick={() => handle(parm.id)} type="button" class="btn btn-secondary">Add to Cart</button>

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
          <p style={{ color: "gray", fontSize: "15px" }} class="card-text">{data.desc}</p>
        </div>
      </div>
      <div>
        <h1 className='heading'>Reviews</h1>
      </div>

      <div class="card" id='desc'>
        <form action="" >
          <div class="mb-3">
            <fieldset class="starability-basic">
              <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" onChange={(e) => setreview(e.target.value)} checked aria-label="No rating." />
              <input type="radio" id="first-rate1" name="rating" value='1' onChange={(e) => setreview(e.target.value)} />
              <label htmlFor="first-rate1" title="Terrible">1 star</label>
              <input type="radio" id="first-rate2" name="rating" value='2' onChange={(e) => setreview(e.target.value)} />
              <label htmlFor="first-rate2" title="Not good">2 stars</label>
              <input type="radio" id="first-rate3" name="rating" value='3' onChange={(e) => setreview(e.target.value)} />
              <label htmlFor="first-rate3" title="Average">3 stars</label>
              <input type="radio" id="first-rate4" name="rating" value='4' onChange={(e) => setreview(e.target.value)} />
              <label htmlFor="first-rate4" title="Very good">4 stars</label>
              <input type="radio" id="first-rate5" name="rating" value='5' onChange={(e) => setreview(e.target.value)} />
              <label htmlFor="first-rate5" title="Amazing">5 stars</label>
            </fieldset>
          </div>
          <div class="mb-3">
            <label class="form-label" htmlFor="comment">Comment: </label>
            <textarea class="form-control" name="comment" id="comment" rows="3" value={comments} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
          {
            (userdata && Object.keys(userdata).length > 0) ? (
              <button onClick={handlereview} class="btn btn-sm btn-success" style={{ width: "75px" }}>Submit</button>
            ) : (
              <>
                <div class="alert alert-danger" role="alert">
                  You need to Login first for submit the review
                </div>

              </>
            )
          }
        </form>

        <br />
        <div className="my-3">

          {
            review.map((item, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <img src={item.users.image} alt="mdo" style={{ width: "32px", height: "32px" }} className="rounded-circle" />
                  <h6 style={{ display: "inline-block" }}>{item.users.displayName}</h6>
                  {
                    editReviewId === item._id ? (
                      <>
                        <fieldset class="starability-basic">
                        <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" onChange={(e) => setUpdateRating(e.target.value)} checked aria-label="No rating." />
                          <input type="radio" id="first-rated1" name="rating" value='1' onChange={(e) => setUpdateRating(e.target.value)} checked={updateRating === '1'}/>
                          <label htmlFor="first-rated1" title="Terrible">1 star</label>
                          <input type="radio" id="first-rated2" name="rating" value='2' onChange={(e) => setUpdateRating(e.target.value)} checked={updateRating === '2'}/>
                          <label htmlFor="first-rated2" title="Not good">2 stars</label>
                          <input type="radio" id="first-rated3" name="rating" value='3' onChange={(e) => setUpdateRating(e.target.value)}  checked={updateRating === '3'}/>
                          <label htmlFor="first-rated3" title="Average">3 stars</label>
                          <input type="radio" id="first-rated4" name="rating" value='4' onChange={(e) => setUpdateRating(e.target.value)}  checked={updateRating === '4'}/>
                          <label htmlFor="first-rated4" title="Very good">4 stars</label>
                          <input type="radio" id="first-rated5" name="rating" value='5' onChange={(e) => setUpdateRating(e.target.value)}  checked={updateRating === '5'}/>
                          <label htmlFor="first-rated5" title="Amazing">5 stars</label>
                        </fieldset>
                        <textarea class="form-control" name="comment"  rows="3" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)}></textarea>
                        <button onClick={() => handlereviewupdate(item._id)} className="btn btn-success btn-sm" style={{ width: "75px" }}>Update</button>
                      </>
                    ) : (
                      <>
                        <p className="starability-result" data-rating={item.rating}>
                          Rated: {item.rating} stars
                        </p>
                        <label htmlFor="">Comments:</label>
                        <input className='card-text' type="text" value={item.comments} style={{ border: "none" }} required />
                        <br />
                        {item.users._id === userdata._id && (
                          <>
                            <button onClick={() => handlereviewdelete(item._id)} className="btn btn-danger btn-sm" style={{ width: "75px" }}>Delete</button>
                            <button   onClick={()=>handlereviewedit(item)} className="btn btn-success btn-sm" style={{ width: "75px", marginLeft: "10px" }}>Edit</button>
                          </>
                        )}
                      </>
                    )}
                </div>
              </div>
))}


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
                    <Link to={`/products/byrandom/${item._id}`}><img src={item.img} class="img-fluid rounded-start" alt="some image" /></Link>
                  </div>
                  <div class="col-md-8 ">
                    <div class="card-body">
                      <h5 class="card-title">{item.name}</h5>
                      <p class="card-text"><small class="text-body-secondary">&#36;{item.price}</small></p><span className="text-decoration-line-through">800</span>
                      {
                        (userdata && Object.keys(userdata).length > 0) ? (
                          <>
                            <button onClick={() => handle(item._id)} style={{ border: "none", backgroundColor: "white" }}><img id='cart' src="/cart.svg" alt="" /></button>
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
      <ToastContainer
        theme='dark'
      />
    </div >
  )
}

export default Productbyid