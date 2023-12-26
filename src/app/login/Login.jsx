import React, { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { login } from '../Redux/slices/UserSlice';
import { useRouter } from 'next/navigation';
import "./login.css";
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Login = () => {

  const [ value , setValue] = useState({
    email: '', password : ''
  });
  const [Errormsg, setErrormsg] = useState(""); 
  const dispatch = useDispatch(); 
  const router = useRouter();
  const { data : session  } = useSession();
  

  const handleLogin = async() => {
    if (value.name === '' || value.email === '') {
      setErrormsg('Enter all fields');
    }else{
      setErrormsg('');
      try {
        const res = await signIn('credentials', {
          email : value.email,
          password : value.password,
          redirect: false,
        });
        if (res.error) {
          setErrormsg("Invalid credentials");
          return;
        }
        dispatch(login(session.user));
        router.push("/");
      } catch (error) {
        console.log(error);
        alert("something went wrong");
      }
      router.push("/");
      return;
    }
    setTimeout(() => {
      setErrormsg("");
    }, 2000);
  }

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
        onChange={(event)=>setValue((prev)=>({...prev, email: event.target.value}))}
      />

      <label htmlFor="pass">Password:</label>
      <input
        type="password"
        id="pass"
        placeholder='Enter password'
        value={value.password}
        onChange={(event)=>setValue((prev)=>({...prev, password: event.target.value}))}
      />
      <div className='errormsg'>{Errormsg}</div>
      <button type="button" onClick={handleLogin}>
        Log In
      </button>
      <div className='signup'><Link href="/signup">Sign Up</Link></div>
    </div>
  </div>
  )
}

export default Login