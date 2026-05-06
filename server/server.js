import express from 'express'
import cors from 'cors'
import "dotenv/config";

import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js';
/*
import resumeRouter from './routes/resumeRoutes.js'
import aiRouter from './routes/aiRoutes.js'
*/

const app = express()
const PORT = process.env.PORT || 3000

//DB connection
await connectDB()


app.use(express.json()) // Parse JSON request bodies
app.use(cors())        



app.get('/', (req, res) => {
    res.send('Server is live...')
})

app.use('/api/users',userRouter)



/*
app.use('/api/users', userRouter)     // User auth & profile
app.use('/api/resumes', resumeRouter) // Resume CRUD operations
app.use('/api/ai', aiRouter)          // AI-related features
*/


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})