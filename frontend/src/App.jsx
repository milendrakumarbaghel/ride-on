import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtecteWrapper from './pages/UserProtecteWrapper';
import CaptainProtecteWrapper from './pages/CaptainProtecteWrapper';
import UserLogout from './pages/UserLogout';
import CaptainLogout from './pages/CaptainLogout';
import CaptainHome from './pages/CaptainHome';
import Riding from './pages/Riding';


const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/login' element={<UserLogin />}/>
            <Route path='/signup' element={<UserSignup />}/>
            <Route path='/captain-login' element={<CaptainLogin />}/>
            <Route path='/captain-signup' element={<CaptainSignup />}/>
            <Route path='/riding' element={<Riding />} />
            <Route path='/home'
                element={
                    <UserProtecteWrapper>
                        <Home />
                    </UserProtecteWrapper>
                }
            />

            <Route path='/user/logout'
                element={
                    <UserProtecteWrapper>
                        <UserLogout />
                    </UserProtecteWrapper>
                }
            />

            <Route path='/captain-home'
                element={
                    <CaptainProtecteWrapper>
                        <CaptainHome />
                    </CaptainProtecteWrapper>
                }
            />

            <Route path='/captain/logout'
                element={
                    <CaptainProtecteWrapper>
                        <CaptainLogout />
                    </CaptainProtecteWrapper>
                }
            />
        </Routes>
    </>
  )
}

export default App
