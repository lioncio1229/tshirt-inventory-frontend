import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from "react-router-dom";
import router from './pages/router'

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
  </React.StrictMode>,
)
