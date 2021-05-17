import React from 'react';
import { ThemeProvider } from '@aircall/tractor';
import { fireEvent, render } from '@testing-library/react';
import Pagination, { PaginationProps } from './Pagination';


describe("Pagination test suite", () => {
  const renderPagination = (props: PaginationProps) => render(
    <ThemeProvider>
      <Pagination {...props} />
    </ThemeProvider>)

  it("Does not render if no records", () => {
    const onPageChanged = jest.fn();
    const wrapper = renderPagination({totalRecords: 0, pageSize: 10, currentPage: 1, onPageChanged})
    expect(wrapper.queryByTestId('pagination')).not.toBeInTheDocument();
  })
  it("Does not render if only one page", () => {
    const onPageChanged = jest.fn();
    const wrapper = renderPagination({totalRecords: 10, pageSize: 10, currentPage: 1, onPageChanged})
    expect(wrapper.queryByTestId('pagination')).not.toBeInTheDocument();
  })
  it("Does render if has multiple pages", () => {
    const onPageChanged = jest.fn();
    const wrapper = renderPagination({totalRecords: 20, pageSize: 10, currentPage: 1, onPageChanged})
    expect(wrapper.queryByTestId('pagination')).toBeInTheDocument();
  })
  it ("Does trigger onPageChanged correctly", () => {
    const onPageChanged = jest.fn();
    const wrapper = renderPagination({totalRecords: 50, pageSize: 10, currentPage: 1, onPageChanged})
    const secondButton = wrapper.getByTestId('pagination-button-2');
    fireEvent.click(secondButton);
    expect(onPageChanged).toHaveBeenCalledWith(2);
  })
  

})