import { useEffect, useState } from "react";
import MembersPage from "./MembersPage";
import { useThemeContext } from "../../hooks/useTheme";
import ParticleBackground from "../../Utils/ParticleBackground";
import ThemeToggle from "../Header/ThemeToggle";
import SplashScreen from "../SplashScreen";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // While app is loading, render the splash screen
  if (loading) {
    return (
        <SplashScreen message="Loading App..." />
    );
  }

  // If user has clicked the button, render the Members Page
  if (hasEntered) {
    return (
        <MembersPage />
    );
  }

  // Otherwise, render the Landing Page
  return (
      <LandingPage onEnter={() => setHasEntered(true)} />
  );
}

function LandingPage({ onEnter }) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div
      className={`relative w-full h-screen font-sans transition-colors duration-500 ${
        theme === "light" ? "bg-linear-to-br from-blue-200 via-purple-200 to-pink-200 text-gray-900" : "bg-linear-to-br from-gray-900 via-indigo-900 to-gray-900 text-white"
      }`}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
        {/* Main Card */}
        <div
          className={`backdrop-blur-xl p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-6 max-w-md text-center transform transition-all duration-500 ${
            theme === "light" ? "bg-white/80 border-2 border-purple-200/50 shadow-purple-200/50" : "bg-white/10 border-2 border-white/20 shadow-purple-500/30"
          }`}
        >
          <div className="relative">
            <h1
              className={`text-5xl font-bold tracking-wider drop-shadow-lg transition-colors duration-500 ${
                theme === "light" ? "text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600" : "text-white"
              }`}
            >
              Welcome
            </h1>
            <div className={`absolute -inset-4 blur-2xl opacity-30 rounded-full ${theme === "light" ? "bg-purple-400" : "bg-cyan-400"}`}></div>
          </div>

          <p className={`text-lg font-medium transition-colors duration-500 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>Explore Member Details of GDGC</p>

          <button
            onClick={onEnter}
            className={`group relative px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === "light"
                ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/50"
                : "bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/50"
            }`}
          >
            <span className="relative z-10">Explore Now 🚀</span>
          </button>
        </div>

        {/* Decuuuration */}
        <div className={`mt-12 flex gap-3 transition-opacity duration-500 ${theme === "light" ? "opacity-60" : "opacity-40"}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${theme === "light" ? "bg-purple-500" : "bg-cyan-500"}`}></div>
          <div className={`w-2 h-2 rounded-full animate-pulse delay-150 ${theme === "light" ? "bg-pink-500" : "bg-blue-500"}`}></div>
          <div className={`w-2 h-2 rounded-full animate-pulse delay-300 ${theme === "light" ? "bg-purple-500" : "bg-cyan-500"}`}></div>
        </div>
      </div>
    </div>
  );
}
