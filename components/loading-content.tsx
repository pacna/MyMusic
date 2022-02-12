// react
import { Fragment } from 'react';

// material
import { CircularProgress, Fade } from "@mui/material"

// styles
import coreClasses from './../styles/core.module.scss';

// others
import { LoadingContentConfig } from "./types/configs/loading-content-config"

export const LoadingContent = (props: LoadingContentConfig): JSX.Element => {
    const { isReady, children } = props;

    const loadComponent = (): JSX.Element => {
        if (isReady) {
            return (
                <Fade in={true}>
                    <div>
                        <Fragment> { children }</Fragment>
                    </div>
                </Fade>
            )
        }

        return (
            <div className={coreClasses.centerScreen}>
                <CircularProgress size={60} />
            </div>
        )
    }

    return (
        loadComponent()
    )
}