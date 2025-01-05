import "./styles/reset.css";
import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route } from "react-router";

import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import {GeneratePage} from "./pages/generate/GeneratePage";
// import EditDesign from "./pages/generate/EditDesign";
// import ViewRender from "./pages/generate/ViewRender";
// import MyDesigns from "./pages/generate/MyDesigns";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        {/*
        <Route path="/edit" element={<EditDesign />} />
        <Route path="/render" element={<ViewRender />} />
        <Route path="/my-designs" element={<MyDesigns />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}
