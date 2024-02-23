// Import useState hook
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Box,
  Link,
} from "@chakra-ui/react";
import SignupForm from './SignupForm'; // Import the SignupForm component
import Logo from './Logo';

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  // Function to handle signup form submission
  const handleSignup = async ({ username, password, city }) => {
    try {
      // Send a POST request to the backend endpoint '/signup'
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, city }), // Convert data to JSON format and send it in the request body
      });

      // Parse the response data as JSON
      const data = await response.json();

      // If the response is successful (status code 2xx), navigate to the map page
      if (response.ok) {
        navigate('/map');
      } else {
        // If there's an error response, set the error message
        setErrorMessage(data.message); // Assuming the backend returns the error message in a 'message' field
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error:', error);
      setErrorMessage('An error occurred during signup.');
    }
  };

  // Function to handle navigation to the login page
  const handleLogin = () => {
    navigate('/'); // Navigate to the login page when clicked
  };

  return (
    // Flex container to center the content vertically and horizontally
    <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      {/* Logo and heading */}
      <Box>
        <Logo />
        <Heading color="brand.text">TravelLite</Heading>
      </Box>
      {/* Render the SignupForm component */}
      <Box minW={{ base: "90%", md: "468px" }} >
        <SignupForm onSubmit={handleSignup} errorMessage={errorMessage} /> {/* Pass the handleSignup function and errorMessage as props */}
      </Box>
      {/* Link to navigate to the login page */}
      <Box>
        Welcome!{' '}
        <Link color="brand.bg" onClick={handleLogin}>Login</Link>
      </Box>
    </Flex>
  );
};

export default Signup;
