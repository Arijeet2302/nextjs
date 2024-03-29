"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import "./navbar.css"
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.count)
  const name = useSelector((state) => state.user.name)
  const isloggedIn = useSelector((state) => state.user.status);

  const handlecart = () => {
    alert("login first");
  }

  return (
    <nav className="navbar">
      <div className="logo">My App</div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        {isloggedIn ? (<li><Link href="/cart">Cart ({cartCount})</Link></li>) :
          (<li><Link href="/login" onClick={handlecart}>Cart ({cartCount})</Link></li>)}
        {isloggedIn ? (<li><Link href={`/user/${name}`}>Profile</Link></li>) : (<li><Link href="/login">Login</Link></li>)}
      </ul>
    </nav>
  )
}

export default Navbar
