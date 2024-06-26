import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface SignUpFormData {
  userId: string;
  email: string;
  userName: string;
  password: string;
}

interface StyledInputProps {
  $errRef?: string;
}

interface ErrorMessages {
  [key: string]: keyof SignUpFormData;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    userId: "",
    email: "",
    password: "",
    userName: "",
  });
  const [errRef, setErrRef] = useState<string>("");
  const navigate = useNavigate();

  const errorMessages: ErrorMessages = {
    "이미 존재하는 아이디입니다.": "userId",
    "이미 존재하는 이메일입니다.": "email",
    "이미 존재하는 닉네임입니다.": "userName",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errRef) {
      setErrRef("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auths/signup`,
        formData
      );
      const message = response.data.message;
      alert(message);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errMessage = err.response?.data.message;
        alert(errMessage);

        const fieldName = errorMessages[errMessage];
        if (fieldName) {
          setErrRef(fieldName);
        }
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        $errRef={errRef === "userId" ? "userId" : undefined}
        type="text"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
        required
      />
      <StyledInput
        $errRef={errRef === "email" ? "email" : undefined}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <StyledInput
        $errRef={errRef === "userName" ? "userName" : undefined}
        type="text"
        name="userName"
        placeholder="UserName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <StyledButton type="submit">Sign Up</StyledButton>
      <SignupButton type="button" onClick={() => navigate("/login")}>
        Back to Login
      </SignupButton>
    </StyledForm>
  );
};

export default SignUp;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledInput = styled.input<StyledInputProps>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #007bff;
  }

  ${({ $errRef }) =>
    $errRef &&
    css`
      border-color: red;
      border-width: 2px;
      box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.25);
    `}
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignupButton = styled(StyledButton)`
  background-color: #cacaca;
  &:hover {
    background-color: #ababab;
  }
`;
