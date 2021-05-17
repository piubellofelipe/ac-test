import React from 'react';
import { Typography } from '@aircall/tractor';
import { singleCallGroup } from '../../../redux/calls';
import { CallGroupContainer } from './CallGroupContainer';
import styled from 'styled-components';
import CallItem from '../../../components/CallItem/CallItem';


const CallsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 500px);
  grid-gap: 40px;
  margin-left: 40px;

  @media(max-width: 62.5em) {
    width: 100%;
    margin-left: 0;
  }
`
const CallGroup = ({callGroup}: {callGroup: singleCallGroup}) => {
    return (
      <CallGroupContainer>
        <Typography textAlign="left" marginLeft="4em" variant="displayM2">{callGroup.date}</Typography>
        <CallsWrapper>
          {
            callGroup.calls.map((callId: string) => (<CallItem key={callId} callId={callId} />))
          }
        </CallsWrapper>
      </CallGroupContainer>  
    );
}

export default CallGroup;