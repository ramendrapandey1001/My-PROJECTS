import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import NavigationBar from './Navbar';

const EmployeeList = ({ user, setUser }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    _id: '',
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    imgUpload: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    axios.get('http://localhost:8000/api/getall')
      .then(response => setEmployees(response.data))
      .catch(error => console.log(error));
  }, [user, navigate]);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8000/api/delete/${id}`)
      .then(response => {
        toast.success('Employee deleted', { position: 'top-right' });
        setEmployees(employees.filter(employee => employee._id !== id));
      })
      .catch(error => console.log(error));
  };

  const handleShowModal = (employee) => {
    setCurrentEmployee(employee);
    checkCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const checkCurrentEmployee = (employee) => {
    if(!employee.course)
      {
        employee.course = [];
      }
  }

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setCurrentEmployee((prevData) => ({
            ...prevData,
            [name]: checked
                ? [...prevData[name], value]
                : prevData[name].filter((course) => course !== value)
        }));
    } else {
      setCurrentEmployee({
            ...currentEmployee,
            [name]: value
        });
    }
};


  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/${currentEmployee._id}`, currentEmployee);
      toast.success('Employee updated successfully', { position: 'top-right' });
      setEmployees(employees.map(emp => emp._id === currentEmployee._id ? currentEmployee : emp));
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to update employee', { position: 'top-right' });
    }
  };

  return (
    <>
      <NavigationBar user={user} setUser={setUser} />
      <Container className='mt-5 bg-white rounded'>
        <h3 className='text-center mb-4'>Employee List</h3>
        <Table className="table table-striped table-bordered table-hover table-sm" responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(', ')}</td>
                <td>
                  <Button variant='warning' size='sm' className='me-2' onClick={() => handleShowModal(employee)}>Edit</Button>
                  <Button variant='danger' size='sm' onClick={() => deleteEmployee(employee._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitForm}>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' onChange={inputHandler} name='name' value={currentEmployee.name || ''} autoComplete='off' placeholder='Name' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' onChange={inputHandler} name='email' value={currentEmployee.email || ''} autoComplete='off' placeholder='Email' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='mobile'>
                <Form.Label>Mobile</Form.Label>
                <Form.Control type='text' onChange={inputHandler} name='mobile' value={currentEmployee.mobile || ''} autoComplete='off' placeholder='Mobile' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='designation'>
                <Form.Label>Designation</Form.Label>
                <Form.Control type='text' onChange={inputHandler} name='designation' value={currentEmployee.designation || ''} autoComplete='off' placeholder='Designation' />
              </Form.Group>
              <div className='row'>
                <Form.Group className='mb-3 col-md-6' controlId='gender'>
                  <Form.Label>Gender</Form.Label>
                  <div className='d-flex'>
                    <Table>
                      <tr className='l-5'>
                        <td>
                        <Form.Check 
                      type='radio' 
                      label='Male' 
                      name='gender' 
                      value='Male' 
                      checked={currentEmployee.gender === 'Male' || false} 
                      onChange={inputHandler} 
                      className='form-check-input me-2'
                    />
                        </td>

                        <td>
                        <Form.Check 
                        type='radio' 
                        label='Female' 
                        name='gender' 
                        value='Female' 
                        checked={currentEmployee.gender === 'Female' || false} 
                        onChange={inputHandler} 
                        className='form-check-input'
                        />
                        </td>
                      </tr>
                    </Table>
                    
                    
                  </div>
                </Form.Group>
                <Form.Group className='mb-3 col-md-6' controlId='course'>
                  <Form.Label>Course</Form.Label>
                  <div className='d-flex flex-wrap r-10'>
                    <Table>
                      <tr>
                      <td>
                      <Form.Check 
                      type='checkbox' 
                      label='MCA' 
                      name='course' 
                      value='MCA' 
                      checked={currentEmployee.course.includes('MCA')} 
                      onChange={inputHandler} 
                      className='form-check-input me-2'
                    />
                      </td>
                      <td>
                      <Form.Check 
                      type='checkbox' 
                      label='BCA' 
                      name='course' 
                      value='BCA' 
                      checked={currentEmployee.course.includes('BCA')} 
                      onChange={inputHandler} 
                      className='form-check-input me-2'
                    />
                      </td>
                      <td>
                      <Form.Check 
                      type='checkbox' 
                      label='BSC' 
                      name='course' 
                      value='BSC' 
                      checked={currentEmployee.course.includes('BSC')} 
                      onChange={inputHandler} 
                      className='form-check-input'
                    />
                      </td>
                      </tr>
                    </Table>
                  </div>
                </Form.Group>
              </div>
              <Button variant='primary' type='submit' className='w-100'>Update</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
  
  
  
  
};

export default EmployeeList;
