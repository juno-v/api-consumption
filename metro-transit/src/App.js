import React from 'react';
import './App.scss';
// import Header from "./components/Header/Header"; 
// import Headline from "./components/Headline/Headline"; 
import GetRoutes from "./components/GetRoutes/GetRoutes"; 

function App() {
  return (
    <div>
      {/* <Header/>

      <section className="main">
        <Headline header="Posts" description="Click the button to render posts" /> 
      </section> */}
      
     <GetRoutes /> 
    </div>
  );
}

export default App;
