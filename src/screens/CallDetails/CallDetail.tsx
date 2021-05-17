import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { Note } from '../../redux/calls';
import CallItem from '../../components/CallItem/CallItem';
import {useCallDetail} from './useCallDetail';
import { Form, FormItem, TextFieldInput, Typography,
  Spacer, Button, Icon, SpinnerOutlined, ArrowSendOutlined } from '@aircall/tractor';

const DetailsWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  flex-direction: column;
  justify-content: center;
  grid-row-gap: 20px;


  form {
    margin-top: 40px;
    display: flex;
  }

  .goBackButton {
    width: 40px;
    transform: rotateZ(
      180deg
      );
  }

`
const CallDetail = () => {    
    const {note, sendingNote, call, submitNote, onChangeNote, goBack} = useCallDetail();

    return <DetailsWrapper>
            <div className="goBackButton">
              <Icon size={30} onClick={goBack} component={ArrowSendOutlined}  />
            </div>
            <CallItem isDetail={true} callId={call.id} />
            <Spacer space="s" direction="vertical">
            {
              call.notes.map((note: Note) =>
              <Typography textAlign="center" key={note.id}>
                    {note.content}
                </Typography>)
            }
            </Spacer>
            <Form data-testid="note-input-form" onSubmit={submitNote}>            
              <FormItem width="100%" label="Add note" name="note">
              <TextFieldInput
                value={note}
                disabled={sendingNote}
                data-testid='note-input'
                onChange={onChangeNote}
              />
              <Button type="submit" block>
              {sendingNote ? <Icon data-testid="loading-icon" component={SpinnerOutlined} spin /> : null}
              Submit
            </Button>
            </FormItem>
          </Form>
      </DetailsWrapper>
}

export default withRouter(CallDetail);