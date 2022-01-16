import React, { Fragment, ReactElement } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SearchDialog } from '../components/search-dialog';
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