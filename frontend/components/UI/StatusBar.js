import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { DarkModeContext } from "../../store/dark-mode";

export default function CustomStatusBar() {
  const darkModeCtx = useContext(DarkModeContext);
  const theme = darkModeCtx.theme;

  return <StatusBar style={theme === "light" ? "dark" : "light"} />;
}
