import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { login } from '../Redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  });
  const { data: session } = useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async() => {
    if (formData.fname === '' || formData.lname === '' || formData.username === '' || formData.email === '' || formData.password === '') {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const res = await axios.post("/api/register",{
        fname: formData.fname,
        lname: formData.lname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert(res.data.msg);
      dispatch(login(session.user));
      router.push("/");
    } catch (error) {
      console.log("Error while signing in",error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default SignupForm;
