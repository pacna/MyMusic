import { TopNavProps } from './TopNav.interface';

export interface MainContentProps extends TopNavProps {}

export interface MainContentStates {
    currentTab: number;
    soundWave: boolean;
}