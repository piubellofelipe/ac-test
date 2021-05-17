import React from 'react';
import { ArchiveOutlined, Button, Tooltip, Typography, VisibleOffOutlined, VisibleOnOutlined  } from '@aircall/tractor';
import styled from 'styled-components';
import { useCallListActions } from './useCallListActions';

const CallListActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;

  button {
    margin-left: 8px;
  }

  @media (max-width: 62.5em) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
      margin-top: 8px;
      margin-left: 0;
    }
  }
`

const CallListActions = () => {
  const {showArchived, toggleShowArchived, doArchiveSelected, doUnarchiveSelected} = useCallListActions();
  return <CallListActionsWrapper>
      <Tooltip title={`${showArchived ? 'Hide' : 'Show'} archived`} position="bottom">
        <Button onClick={toggleShowArchived} data-testid="toggle-archived-visibility" mode="outline">
          {showArchived ? <VisibleOnOutlined />
           : <VisibleOffOutlined />}
        </Button>
      </Tooltip>
      <Button data-testid="unarchive-button" onClick={doUnarchiveSelected} variant="instructive">
        <ArchiveOutlined size={24} />
        <Typography>Unarchive selected</Typography>
      </Button>
      <Button data-testid="archive-button" onClick={doArchiveSelected} variant="warning">
        <ArchiveOutlined size={24} />
        <Typography>Archive selected</Typography>
      </Button>
  </CallListActionsWrapper>
}

export default CallListActions;