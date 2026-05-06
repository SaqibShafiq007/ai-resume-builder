import mongoose from 'mongoose';

/*
|--------------------------------------------------------------------------
| MongoDB Connection
|--------------------------------------------------------------------------
| Connects application to MongoDB using Mongoose
| Uses project-specific database name
*/
const connectDB = async () => {
    try {
        // Log successful connection
        mongoose.connection.on("connected", () => {
            console.log('Database connected successfully');
        });

        let mongodbURI = process.env.MONGODB_URI;
        const projectName = 'resume-builder';

        if (!mongodbURI) {
            throw new Error('Please set the MONGODB_URI environment variable');
        }

        // Remove slash if present
        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        // Connect to MongoDB
        await mongoose.connect(`${mongodbURI}/${projectName}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;