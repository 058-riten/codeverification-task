import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './codegenerator.css';

const CodeGenerator = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  
  const generateCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/codegeneration'); 
      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error('Error fetching the code:', error);
    }
  };

  return (
    <div className="generator-container">
      <h2>Generate Verification Code</h2>
      
      <div className="generated-code-display">
        {generatedCode ? (
          <p className="generated">{generatedCode}</p>
        ) : (
          <p className="placeholder">Click "Generate" to get a code</p>
        )}
      </div>
      
      <button
        className="generate-button"
        onClick={generateCode}
        disabled={generatedCode !== ''}
      >
        {generatedCode ? 'Code Generated' : 'Generate Code'}
      </button>

      {generatedCode && (
        <Link to="/verifycode" className="verification-link">
          Go to Verification Page
        </Link>
      )}
    </div>
  );
};

export default CodeGenerator;
