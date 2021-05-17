import React from 'react';
import { render } from '@testing-library/react';
import CallList from './CallList';
import { useCallList } from './useCallList';

jest.mock('./useCallList.ts')
jest.mock('../../../components/CallListActions');

jest.mock('../../../components/CallItem/CallItem', () => ({
  __esModule: true,
  default: ({callId}: {callId: number}) => <div>Call Item {callId}</div>
}))
jest.mock('../../../components/CallListActions', () => ({
  __esModule: true,
  default: () => <div>Call List actions</div>
}))

const useCallListMock = useCallList as jest.Mock;
describe("CallList test suite", () => {
  const renderCallList = () => render(<CallList />)

  it ("Renders loading screen", () => {
    useCallListMock.mockReturnValue({
      loadingCalls: true,
    })
    const {getByTestId} = renderCallList();
    expect(getByTestId("loading-grid-call-list")).toBeInTheDocument();
  })
  it ("Renders call list actions", () => {
    useCallListMock.mockReturnValue({
      loadingCalls: true,
    })
    const {getByText} = renderCallList();
    expect(getByText("Call List actions")).toBeInTheDocument();
  })
  it ("Renders call list actions", () => {
    useCallListMock.mockReturnValue({
      loadingCalls: false,
      calls: [{date: '', calls: ['1', '2', '3']}]
    })
    const {getByText} = renderCallList();
    expect(getByText("Call Item 1")).toBeInTheDocument();
    expect(getByText("Call Item 2")).toBeInTheDocument();
    expect(getByText("Call Item 3")).toBeInTheDocument();
  })
})