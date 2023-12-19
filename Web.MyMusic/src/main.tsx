import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components/layout";
import { ServiceApiContext } from "./contexts";
import { MusicApiService } from "./services";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ServiceApiContext.Provider value={new MusicApiService()}>
            <BrowserRouter>
                <Layout>
                    <div>hi dad</div>
                </Layout>
            </BrowserRouter>
        </ServiceApiContext.Provider>
    </React.StrictMode>
);
