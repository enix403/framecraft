import { Route, Routes } from "react-router";
import { DashboardPage } from "./dashboard/DashboardPage";
import { GenerateDesign } from "./generate/GenerateDesign";
import { WebEditor } from "./web-editor/WebEditor";

export function CoreApp() {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/new-design' element={<GenerateDesign />} />
      <Route path='/edit-design' element={<WebEditor />} />
    </Routes>
  );
}
