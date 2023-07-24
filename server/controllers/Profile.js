//require
const Profile = require('../models/Profile')
const User = require('../models/User')

//update profile handler
exports.updateProfile = async (req, res) => {
	try {
		//fetch data
		const { dateOfBirth, about, contactNumber, gender } = req.body

		//get user id
		const id = req.user.id

		//validation
		if (!contactNumber || !gender) {
			return res.status(400).json({
				success: false,
				message: 'gender and contact no  are required',
			})
		}

		//find profile
		const userDetails = await User.findById(id)
		const profileId = userDetails.additionalDetails
		const profileDetails = await Profile.findById(profileId)

		//update profile
		profileDetails.dateOfBirth = dateOfBirth
		profileDetails.about = about
		profileDetails.contactNumber = contactNumber
		profileDetails.gender = gender
		await profileDetails.save()

		//return res
		return res.status(200).json({
			success: true,
			message: 'profile updated successfully',
			profileDetails,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: true,
			message: 'profile could not be updated',
		})
	}
}

//schedule a request:account delete after 3 days etc
exports.deleteAccount = async (req, res) => {
	try {
		//fetch data
		const id = req.user.id

		//validate
		const userDetails = await User.findById(id)
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: 'User no found',
			})
		}

		//delete profile of user
		await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })

		//delete it from course too (number of students lessened)
		// then delete user
		await User.findByIdAndDelete({ _id: id })

		//return response
		return res.status(200).json({
			success: true,
			message: 'user deleted successfully',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Account could not be deleted',
		})
	}
}

//what is a chronjob

//get all user details handler
exports.getAllUserDetails = async (req, res) => {
	try {
		//fetch data
		const id = req.user.id
		const userDetails = await User.findById(id).populate('additional details').exec()

		//validate
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: 'User no found',
			})
		}

		//get user details and return response
		return res.status(200).json({
			success: true,
			message: 'User details found successfully',
			userDetails,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
