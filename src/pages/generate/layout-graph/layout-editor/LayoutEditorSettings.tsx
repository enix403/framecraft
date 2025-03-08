import { createContext } from "react";

interface LayoutEditorSettings {
  readOnly: boolean;
}

export const LayoutEditorSettingsContext = createContext<LayoutEditorSettings>({
  readOnly: false
});
