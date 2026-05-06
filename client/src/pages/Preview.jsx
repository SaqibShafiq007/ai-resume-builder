import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeftIcon, Loader } from 'lucide-react'
import ResumePreview from '../components/ResumePreview'

import { dummyResumeData } from '../assets/assets'

/**
 * Preview component displays a public resume based on the resumeId from the URL parameters.
 * It fetches the resume data from the API and renders it using the ResumePreview component.
 * It also handles loading states and displays a "Resume not found" message if the resume cannot be loaded.
 */
const Preview = () => {

    const { resumeId } = useParams()
    // State to store the fetched resume data
    const [resumeData, setResumeData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    
    const loadResume = async () => {
    const found = dummyResumeData.find(resume => resume._id === resumeId) || null
    setResumeData(found)
    setIsLoading(false)  // ✅ always mark loading as done
}

    // load resume data when the component mounts
    useEffect(() => {
        loadResume()
    }, [])

    // Render the ResumePreview if resumeData is available
    return resumeData ? (
        <div className='bg-slate-100'>
            <div className='max-w-3xl mx-auto py-10'>
                {/* Render the ResumePreview component with fetched data */}
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white' />
            </div>
        </div>
    ) : (
        <div>
            {isLoading ? <Loader /> : (
                <div className='flex flex-col items-center justify-center
                h-screen'>
                    {/* Display message if resume is not found */}
                    <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found!</p>
                    <a href="/" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
                        <ArrowLeftIcon className='mr-2 size-4' />
                        go to home page
                    </a>
                </div>
            )}
            
        </div>
    )
}

export default Preview