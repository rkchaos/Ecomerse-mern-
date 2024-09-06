import React from 'react'
import "./login.css"
function Login() {
    function handlegoogle(){
        window.open('http://localhost:8080/auth/google/callback',"_self")
    }
  return (
    <>
   <div>

<div className="contan">
<div className='img'>
<img  src='./login.jpg' alt="some image"  />
</div>
  <form >
    <div className="row position-absolute top-50 start-50 translate-middle" >
      <h2 style={{textAlign:"center"}}>Login</h2>
   

      <div className="column">
      <button type="button" className="btn btn-primary">Login with Facebook</button>
        <button type="button" className="btn btn-info">Login with twitter</button>
        <button onClick={handlegoogle} type="button" className="btn btn-danger">Login with google</button>
      </div>
    </div>
  </form>
</div>
{/* 
<div class="bottom-container">
  <div class="row">
    <div class="col">
      <a href="#" style="color:white" class="btn">Sign up</a>
    </div>
    <div class="col">
      <a href="#" style="color:white" class="btn">Forgot password?</a>
    </div>
  </div>
</div> */}
    </div>
    </>
 

  )
}

export default Login