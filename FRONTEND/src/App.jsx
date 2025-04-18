import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Builder from './componants/Builder/Buldir'
import { CVProvider } from './context/CVcontext'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import Layout from './pages/layout';
function App() {

  const routes = createBrowserRouter([
    {
      path:"",
      element:<Layout/>
    }
  ])

  return (
    <>
    <Provider store={store}>
     <RouterProvider router={routes}/>
    <CVProvider>
     <Builder />
     </CVProvider>
    </Provider>
    </>
  )
}

export default App
