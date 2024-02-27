import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpFormData {
  userId: string;
  email: string;
  userName: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    userId: "",
    email: "",
    password: "",
    userName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auths/signup`,
        formData
      );
      const message = response.data.message;
      alert(message);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message); // Handle error
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userId"
        placeholder="UserID"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="userName"
        placeholder="UserName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {/* {error && <div>{error}</div>} */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
