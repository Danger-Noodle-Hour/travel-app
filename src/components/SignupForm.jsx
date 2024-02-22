import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  FormHelperText,
  chakra,
  Box,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignupForm = ({ onSubmit }) => {
  const [username, setUsername] = useState(''); // State to store username
  const [password, setPassword] = useState(''); // State to store password
  const [city, setCity] = useState(''); // State to store city
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const [suggestions, setSuggestions] = useState([]); // State to store autofill suggestions

  // useEffect hook to fetch autofill suggestions when city input changes
  useEffect(() => {
    const fetchAutofillSuggestions = async () => {
      if (city.length > 0) {
        const countryCode = 'US'; // Country code for the United States
        const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&country=${countryCode}&maxRows=10&username=snakcaz1`; // API endpoint URL
        try {
          // Send a GET request to the GeoNames API to fetch autofill suggestions
          const response = await axios.get(url);
          const data = response.data;
          // Filter and process unique cities from the response data
          const uniqueCities = Array.from(new Set(data.postalCodes.map(item => item.placeName + ', ' + item.adminCode1)))
            .map(name => {
              return data.postalCodes.find(item => item.placeName + ', ' + item.adminCode1 === name);
            });
          // Update the suggestions state with the unique cities
          setSuggestions(uniqueCities);
        } catch (error) {
          // Log any errors that occur during the fetch operation
          console.error('Error fetching autofill suggestions:', error);
        }
      } else {
        // Clear the suggestions if the city input is empty
        setSuggestions([]);
      }
    };
  
    fetchAutofillSuggestions();
  }, [city]); // Run this effect whenever the city state changes

  // Function to toggle password visibility
  const handleShowClick = () => setShowPassword(!showPassword);

  // Function to handle form submission
  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Validate input fields
    if (!username || !password || !city) {
      setErrorMessage('All fields are required');
      return;
    }
    // Call the onSubmit function with the form data
    onSubmit({ username, password, city });
  };

  return (
    // Form component to handle form submission
    <form onSubmit={handleSignUp}>
      <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" borderRadius="10px">
        {/* Username input field */}
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
        </FormControl>
        {/* Password input field */}
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
            <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* City input field */}
        <FormControl>
          <InputGroup>
                <InputLeftElement pointerEvents="none" children="City" />
                <Input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
              </InputGroup>
              {/* Display autofill suggestions if available */}
              {suggestions.length > 0 && (
                <Box position="absolute" mt="1" w="full" zIndex="2" bg="white" boxShadow="lg">
                  {suggestions.map((suggestion) => (
                    <Box key={suggestion.postalCode} p="2" borderBottomWidth="1px" _hover={{ bg: 'cityOption.bg' }} onClick={() => { setCity(suggestion.placeName); setSuggestions([]); }}>
                      {suggestion.placeName}, {suggestion.adminCode1}
                    </Box>
                  ))}
                </Box>
              )}
            </FormControl>
            {/* Display error message if any */}
            {errorMessage && <FormHelperText color="red.500">{errorMessage}</FormHelperText>}
            {/* Submit button */}
            <FormControl>
              <Button borderRadius="9px" type="submit" variant="solid" colorScheme="teal" width="full">Sign Up</Button>
            </FormControl>
          </Stack>
        </form>
      );
    };

export default SignupForm;
