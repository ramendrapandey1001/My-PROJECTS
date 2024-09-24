import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import NavigationBar from '../Navbar';

const AddEmployee = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        mobile: '',
        designation: '',
        gender: '',
        course: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                course: checked
                    ? [...prevData.course, value]
                    : prevData.course.filter((course) => course !== value)
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData); // Log form data
            const response = await axios.post('http://localhost:8000/api/create', formData);
            toast.success(response.data.msg, { position: 'top-right' });
            navigate(`/employeelist`);
        } catch (error) {
            toast.error('There was an error creating the user!', { position: 'top-right' });
            console.error('There was an error creating the user!', error.response ? error.response.data : error.message);
        }
    };
    return (
        <>
            <NavigationBar user={user} setUser={setUser} />
            <Container className="mt-5 p-4 rounded" style={{ backgroundColor: 'white' }}>
                <h2 className="text-center">Add Employee</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="designation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" name="designation" value={formData.designation} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Male"
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === 'Male'}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === 'Female'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="course">
                                <Form.Label>Course</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="MCA"
                                        type="checkbox"
                                        name="course"
                                        value="MCA"
                                        checked={formData.course.includes('MCA')}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="BCA"
                                        type="checkbox"
                                        name="course"
                                        value="BCA"
                                        checked={formData.course.includes('BCA')}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        label="BSC"
                                        type="checkbox"
                                        name="course"
                                        value="BSC"
                                        checked={formData.course.includes('BSC')}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default AddEmployee;
