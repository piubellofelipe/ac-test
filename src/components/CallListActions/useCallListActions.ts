import React from 'react';
import { useAppDispatch, useAppSelector } from '../../commonHooks';
import { doBulkArchive, doBulkUnarchive, selectShowArchived, toggleShowArchived } from '../../redux/calls';


export const useCallListActions = () => {
  const dispatch = useAppDispatch();
  const doArchiveSelected = React.useCallback(
    () => {
      dispatch(doBulkArchive())
    }, [dispatch]);
  const doUnarchiveSelected = React.useCallback(
    () => dispatch(doBulkUnarchive()), [dispatch]);
    const setShowArchived = React.useCallback(
      () => dispatch(toggleShowArchived()), [dispatch])
    const showArchived = useAppSelector(selectShowArchived);
  return {
    doArchiveSelected,
    doUnarchiveSelected,
    showArchived,
    toggleShowArchived: setShowArchived,
  }
}