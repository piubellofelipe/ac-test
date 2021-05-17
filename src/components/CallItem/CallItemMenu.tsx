import React from 'react';
import { Box, Dropdown, Icon, Menu, MenuItem, MenuVerticalOutlined } from '@aircall/tractor';


type CallItemMenuProps = {
    archive: () => void;
}

export const CallItemMenu = ({archive}: CallItemMenuProps) => {
    return (
      <Box position="absolute" right="5px" top="10px" data-testid="call-item-menu">
        <Dropdown trigger={
          <Icon data-testid="call-item-menu-dropdown" component={MenuVerticalOutlined} />
        } position="bottom" anchor="start">
          <Menu>
            <MenuItem onClick={archive}>Archive</MenuItem>
          </Menu>
        </Dropdown>
    </Box>
    )
}