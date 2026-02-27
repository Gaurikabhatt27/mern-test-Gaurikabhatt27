import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';

export const registerStudent = async (studentData) => {
  const { name, email, password } = studentData;

  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    throw new Error('Student already exists');
  }

  const student = new Student({ name, email, password });
  await student.save();
  return student;
};

export const loginStudent = async (email, password) => {
  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error('Invalid credentials');
  }

  if (student.password !== password) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: student._id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  return { message: "Login successful", token };
};