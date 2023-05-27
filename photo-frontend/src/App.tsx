import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CssBaseline, Container} from '@mui/material';
import AppToolbar from '@/components/UI/Apptoolbar';
import { useAppSelector } from './hooks/reduxHooks';

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
          
        </Routes>
      </Container>
    </main>
  </>
  )
};

export default App;
