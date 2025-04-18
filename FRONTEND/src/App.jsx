import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./componants/Builder/Buldir";
import { CVProvider } from "./context/CVcontext";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import RegisterPage from "./componants/Auth/RegisterPage";
import LoginPage from "./componants/Auth/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <CVProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Builder />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </CVProvider>
    </Provider>
  );
}

export default App;
