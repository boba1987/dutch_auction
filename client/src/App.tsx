import React from 'react';
import './App.css';
import LoginPage from './containers/Login';
import SignUpPage from './containers/SignUp';
import AuctionsPage from './containers/Auctions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={AuctionsPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/sign-up" exact component={SignUpPage} />
      </div>
    </Router>
  );
}

export default App;
