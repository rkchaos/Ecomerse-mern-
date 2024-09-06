import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Customer() {
    let [data, setdata] = useState([])
    useEffect(() => {
        async function Alldata() {
            let res = await axios.get("http://localhost:8080/user")
   
            setdata(res.data)
        }
        Alldata()
    }, [])

    return (
        <div>
            <h4 class="mb-3" style={{ textAlign: 'center' }}>Customers</h4>
            <div className='d-flex justify-content-center' style={{ marginTop: "90px" }}>


                {
                    data.map((item, index) => {
                        return (
                            <div className='d-flex justify-content-center' key={index} style={{marginTop:"90px"}}>

                            <div class="card mb-3 "  style={{ maxWidth: "540px" }}>
                                <div class="row g-0 ">
                                    <div class="col-md-4 d-flex justify-content-center">
                                    
                                        <img src={item.image} class="img-fluid rounded-start" alt="some image" />
                                    </div>
                                    <div class="col-md-8 ">
                                        <div class="card-body">
                                            <h5 class="card-title">{item.displayName}</h5>

                                            <p class="card-text"><small class="text-body-secondary"></small></p><span className="text-decoration-line-through"></span>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Customer