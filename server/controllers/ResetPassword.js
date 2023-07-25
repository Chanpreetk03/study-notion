//require
const User = require('../models/User')
const mailSender = require('../utils/mailSender')

//reset password token
exports.resetPasswordToken = async (req, res) => {
	try {
		//get email from req body
		const email = req.body.email

		//check user for for this email, email validation
		const user = await User.findOne({ email: email })
		if (!user) {
			return res.json({
				success: false,
				message: 'Your email is not registered with us',
			})
		}

		//generate token
		const token = crypto.randomUUID()

		//update user by adding token and expiration time
		const updateDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				toke: token,
				resetPasswordExpires: date.now() + 5 * 60 * 1000,
			},
			{ new: true }
		)
		console.log("Details:", updateDetails);
		//create url
		const url = `http://localhost:3000/update-password/${token}`

		//send mail with url
		await mailSender(email, 'Password Reset Link', `password reset link: ${url}`)

		//return response
		return res.json({
			success: true,
			message: 'Email for password reset sent successfully',
		})
	} catch (error) {
		console.log(error)
		console.error(error)
		return res.status(500).json({
			success: false,
			message: 'Something went wrong while sending reset mail',
		})
	}
}

//reset password
exports.resetPassword = async (req, res) => {
	try {
		//fetch data
		const { password, confirmPassword, token } = req.body

		//validation
		if (password !== confirmPassword) {
			return res.json({
				success: false,
				message: 'The password in the field of password and confirm password are not same',
			})
		}

		//get user details from db using token
		const userDetails = await user.findOne({ token: token })

		//if no entry : invalid token
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: 'Token invalid',
			})
		}

		//token time check
		if (userDetails.resetPasswordExpires <= Date.now()) {
			return res.json({
				success: false,
				message: 'Token is expired, please regenerate your token',
			})
		}

		//hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		//update password
		await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true })

		//return response
		return res.status(200).json({
			success: true,
			message: 'Password has been reset',
		})
	} catch (error) {
		console.log(error)
		console.error(error)
		return res.status(500).json({
			success: false,
			message: 'Something went wrong while sending reset mail',
		})
	}
}
