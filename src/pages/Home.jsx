import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/Core/HomePage/HighlightText'
import CTAButton from '../components/Core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/Core/HomePage/CodeBlocks'

const Home = () => {
	return (
		<div>
			{/* section 1 */}
			<div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-center max-w-maxContent'>
				<Link to={'/signup'}>
					<div className='group mx-auto rounded-full ring-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 p-1'>
						<div className='flex flex-row items-center rounded-full px-10 py-[15px] transition-all duration-200 group-hover:richblack-900'>
							<p>Become An Instructor</p>

							<FaArrowRight />
						</div>
					</div>
				</Link>

				<div className='text-center font-semibold text-4xl mt-7'>
					Empower Your Future with
					<HighlightText text={'Coding Skills'} />
				</div>

				<div className='w-[90%] text-center text-lg font-bold text-richblack-300'>
					With our online coding courses, you can learn at your own pace, from anywhere in the
					world, and get access to a wealth of resources, including hands-on-project, quizzes, and
					personalized feedback from instructors
				</div>
				<div className='flex flex-row gap-7 mt-8'>
					<CTAButton active={true} linkto={'/signup'}>
						Learn More
					</CTAButton>
					<CTAButton active={false} linkto={'/login'}>
						Learn More
					</CTAButton>
				</div>
			</div>

			<div className='shadow-blue-200 mx--3 my-14'>
				<video muted loop autoPlay>
					<source src={Banner} type='video/mp4' />
				</video>
			</div>

			{/* Code section 1 */}
			<div>
				<CodeBlocks
					position={'lg:flex-row'}
					heading={
						<div className='text-4xl font-semibold'>
							Unlock Your <HighlightText text={'coding-potential'} /> with our online courses
						</div>
					}
					subheading={
						'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
					}
					ctabtn1={{
						btnText: 'Try it yourself',
						linkto: '/signup',
						active: true,
					}}
					ctabtn2={{
						btnText: 'Learn more',
						linkto: '/login',
						active: false,
					}}
					codeColor={'text-yellow-25'}
				/>
			</div>

			{/* Code section 1 */}
			<div>
				<CodeBlocks
					position={'lg:flex-row-reverse'}
					heading={
						<div className='text-4xl font-semibold'>
							Unlock Your <HighlightText text={'coding-potential'} /> with our online courses
						</div>
					}
					subheading={
						'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
					}
					ctabtn1={{
						btnText: 'Try it yourself',
						linkto: '/signup',
						active: true,
					}}
					ctabtn2={{
						btnText: 'Learn more',
						linkto: '/login',
						active: false,
					}}
					codeColor={'text-yellow-25'}
				/>
			</div>

			{/* section 2 */}

			{/* section 3 */}
			{/* Footer */}
		</div>
	)
}

export default Home
