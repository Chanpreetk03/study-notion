//require
const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//send otp
exports.sendOTP = async (req, res) => {
	try {
		//fetch mail from req body
		const { email } = req.body

		//check if user already exists
		const checkUserPresent = await User.findOne({ email })

		//if user exists
		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: 'User already registered',
			})
		}

		//generate otp
		var otp = otpGenerator.generate(6, {
			lowerCaseAlphabets: false,
			specialChars: false,
		})
		console.log('otp generated ', otp)

		//check if otp is unique or not
		const result = await OTP.findOne({ otp: otp })

		while (result) {
			otp = otpGenerator(6, {
				lowerCaseAlphabets: false,
				specialChars: false,
			})
			result = await OTP.findOne({ otp: otp })
		}

		//generate otp object and enter in db
		const otpPayload = { email, otp }

		//create an entry in db
		const otpBody = await OTP.create(otpPayload)
		console.log(otpBody)

		//return response
		return res.status(200).json({
			success: true,
			message: 'OTP sent successfully',
			otp,
		})
	} catch (error) {
		console.log(error)
		console.error(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

//signup
exports.signUp = async (res, req) => {
	try {
		//fetch data from req body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body

		//validate data
		if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
			return res(403).json({
				success: false,
				message: 'All fields are required',
			})
		}

		//match both passwords
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and confirm password don't match",
			})
		}

		//check if user exists
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: 'User is already registered',
			})
		}

		//find most recent otp for user
		const recentOtp = await OTP.find({ email }.sort({ createdAt: -1 }).limit(1))
		console.log(recentOtp)

		//validate otps
		if (recentOtp.length == 0) {
			//otp not found
			return res.status(400).json({
				success: false,
				message: 'OTP not found',
			})
		} else if (otp !== recentOtp) {
			res.status(400).json({
				success: false,
				message: 'Invalid otp',
			})
		}

		//hash password
		const hashPassword = await bcrypt.hash(password, 10)

		//entry in db
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		})
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashPassword,
			accountType,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		})

		//return res
		return res.status(200).json({
			success: true,
			message: 'User is registered successfully',
			user,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'User could not be registered. Please try again',
		})
	}
}

//login
exports.login = async (res, req) => {
	try {
		//get data from req.body
		const { email, password } = req.body

		//validate
		if (!email || !password) {
			return res.status(500).json({
				success: false,
				message: 'all fields are required. Please try again',
			})
		}

		//user should exist
		const user = await User.findOne({ email }).populate('additionalDetails')
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'User is not registered. Please try again',
			})
		}

		//generate jwt, after matching password
		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				email: user.email,
				id: user._id,
				accountType: user.accountType,
			}
			const token = jwt.sign(payload.process.env.JWT_SECRET, {
				expiresIn: '2h',
			})
			user.token = token
			user.password = undefined
			//create cookie and send res
			//cookie will expire after 3 days
			const options = {
				expires: newDate(Date.now() + 3 * 24 * 60 * 60 * 1000),
			}
			res.cookie('token', token, options).status(200).json({
				success: true,
				token,
				user,
				message: 'Logged In successfully',
			})
		}
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
	} catch (error) {
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"login failure. Please try again"
        });
    }
}

//change password
exports.changePassword=async(req,res)=>{
    //fetch data : oldPassword, newPassword , confirmPassword , email
    //validation
    //update pwd in db
    //send mail-password updated
    //return password
}
