import { ListItem, ListItemText, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Color } from "../types/colors";

export const NavListHeader = ({ name }: { name: string }): ReactElement => {
    return (
        <ListItem sx={{ backgroundColor: Color.Timberwolf }}>
            <ListItemText
                primary={
                    <Typography
                        sx={{
                            color: Color.NeonPink,
                            fontWeight: "bold",
                        }}
                    >
                        {name}
                    </Typography>
                }
            />
        </ListItem>
    );
};
