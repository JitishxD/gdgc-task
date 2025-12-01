import React from "react";
import { useThemeContext } from "../../hooks/useTheme";

export default function ThemeToggle(props) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Toggle theme"
      >
        <span className="text-2xl transition-transform duration-500 inline-block" style={{ transform: theme === "light" ? "rotate(0deg)" : "rotate(180deg)" }}>
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </button>
  );
}
