import React from 'react';
import './App.css';
import LoginPage from './containers/Login';
import SignUpPage from './containers/SignUp';
import AuctionsPage from './containers/Auctions';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button, } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ProtectedRoute, ProtectedRouteProps}  from './components/PrivateRoute';

const activeLinkStyle = {color: 'red', background: 'white'};
const loggedIn = false;

const defaultProtectedRouteProps: ProtectedRouteProps = {
  authenticationPath: '/login',
};

const App = () => {
  return (
    <Router>
      <AppBar position="static" className='appBar'>
        <Toolbar>
          {loggedIn ? (
            <Button variant="outlined" color="inherit">
              <a>Logout</a>
            </Button>
          ) : (
            <div>
              <Button variant="outlined" color="inherit">
                <NavLink to='/login' activeStyle={activeLinkStyle}>Login</NavLink>
              </Button>
              <Button variant="outlined" color="inherit">
                <NavLink to='/sign-up' activeStyle={activeLinkStyle}>Sign up</NavLink>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="App">
        <ProtectedRoute 
          {...defaultProtectedRouteProps}
          path="/" 
          exact={true} 
          component={AuctionsPage} 
        />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/sign-up" exact component={SignUpPage} />
      </div>
    </Router>
  );
}

export default App;
