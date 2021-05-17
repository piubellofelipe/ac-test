import { ThemeProvider } from '@aircall/tractor';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CallDetail from '.';
import { mockCallData } from '../../mocks/apiMocks';
import {useCallDetail} from './useCallDetail';
jest.mock('./useCallDetail.tsx');
jest.mock('../../components/CallItem/CallItem', () => ({
  __esModule: true,
  default: ({callId}: {callId: number}) => <div>Call Item {callId}</div>
}))
describe("CallDetail test suite", () => {
  const renderCallDetail = () => render(
    <MemoryRouter>
    <ThemeProvider>
      <CallDetail />
    </ThemeProvider>
    </MemoryRouter>
    )

  it("Render notes", () => {
    const useCallDetailMock = useCallDetail as jest.Mock;
    useCallDetailMock.mockReturnValue({
      call: mockCallData,
      submitNote: jest.fn(),
      onChangeNote: jest.fn(),
    })
    const wrapper = renderCallDetail();
    for (let note of mockCallData.notes) {
      expect(wrapper.getByText(note.content)).toBeInTheDocument()
    }
  })
  it("Triggers onChangeNote correctly", () => {
    const useCallDetailMock = useCallDetail as jest.Mock;
    const onChangeNote = jest.fn();
    useCallDetailMock.mockReturnValue({
      call: mockCallData,
      submitNote: jest.fn(),
      onChangeNote,
    })
    const wrapper = renderCallDetail();
    const input = wrapper.getByTestId("note-input") as any;
    fireEvent.change(input, {target: {value: 'This is a test note'}} as any)
    expect(input.value).toBe('This is a test note')

    expect(onChangeNote).toHaveBeenCalled();
  })
  it("Triggers submitNote correctly", () => {
    const useCallDetailMock = useCallDetail as jest.Mock;
    const submitNote = jest.fn();
    useCallDetailMock.mockReturnValue({
      call: mockCallData,
      submitNote,
      onChangeNote: jest.fn(),
    })
    const wrapper = renderCallDetail();
    const form = wrapper.getByTestId("note-input-form") as any;
    fireEvent.submit(form)

    expect(submitNote).toHaveBeenCalled();
  })
  
})