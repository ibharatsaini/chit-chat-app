import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Signup.tsx";
import Login from "./Login.tsx";
import { AuthProvider } from "./context/auth-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import PageNotFound from "./PageNotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat/:chatId",
    element: <App />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
