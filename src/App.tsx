import "./styles/reset.css";
import "./styles/load-fonts";
import "./styles/global.css";

import { IconContext } from "@phosphor-icons/react";
import { BrowserRouter, Routes, Route } from "react-router";

import { EditorPage } from "./editor/EditorPage.tsx";

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
          <Route path='/' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </IconContext.Provider>
  );
}
