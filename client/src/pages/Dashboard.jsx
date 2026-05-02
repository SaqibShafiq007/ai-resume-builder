import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]); //hold list of resumes
  const [showCreateResume, setShowCreateResume] = useState(false); //true when uh click create resume
  const [showUploadResume, setShowUploadResume] = useState(false); //true(visible) when uh click upload resume
  const [title, setTitle] = useState(""); //stores what user types in the input field
  const [resume, setResume] = useState(null); //will hold an uploaded resume file later
  const [editResumeId, setEditResumeId] = useState(""); //stores which resume is being edited

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate("/app/builder/res123");
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/res123");
  };

  const editTitle  = async (e) => {
    e.preventDefault();
    setEditResumeId('');
    navigate("/app/builder/res123");
  };

  const deleteResume  = async (resumeId) => {
    const confirm = window.confirm('Are you to sure to delete this resume?')
    if (confirm){
      setAllResumes(prev=> prev.filter(resume => resume._id!== resumeId))
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const colors = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Create a new resume or upload an existing one to get started.
        </p>
      </div>

      <div className="flex flex-wrap gap-5">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
          <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
            Create Resume
          </p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
          <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 ">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];

          return (
            <button
              key={index}
              onClick={()=> navigate(`/app/builder/$(resume._id)`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: baseColor + "40",
              }}
            >
              <FilePenLineIcon
                className="size-7 group-hover:scale-105 transition-all "
                style={{ color: baseColor }}
              />

              <p
                className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                style={{ color: baseColor + "90" }}
              >
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Hover Actions Menu */}
              <div  onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                
                <TrashIcon
                   onClick={()=> {deleteResume(resume._id)}}  
                   className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" 
                />
                
                
                <PencilIcon 
                  onClick={()=> {setEditResumeId(resume._id) ; setTitle(resume.title)}} 
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" 
                />


              </div>
            </button>
          );
        })}
      </div>

      {/* --- CREATE RESUME MODEL --- */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

            <input
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Create Resume
            </button>

            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowCreateResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload a Resume</h2>

            <input
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-700"
              >
                Select resume file
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-green-700">{resume.name}</p>
                  ) : (
                    <>
                     <UploadCloudIcon className="size-14 stroke-1" />
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Upload Resume
            </button>

            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
                setResume(null); // Clear the file state if they close the modal
              }}
            />
          </div>
        </form>
      )}





      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={() => setEditResumeId('')}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit a Resume title</h2>

            <input
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Update
            </button>

            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setEditResumeId('');
                setTitle("");
              }}
            />
          </div>
        </form>
      )}



    </div>
  );
};

export default Dashboard;
