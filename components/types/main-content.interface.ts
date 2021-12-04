import { TopNavProps } from './top-nav.interface';

export interface MainContentProps extends TopNavProps {}

export interface MainContentStates {
    currentTab: number;
    soundWave: boolean;
}