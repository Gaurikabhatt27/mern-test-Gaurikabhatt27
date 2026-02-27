import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { courseName: { $regex: search, $options: 'i' } } : {};
    
    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch courses" });
  }
};

export const createCourse = async (req, res) => {
    try{
        const { courseName, courseDescription, instructor } = req.body;
    
        const newCourse = new Course({
        courseName,
        courseDescription,
        instructor
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    }catch(error){
        res.status(400).json({message: "Validation error: Please check your fields"});
    }
}

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not delete course" });
  }
};
