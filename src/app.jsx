import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Map from './components/Map.jsx';
import About from './components/About';
import TechStack from './components/TechStack';
import NavigationBar from './components/NavigationBar'; // Import the NavigationBar component
import theme from '../styles/theme.js'
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavigationBar /> {/* Render the NavigationBar component */}
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/map' element={<Map/>} />
        <Route path='/about' element={<About/>} /> 
  <Route path='/tech-stack' element={<TechStack/>} /> 
      </Routes>
    </ChakraProvider>
  );
};
