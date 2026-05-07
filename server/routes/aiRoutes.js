import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
    enhanceJobDescription,
    enhanceProfessionalSummary,
    uploadResume,
    
} from "../controllers/aiController.js";


const aiRouter = express.Router();

/*
| Enhance professional summary using AI
| POST /api/ai/enhance-pro-sum
*/
aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);

/*
| Enhance job description using AI
| POST /api/ai/enhance-job-desc
*/
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);

/*
| Upload resume PDF and extract content using AI
| POST /api/ai/upload-resume
*/
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;