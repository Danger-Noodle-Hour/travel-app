import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

// Create chakra components for the font awesome icons
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Function to toggle password visibility
  const handleShowClick = () => setShowPassword(!showPassword);
  
//handles click of submit and calls handleLogin
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  
  const { username, password } = formData;
  const handleLogin = async () => {
    try {
      // Send a POST request to the backend endpoint '/login'
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Convert data to JSON format and send it in the request body
      });

      // Parse the response data as JSON
      const data = await response.json();

      // If the response is successful (status code 2xx), navigate to the map page
      if (response.ok) {
        navigate('/map');
      } else {
        // If there's an error response, log the error message to the console
        // console.error(data.error);
        navigate('/signup');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error:', error);
      navigate('/signup');
    }
  };

  // Function to handle signup navigation
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <FormControl> {/* Wrap the entire form in FormControl */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" minH="200px" borderRadius="10px">
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />}/>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />}/>
            <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</Button>
            </InputRightElement>
          </InputGroup>
          {errorMessage && <FormHelperText color="red.500">{errorMessage}</FormHelperText>}
          <Button borderRadius="9px" type="submit" variant="solid" colorScheme="brand" width="full">Login</Button>
        </Stack>
      </form>
    </FormControl>
  );
};

export default LoginForm;
