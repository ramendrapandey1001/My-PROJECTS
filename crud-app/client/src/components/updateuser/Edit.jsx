// UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '', email: '', password: '', mobile: '', designation: '', gender: '', course: [], imgUpload: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const checkboxHandler = (e) => {
    const { name, checked, value } = e.target;
    if (checked) {
      setEmployee({ ...employee, [name]: [...employee[name], value] });
    } else {
      setEmployee({ ...employee, [name]: employee[name].filter(item => item !== value) });
    }
  };

  const fileHandler = (e) => {
    setEmployee({ ...employee, imgUpload: e.target.files[0] });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key]);
    }
    await axios.put(`http://localhost:8000/api/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        toast.success('Employee updated', { position: 'top-right' });
        navigate('/employees');
      })
      .catch(error => console.log(error));
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    fileHandler(e);
  };

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h3 className='card-title text-center'>Update Employee</h3>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" onChange={inputHandler} id="name" name="name" value={employee.name} autoComplete='off' placeholder='Name' />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" onChange={inputHandler} id="email" name="email" value={employee.email} autoComplete='off' placeholder='Email' />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" onChange={inputHandler} id="password" name="password" value={employee.password} autoComplete='off' placeholder='Password' />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile No</label>
                  <input type="text" className="form-control" onChange={inputHandler} id="mobile" name="mobile" value={employee.mobile} autoComplete='off' placeholder='Mobile No' />
                </div>
                <div className="mb-3">
                  <label htmlFor="designation" className="form-label">Designation</label>
                  <input type="text" className="form-control" onChange={inputHandler} id="designation" name="designation" value={employee.designation} autoComplete='off' placeholder='Designation' />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 text-center">
                  <label htmlFor="imgUpload" className="form-label">Img Upload</label>
                  <input type="file" className="form-control" onChange={handleFileChange} id="imgUpload" name="imgUpload" />
                </div>
                <div className="mb-3 text-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Passport Size" className="img-thumbnail" style={{ width: '150px', height: '150px' }} />
                  ) : (
                    <div className="img-thumbnail" style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input type="radio" className="form-check-input" onChange={inputHandler} id="male" name="gender" value="Male" checked={employee.gender === 'Male'} />
                      <label htmlFor="male" className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="radio" className="form-check-input" onChange={inputHandler} id="female" name="gender" value="Female" checked={employee.gender === 'Female'} />
                      <label htmlFor="female" className="form-check-label">Female</label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" className="form-check-input" onChange={checkboxHandler} id="mca" name="course" value="MCA" checked={employee.course.includes('MCA')} />
                      <label htmlFor="mca" className="form-check-label">MCA</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" className="form-check-input" onChange={checkboxHandler} id="bca" name="course" value="BCA" checked={employee.course.includes('BCA')} />
                      <label htmlFor="bca" className="form-check-label">BCA</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" className="form-check-input" onChange={checkboxHandler} id="bsc" name="course" value="BSC" checked={employee.course.includes('BSC')} />
                      <label htmlFor="bsc" className="form-check-label">BSC</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary">UPDATE EMPLOYEE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
