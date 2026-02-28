import Student from '../models/Student.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

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

export const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: admin._id, role: 'admin' },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  return { message: "Admin Login successful", token, role: 'admin' };
};