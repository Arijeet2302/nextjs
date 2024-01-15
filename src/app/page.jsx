"use client"
import styles from './page.module.css'
import Link from 'next/link';
import { logout } from '../../lib/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsComponent from './components/cartItems/CartItems';
import { DeleteCart } from '../../lib/slices/CartSlice';
import { signOut } from 'next-auth/react';

export default function Home() {

  const isloggedIn = useSelector((state)=>state.user.status);
  const dispatch = useDispatch();
  const name = useSelector((state)=>state.user.name);

  const handleLogout = ()=>{
    signOut();
    dispatch(logout());
    dispatch(DeleteCart());
  }

  return (
    <main className={styles.main}>
      <div className={styles.headingMain}>
        This is main page
      </div>
      <div className={styles.bodyMain}>
        { isloggedIn ? (<h2>Hello {name}</h2>):<div></div>}
      </div>
      { isloggedIn ? (
        <>
        <CartItemsComponent/>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
        </>
        ):
      (<Link  className={styles.login} href="/login">Login</Link>)}
    </main>
  )
}
