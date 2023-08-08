import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {
	const { loading } = useSelector[(state) => state.auth]
	const [emailSent, setEmailSent] = useState(false)
	const [email, SetEmail] = useState('')
    const dispatch = useDispatch();

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email , setEmailSent));
    }

	return (
		<div className='text-white flex justify-center items-center'>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div>
					<h1>{!emailSent ? 'Reset your password' : 'Check your email'}</h1>
					<p>
						{!emailSent
							? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
							: `We have sent the reset email to ${email}`}
					</p>

					<form onSubmit={handleOnSubmit}>
						{!emailSent && (
							<label>
								<p>Email Address</p>
								<input
									type='email'
									required
									value={email}
									name='email'
									onChange={(e) => SetEmail(e.target.value)}
								/>
							</label>
						)}

						<button type='submit'>{!emailSent ? 'Reset Password' : 'Resend Email'}</button>
					</form>

					<div>
						<Link to='/login'>
							<p>Back to login</p>
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export default ForgotPassword
