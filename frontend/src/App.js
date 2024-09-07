import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import VerificationCode from './scenes/verifycode';
import CodeGenerator from './scenes/codegenerator';
import Success from './scenes/success';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/codegeneration" />} />
        <Route path="/codegeneration" element={<CodeGenerator />} />
          <Route path='/verifycode' element={<VerificationCode/>} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
