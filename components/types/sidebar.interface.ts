import { SongFn } from './top-nav.interface';

export interface SidebarProps {
    toggle: boolean;
    closeDrawer: () => void;
    closeFavDialog: () => void;
    openFavDialog: () => void;
    favOpen: boolean;
    songFn: SongFn
}