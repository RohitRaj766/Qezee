import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../actions/index';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); 
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { loading: apiLoading, message, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message) {
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }
  }, [message]);

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    return password.length >= minLength && hasUppercase && hasDigit;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!validatePassword(newPassword)) {
      alert("Password must be at least 6 characters long and include at least one uppercase letter and one digit.");
      return;
    }
    setLoading(true);
    dispatch(resetPassword(token, email, newPassword));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              style={styles.eyeButton}
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading || apiLoading}>
            {loading || apiLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  eyeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
    fontSize: '1.2rem',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '10px',
    color: 'green',
  },
};

export default ResetPassword;
