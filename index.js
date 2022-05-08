import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import petRoutes from './routes/petRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRoutes)
app.use(petRoutes)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
