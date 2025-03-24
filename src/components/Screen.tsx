import styled from '@emotion/styled';

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScreenTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

interface ScreenProps {
  title: string;
  children: React.ReactNode;
}

export const Screen = ({ title, children }: ScreenProps) => {
  return (
    <ScreenContainer>
      <ScreenTitle>{title}</ScreenTitle>
      {children}
    </ScreenContainer>
  );
}; 