import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
    role: "user" 
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const response = await fetch("https://gofood-3back.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log("Response from server:", json); 

    if (json.success) {
      alert("You are successfully registered. Please log in.");
      navigate("/login");
    } else {
      setError(json.error || "Error during registration. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <form
          className='w-50 m-auto mt-5 border bg-dark border-success rounded'
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name='name'
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name='email'
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="m-3">
            <label htmlFor="geolocation" className="form-label">Geolocation</label>
            <input
              type="text"
              className="form-control"
              name='geolocation'
              value={credentials.geolocation}
              onChange={onChange}
              required
            />
          </div>
          <div className="m-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-control"
              name="role"
              value={credentials.role}
              onChange={onChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already have an account</Link>
        </form>
      </div>
    </div>
  );
}
