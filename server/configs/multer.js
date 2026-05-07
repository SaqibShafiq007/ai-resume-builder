import multer from "multer";

/*
handles file uploads (used for resume images)
Stored temporarily on disk before processing
*/
const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;