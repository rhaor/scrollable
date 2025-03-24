import React from 'react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

interface ExploreDialogProps {
  onExplore: () => void;
}

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DialogContent = styled.div`
  background: linear-gradient(to bottom, #806991, #40324a);
  padding: 32px;
  border-radius: 24px;
  width: 80%;
  max-width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: white;
  position: relative;
  z-index: 10000;
`;

const Instructions = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: white;
  margin-bottom: 16px;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const GoButton = styled.button`
  background-color: white;
  color: #40324a;
  border: none;
  padding: 12px 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    background-color: #f5f5f5;
  }
`;

export const ExploreDialog: React.FC<ExploreDialogProps> = ({ onExplore }) => {
  return createPortal(
    <DialogOverlay onClick={onExplore}>
      <DialogContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Instructions>
          <BoldText>Mission 1</BoldText>
          <br />
          <br />
          We're exploring this question by going deeper into the <BoldText>design of the platforms</BoldText>.
          <br />
          Check this app out! Pay attention to how it makes you feel. Play around as you like, and hit "next" when you're satisfied.
        </Instructions>
        <GoButton onClick={onExplore}>
          Accept!
        </GoButton>
      </DialogContent>
    </DialogOverlay>,
    document.body
  );
}; 