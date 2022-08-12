import React from 'react'
import {Link,BrowserRouter,Routes, Route,Navigate} from 'react-router-dom'
import Home from './Home/index';
import Profile from './Profile/index'
import {store} from './appStore/store'
export const AfterLogin = () => {
  const fnLogout=()=>{
    sessionStorage.clear();
    store.dispatch({
      type:'LOGOUT'
    })
  }
  return (
    <div>
      <BrowserRouter>
       <ul className='menu'>
         <li><Link to='/home'>Home</Link></li>
         <li><Link to='/profile'>Profile</Link></li>
         <li onClick={fnLogout}><Link to='/login'>Logout</Link></li>
       </ul>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='*' element={<Navigate to="home" />} />
        </Routes>
       </BrowserRouter>
    </div>
  )
}
