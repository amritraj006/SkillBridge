import express from "express";
const Router = express.Router();
import { getAllCourses, courseById } from "../controllers/courseController.js";

Router.get("/", getAllCourses);
Router.get("/:id", courseById);

export default Router;