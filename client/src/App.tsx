import React from 'react';
import './App.css';
import LoginPage from './containers/Login';
import SignUpPage from './containers/SignUp';
import AuctionsPage from './containers/Auctions';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button, } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const activeLinkStyle = {color: 'red', background: 'white'};

const App = () => {
  return (
    <Router>
      <AppBar position="static" className='appBar'>
        <Toolbar>
          <Button variant="outlined" color="inherit">
            <NavLink to='/login' activeStyle={activeLinkStyle}>Login</NavLink>
          </Button>
          <Button variant="outlined" color="inherit">
            <NavLink to='/sign-up' activeStyle={activeLinkStyle}>Sign up</NavLink>
          </Button>
        </Toolbar>
      </AppBar>
      <div className="App">
        <Route path="/" exact component={AuctionsPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/sign-up" exact component={SignUpPage} />
      </div>
    </Router>
  );
}

export default App;
