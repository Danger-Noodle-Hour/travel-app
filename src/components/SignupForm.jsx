import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
// Function to fetch autofill suggestions from GeoNames API using Axios
const fetchAutofillSuggestions = async () => {
  if (city.length > 0) {
    const countryCode = 'US';
    const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&country=${countryCode}&maxRows=10&username=snakcaz1`;
    try {
      const response = await axios.get(url); // Use axios.get instead of fetch
      const data = response.data;
      const uniqueCities = Array.from(new Set(data.postalCodes.map(item => item.placeName + ', ' + item.adminCode1)))
        .map(name => {
          return data.postalCodes.find(item => item.placeName + ', ' + item.adminCode1 === name);
        });
      setSuggestions(uniqueCities);
    } catch (error) {
      console.error('Error fetching autofill suggestions:', error);
    }
  } else {
    setSuggestions([]);
  }
};
  
    fetchAutofillSuggestions();
  }, [city]);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSignUp = (event) => {
    event.preventDefault();
    if (!username || !password || !city) {
      setErrorMessage('All fields are required');
      return;
    }
    onSubmit({ username, password, city });
  };

  return (
    <form onSubmit={handleSignUp}>
      <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" borderRadius="10px">
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
        </FormControl>
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
        <FormControl>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children="City" />
            <Input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          </InputGroup>
          {suggestions.length > 0 && (
            <Box position="absolute" mt="1" w="full" zIndex="2" bg="white" boxShadow="lg">
              {suggestions.map((suggestion) => (
                <Box key={suggestion.postalCode} p="2" borderBottomWidth="1px" _hover={{ bg:'cityOption.bg' }} onClick={() => { setCity(suggestion.placeName); setSuggestions([]); }}>
                  {suggestion.placeName}, {suggestion.adminCode1}
                </Box>
              ))}
            </Box>
          )}
        </FormControl>
        <FormControl>
          <Button borderRadius="9px" type="submit" variant="solid" colorScheme="teal" width="full">Sign Up</Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export default SignupForm;
