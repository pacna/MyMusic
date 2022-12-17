// Material
import { Container } from "@mui/material";

// Types
import { ModalManagementConfig } from "./types/configs/modal-management-config";

export const ModalManagement = (props: ModalManagementConfig): JSX.Element => {
    const { isOpen, renderComponent } = props;

    return <Container>{isOpen && renderComponent}</Container>;
};
