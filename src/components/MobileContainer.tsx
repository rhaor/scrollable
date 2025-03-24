import React from 'react';
import styled from '@emotion/styled';

interface MobileContainerProps {
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <Container>
      <ContentContainer>
        {children}
      </ContentContainer>
    </Container>
  );
}; 