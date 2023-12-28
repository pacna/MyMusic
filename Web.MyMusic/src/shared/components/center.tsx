import { ReactElement } from "react";

export const Center = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}): ReactElement => {
    return (
        <div
            style={{
                position: "absolute",
                top: `calc(50% - 64px)`, // 64px is from the top bar
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            {children}
        </div>
    );
};
