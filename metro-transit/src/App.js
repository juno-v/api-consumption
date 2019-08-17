import React from 'react';
import './App.scss';
import Header from "./components/Header/Header"; 
import FetchData from "./FetchData/FetchaData"; 

function App() {
  return (
    <div>
      <Header/>
     <h1> hello world </h1>
     <FetchData /> 
    </div>
  );
}

export default App;
