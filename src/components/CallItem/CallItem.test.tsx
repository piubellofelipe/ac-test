import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CallItem, { CallItemProps } from './CallItem';
import { useCallItem } from './useCallItem';
import { mockCallData } from '../../mocks/apiMocks';
import { ThemeProvider } from '@aircall/tractor';

jest.mock('./useCallItem.ts')

const useCallItemMock = useCallItem as jest.Mock;
describe("CallItem test suite", () => {
  const renderCallItem = (props: CallItemProps) => render(
  <ThemeProvider>
    <CallItem {...props} />
  </ThemeProvider>)

  it ("Renders call data", () => {
    useCallItemMock.mockReturnValue({
      call: mockCallData,
      addToArchiveList: jest.fn(),
      seeDetails: jest.fn(),
      isChecked: false,
      archiveCall: jest.fn(),
    })
    const {getByText} = renderCallItem({callId: mockCallData.id});
    expect(getByText(`From: ${mockCallData.from}`)).toBeInTheDocument();
    expect(getByText(`To: ${mockCallData.to}`)).toBeInTheDocument();
    expect(getByText("Duration: 04:13")).toBeInTheDocument();
    expect(getByText("Time: 14:22")).toBeInTheDocument();
  })
  
  it ("Conditionally renders the menu", async () => {
    const archiveCall = jest.fn();

    useCallItemMock.mockReturnValue({
      call: mockCallData,
      addToArchiveList: jest.fn(),
      seeDetails: jest.fn(),
      isChecked: false,
      archiveCall,
    })
    const wrapper = renderCallItem({callId: mockCallData.id, isDetail: true});
    expect(wrapper.getByTestId('call-item-menu')).toBeInTheDocument();
    
    fireEvent.click(wrapper.getByTestId('call-item-menu-dropdown'));
    await waitFor(() => {
      expect(wrapper.getByText("Archive")).toBeInTheDocument();
    })
    fireEvent.click(wrapper.getByText("Archive"));
    expect(archiveCall).toHaveBeenCalled();
  })

  it ("Correctly renders the Checkbox", () => {
    const addToArchiveList = jest.fn();
    useCallItemMock.mockReturnValue({
      call: mockCallData,
      addToArchiveList,
      seeDetails: jest.fn(),
      isChecked: false,
      archiveCall: jest.fn(),
    })
    const {getByTestId} = renderCallItem({callId: mockCallData.id});
    const checkbox = getByTestId("checkbox");
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);

    expect(addToArchiveList).toHaveBeenCalled();
  })
})