import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import { db } from "./data/database.js";
import updateRoutes from "./routes/updateRoutes.js";
import updatePassRoutes from "./routes/updatePassRoutes.js";
import loginTokenRoutes from "./routes/loginTokenRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(registerRoutes);
app.use(authRoutes);
app.use(updateRoutes);
app.use(updatePassRoutes);
app.use(loginTokenRoutes);
app.use(logoutRoutes);
app.get("/users", (req, res) => {
  db.query("SELECT * FROM  users  ", (err, result) => {
    res.send({ result });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
