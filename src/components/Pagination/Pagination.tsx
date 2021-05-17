import React from "react";
import { Button } from "@aircall/tractor";
import styled from "styled-components";


const range = (from: number, to: number, step: number = 1): number[] => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export type PaginationProps = {
  totalRecords: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (newPage: number) => void;
};


const PaginationContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  margin: 40px 20px 40px 0px;
  justify-content: flex-end;
  grid-template-columns: repeat(auto-fit, 50px);
`

const Pagination = (props: PaginationProps) => {
  const { currentPage, onPageChanged, totalRecords, pageSize } = props;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const gotoPage = React.useCallback((page: number) => {
    onPageChanged(page);
  }, [onPageChanged]);
  const getPageNumbers = React.useCallback(() => {
    return range(1, totalPages - 1);
  }, [totalPages]);

  if (!totalRecords || totalPages === 1) return null;

  const pages = getPageNumbers();
  return (
        <PaginationContainer data-testid="pagination">
          {pages.map((page) => {
            const isCurrentPage = page === currentPage;
            return (
              <Button
                key={page}
                mode={isCurrentPage ? "fill" : "outline"}
                size="small"
                data-testid={`pagination-button-${page}`}
                variant={isCurrentPage ? "primary" : "darkGhost"}
                onClick={() => gotoPage(page as number)}
                role="button"
                aria-label={isCurrentPage ? "current page" : "page button"}
              >
                {page}
              </Button>
            );
          })}
        </PaginationContainer>
  );
}



export default Pagination;
