import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppNavigator from './navigation/AppNavigator';
import './App.css';

function App() {
  return (
    <Router>
      <AppNavigator />
    </Router>
  );
}

export default App;

