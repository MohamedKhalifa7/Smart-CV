import { useState } from 'react'
import './App.css'
import Builder from './componants/Builder/Buldir'
import { CVProvider } from './context/CVcontext'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import GetStarted from './componants/Home/getStart'
import { theme } from './componants/theme'
import { Routes, Route ,BrowserRouter} from 'react-router-dom';

import { ThemeProvider } from '@mui/material'
import Home from './componants/Home/Home'
function App() {

  return (
    <>
    <Provider store={store}>
    <CVProvider>
      <ThemeProvider theme={theme}>
     {/* <Builder />
     <GetStarted></GetStarted> */}
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/getStart" element={<GetStarted />} />
              <Route path="/builder" element={<Builder />} />

            </Routes>
          </BrowserRouter>
     </ThemeProvider>
     </CVProvider>
    </Provider>
    </>
  )
}

export default App
