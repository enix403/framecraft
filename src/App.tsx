import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Providers } from "./Providers";

import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { CoreApp } from "./pages/app/CoreApp";
import { useAuthState } from "./stores/auth-store";
import { ForgetPasswordEmailSentPage, ForgetPasswordPage } from "./pages/auth/ForgetPassword";

function Protect({ children }) {
  const { token } = useAuthState();
  if (!token) {
    return <Navigate to='/auth/login' replace />;
  } else {
    return children;
  }
}

export function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/forget-password' element={<ForgetPasswordPage />} />
          <Route path='/auth/forget-password/sent' element={<ForgetPasswordEmailSentPage />} />
          <Route
            path='/app/*'
            element={
              <Protect>
                <CoreApp />
              </Protect>
            }
          />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
