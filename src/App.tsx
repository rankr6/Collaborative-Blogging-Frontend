import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { CommentProvider } from "./context/Comment/context";


const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <CommentProvider>
        <RouterProvider router={router} />
      </CommentProvider>
    </div>
  );
}
export default App;