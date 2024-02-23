import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import Logout from './Logout'; // Import the Logout component
import '../../styles/navbar.css'; // Import your CSS file

const NavigationBar = () => {
  return (
    <Flex bg="#f8f8f8" p={4} alignItems="center" borderBottom="1px solid #d8d8d8">
      <Box>
        <Link to="/" className="nav-link"> {/* Add the nav-link class */}
          <Text fontSize="lg" fontWeight="bold">USA Travel Vacation Tracker V2</Text>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/login" className="nav-link"> {/* Add the nav-link class */}
          <Text fontSize="md" mx={2}>Login</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/signup" className="nav-link"> {/* Add the nav-link class */}
          <Text fontSize="md" mx={2}>Sign Up</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/about" className="nav-link"> {/* Add the nav-link class */}
          <Text fontSize="md" mx={2}>About</Text>
        </Link>
      </Box>
      <Box>
        <Link to="/tech-stack" className="nav-link"> {/* Add the nav-link class */}
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
