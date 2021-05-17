import React from 'react';
import { ThemeProvider } from '@aircall/tractor';
import { render } from '@testing-library/react';
import { mockCallData } from '../../__mocks__/callMock';
import { Call } from '../../redux/calls';
import { CallStatus } from './CallStatus';


describe("CallStatus test suite", () => {
  const renderCallStatus = (props: {call: Call}) => render(
    <ThemeProvider>
      <CallStatus {...props} />
    </ThemeProvider>)
  describe("It picks the correct status color", () => {
    it ("Inbound/voicemail", () => {
      const wrapper = renderCallStatus({call: {
        ...mockCallData,
        direction: 'inbound',
        call_type: 'voicemail'
      }})
      expect(wrapper.getByTestId('inbound-yellow.base')).toBeInTheDocument()
      expect(wrapper.getByTestId('voicemail-yellow.base')).toBeInTheDocument()
    })
    it ("Outbound/voicemail", () => {
      const wrapper = renderCallStatus({call: {
        ...mockCallData,
        direction: 'outbound',
        call_type: 'voicemail'
      }})
      expect(wrapper.getByTestId('outbound-yellow.base')).toBeInTheDocument()
      expect(wrapper.getByTestId('voicemail-yellow.base')).toBeInTheDocument()
    })
    it ("inbound/answered", () => {
      const wrapper = renderCallStatus({call: {
        ...mockCallData,
        direction: 'inbound',
        call_type: 'answered'
      }})
      expect(wrapper.getByTestId('inbound-primary.base')).toBeInTheDocument()
    })
    it ("Outbound/answered", () => {
      const wrapper = renderCallStatus({call: {
        ...mockCallData,
        direction: 'outbound',
        call_type: 'answered'
      }})
      expect(wrapper.getByTestId('outbound-primary.base')).toBeInTheDocument()
    })
    it ("Outbound/missed", () => {
      const wrapper = renderCallStatus({call: {
        ...mockCallData,
        direction: 'outbound',
        call_type: 'missed'
      }})
      expect(wrapper.getByTestId('outbound-red.base')).toBeInTheDocument()
      expect(wrapper.getByTestId('missed-red.base')).toBeInTheDocument()
   
    })
    it ("inbound/missed", () => {
      const wrapper = renderCallStatus({call: {
        ...mockCallData,
        direction: 'inbound',
        call_type: 'missed'
      }})
      expect(wrapper.getByTestId('inbound-red.base')).toBeInTheDocument()
      expect(wrapper.getByTestId('missed-red.base')).toBeInTheDocument()
    
    })



})


})