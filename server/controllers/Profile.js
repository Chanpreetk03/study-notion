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
