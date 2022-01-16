import { SongResponse } from "./responses/song-response.interface";
import { SongFn } from "./top-nav.interface";

export interface SearchDialogProps {
  open: boolean;
  closeSearchDialog: () => void;
}

export interface SearchDialogStates {
  open: boolean;
  input: string;
}
