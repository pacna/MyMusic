// Material
import { Container } from "@mui/material";

// Types
import { ModalManagementConfig } from "./types/configs/modal-management-config";

export const ModalManagement = ({
    isOpen,
    renderComponent,
}: ModalManagementConfig): JSX.Element => {
    return <Container>{isOpen && renderComponent}</Container>;
};
