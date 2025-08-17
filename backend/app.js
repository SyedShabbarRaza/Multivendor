import express from 'express';
import dotenv from 'dotenv';
import errorHandling from './middleware/error.js';
import cookieParser from 'cookie-parser';
import userRoutes from './controllers/user.js';
import shopRoutes from './controllers/shop.js';
import productRoutes from './controllers/product.js';
import eventRoutes from './controllers/event.js';
import coupounCode from './controllers/coupounCode.js'
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173",credentials:true },));
app.use(express.urlencoded({extended:true}))  // To access req.body
app.use(cookieParser()); //To use Cookies

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: "backend/config/.env"
  });
}

//Routes
console.log('statred')
app.use("/api/auth",userRoutes)
app.use("/api/shop",shopRoutes)
app.use("/api/product",productRoutes)
app.use("/api/event",eventRoutes)
app.use("/api/coupoun",coupounCode)

app.use(errorHandling);

export default app;
