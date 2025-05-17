import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    role: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'member', label: 'Member' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'student_life_officer', label: 'Student Life Officer (RVA)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate each field
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Passwords do not match';
    }
    
    if (!formData.role) newErrors.role = 'Please select a role';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Create a copy of formData without password_confirm
    const { password_confirm, role, ...userData } = formData;
    
    const success = await register(userData, role);
    
    if (success) {
      // Redirect to login page after successful registration
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Join SESAVENTY</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              error={errors.username}
              placeholder="Choose a username"
            />

            <FormSelect
              label="Role"
              name="role"
              options={roleOptions}
              value={formData.role}
              onChange={handleChange}
              required
              error={errors.role}
              placeholder="Select your role"
            />

            <FormInput
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              error={errors.first_name}
              placeholder="Enter your first name"
            />

            <FormInput
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              error={errors.last_name}
              placeholder="Enter your last name"
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
              placeholder="Enter your email"
              className="md:col-span-2"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
              placeholder="Create a password"
            />

            <FormInput
              label="Confirm Password"
              name="password_confirm"
              type="password"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              error={errors.password_confirm}
              placeholder="Confirm your password"
            />
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
