import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { CVProvider } from "./context/CVcontext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import store from "./redux/store/store";
import Layout from "./pages/layout";
import GetStarted from "./componants/GetStart/getStart";
import Builder from "./componants/Builder/Buldir";
import { theme } from "./componants/theme";
import Home from "./componants/Home/Home";
import LoginPage from "./componants/Auth/LoginPage";
import RegisterPage from "./componants/Auth/RegisterPage";
import GoogleAuthSuccess from "./componants/Auth/GoogleAuthSuccess";
import VerifyOTP from "./componants/Auth/VerifyOTP";
import GrammarCheck from "./componants/GrammarCheck/grammarCheck";
import { FileProvider } from "./context/fileContext.jsx";
import { TemplateProvider } from "./context/choosenTempContext.jsx";
import ProtectedRoute from "./guard/ProtectedRoute.jsx";
import AuthProvider from "./context/Auth/AuthContext.jsx";
import './i18n';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "builder", element:<ProtectedRoute><Builder /></ProtectedRoute> },
      { path: "getStart", element: <GetStarted /> },
      { path: "auth/success", element: <GoogleAuthSuccess /> },
      { path: "grammarCheck", element: <GrammarCheck /> },

      { path: "*", element: <Error /> },
    ],
  },
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "verify-otp", element: <VerifyOTP /> },
]);

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  return (
    <AuthProvider>
    <Provider store={store}>
      <CVProvider>
        <TemplateProvider>
          <FileProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </FileProvider>
        </TemplateProvider>
      </CVProvider>
    </Provider>
    </AuthProvider>
  );
}

export default App;
