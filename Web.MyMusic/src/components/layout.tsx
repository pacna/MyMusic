import { ReactElement } from "react";
import { AudioPlayer } from "./audio-player";
import { NavSidebar } from "./nav-sidebar";

export const Layout = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}): ReactElement => {
    return (
        <>
            <NavSidebar />
            <main>{children}</main>
            <AudioPlayer />
        </>
    );
};
