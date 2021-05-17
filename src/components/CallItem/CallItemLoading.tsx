import React from 'react';
import { Box, Flex, Grid, Spacer } from '@aircall/tractor';
import { CallItemContainer } from './CallItemContainer';
import styled from 'styled-components';


const FillLine = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, #F0F0F0 5%, #F8F8F8 20%, #F0F0F0 80%);
  background-size: 85% 85%;
  animation: pulse 0.5s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    80% {
      background-position: -135% 0%;
    }
  }
`;

const CallItemLoadingGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 500px);
  grid-gap: 40px;
  margin-left: 40px;
  margin-bottom: 80px;

  @media(max-width: 62.5em) {
    width: 100%;
    margin-left: 0;
  }
`
const CallItemLoading = () => {

    return <CallItemContainer>
      <Box height="100%" boxShadow={2} p="2em">
        <Grid gridTemplateColumns="auto auto">
          <Flex flexDirection="column" alignItems="space-between">
          </Flex>
          <Spacer space="s" direction="vertical">
              <FillLine><p></p></FillLine>
              <FillLine><p></p></FillLine>
              <FillLine><p></p></FillLine>
              <FillLine><p></p></FillLine>
          </Spacer>
        </Grid>
      </Box>
    </CallItemContainer>
}

const CallItemLoadingGrid = () => (
  <>
  <CallItemLoadingGridWrapper data-testid="loading-grid-call-list">
    <CallItemLoading />
    <CallItemLoading />
  </CallItemLoadingGridWrapper>

  <CallItemLoadingGridWrapper>
    <CallItemLoading />
    <CallItemLoading />
  </CallItemLoadingGridWrapper>
  <CallItemLoadingGridWrapper>
    <CallItemLoading />
    <CallItemLoading />
  </CallItemLoadingGridWrapper>
  </>
)

export default CallItemLoadingGrid;
