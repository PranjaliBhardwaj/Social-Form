import React from 'react';
import Form from './components/Form.js'; // Adjust the path if necessary
import './index.css'; // Ensure CSS is loaded
import logo from './Logo_dark.png'; // Import the logo image

function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" className="App-logo" /> {/* Add the logo */}
      <div classname="heading">
        <h1><b>Company Information Form</b></h1>
        </div>
      <Form />
    </div>
  );
}

export default App;
