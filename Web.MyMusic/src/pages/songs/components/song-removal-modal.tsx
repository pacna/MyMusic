import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Color, IMusicApiService, ServiceApiContext } from "@mymusic/shared";
import { ReactElement, useContext } from "react";

export default function SongRemovalModal({
    id,
    title,
    open,
    closeModal,
}: {
    id: string;
    title: string;
    open: boolean;
    closeModal: () => void;
}): ReactElement {
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);

    const handleSubmit = async (): Promise<void> => {
        await service.deleteSong(id);
        closeModal();
    };
    return (
        <Dialog open={open}>
            <DialogTitle> Remove song</DialogTitle>
            <DialogContent>
                Are you certain you'd like to proceed with the removal of{" "}
                {title}?
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>No</Button>
                <Button onClick={handleSubmit} sx={{ color: Color.Red }}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
