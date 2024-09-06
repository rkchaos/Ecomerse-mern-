import React, { useState } from 'react'
import Cart from '../pages/Cart';
import Usetaddress from './Usetaddress';
const CheckoutStepper=()=>{
    let[step,setStep]=useState(1)
    const nextStep=()=>{
        setStep(prev=>prev+1)
    };
    const prevStep=()=>{
        setStep(prev=>prev-1)
    };
    switch(step){
case 1:
    return(
        <div>
        <Cart nextStep={nextStep} step={step}/>
        </div>
    );
    case 2:
        return(
            <div>
                <Usetaddress  prevStep={prevStep} nextStep={nextStep} step={step}/>
            </div>
        )
    }
}


export default CheckoutStepper