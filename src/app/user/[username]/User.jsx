import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./user.css";
import { logout } from '../../Redux/slices/UserSlice';
import { useRouter } from 'next/navigation';
import { DeleteCart } from '../../Redux/slices/CartSlice';

const User = () => {
    const userName = useSelector((state) => state.user.name);
    const userEmail = useSelector((state) => state.user.email);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(DeleteCart());
        router.push("/");
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
