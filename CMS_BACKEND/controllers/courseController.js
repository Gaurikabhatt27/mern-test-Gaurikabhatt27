import * as courseService from '../services/courseService.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses(req.query.search);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await courseService.createNewCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: "Error creating course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const result = await courseService.deleteCourseById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};