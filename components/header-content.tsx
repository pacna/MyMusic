// react
import React, { Fragment, ReactElement } from 'react'

// third party
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

// others
import { SearchDialog } from './search-dialog';
import { closeSearch } from '../reducers/toggle-search-slice';

export const HeaderContent = (props: { children: ReactElement[] }): JSX.Element => {
    const toggleSearch = useSelector((state: RootStateOrAny) => state.toggleSearch.value); 
    const dispatch = useDispatch();
    const { children } = props;

    const closeSearchDialog = (): void => {
        dispatch(closeSearch());
    }

    return(
        <div>
            {
                toggleSearch &&             
                <SearchDialog
                open={toggleSearch} 
                closeSearchDialog={closeSearchDialog}
                />
            }
            <Fragment> { children } </Fragment>
        </div>
    )
}