import { useState } from 'react'
import './App.css'
import Builder from './componants/Builder/Buldir'
import { CVProvider } from './context/CVcontext'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import GetStarted from './componants/Home/getStart'
import { theme } from './componants/theme'

import { ThemeProvider } from '@mui/material'
function App() {

  return (
    <>
    <Provider store={store}>
    <CVProvider>
      <ThemeProvider theme={theme}>
     {/* <Builder /> */}
     <GetStarted></GetStarted>
     </ThemeProvider>
     </CVProvider>
    </Provider>
    </>
  )
}

export default App
