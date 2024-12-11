import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth',authRoutes)


const PORT  = process.env.PORT || 5000;



app.listen(PORT,()=> {
    console.log("Server running on",PORT)
    connectDB();
})