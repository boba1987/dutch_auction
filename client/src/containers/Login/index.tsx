import React, {useState, useEffect} from 'react';
import UserForm from '../../components/UserForm';
import Constants from '../../constants/userConstants';
import {withRouter} from 'react-router-dom';

export default withRouter(({history}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          password
        })
      });
      if (response.status === 200) {
        await response.json();
        setLoggedIn(true);
      }
    } catch (error) {
      console.log('ne');
      console.error('error: ', error);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === Constants.password) {
      setPassword(event.target.value);
    }
    if (event.target.name === Constants.userName) {
      setUserName(event.target.value);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);
  
  return <UserForm title="Login" onsubmit={handleSubmit} handleInputChange={handleInputChange}/>;
});