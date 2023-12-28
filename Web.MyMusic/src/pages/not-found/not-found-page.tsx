import { Typography } from "@mui/material";
import { Center, StyledPrimaryButton } from "@mymusic/shared/components";
import { ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const NotFoundPage = (): ReactElement => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Center>
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    gap: "40px",
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
                        maxWidth: "600px",
                        textAlign: "center",
                    }}
                >
                    Oops! It seems we've hit a roadblock and couldn't find the
                    requested page. Click the home button below to return to the
                    main page
                </Typography>
                <StyledPrimaryButton
                    onClick={() => navigate("songs")}
                    variant="outlined"
                >
                    Home
                </StyledPrimaryButton>
            </div>
        </Center>
    );
};
