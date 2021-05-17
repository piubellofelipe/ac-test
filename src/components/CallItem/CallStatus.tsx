import React from "react";
import { InboundOutlined, OutboundOutlined, VoicemailOutlined, CloseOutlined, Icon } from "@aircall/tractor";
import { Call } from "../../redux/calls";


const getItemColor = (call_type: 'answered' | 'missed' | 'voicemail') => {
  switch (call_type) {
    case 'answered':
      return 'primary.base';
    case 'missed':
      return'red.base';
    case 'voicemail':
      return 'yellow.base';
  }
}
const getCallTypeIcon = (call_type: 'answered' | 'missed' | 'voicemail') => {
  switch (call_type) {
    case 'answered':
      return null;
    case 'missed':
      return CloseOutlined;
    case 'voicemail':
      return VoicemailOutlined;
  }
}


export const CallStatus = ({call}: {call: Call}) => {
  const iconColor = getItemColor(call.call_type);
  const callTypeIcon = getCallTypeIcon(call.call_type);

  const callIconTestId = `${call.call_type}-${iconColor}`;
  return <>
    {
      call.direction === 'inbound'
      ? <Icon data-testid={`inbound-${iconColor}`} color={iconColor} component={InboundOutlined}></Icon>
      : <Icon data-testid={`outbound-${iconColor}`} color={iconColor} component={OutboundOutlined}></Icon>
    }
    {
      callTypeIcon
      ? <Icon data-testid={callIconTestId} color={iconColor} component={callTypeIcon}></Icon>
      : null
    }
  </>
}