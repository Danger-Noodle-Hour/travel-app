import React from 'react';
import { Image } from '@chakra-ui/react';
import logo from '../assets/images/TravelLogo.webp'; // Import the image

const Logo = () => {
  return (
    <Image src={logo} alt="Logo" width="300px" height="auto" /> // Adjust width and height as needed
  );
};

export default Logo;
