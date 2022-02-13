import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import {
  GithubAuthHandler,
  ProtectedPage,
} from './auth';
import { DashboardContent } from './components/dashboard-content';

import { Dashboard } from './routes/dashboard';
import { Login } from './routes/login';
import { Logout } from './routes/logout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedPage><Dashboard /></ProtectedPage>}>
            <Route path='settings' element={
              <DashboardContent title='Settings'></DashboardContent>
            } />
            <Route path='dashboard' element={
              <DashboardContent title='Secret Dashboard'></DashboardContent>
            } />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/frontend/api/auth/github/callback' element={<GithubAuthHandler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
