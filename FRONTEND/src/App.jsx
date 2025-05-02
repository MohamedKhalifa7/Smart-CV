import { Box, CircularProgress, ThemeProvider } from "@mui/material";
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
import AuthProvider, { useAuth } from "./context/Auth/AuthContext.jsx";
import './i18n';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { PreviewProvider } from "./context/previewContext.jsx";
import ChatBot from "./componants/chatBot/chatBot.jsx";
import ProPaymentForm from "./componants/payment/payment.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "builder", element: <ProtectedRoute><Builder /></ProtectedRoute> },
      { path: "getStart", element: <ProtectedRoute><GetStarted /></ProtectedRoute> },
      { path: "auth/success", element: <GoogleAuthSuccess /> },
      { path: "grammarCheck", element: <GrammarCheck /> },
      {path:"payment-check",element:<ProPaymentForm/>},
      { path: "*", element: <Error /> },
    ],
  },
  { path: "chatbot", element: <ChatBot /> },

  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "verify-otp", element: <VerifyOTP /> },
  
]);

function App() {
  const { i18n } = useTranslation();
  const { loading } = useAuth();

  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  if (loading) {
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress sx={{color:"purple"}}/>
    </Box>
  }
  return (

    <Provider store={store}>
      <CVProvider>
        <PreviewProvider>
          <TemplateProvider>
            <FileProvider>
              <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
              </ThemeProvider>
            </FileProvider>
          </TemplateProvider>
        </PreviewProvider>
      </CVProvider>
    </Provider>

  );
}

export default App;
