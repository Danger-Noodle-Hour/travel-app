import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import Logout from './Logout'; // Import the Logout component

const NavigationBar = () => {
  return (
    <Flex bg="#f8f8f8" p={4} alignItems="center" borderBottom="1px solid #d8d8d8">
      <Box>
        <Link to="/">
          <Text fontSize="lg" fontWeight="bold">USA Travel Vacation Tracker V2</Text>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/login">
          <Text fontSize="md" mx={2}>Login</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/signup">
          <Text fontSize="md" mx={2}>Sign Up</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/map">
          <Text color="brand.text">Map</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/about">
          <Text fontSize="md" mx={2}>About</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/tech-stack">
          <Text fontSize="md" mx={2}>Tech Stack</Text>
        </Link>
      </Box>
      <Box>
        <Logout /> {/* Include the Logout component */}
      </Box>
    </Flex>
  );
};

export default NavigationBar;
