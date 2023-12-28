import { createTheme } from "@mui/material";
import { Color } from "./shared/types/local";

export const theme = createTheme({
    palette: {
        primary: {
            main: Color.BlueMarguerite,
        },
        secondary: {
            main: Color.NeonPink,
        },
    },
});
