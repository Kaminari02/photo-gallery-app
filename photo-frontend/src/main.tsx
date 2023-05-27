import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/store/store';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
