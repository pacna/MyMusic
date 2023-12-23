import { Button, Typography } from "@mui/material";
import { Color } from "@mymusic/types/local";
import { ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const NotFoundPage = (): ReactElement => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div
            style={{
                display: "grid",
                placeItems: "center",
                gap: "40px",
            }}
        >
            <Typography
                variant="h2"
                sx={{ marginTop: "40px", fontSize: "40px", fontWeight: 500 }}
            >
                Page Not Found
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    maxWidth: "600px",
                    textAlign: "center",
                }}
            >
                Oops! It seems we've hit a roadblock and couldn't find the
                requested page. Click the home button below to return to the
                main page
            </Typography>

            <Button
                onClick={() => navigate("songs")}
                variant="outlined"
                sx={{
                    color: Color.BlueMarguerite,
                    borderColor: Color.BlueMarguerite,
                }}
            >
                Home
            </Button>
        </div>
    );
};
