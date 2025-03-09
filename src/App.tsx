import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Scratch } from "./pages/_scratch/Scratch";
import { WebEditor } from "./pages/web-editor/WebEditor";
import { GenerateDesign } from "./pages/generate/GenerateDesign";

export function App() {
  return (
    <TooltipProvider delayDuration={0}>
      <BrowserRouter>
        <Routes>
          <Route path='/s' element={<Scratch />} />
          <Route path='/new' element={<GenerateDesign />} />
          <Route path='/edit' element={<WebEditor />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}
