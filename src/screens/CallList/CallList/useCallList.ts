import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../commonHooks';
import { fetchCalls, selectCallGroups, selectLoadingCalls, selectTotalRecords } from '../../../redux/calls'

export const useCallList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const dispatch = useAppDispatch();
  const calls = useAppSelector(selectCallGroups)
  const loadingCalls = useAppSelector(selectLoadingCalls);
  const totalRecords = useAppSelector(selectTotalRecords);
  const pageSize = 15;
  React.useEffect(() => {
    dispatch(fetchCalls({offset: (currentPage - 1) * pageSize, limit: pageSize}));
  }, [dispatch, currentPage])

  return {
    calls,
    loadingCalls,
    currentPage,
    pageSize,
    totalRecords,
    _onPageChanged: setCurrentPage
  }
}
