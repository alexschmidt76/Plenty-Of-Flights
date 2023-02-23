import logo from './logo.svg';
import './App.css';
import React, {useRef, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './users/SignUpForm';
import LoginForm from './users/LoginForm';
import CurrentUser from './contexts/CurrentUser'

function App() {
  return (
    <div>
      <h1>Hello</h1>
    <CurrentUser.Provider>
        <Routes>
          <Route exact path="/sign-up" component={<SignUpForm/>} />
          <Route exact path="/login" component={<LoginForm/>} />
        </Routes>
    </CurrentUser.Provider>
    </div>
  );
}

export default App;
