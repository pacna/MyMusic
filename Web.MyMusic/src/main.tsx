import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TopNav } from "./shared/top-nav.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <TopNav />
    </React.StrictMode>
);
