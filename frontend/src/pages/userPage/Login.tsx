import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error); // Handle error
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
