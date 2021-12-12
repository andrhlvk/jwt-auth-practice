import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';

// interface Props {}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log('form submitted');
    const response = await register({
      variables: {
        email,
        password,
      },
    });

    console.log(response);
    navigate({ pathname: '/' });
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type='email'
          value={email}
          placeholder='email'
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>register</button>
    </form>
  );
};

export default Register;
