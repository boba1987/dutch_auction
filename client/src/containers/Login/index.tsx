import React, {useState} from 'react';
import SignInForm from '../../components/UserForm';
import Constants from '../../constants/userConstants';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password
      })
    });
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === Constants.password) {
      setPassword(event.target.value);
    }
    if (event.target.name === Constants.userName) {
      setUserName(event.target.value);
    }
  }
  
  return <SignInForm title="Login" onsubmit={handleSubmit} handleInputChange={handleInputChange}/>;
}

export default LoginPage;