import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import socket from "../../server";

interface LoginFormData {
  userId: string;
  password: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginFormData>({
    userId: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auths/login",
        credentials
      );
      if (response.data.statusCode === 200) {
        const user = response.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        socket.emit("login", user, (res: any) => {
          console.log("Res :", res);
          localStorage.setItem("userObjectId", res.data.userId);
        });
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error); // Handle error
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="string"
        name="userId"
        placeholder="User ID"
        value={credentials.userId}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      {error && <div>{error}</div>}
      <StyledButton type="submit">Login</StyledButton>
    </StyledForm>
  );
};

export default Login;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 320px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
