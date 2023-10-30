import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';

function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" Component={Register}/> 
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
