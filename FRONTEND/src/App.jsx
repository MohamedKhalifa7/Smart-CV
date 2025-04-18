import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { CVProvider } from './context/CVcontext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import store from './redux/store/store';
import Layout from './pages/layout';
import GetStarted from './componants/Home/getStart';
import Builder from './componants/Builder/Buldir';
import { theme } from './componants/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <GetStarted /> },
      { path: 'builder', element: <Builder /> },
      { path: "*", element: <Error/> }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <CVProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CVProvider>
    </Provider>
  );
}

export default App;
