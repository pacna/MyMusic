import { Box, Button, Typography } from "@mui/material";
import { Center } from "@shared/components";
import { ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const NotFoundPage = (): ReactElement => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Center>
            <Box
                sx={{
                    display: "grid",
                    placeItems: "center",
                    gap: "2em",
                    minWidth: "300px",
                    maxWidth: "600px",
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontSize: "2.5em", fontWeight: 500 }}
                >
                    Page Not Found
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    Oops! It seems we've hit a roadblock and couldn't find the
                    requested page. Click the home button below to return to the
                    main page
                </Typography>
                <Button onClick={() => navigate("songs")} variant="outlined">
                    Home
                </Button>
            </Box>
        </Center>
    );
};
