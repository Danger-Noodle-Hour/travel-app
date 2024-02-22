import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';

const TechStack = () => {
  const techStackLeft = [
    'React',
    'React Router',
    'Chakra UI',
    'Express',
    'Node.js',
    'MongoDB',
    'Webpack',
    'Babel',
    'Axios',
    'Jest',
    'Sass',
    'Webpack Dev Server',
    'Concurrently',
    'Connect-Mongo',
    'Cookie-parser',
  ];

  const techStackRight = [
    'Cors',
    'Cross-env',
    'D3-geo',
    'Express-session',
    'Framer Motion',
    'Jest Environment Jsdom',
    'Mongoose',
    'React-dom',
    'React-icons',
    'React-simple-maps',
    'React-tooltip',
    'Webpack-cli',
    'Webpack-hot-middleware',
    // Add any additional technologies here
  ];

  return (
    <Box p="4" maxW="600px" mx="auto" textAlign="center">
      <Heading as="h1" size="xl" mb="4" fontFamily="heading">Tech Stack</Heading>
      
      <Flex justify="space-between">
        <Box flex="1" textAlign="left">
          <Text fontSize="lg" fontWeight="bold" mb="2" fontFamily="heading" color="blue.500">Frontend Technologies</Text>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {techStackLeft.map((tech, index) => (
              <li key={index}>
                <Text fontFamily="body" fontSize="md">{tech}</Text>
              </li>
            ))}
          </ul>
        </Box>
        
        <Box flex="1" textAlign="left">
          <Text fontSize="lg" fontWeight="bold" mb="2" fontFamily="heading" color="green.500">Backend Technologies</Text>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {techStackRight.map((tech, index) => (
              <li key={index}>
                <Text fontFamily="body" fontSize="md">{tech}</Text>
              </li>
            ))}
          </ul>
        </Box>
      </Flex>
    </Box>
  );
};

export default TechStack;
