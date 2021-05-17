import React from 'react';
import { Box, Checkbox, Flex, Grid, Spacer, Typography } from '@aircall/tractor';
import { CallItemContainer } from './CallItemContainer';
import moment from 'moment';
import { CallItemMenu } from './CallItemMenu';
import { useCallItem } from './useCallItem';
import { CallStatus } from './CallStatus';

export type CallItemProps = {
  callId: string,
  isDetail?: boolean,
}
const CallItem = ({callId, isDetail = false }: CallItemProps) => {

    const {call, addToArchiveList, showArchived, seeDetails, isChecked, archiveCall} = useCallItem(callId);

    if (!isDetail && !showArchived && call.is_archived) return null;
    const onClickCheckbox = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
    return <CallItemContainer onClick={isDetail ? () => {} : seeDetails}>
      <Box height="100%" boxShadow={2} p="2em">
        <Grid gridTemplateColumns="auto auto">
          <Flex onClick={onClickCheckbox} flexDirection="column" alignItems="space-between">
            {!isDetail ? <Checkbox size="regular"
              onChange={addToArchiveList}
              data-testid="checkbox"
              checked={isChecked}
            /> : null}
            <CallStatus call={call} />
          </Flex>
          <Spacer space="s" direction="vertical">
              <Typography>
                  From: {call.from}
              </Typography>
              <Typography>
                  To: {call.to}
              </Typography>
              <Typography>
                  Duration: {moment.utc(call.duration*1000).format("HH:mm")}
              </Typography>
              <Typography>
                  Time: {moment(call.created_at).format("HH:mm")}
              </Typography>
          </Spacer>
          {isDetail ? <CallItemMenu archive={archiveCall} /> : null}
        </Grid>
      </Box>
    </CallItemContainer>
}

export default CallItem;
