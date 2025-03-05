import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Scratch } from "./pages/_scratch/Scratch";
import { WebEditor } from "./pages/web-editor/WebEditor";

export function App() {
  return (
    <TooltipProvider delayDuration={0}>
      <BrowserRouter>
        <Routes>
          <Route path='/s' element={<Scratch />} />
          <Route path='/' element={<WebEditor />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}
