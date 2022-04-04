import React, {SyntheticEvent, useState} from "react";
import {Navigate} from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    // console.log(`name: {name}, email: {email}, password: {password}`);
    // console.log({name, email, password});
    const response = await fetch(
      'http://192.168.64.10:3000/register',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password})
      }
    );
    const createdUser = await response.json();

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/login'/>;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <input className="form-control" placeholder="Name" required
               onChange={e => setName(e.target.value)}/>
        <input type="email" className="form-control" placeholder="name@example.com" required
               onChange={e => setEmail(e.target.value)}/>
        <input type="password" className="form-control" placeholder="Password" required
               onChange={e => setPassword(e.target.value)}/>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Register;