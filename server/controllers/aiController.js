import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";



/*
POST /api/ai/enhance-pro-sum
*/
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "No content provided" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the professional summary to be concise, compelling, and impactful. Return only the improved text."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


/*
POST /api/ai/enhance-job-desc
*/
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "No content provided" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance this job description to be concise and impactful. Return only the improved text."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

/*
POST /api/ai/upload-resume
*/
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "No content provided" });
        }

        const systemPrompt = "You are an expert AI agent that extracts structured data from resumes.";

        const userPrompt = `Extract data from the following resume text and return ONLY valid JSON:

            ${resumeText}

            Proviide data in following json format with no additional text before or after:

            JSON structure:
            {
            professional_summary: {
            type: String,
            default: ""
        },

        
        skills: {
            type: [{ type: String }],
            default: []
        },

        
        personal_info: {
            image: { type: String, default: "" },
            full_name: { type: String, default: "" },
            profession: { type: String, default: "" },
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            location: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            website: { type: String, default: "" }
        },

        
        experience: [
            {
                company: { type: String },
                position: { type: String },
                start_date: { type: String },
                end_date: { type: String },
                description: { type: String },
                is_current: { type: Boolean }
            }
        ],

        
        project: [
            {
                name: { type: String },
                type: { type: String },
                description: { type: String },
                live_link: { type: String },
                source_code_link: { type: String }
            }
        ],

        
        education: [
            {
                institution: { type: String },
                degree: { type: String },
                field: { type: String },
                graduation_date: { type: String },
                gpa: { type: String }
            }
        ]
        },
                

    }
             
        `;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
        });

        const parsedData = JSON.parse(response.choices[0].message.content);

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        return res.json({ resumeId: newResume._id });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


