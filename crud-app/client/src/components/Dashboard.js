import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import NavigationBar from './Navbar';
import { useNavigate } from 'react-router-dom';




const Dashboard = ({ user, setUser }) => {
  const [employee, setEmployee] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
   
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getone/${user._id}`);
        console.log('Employee data:', response.data); // Log the response data
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (user && user._id) {
      fetchEmployee();
    }
  }, [user, navigate]);
  
  if (!employee.course){
    employee.course = [];
  }

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        setEmployee((prevData) => ({
            ...prevData,
            [name]: checked
                ? [...prevData[name], value]
                : prevData[name].filter((course) => course !== value)
        }));
    } else {
        setEmployee({
            ...employee,
            [name]: value
        });
    }
};


  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/${user._id}`, employee);
      toast.success('Employee updated successfully', { position: 'top-right' });
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update employee', { position: 'top-right' });
    }
  };

  return (
    <>
      <NavigationBar user={user} setUser={setUser} />
      <Container className='mt-5'>
        <Card className='shadow-sm'>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-center'>
              <h1 className='card-title mb-4'>Welcome, {employee.name}!</h1>
            </div>
            <p className='card-text text-left text-bold'>This is your dashboard.</p>
            {isEditing ? (
             <Form onSubmit={submitForm}>
             <Row>
                 <Col md={6}>
                     <Form.Group className='mb-3' controlId='name'>
                         <Form.Label>Name</Form.Label>
                         <Form.Control type='text' onChange={inputHandler} name='name' value={employee.name || ''} autoComplete='off' placeholder='Name' />
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group className='mb-3' controlId='email'>
                         <Form.Label>Email</Form.Label>
                         <Form.Control type='email' onChange={inputHandler} name='email' value={employee.email || ''} autoComplete='off' placeholder='Email' />
                     </Form.Group>
                 </Col>
             </Row>
             <Row>
                 <Col md={6}>
                     <Form.Group className='mb-3' controlId='mobile'>
                         <Form.Label>Mobile</Form.Label>
                         <Form.Control type='text' onChange={inputHandler} name='mobile' value={employee.mobile || ''} autoComplete='off' placeholder='Mobile' />
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group className='mb-3' controlId='designation'>
                         <Form.Label>Designation</Form.Label>
                         <Form.Control type='text' onChange={inputHandler} name='designation' value={employee.designation || ''} autoComplete='off' placeholder='Designation' />
                     </Form.Group>
                 </Col>
             </Row>
             <Row>
                 <Col md={6}>
                     <Form.Group className='mb-3' controlId='gender'>
                         <Form.Label>Gender</Form.Label>
                         <div>
                             <Form.Check
                                 inline
                                 label="Male"
                                 type="radio"
                                 name="gender"
                                 value="Male"
                                 checked={employee.gender === 'Male'}
                                 onChange={inputHandler}
                             />
                             <Form.Check
                                 inline
                                 label="Female"
                                 type="radio"
                                 name="gender"
                                 value="Female"
                                 checked={employee.gender === 'Female'}
                                 onChange={inputHandler}
                             />
                         </div>
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group className='mb-3' controlId='course'>
                         <Form.Label>Course</Form.Label>
                         <div>
                             <Form.Check
                                 inline
                                 label="MCA"
                                 type="checkbox"
                                 name="course"
                                 value="MCA"
                                 checked={employee.course.includes('MCA')}
                                 onChange={inputHandler}
                             />
                             <Form.Check
                                 inline
                                 label="BCA"
                                 type="checkbox"
                                 name="course"
                                 value="BCA"
                                 checked={employee.course.includes('BCA')}
                                 onChange={inputHandler}
                             />
                             <Form.Check
                                 inline
                                 label="BSC"
                                 type="checkbox"
                                 name="course"
                                 value="BSC"
                                 checked={employee.course.includes('BSC')}
                                 onChange={inputHandler}
                             />
                         </div>
                     </Form.Group>
                 </Col>
             </Row>
             <div className='d-flex justify-content-end'>
                 <Button variant='primary' type='submit' className='me-2'>Update</Button>
                 <Button variant='secondary' onClick={() => setIsEditing(false)}>Cancel</Button>
             </div>
         </Form>
         
         
            ) : (
              <>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Name: {employee.name}</li>
                  <li className='list-group-item'>Email: {employee.email}</li>
                  <li className='list-group-item'>Mobile: {employee.mobile}</li>
                  <li className='list-group-item'>Designation: {employee.designation}</li>
                  <li className='list-group-item'>Gender: {employee.gender}</li>
                  <li className='list-group-item'>Course: {employee.course.join(', ') || 'no course'}</li>
                </ul>
                <div className='d-flex justify-content-end'>
                  <Button variant='primary' className='mt-3' onClick={() => setIsEditing(true)}>Edit</Button>
                </div>
               
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};


export default Dashboard;
