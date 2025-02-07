import React, { useState } from 'react'
import "./navbar.scss";
import "../../app.scss";
import {Link} from 'react-router-dom';
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
const Navbar = () => {
    const [isScrolled,setIsScrolled]=useState(false);
    window.onscroll=()=>{
        setIsScrolled(window.pageYOffset === 0 ? false :true);
        return ()=> (window.onscroll=null);
    }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className='container'>
        <div className='left'>
        <img src='../public/s.png' alt='' />
        <Link to="/" className="link">  <span>Homepage</span></Link>
      
        <Link to="/series" className="link">
        <span>Series</span>
        </Link >
      <Link to="/movies" className="link">   <span>Movies</span></Link>
      <Link className='link'> <span>New and Popular</span></Link>
      <Link className='link'> <span>My List</span></Link>
      
       
       
        </div>
       
        <div className='right'>
            <Search className='icon'/>
           
            <Notifications />
            <img src='../public/user.png'/>
            <div className='profile'>
            <ArrowDropDown className='icon'/>
            <div className='options'>
                <span>Settings</span>
                <span>Logout</span>
            </div>
            </div>
        
        </div>
    </div>
    </div>
  )
}

export default Navbar
