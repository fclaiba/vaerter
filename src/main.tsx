import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "@/app/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster theme="dark" position="top-center" />
    <RouterProvider router={router} />
  </StrictMode>
);
