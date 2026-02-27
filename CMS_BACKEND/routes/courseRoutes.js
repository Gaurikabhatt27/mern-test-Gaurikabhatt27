import express from "express";
import { 
  getCourses, 
  createCourse, 
  deleteCourse 
} from '../controllers/courseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get("/", getCourses);
router.post("/", protect, createCourse);
router.delete("/:id", protect, deleteCourse);

export default router;