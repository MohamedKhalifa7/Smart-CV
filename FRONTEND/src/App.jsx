import { useState } from 'react'
import './App.css'
import Builder from './componants/Builder/Buldir'
import { CVProvider } from './context/CVcontext'

function App() {

  return (
    <>
    <CVProvider>
     <Builder />
     </CVProvider>
    </>
  )
}

export default App
