import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { login } from '../../../lib/slices/UserSlice';
import { useRouter } from 'next/navigation';
import "./login.css";
import { signIn, useSession } from 'next-auth/react';

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const redirect = useRouter();

  const handleLogin = async () => {
    if (value.email === '' || value.password === '') {
      setErrorMsg('Enter all fields');
    } else {
      setErrorMsg('');
      setLoading(true); 
      try {
        await signIn('credentials', {
          email: value.email,
          password: value.password,
          redirect: false,
        });

      } catch (error) {
        console.log(error);
        setErrorMsg("Invalid credentials");
      }
    }
  }

  useEffect(() => {
    if (session) {
      dispatch(login(session?.user));
      setLoading(false); 
      redirect.push("/");
    }
  }, [session, dispatch, redirect]);

  return (
    <div className="login-container">
      <h2 className='login-header'>Login</h2>
      <div className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder='Enter Email'
          value={value.email}
          onChange={(event) => setValue((prev) => ({ ...prev, email: event.target.value }))}
        />

        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          id="pass"
          placeholder='Enter password'
          value={value.password}
          onChange={(event) => setValue((prev) => ({ ...prev, password: event.target.value }))}
        />
        <div className='errormsg'>{errorMsg}</div>
        <button type="button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
        <div className='signup'><Link href="/signup">Sign Up</Link></div>
      </div>
    </div>
  )
}

export default Login;
