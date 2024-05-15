import { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

function App() {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);

  const handleChange = (e) => {
    setRollNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/students?roll_no=${rollNo}`);
      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    const printContent = document.querySelector('.print-certificate');
    const originalContents = document.body.innerHTML;
    const printContents = printContent.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    
  };

  return (
    <div>
      <div className='fetch-wrapper'>
        <div className='fetch-container'>
        <h1>Transfer Certificate Generator</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter the RollNo' value={rollNo} onChange={handleChange} />
          <button type="submit">Fetch Student</button>
        </form>
        </div>
      </div>

      <section className='print-certificate'> 
      <div className='certificate-wrapper'>
        {student && (
          <div className='certificate-container'>
            <h2>Student Details</h2>
            <div className="field">
              <span className="field-name">Roll Number:</span>
              <span className="field-value">{student.roll_no}</span>
            </div>
            <div className="field">
              <span className="field-name">Name:</span>
              <span className="field-value">{student.name}</span>
            </div>
            <div className="field">
              <span className="field-name">Admission Number:</span>
              <span className="field-value">{student.admission_number}</span>
            </div>
            <div className="field">
              <span className="field-name">Date of Birth:</span>
              <span className="field-value">{student.date_of_birth}</span>
            </div>
            <div className="field">
              <span className="field-name">Gender:</span>
              <span className="field-value">{student.gender}</span>
            </div>
            <div className="field">
              <span className="field-name">Father Name:</span>
              <span className="field-value">{student.father_name}</span>
            </div>
            <div className="field">
              <span className="field-name">Mother Name:</span>
              <span className="field-value">{student.mother_name}</span>
            </div>
            <div className="field">
              <span className="field-name">Nationality:</span>
              <span className="field-value">{student.nationality}</span>
            </div>
            <div className="field">
              <span className="field-name">Address:</span>
              <span className="field-value">{student.address}</span>
            </div>
            <div className="field">
              <span className="field-name">Phone:</span>
              <span className="field-value">{student.contact.phone}</span>
            </div>
            <div className="field">
              <span className="field-name">Email:</span>
              <span className="field-value">{student.contact.email}</span>
            </div>
          </div>
        )}
      </div>
      </section>

      <div className="button-container">
        <button onClick={handlePrint}>Print Certificate</button>
      </div>
    </div>
  );
}

export default App;
