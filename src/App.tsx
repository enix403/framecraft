import "./styles/load-fonts";
import "./styles/global.css";

import { IconContext } from "@phosphor-icons/react";
import { BrowserRouter, Routes, Route } from "react-router";

import { WebEditor } from "./web-editor/WebEditor";

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
          <Route path='/' element={<WebEditor />} />
        </Routes>
      </BrowserRouter>
    </IconContext.Provider>
  );
}
