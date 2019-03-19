import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserForm from '../../components/UserForm';
import Constants from '../../constants/userConstants';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import userConstants from '../../constants/userConstants';

interface AuthFormProps extends RouteComponentProps {
    url: string,
    title: string
}

export default withRouter((props: AuthFormProps) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let response = await axios({
        url: props.url,
        method: 'POST',
        data: {
          userName,
          password
        }
      });
      localStorage.setItem(userConstants.tokenKey, response.data.token);
      setLoggedIn(true);
    } catch (error) {
      if (error.response.data.errors) {
        let errors = error.response.data.errors.reduce((accumulator: string, error: {msg: string}) => {
          return accumulator.concat(error.msg, '. ');
        }, '');

        return setError(`Error: ${errors}`);
      }

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
      props.history.push('/');
    }
  }, [loggedIn, error]);
  
  return <UserForm title={props.title} onsubmit={handleSubmit} handleInputChange={handleInputChange} error={error}/>;
});