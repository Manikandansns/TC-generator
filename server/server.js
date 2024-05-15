const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const StudentModel = require('./Model/student');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const insertSampleStudentsFromFile = async () => {
  try {
    await StudentModel.deleteMany();
    const sampleStudentsFilePath = path.join(__dirname, 'sampleStudents.json');
    const sampleStudentsData = JSON.parse(fs.readFileSync(sampleStudentsFilePath, 'utf8'));
    await StudentModel.insertMany(sampleStudentsData);
    console.log('Sample students inserted successfully');
  } catch (error) {
    console.error('Error inserting sample students:', error);
  }
};
insertSampleStudentsFromFile();

app.get('/api/students', async (req, res) => {
  try {
    const { roll_no } = req.query;
    if (!roll_no) {
      return res.status(400).json({ message: 'Roll number is required' });
    }

    const student = await StudentModel.findOne({ roll_no:roll_no });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
