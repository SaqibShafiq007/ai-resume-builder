//import imageKit from "../configs/imageKit.js";
import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";


export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({ title, userId });

        return res.status(201).json({
            resume: newResume,
            message: "Resume created successfully"
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId });

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Remove unnecessary fields
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


/*
Get Resume By ID (Public)
Fetches a publicly shared resume
*/
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ _id: resumeId, public: true });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId,resumeData, removeBackground } = req.body;
        const image = req.file;

        
        // Parse resume data safely
        const resumeDataCopy =
            typeof req.body.resumeData === "string"
                ? JSON.parse(req.body.resumeData)
                : structuredClone(req.body.resumeData);

        
        // Upload profile image if provided
        if (image) {
            const imageStream = fs.createReadStream(file.path);  

            const response = await imageKit.files.upload({
                file: imageStream,
                fileName: `resume.png`,
                folder: "user-resumes",
                transformation: {
                    pre:
                        "w-300,h-300,fo-face,z-0.75" +
                        (removeBackground === "yes" ? ",e-bgremove" : "")
                }
            });
            

            resumeDataCopy.personal_info.image = response.url;
        }

        

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            resumeDataCopy,
            { new: true }
        );

        return res.status(200).json({
            resume: updatedResume,
            message: "Resume updated successfully"
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};