import "./styles/reset.css";
import "./styles/load-fonts";
import "./styles/global.css";

import { IconContext } from "@phosphor-icons/react";

import { BrowserRouter, Routes, Route } from "react-router";

import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { GeneratePage } from "./pages/generate/GeneratePage";
import { EditDesignPage } from "./pages/generate/EditDesignPage";
import { ViewRenderPage } from "./pages/generate/ViewRenderPage";
import { MyDesignsPage } from "./pages/generate/MyDesignsPage";

export function App() {
  return (
    <IconContext.Provider
      value={{
        size: 22,
        weight: "bold"
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/generate/*' element={<GeneratePage />} />
          <Route path='/edit' element={<EditDesignPage />} />
          <Route path='/render' element={<ViewRenderPage />} />
          <Route path='/my-designs' element={<MyDesignsPage />} />
        </Routes>
      </BrowserRouter>
    </IconContext.Provider>
  );
}
