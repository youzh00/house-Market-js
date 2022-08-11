import React from 'react'
import '../Styles/Navbar.css'
import {BiHomeSmile} from 'react-icons/bi'
import {BiUser} from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'



export default function Navbar() {
    const navigate=useNavigate()
    const {pathname}=useLocation()

    const pathmatches=(route)=>{
        if(route===pathname){
            return true
        }
        return false
    }
  
  return (
    <main className='navBar'>
        < div className='navBarContainer'>
            <ul className='navBarContainerList'>
                <li >
                    <BiHomeSmile size={35} className='icon' onClick={()=>navigate('/')} fill={pathmatches('/') ? '#1a22c9': '#acaed9'}/>
                    <h3 className={pathmatches('/') ? 'pActive' : 'pDesactive'} onClick={()=>navigate('/')}>Home</h3>
                </li>
                <li>
                    <BiUser  size={35} className='icon' onClick={()=>navigate('/account')} fill={pathmatches('/account') ? '#1a22c9': '#acaed9'}/>
                    <h3 className={pathmatches('/account') ? 'pActive' : 'pDesactive'} onClick={()=>navigate('/account')}>Account</h3>
                </li>
                
            </ul>
        </div>
    </main>
  )
}