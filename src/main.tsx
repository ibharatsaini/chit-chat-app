import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Signup.tsx";
import Login from "./Login.tsx";
import { AuthProvider } from "./context/auth-provider.tsx";


const router = createBrowserRouter([

  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />
  },{
    path: "/chat/:chatId",
    element: <App />
  }

]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
      <RouterProvider router={router} />

      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
