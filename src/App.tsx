import "./styles/reset.css";
import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route } from "react-router";

import { HomePage } from "./pages/home/HomePage";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Generate from "./pages/generate/Generate";
// import EditDesign from "./pages/generate/EditDesign";
// import ViewRender from "./pages/generate/ViewRender";
// import MyDesigns from "./pages/generate/MyDesigns";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/edit" element={<EditDesign />} />
        <Route path="/render" element={<ViewRender />} />
        <Route path="/my-designs" element={<MyDesigns />} />
        */}
      </Routes>
    </BrowserRouter>
  );
};
