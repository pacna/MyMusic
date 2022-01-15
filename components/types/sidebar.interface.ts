import { SongFn } from "./top-nav.interface";

export interface SidebarProps {
  toggle: boolean;
  closeDrawer: () => void;
  songFn: SongFn;
}
