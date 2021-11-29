import { Fragment } from "react";
import { TabPanelProps } from "../types/TabPanel.interface"

export const TabPanel = (props: TabPanelProps) => {
    const { children, index, value } = props;
    return(
        index === value && <Fragment> {children }</Fragment>
    )
}