import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./shared/components/layout";
import { ServiceApiContext } from "./shared/contexts";
import { MusicApiService } from "./shared/services";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SongsPage } from "./pages/songs";
import { NotFoundPage } from "./pages/not-found";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ServiceApiContext.Provider value={new MusicApiService()}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="songs" />}
                            ></Route>
                            <Route path="songs" element={<SongsPage />}></Route>
                            <Route path="*" element={<NotFoundPage />}></Route>
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
        </ServiceApiContext.Provider>
    </React.StrictMode>
);
