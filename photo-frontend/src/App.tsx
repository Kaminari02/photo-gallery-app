import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CssBaseline, Container} from '@mui/material';
import AppToolbar from '@/components/UI/Apptoolbar';
import { useAppSelector } from './hooks/reduxHooks';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Photos from './containers/Photos/Photos';

const App = () => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <>
    <CssBaseline/>
    <header>
      <AppToolbar/>
    </header>
    <main>
      <Container maxWidth="xl">
        <Routes>
        <Route path="/" element={<Photos/>} />
        <Route path='/register' element={(
              <ProtectedRoute isAllowed={!user} redirectPath='/'>
                <Register/>
              </ProtectedRoute>
            )} />
          <Route path='/login' element={(
              <ProtectedRoute isAllowed={!user} redirectPath='/'>
                <Login/>
              </ProtectedRoute>
            )} />
        </Routes>
      </Container>
    </main>
  </>
  )
};

export default App;
