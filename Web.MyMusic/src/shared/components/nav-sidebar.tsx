import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    styled,
} from "@mui/material";
import { ReactElement, Suspense, lazy, useState } from "react";
import { FavoriteBorder, Menu, Home } from "@mui/icons-material";
import { Color } from "../types/local/colors";
import { NavListHeader } from "./nav-list-header";
import { NavigateFunction, useNavigate } from "react-router-dom";

const StyledListItemButton = styled(ListItemButton)({
    "&:hover": {
        backgroundColor: Color.NeonPink,
        color: "white",
        "& .MuiSvgIcon-root": {
            color: Color.White, // Change the color of the icon on hover
        },
    },
});

const FavoriteModal = lazy(() => import("./favorites-modal"));

export const NavSidebar = (): ReactElement => {
    const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
    const [toggleFavorite, setToggleFavorite] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const closeDrawer = (): void => {
        setToggleDrawer(false);
    };

    const goToHome = (): void => {
        navigate("songs");
        closeDrawer();
    };

    return (
        <>
            <Suspense>
                <FavoriteModal
                    open={toggleFavorite}
                    closeModal={() => setToggleFavorite(false)}
                />
            </Suspense>
            <Drawer open={toggleDrawer} onClose={closeDrawer}>
                <List sx={{ width: 280, paddingTop: 0 }}>
                    <NavListHeader name={"General"} />
                    <StyledListItemButton onClick={goToHome}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={<Typography>Home</Typography>} />
                    </StyledListItemButton>
                    <NavListHeader name={"My List"} />
                    <StyledListItemButton
                        onClick={() => setToggleFavorite(true)}
                    >
                        <ListItemIcon>
                            <FavoriteBorder />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography>Favorites</Typography>}
                        />
                    </StyledListItemButton>
                </List>
            </Drawer>

            <AppBar position="static" sx={{ background: Color.BlueMarguerite }}>
                <Toolbar>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            width: "100%",
                        }}
                    >
                        <IconButton
                            style={{ justifySelf: "left" }}
                            onClick={() => setToggleDrawer(true)}
                        >
                            <Menu sx={{ color: Color.White }} />
                        </IconButton>
                        <Typography
                            variant="h1"
                            sx={{
                                placeSelf: "center",
                                fontSize: "20px",
                                fontWeight: 500,
                            }}
                        >
                            Music Library
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};
