import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Spacer } from '@chakra-ui/react';

const NavigationBar = () => {
  return (
    <Flex bg="brand.bg" p={4} alignItems="center">
      <Box>
        <Link to="/">
          <Text color="brand.text">Home</Text>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/login">
          <Text color="brand.text">Login</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/signup">
          <Text color="brand.text">Signup</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/set-home-location">
          <Text color="brand.text">Set Home Location</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/about">
          <Text color="brand.text">About</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/tech-stack">
          <Text color="brand.text">Tech Stack</Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default NavigationBar;
