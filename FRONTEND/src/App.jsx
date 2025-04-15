import { useState } from 'react'
import './App.css'
import Builder from './componants/Builder/Buldir'
import { CVProvider } from './context/CVcontext'
import { Provider } from 'react-redux'
import store from './redux/store/store'
function App() {

  return (
    <>
    <Provider store={store}>
    <CVProvider>
     <Builder />
     </CVProvider>
    </Provider>
    </>
  )
}

export default App
