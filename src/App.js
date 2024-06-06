import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './views/LoginPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import MainPage from './views/MainPage';
import AboutUsPage from './views/AboutUsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route exact path="/main" element={<MainPage />} />
          <Route exact path="/aboutUs" element={<AboutUsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
