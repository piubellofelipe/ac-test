import React from 'react';
import styled from 'styled-components';
import CallListActions from '../../../components/CallListActions';
import Pagination from '../../../components/Pagination/Pagination';
import { singleCallGroup } from '../../../redux/calls'
import CallGroup from '../CallGroup/CallGroup';
import CallItemLoadingGrid from '../../../components/CallItem/CallItemLoading';
import {useCallList} from './useCallList';

const CallListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CallList = () => {
  const {calls, totalRecords, currentPage, _onPageChanged, pageSize, loadingCalls} = useCallList();
  return <CallListContainer>
    <Pagination totalRecords={totalRecords} pageSize={pageSize}
    currentPage={currentPage} onPageChanged={_onPageChanged} />
    <CallListActions />
    <div>
    {
      loadingCalls
      ? <CallItemLoadingGrid />
      : calls.map((callGroup: singleCallGroup, index: number) =>
      <CallGroup
       callGroup={callGroup} key={index} 
       />)
    }
    </div>
  </CallListContainer>
}

export default CallList;