import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAdminToggle = () => setIsAdmin(!isAdmin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isAdmin
      ? 'http://localhost:5000/api/admin/admin-login'
      : 'http://localhost:5000/api/loginuser';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');
        navigate(isAdmin ? '/' : '/');
      } else {
        setError(data.error || 'Invalid email or password. Please try again.');
        setTimeout(() => setError(''), 3000); 
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again.');
      setTimeout(() => setError(''), 3000); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="container w-50 bg-dark text-light p-5 rounded border border-success">
        <h2 className="text-center mb-4">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="admin"
              className="form-check-input"
              checked={isAdmin}
              onChange={handleAdminToggle}
            />
            <label htmlFor="admin" className="form-check-label">
              Login as Admin
            </label>
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
