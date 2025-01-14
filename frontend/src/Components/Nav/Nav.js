import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <ul className='home-ul'>
        <li className='home-ll'>
            <Link to="/mainhome" className='active home-a'>
            <h1>Home</h1>
            </Link>
        </li>
        <li className='home-ll'>
        <Link to="/adduser" className='active home-a'>
            <h1>Add User</h1>
            </Link>
        </li>
        <li className='home-ll'>
        <Link to="/userdetails" className='active home-a'>
            <h1>User Details</h1>
            </Link>
        </li>
        <li className='home-ll'>
        <Link to="/contact" className='active home-a'>
            <h1>Contact Us</h1>
          </Link>
        </li>
        <li className='home-ll'>
        <Link to="/sendpdf" className='active home-a'>
            <h1>Send Pdf</h1>
          </Link>
        </li>
        <li className='home-ll'>
        <Link to="/imgpart" className='active home-a'>
            <h1>Photos</h1>
          </Link>
        </li>
        <li className='home-ll'>
        <Link to="/regi" className='active home-a'>
            <button>Register</button>
          </Link>
        </li>
        <li className='home-ll'>
        <Link to="/log" className='active home-a'>
            <button>Login</button>
          </Link>
        </li>
        </ul>
    </div>
  );
}

export default Nav;
