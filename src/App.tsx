import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Providers } from "./Providers";

import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { useAuthState } from "./stores/auth-store";
import {
  ForgetPasswordEmailSentPage,
  ForgetPasswordPage
} from "./pages/auth/ForgetPassword";
import {
  ResetPasswordCompletedPage,
  ResetPasswordPage
} from "./pages/auth/ResetPassword";
import { Scratch } from "./pages/_scratch/Scratch";
import { CoreApp } from "./pages/app/CoreApp";

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
        {/* prettier-ignore */}
        <Routes>
          <Route path='/s' element={<Scratch />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/forget-password' element={<ForgetPasswordPage />} />
          <Route path='/auth/forget-password/sent' element={<ForgetPasswordEmailSentPage />} />
          <Route path='/auth/reset-password/:userId/:token' element={<ResetPasswordPage />} />
          <Route path='/auth/reset-password/done' element={<ResetPasswordCompletedPage />} />
          <Route
            path='/app/*'
            element={
              // <Protect>
                <CoreApp />
              // </Protect>
            }
          />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
