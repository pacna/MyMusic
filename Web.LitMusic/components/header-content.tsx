// React
import React, { Fragment, ReactElement } from "react";

// Third party
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

// Styles
import classes from "./../styles/header-content.module.scss";

// Others
import { SearchDialog } from "./search-dialog";
import { ModalManagement } from "./modal-management";
import { closeSearch } from "../redux/reducers/toggle-search-slice";

export const HeaderContent = (props: {
    children: ReactElement[];
}): JSX.Element => {
    const toggleSearch = useSelector(
        (state: RootStateOrAny) => state.toggleSearch.value
    );
    const dispatch = useDispatch();
    const { children } = props;

    const closeSearchDialog = (): void => {
        dispatch(closeSearch());
    };

    return (
        <div className={classes.topNav}>
            <ModalManagement
                isOpen={toggleSearch}
                renderComponent={
                    <SearchDialog
                        open={toggleSearch}
                        closeSearchDialog={closeSearchDialog}
                    />
                }
            />
            <Fragment> {children} </Fragment>
        </div>
    );
};
