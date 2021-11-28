import { TopNavProps } from './TopNav.interface';

export interface TabsNavProps extends TopNavProps {}

export interface TabsNavStates {
    currentTab: number;
    soundWave: boolean;
}