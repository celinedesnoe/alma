import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";

import { AppRoutes } from "./AppRoutes";
import Layout from "./Layout";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Layout>
        <AppRoutes />
      </Layout>
    </StrictMode>
  </BrowserRouter>,
);
