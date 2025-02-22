import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import the LoginForm component
import Logo from './Logo'; // Import the Logo component

import {
  Flex,
  Heading,
  Avatar,
  Box,
  Stack,
  Link,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the signup page
  const handleSignup = () => {
    navigate('/signup'); // Navigate to the signup page when clicked
  };

  return (
    // Flex container to center the content vertically and horizontally
    <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        {/* Logo and heading */}
        <Logo />
        <Heading color="brand.text">TraveLite</Heading>
        {/* Render the LoginForm component */}
        <Box minW={{ base: "90%", md: "468px" }} >
          <LoginForm />
        </Box>
      </Stack>
      {/* Link to navigate to the signup page */}
      <Box mt={4}>
        New to us?{' '}
        <Link color="brand.bg" onClick={handleSignup}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
