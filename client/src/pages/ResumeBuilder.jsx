import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
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
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex]; //find current section

  const { resumeId } = useParams();

  const loadExistingResume = async () => {
    // Find the resume from the dummy data using the ID from the URL
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  // Run the function when the component loads or when resumeId changes
  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

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
        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
            {/* Left Panel - Form */}
            {/* progress bar using activeSectionIndex */}
            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
            <hr
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
              style={{
                width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
              }}
            />

            {/* Section Navigation */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
              <div></div>
              <div className="flex items-center">
                {/* Previous button */}
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.max(prevIndex - 1, 0),
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
                      Math.min(prevIndex + 1, sections.length - 1),
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
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
