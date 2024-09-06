import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Profile() {
  const location = useLocation();
  const navigate = useNavigate()
  const { userdata } = location.state || {};
  let [update, setUpdate] = useState({ displayName: "", Address: "", OptionalAdrress: "", city: "", state: "", zip: "" })
  let parm = useParams()

  useEffect(() => {
    async function data() {
      let res = await axios.get(`http://localhost:8080/user/${parm.id}`)
      setUpdate(res.data)
    }
    data()
  }, [])
  
  async function handleSubmit(e) {
    try {
      let res = await axios.patch(`http://localhost:8080/user/update/${parm.id}`, update)
      navigate(`/profile/${parm.id}`)
    }
    catch (err) {
      console.log(err)
    }
  }
 

  return (
    <div>
      <div class="col-md-7 col-lg-8" style={{ marginLeft: "40px" }}>
        <h4 class="mb-3" style={{ textAlign: 'center' }}>User Profile</h4>
        <img src={update.image} style={{ width: "90px", height: "90px" }} class="rounded mx-auto d-block" alt="..." />
        <form class="needs-validation" >
          <div class="row g-3">
            <div class="col-12">
              <label htmlFor="username" class="form-label">Username</label>
              <div class="input-group has-validation">
                <input type="text" class="form-control" id="username" placeholder="Username" value={update.displayName} onChange={e => setUpdate({ ...update, displayName: e.target.value })} required="" />
                <div class="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>

            <div class="col-12">
              <label htmlFor="email" class="form-label">Email <span class="text-body-secondary"></span></label>
              <input type="email" class="form-control" id="email" value={update.email} placeholder="you@example.com" disabled />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label htmlFor="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" placeholder="1234 Main St" value={update.Address} onChange={e => setUpdate({ ...update, Address: e.target.value })} required="" />
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label htmlFor="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>
              <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" value={update.OptionalAdrress} onChange={e => setUpdate({ ...update, OptionalAdrress: e.target.value })} />
            </div>

            <div class="col-md-5">
              <label htmlFor='country' class="form-label">City</label>
              <select class="form-select" id="country" required="" value={update.city} onChange={e => setUpdate({ ...update, city: e.target.value })}>
                <option value="">Choose...</option>
                <option>Delhi</option>

              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-md-4">
              <label htmlFor='state' class="form-label">State</label>
              <select class="form-select" id="state" required="" value={update.state} onChange={e => setUpdate({ ...update, state: e.target.value })} >
                <option value="">Choose...</option>
                <option>Delhi</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div class="col-md-3">
              <label htmlFor='zip' class="form-label">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required="" value={update.zip} onChange={e => setUpdate({ ...update, zip: e.target.value })} />
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address" />
            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info" />
            <label class="form-check-label" for="save-info">Save this information for next time</label>
          </div>

          <hr class="my-4" />

          <div class="form-group mb-4">
            <button style={{ width: "150px" }} type="button" class="btn btn-primary" data-bs-toggle="modal" id="deleteButton" data-bs-target="#updateModal">Update Acount</button>
            <Link to={"/"} style={{ textDecoration: 'none', width: "70px", marginLeft: "10px" }} class="btn btn-secondary">Cancle</Link>
          </div>

        </form>

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
                  <button  type="submit" class="btn btn-primary">Yes</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile