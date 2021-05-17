import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@aircall/tractor';
import CallListActions from './CallListActions';
import { useCallListActions } from './useCallListActions';
jest.mock('./useCallListActions')

describe("CallListActions test suite", () => {
  const renderCallListActions = () => render(
  <ThemeProvider>
    <CallListActions />
  </ThemeProvider>);
  it ("Correctly calls archive selected callback", () => {
    const useCallListActionsMock = useCallListActions as jest.Mock;
    const doArchiveSelected = jest.fn();
    useCallListActionsMock.mockReturnValue({
      doArchiveSelected,
      doUnarchiveSelected: jest.fn(),
    })
    
    const wrapper = renderCallListActions();
    const archiveButton = wrapper.getByTestId('archive-button');
    fireEvent.click(archiveButton);
    expect(doArchiveSelected).toHaveBeenCalled();
  })
  it ("Correctly calls unarchive selected callback", () => {
    const useCallListActionsMock = useCallListActions as jest.Mock;
    const doUnarchiveSelected = jest.fn();
    useCallListActionsMock.mockReturnValue({
      doArchiveSelected: jest.fn(),
      doUnarchiveSelected,
    })
    
    const wrapper = renderCallListActions();
    const archiveButton = wrapper.getByTestId('unarchive-button');
    fireEvent.click(archiveButton);
    expect(doUnarchiveSelected).toHaveBeenCalled();
  })
  it ("Correctly calls toggle archive visibility callback", () => {
    const useCallListActionsMock = useCallListActions as jest.Mock;
    const toggleShowArchived = jest.fn();
    useCallListActionsMock.mockReturnValue({
      doArchiveSelected: jest.fn(),
      doUnarchiveSelected: jest.fn(),
      toggleShowArchived
    })
    
    const wrapper = renderCallListActions();
    const visibilityButton = wrapper.getByTestId('toggle-archived-visibility');
    fireEvent.click(visibilityButton);
    expect(toggleShowArchived).toHaveBeenCalled();
  })


})