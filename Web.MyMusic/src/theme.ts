import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#121212",
        },
        secondary: {
            main: "#1ed760",
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#121212",
                    color: "white",
                },
            },
        },
    },
});
