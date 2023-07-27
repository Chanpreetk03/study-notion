import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/Core/HomePage/HighlightText'
import CTAButton from '../components/Core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/Core/HomePage/CodeBlocks'
import TimeLineSection from '../components/Core/HomePage'
import LearningLanguageSection from '../components/Core/HomePage'
import InstructorSection from "../components/Core/HomePage/InstructorSection"

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

			{/* Code section 2 */}
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
			<div className='bg-pure-greys-5 text-richblack-700'>
				<div className='homepage_bg h-[310px]'>
					<div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-between'>
						<div className='h-[150px]'></div>
						<div className='flex flex-row gap-7 text-white flex-col'>
							<CTAButton active={true} linkto={'/signup'}>
								<div className='flex items-center gap-3'>
									Explore full Cataloge
									<FaArrowRight />
								</div>
							</CTAButton>

							<CTAButton active={false} linkto={'/signup'}>
								<div>Learn More</div>
							</CTAButton>
						</div>
					</div>
				</div>

				<div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
					<div className='flex flex-row gap-5 mt-[90px] mb-10'>
						<div className='text-4xl font-semibold w-[45%]'>
							Get the skills you need for a
							<HighlightText text={'Job that is in demand'} />
						</div>
						<div className='flex flex-col gap-10 w-[40%] items-start'>
							<p className='text-[16px]'>
								The modern StudyNotion is the dictates its own terms. Today, to be a competitive
								specialist requires more than professional skills.
							</p>

							<CTAButton active={true} linkto={'/signup'}>
								Learn More
							</CTAButton>
						</div>
					</div>

					<TimeLineSection />
					<LearningLanguageSection />
				</div>
			</div>

			{/* section 3 */}

			<div className='w-11/1 mx-auto max-w-maxContent flex-col justify-between gap-8 items-center first-letter bg-richblack-800 text-white'>
				<InstructorSection/>

				<h2 className='text-4xl font-semibold text-center mt-10'>Review from other learners</h2>
			</div>

			{/* Footer */}
		</div>
	)
}

export default Home
