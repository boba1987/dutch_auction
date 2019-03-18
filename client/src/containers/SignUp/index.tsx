import React, {useState, useEffect} from 'react';
import UserForm from '../../components/UserForm';
import Constants from '../../constants/userConstants';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

export default withRouter(({history}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let response = await axios({
        url: '/user/register',
        method: 'POST',
        data: {
          userName,
          password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoggedIn(true);
    } catch (error) {
      setError(`Error: ${error.response.data.message}`);
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
  }, [loggedIn, error]);
  
  return <UserForm title="Sign up" onsubmit={handleSubmit} handleInputChange={handleInputChange} error={error}/>;
});