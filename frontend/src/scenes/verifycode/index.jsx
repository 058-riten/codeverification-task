import React, { useState } from 'react';
import './verification.css'

const VerificationCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState([false, false, false, false, false, false]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (index, value) => {
    const isValid = /^\d$/.test(value) || value === ''; 
    const newErrors = [...errors];
    newErrors[index] = !isValid; 

    setErrors(newErrors);

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 5 && value !== '') {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('');
    const newErrors = [...errors];

    newCode.forEach((char, index) => {
      newErrors[index] = !/^\d$/.test(char); 
    });

    setCode(newCode.concat(Array(6 - newCode.length).fill(''))); 
    setErrors(newErrors);

    document.getElementById(`code-${Math.min(5, newCode.length - 1)}`).focus();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    if (errors.some((err) => err) || code.some((digit) => digit === '')) {
      setErrorMessage('Please enter valid numeric digits in all fields.');
      setIsSubmitting(false);
      return;
    }

    const verificationCode = code.join('');

    try {
      const response = await fetch('http://localhost:5000/verifycode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/success'; 
      } else {
        setErrorMessage(data.message || 'Verification failed.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="verification-container">
      <h2>Verification code:</h2>
      <div className="code-inputs" onPaste={handlePaste}>
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            className={errors[index] ? 'error' : ''}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'SUBMIT'}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default VerificationCode;
