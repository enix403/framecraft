import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

import { WebEditor } from "./pages/web-editor/WebEditor";
import { Scratch } from "./pages/scratch/Scratch";

export function App() {
  return (
    <TooltipProvider delayDuration={0}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WebEditor />} />
          <Route path='/s' element={<Scratch />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}
