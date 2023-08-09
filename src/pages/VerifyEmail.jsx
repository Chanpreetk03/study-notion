import React, { useState, useDispatch, useEffect } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";


const VerifyEmail = () =>{
    const [otp , setOTP]=useState("")
    const dispatch=useDispatch();
    const navigate=useNavigate
    const {signUpData , loading} = useState((state)=>state.auth)
    useEffect(()=>{
        if(!signUpData){
            navigate("/signup")
        }
    },[])

    const handleOnSubmit =(e)=>{
        e.preventDefault()
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }=signUpData;

		dispatch(signUp(accountType, firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

    return(
        <div>
            loading ? (
                <div>Loading....</div>
            ): (
                <div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput value="otp" 
                        onChange={setOTP}
                        numInputs={6}
                        renderInput={(props) => <input {...props}/>}
                        />
                        <button type="submit ">
                            Verify Email
                        </button>
                    </form>
                    <div>
						<Link to='/login'>
							<p>Back to login</p>
						</Link>
					</div>

                    <button onClick={() => dispatch(sendOtp(signUpData.email))}>
                        Resend it
                    </button>
                </div>
            )
        </div>
    )
}

export default VerifyEmail