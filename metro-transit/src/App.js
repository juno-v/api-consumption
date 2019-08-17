import React from 'react';
import './App.scss';
import Header from "./components/Header/Header"; 
import Headline from "./components/Headline/Headline"; 
function App() {
  return (
    <div>
      <Header/>

      <section className="main">
        <Headline header="Posts" description="Click the button to render posts" /> 
      </section>
      
     <h1> APP.JS </h1>
    </div>
  );
}

export default App;
