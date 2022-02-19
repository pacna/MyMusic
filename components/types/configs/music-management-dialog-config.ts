export interface MusicManagementDialogConfig {
  toggle: boolean;
  musicId: string;
  closeMusicManagementDialog: (hasSubmitted: boolean) => void;
}
