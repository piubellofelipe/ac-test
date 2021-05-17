import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../commonHooks";
import { selectCall, sendNote, selectIsSendingNote } from "../../redux/calls";
import { useHistory } from 'react-router';


interface RouteParams {
  id: string
}
export const useCallDetail = () => {
  const {id} = useParams<RouteParams>();
  const history = useHistory();

  const [note, setNote] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const call = useAppSelector(selectCall(id));

  const submitNote = React.useCallback((event: React.FormEvent) => {
      event.preventDefault();
      dispatch(sendNote({callId: id, note}))
      setNote('')
  }, [note, id, dispatch])

  const onChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNote(event.target.value);
  }

  const sendingNote = useAppSelector(selectIsSendingNote);
  const goBack = () => history.push(`/calls`)

  return {goBack, note, sendingNote, call, submitNote, onChangeNote}
}