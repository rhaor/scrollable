import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import mysteryBoxClosed from '../assets/mysterybox-closed.jpg';
import mysteryBoxReward from '../assets/mysterybox-reward.jpg';
import mysteryBoxEmpty from '../assets/mysterybox-empty.jpg';
import mysteryBoxBad from '../assets/mysterybox-bad.jpg';
import mysteryBoxGood from '../assets/mysterybox-good.jpg';

interface MysteryBoxProps {
  size?: 'small' | 'medium' | 'large';
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  state?: 'closed' | 'reward' | 'empty' | 'bad' | 'good';
  isSelected?: boolean;
}

interface BoxContainerProps {
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  size?: 'small' | 'medium' | 'large';
  state?: 'closed' | 'reward' | 'empty' | 'bad' | 'good';
  isSelected?: boolean;
}

const getBoxImage = (state: 'closed' | 'reward' | 'empty' | 'bad' | 'good' = 'closed') => {
  switch (state) {
    case 'reward': return mysteryBoxReward;
    case 'empty': return mysteryBoxEmpty;
    case 'bad': return mysteryBoxBad;
    case 'good': return mysteryBoxGood;
    default: return mysteryBoxClosed;
  }
};

const BoxContainer = styled(motion.div)<BoxContainerProps>`
  position: ${(props: BoxContainerProps) => props.position ? 'absolute' : 'relative'};
  top: ${(props: BoxContainerProps) => props.position?.top};
  left: ${(props: BoxContainerProps) => props.position?.left};
  right: ${(props: BoxContainerProps) => props.position?.right};
  bottom: ${(props: BoxContainerProps) => props.position?.bottom};
  width: ${(props: BoxContainerProps) => {
    switch (props.size) {
      case 'small': return '60px';
      case 'large': return '120px';
      default: return '90px';
    }
  }};
  height: ${(props: BoxContainerProps) => {
    switch (props.size) {
      case 'small': return '60px';
      case 'large': return '120px';
      default: return '90px';
    }
  }};
  background-image: url(${(props: BoxContainerProps) => getBoxImage(props.state)});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props: BoxContainerProps) => props.isSelected ? '0 0 0 2px #806991' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  transition: transform 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }
`;

const BoxContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 20px;
`;

export const MysteryBox: React.FC<MysteryBoxProps> = ({ 
  size = 'medium',
  position,
  state = 'closed',
  isSelected = false
}) => {
  return (
    <BoxContainer
      size={size}
      position={position}
      state={state}
      isSelected={isSelected}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    />
  );
}; 