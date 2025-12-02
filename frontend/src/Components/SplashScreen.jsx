import { useThemeContext } from "../contexts/ThemeContext";

export default function SplashScreen(props) {
  const { theme } = useThemeContext();

  return (
    <div className={`flex items-center justify-center h-screen transition bg-${theme === "dark" ? "gray-900" : "white"}`}>
      <div className="text-center animate-pulse">
        <h1 className="text-4xl font-bold">GDGC Members</h1>
        <p>{props.message}</p>
      </div>

      {/* Another version of splash screen */}
      {/* <div className="p-6 flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-900">
        <div className="animate-ping w-12 h-12 bg-blue-500 rounded-full"></div>
        <h1 className="ml-6 dark:text-gray-100">{props.message}</h1>
      </div> */}
    </div>
  );
}
