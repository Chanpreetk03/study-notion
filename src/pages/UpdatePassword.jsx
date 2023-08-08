import React, { useState } from "react";
import {useSelector , useDispatch , useLocation} from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const UpdatePassword=()=>{
    const dispatch=useDispatch();
    const location=useLocation();
    const [formData , setFormData]=useState({
        password:"" ,
        confirmPassword:"",
    })
    const {loading}=useSelector((state) =>state.auth)
    const [showPassword , setShowPassword]=useState(false);
    const [showConfirmPassword , setShowConfirmPassword]=useState(false);
    const {password,confirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]:e.target.value,
            }
        ))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split('/').at[-1]
        dispatch(resetPassword(password,confirmPassword,token));
    }
    return(
        <div>
            {
                loading ? (
                    <div>
                        Loading..
                    </div>
                ):(
                    <div>
                        <h1>Choose new Password</h1>
                        <p>Almost done. Enter your new password and you're all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password * </p>
                                <input 
                                type={showPassword ? "text" : "password"} 
                                required 
                                name="password" 
                                value={password}
                                onChange={handleOnChange}
                                placeholder="password"
                                />
                                <span
                                    onClick={() =>setShowPassword[(prev) =>(!prev)]}
                                >
                                    {
                                        showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                                    }
                                </span>
                            </label>
                            <label>
                                <p>Confirm New Password * </p>
                                <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                required 
                                name="confirm-password" 
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="confirm password"
                                />
                                <span
                                    onClick={() =>setShowConfirmPassword[(prev) =>(!prev)]}
                                >
                                    {
                                        showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                                    }
                                </span>
                            </label>

                            <button type="submit">
                                Reset Password
                            </button>
                        </form>
                        <div>
						<Link to='/login'>
							<p>Back to login</p>
						</Link>
					</div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
