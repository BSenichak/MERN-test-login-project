import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getUserData, login, register } from "./controllers/UserController.js";
import { authValidator } from "./helpers/validators.js";
import handleValodationError from "./middlewes/handleValodationError.js";
import isAuthenticated from "./middlewes/isAuthenticated.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("Mongo server connected"))
    .catch((err) => console.error(`Mongo error` + err));

const app = express();

app.use(express.json());
app.use(cors());

app.post(
    "/register",
    authValidator,
    handleValodationError,
    register
);
app.post(
    "/login",
    authValidator,
    handleValodationError,
    login
);
app.get("/me", isAuthenticated, getUserData)


const PORT = process.env.PORT || 8888;

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    }
    console.log("server is runing on port: " + process.env.PORT);
});
