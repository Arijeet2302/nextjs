import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./user.css";
import { logout } from '../../../../lib/slices/UserSlice';
import { useRouter } from 'next/navigation';
import { DeleteCart } from '../../../../lib/slices/CartSlice';
import { signOut } from 'next-auth/react';

const User = () => {
    const userName = useSelector((state)=>state.user.name);
    const userEmail = useSelector((state)=>state.user.email);
    const dispatch = useDispatch();
    const redirect = useRouter();

    const handleLogout = () => {
        signOut({redirect:false});
        dispatch(logout());
        dispatch(DeleteCart());
        redirect.push("/");
    }

  return (
    <div className="profileContainer">
      <h1 className="heading">Profile</h1>
      <p className="info">Name: {userName}</p>
      <p className="info">Email: {userEmail}</p>
      <button className='logoutButton' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default User
