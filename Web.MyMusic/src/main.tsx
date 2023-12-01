import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./theme";
import { Layout } from "./components/layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    </React.StrictMode>
);
