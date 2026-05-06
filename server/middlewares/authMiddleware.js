import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| Authentication Middleware
|--------------------------------------------------------------------------
| Protects private routes by verifying JWT token
| Attaches userId to request object if token is valid
*/
const protect = async (req, res, next) => {
    // Read token from Authorization header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify token and decode payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request for further use
        req.userId = decoded.userId;

        // Continue to next middleware / controller
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default protect;