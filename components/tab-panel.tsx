import { Fragment } from "react";
import { TabPanelProps } from "./types/tab-panel.interface"

export const TabPanel = (props: TabPanelProps): JSX.Element => {
    const { children, index, value } = props;
    return(
        <Fragment> {index === value && children }</Fragment>
    )
}