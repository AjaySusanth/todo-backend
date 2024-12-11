import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'
import taskRoutes from './routes/task.route.js'
import cookieParser from 'cookie-parser';
import { swaggerSpec } from './swagger/swagger.js';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/auth',authRoutes)
app.use('/',taskRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> {
    console.log("Server running on",PORT)
    console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
    connectDB();
})