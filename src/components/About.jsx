import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const About = () => {
  return (
    <Box p="4" maxW="600px" mx="auto" textAlign="center">
      <Heading as="h1" size="xl" mb="4">About Us</Heading>
      
      {/* Version 2 Team */}
      <Box mb="12" p="4" bg="blue.100" borderRadius="md"> {/* Added blue color and rounded corners */}
        <Heading as="h2" size="lg" mb="2">Version 2 Team</Heading>
        <Text fontSize="lg" mb="6">This version of the application was created by:</Text>
        <UnorderedList listStyleType="none" p="0" m="0">
          <ListItem fontSize="xl" mb="2">Adam Kim</ListItem>
          <ListItem fontSize="xl" mb="2">Allison Scott</ListItem>
          <ListItem fontSize="xl" mb="2">Matt Konop</ListItem>
          <ListItem fontSize="xl" mb="2">Kevin Can</ListItem>
        </UnorderedList>
      </Box>
      
      {/* Version 1 Team */}
      <Box mb="4" p="4" bg="green.100" borderRadius="md"> {/* Added green color and rounded corners */}
        <Heading as="h2" size="lg" mb="2">Version 1 Team</Heading>
        <Text fontSize="lg" mb="6">The previous version of the application was created by:</Text>
        <UnorderedList listStyleType="none" p="0" m="0">
          <ListItem fontSize="xl" mb="2">Daniel Garan</ListItem>
          <ListItem fontSize="xl" mb="2">Victoria Obregon</ListItem>
          <ListItem fontSize="xl" mb="2">Anthony Herrera</ListItem>
          <ListItem fontSize="xl" mb="2">Andy White</ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default About;
