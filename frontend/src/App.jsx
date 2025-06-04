import React, { use, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';


import Navbar from './components/layout/Navbar';
import { LoaderCircle } from 'lucide-react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import SettingsPage from './pages/account/SettingsPage';
import ProfilePage from './pages/account/ProfilePage';

import PrivateRoute from './components/auth/PrivateRoute';



import './App.css'
import { useAuthStore } from './store/useAuthStore';

function App() {
 const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

 useEffect(()=>{
  checkAuth();
 }, [checkAuth]);

 console.log(authUser);

 if(isCheckingAuth && !authUser) {
  return (
    
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <LoaderCircle className="animate-spin text-blue-500 w-12 h-12" />
    </div>
    
  )}
 

  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="/" element={authUser?<HomePage /> : <Navigate to='/login'/>} />
        <Route path="/login" element={!authUser?<LoginPage />: <Navigate to='/'/>} />
        <Route path="/signUp" element={!authUser?<SignUpPage />: <Navigate to='/'/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser?<ProfilePage /> : <Navigate to='/login'/>} />

        {/* PrivateRoute is a wrapper that checks if the user is authenticated */}
        {/* Protected Routes */}

        {/* <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }/>

        <Route path="/settings" element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }/> */}

        

      </Routes>

    </div>

  )
}

export default App
