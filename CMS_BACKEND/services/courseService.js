import Course from '../models/Course.js';

export const getAllCourses = async (searchTerm) => {
  const query = searchTerm 
    ? { courseName: { $regex: searchTerm, $options: 'i' } } 
    : {};
    
  return await Course.find(query).sort({ createdAt: -1 });
};

export const createNewCourse = async (courseData) => {
  const { courseName, courseDescription, instructor } = courseData;
  return await Course.create({ courseName, courseDescription, instructor });
};

export const deleteCourseById = async (id) => {
  return await Course.findByIdAndDelete(id);
};