import React from 'react';
import { addToBulkArchive, archiveCalls, selectBulkArchiveIds, selectCall, selectShowArchived } from '../../redux/calls';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../commonHooks';


export const useCallItem = (callId: string) => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const isChecked = useAppSelector(selectBulkArchiveIds).indexOf(callId) > -1;
  const addToArchiveList = React.useCallback((checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(addToBulkArchive(callId))
  }, [dispatch, callId]);

  const seeDetails = () => history.push(`/calls/${callId}`)

  const call = useAppSelector(selectCall(callId));
  const showArchived = useAppSelector(selectShowArchived);
  const archiveCall = React.useCallback(() => {
    dispatch(archiveCalls(callId))
  }, [dispatch, callId])

  return {
    call, seeDetails, addToArchiveList, isChecked, archiveCall, showArchived
  }
}
