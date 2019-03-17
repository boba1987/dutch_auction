import React from 'react';
import SignInForm from '../../components/UserForm';

const handleSubmit = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  console.log(e.target);
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.name, event.target.value);
}

const LoginPage = () => {
  return <SignInForm title="Login" onsubmit={handleSubmit} handleInputChange={handleInputChange}/>;
}

export default LoginPage;