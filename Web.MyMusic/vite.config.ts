import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        proxy: {
            "/v1": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false,
            },
        },
        port: 3000,
    },
});
