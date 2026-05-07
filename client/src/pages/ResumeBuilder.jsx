import React, { useState, useEffect, use } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  EyeOff,
  Download,
  Share2,
  Eye,
  Save,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSumarryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

function ResumeBuilder() {
  const {token} = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    templates: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0); //index of sections
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex]; //find current section

  const { resumeId } = useParams();

  const loadExistingResume = async () => {
        try {
            const {data} = await api.get(`/api/resumes/get/${resumeId}`, {headers: {Authorization: token}})
            if(data.resume) {
                setResumeData(data.resume)
                document.title = `${data.resume.title} - Resume Builder`
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);


  const changeResumeVisibility = async () => {
        try {
            const formData = new FormData();
            formData.append('resumeId', resumeId);
            formData.append('resumeData', JSON.stringify({public: !resumeData.public}));
            const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})

            setResumeData({...resumeData, public: !resumeData.public})
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving resume data", error);
        }
    }

   const handleShare = () => {
        const frontendUrl = window.location.href.split('/app')[0];
        const resumeUrl = `${frontendUrl}/view/${resumeId}`;

        if (navigator.share) {
            navigator.share({
                url: resumeUrl,
                text: 'My Resume'
            })
        }
        else{
            alert('Your browser does not support the "navigator.share" function. Please use a different browser.')
        }
    }

     /**
 * Saves the current resume data to the backend. Handles image uploads and background removal.
 */
    const saveResume = async () => {
        try {
            let updatedResumeData = structuredClone(resumeData)

            // remove image from resumeData
            if(typeof resumeData.personal_info.image === 'object') {
                delete updatedResumeData.personal_info.image
            }

            const formData = new FormData();
            formData.append('resumeId', resumeId);
            formData.append('resumeData', JSON.stringify(updatedResumeData));
            removeBackground && formData.append('removeBackground', "yes");
            typeof resumeData.personal_info.image === 'object' && formData.append('image', resumeData.personal_info.image);
            const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})

            setResumeData(data.resume)
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving resume data", error);
        }
    }

    const downloadResume = () => {
        window.print();
    }
        
    




  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          to="/app"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors w-fit"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Panel - Form */}
        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
            
            {/* Progress Bar */}
            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
            <hr
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
              style={{
                width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
              }}
            />

            {/* Section Navigation */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
              <div className="flex items-center gap-2">
                <TemplateSelector
                  selectedTemplate={resumeData.templates}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, templates: template }))
                  }
                />
                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(color) =>
                    setResumeData((prev) => ({ ...prev, accent_color: color }))
                  }
                />
              </div>

              <div className="flex items-center">
                {/* Previous button */}
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.max(prevIndex - 1, 0)
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    disabled={activeSectionIndex === 0}
                  >
                    <ChevronLeft className="size-4" /> Previous
                  </button>
                )}

                {/* Next button */}
                <button
                  onClick={() =>
                    setActiveSectionIndex((prevIndex) =>
                      Math.min(prevIndex + 1, sections.length - 1)
                    )
                  }
                  className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  disabled={activeSectionIndex === sections.length - 1}
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, personal_info: data }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === "summary" && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary: data,
                    }))
                  }
                  setResumeData={setResumeData}
                />
              )}

              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, experience: data }))
                  }
                />
              )}

              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, education: data }))
                  }
                />
              )}

              {activeSection.id === "project" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, project: data }))
                  }
                />
              )}

              {activeSection.id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, skills: data }))
                  }
                />
              )}
            </div>

            {/* Save Button */}
             <button onClick={()=>{toast.promise(saveResume(), {loading: 'Saving...', success: 'Resume saved!', error: 'Failed to save resume.'})}} className='flex items-center gap-2 bg-linear-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                            <Save className='size-4' /> Save Changes
            </button>

          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-7 max-lg:mt-6">
          <div className="relative w-full">

            

            {/* Action Buttons */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 px-4">
              
              {/* Share Button - only when public */}
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                >
                  <Share2 className="size-4" /> Share
                </button>
              )}

              {/* Public/Private Toggle */}
              <button
                onClick={changeResumeVisibility}
                className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors"
              >
                {resumeData.public ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
                {resumeData.public ? "Public" : "Private"}
              </button>

              {/* Download Button */}
              <button
                onClick={downloadResume}
                className="flex items-center p-2 px-6 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
              >
                <Download className="size-4" /> Download
              </button>

            </div>
          </div>
          {/* Resume Preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.templates}
              accentColor={resumeData.accent_color}
              classes="w-full"
            />
        </div>

      </div>
    </div>
  );


}
export default ResumeBuilder