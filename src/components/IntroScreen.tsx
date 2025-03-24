import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #E6F3FF;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #262626;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

interface IntroScreenProps {
  onNext: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onNext }) => {
  return (
    <Container>
      <Title>Welcome to the Demo</Title>
      <Subtitle>Click anywhere to continue</Subtitle>
    </Container>
  );
}; 