import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Button } from './components/ui/button';
import Navbar from './components/layout/Navbar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import SettingsPage from './pages/account/SettingsPage';
import ProfilePage from './pages/account/ProfilePage';
import PrivateRoute from './components/auth/PrivateRoute';



import './App.css'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        {/* PrivateRoute is a wrapper that checks if the user is authenticated */}
        {/* Protected Routes */}

        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }/>

        <Route path="/settings" element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }/>

        

      </Routes>

    </div>

  )
}

export default App
