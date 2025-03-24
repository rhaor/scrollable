import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useUserPreferences } from '../context/UserPreferencesContext';

interface StyledButtonProps {
  isSelected: boolean;
}

const Container = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(to bottom, #806991, #40324a);
  color: white;
  padding-top: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-top: 30px;
  margin-bottom: 8px;
  color: white;
  text-align: center;
  font-weight: normal;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 20px;
  flex: 1;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 120px;
  margin: 0 auto;
`;

const ColumnTitle = styled.h2`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
`;

const SelectButton = styled.button<StyledButtonProps>`
  padding: 12px;
  border: 2px solid ${props => props.isSelected ? '#8A2BE2' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 12px;
  background-color: ${props => props.isSelected ? '#F5F0FF' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isSelected ? '#8A2BE2' : 'white'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 40px;
  outline: none;

  &:hover {
    border-color: #8A2BE2;
    background-color: #F5F0FF;
    color: #8A2BE2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

interface Props {}

export const OnboardingScreen: React.FC<Props> = () => {
  const { setSelectedCategories } = useUserPreferences();
  const [selectedItems, setSelectedItems] = React.useState<Record<number, string>>({});

  const column1 = [
    'travel',
    'games',
    'comedy'
  ];

  const column2 = [
    'books',
    'sports',
    'gardening'
  ];

  const column3 = [
    'crime',
    'feel-good',
    'movie clips'
  ];

  const handleSelection = (columnIndex: number, category: string) => {
    setSelectedItems(prev => {
      const newItems = { ...prev };
      if (prev[columnIndex] === category) {
        delete newItems[columnIndex];
      } else {
        newItems[columnIndex] = category;
      }
      return newItems;
    });
  };

  // Save categories whenever they change
  useEffect(() => {
    const selectedCategories = Object.values(selectedItems);
    if (selectedCategories.length > 0) {
      setSelectedCategories(selectedCategories);
    }
  }, [selectedItems, setSelectedCategories]);

  return (
    <Container>
      <Title>first things first</Title>
      <Subtitle>tell me a bit about yourself, to customize the experience!</Subtitle>
      <ContentContainer>
        <Column>
          <ColumnTitle>I like content on...</ColumnTitle>
          {column1.map((category) => (
            <SelectButton
              key={category}
              isSelected={selectedItems[0] === category}
              onClick={() => handleSelection(0, category)}
            >
              {category}
            </SelectButton>
          ))}
        </Column>
        <Column>
          <ColumnTitle>And...</ColumnTitle>
          {column2.map((category) => (
            <SelectButton
              key={category}
              isSelected={selectedItems[1] === category}
              onClick={() => handleSelection(1, category)}
            >
              {category}
            </SelectButton>
          ))}
        </Column>
        <Column>
          <ColumnTitle>And might binge...</ColumnTitle>
          {column3.map((category) => (
            <SelectButton
              key={category}
              isSelected={selectedItems[2] === category}
              onClick={() => handleSelection(2, category)}
            >
              {category}
            </SelectButton>
          ))}
        </Column>
      </ContentContainer>
    </Container>
  );
};