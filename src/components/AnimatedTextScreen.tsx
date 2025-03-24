import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import handImage from '../assets/hand.jpg';
import phoneImage from '../assets/phone.jpg';
import phoneArrowsImage from '../assets/phone-arrows.jpg';
import guyHelloImage from '../assets/guy-hello.jpg';

const TextContainer = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  background: linear-gradient(to bottom, #806991, #40324a);
  color: white;
  position: relative;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  padding-top: 50px;
`;

const PulseHint = styled.div`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white;
  opacity: 0.5;
  pointer-events: none;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

interface TextLineProps {
  isVisible: boolean;
  isCurved?: boolean;
  align?: 'left' | 'right';
  isHey?: boolean;
  text?: string;
}

const TextLine = styled.div<TextLineProps>`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity 0.3s ease, transform 0.3s ease;
  margin-bottom: ${props => props.isCurved ? '4px' : '8px'};
  font-size: ${props => {
    if (props.isHey) return '32px';
    if (props.isCurved) return '14px';
    return '16px';
  }};
  line-height: 1.3;
  text-align: ${props => {
    if (props.text === 'find & share clarity') return 'left';
    if (props.text === 'so we can all feel') return 'right';
    if (props.isCurved) return 'center';
    if (props.align === 'right') return 'right';
    return 'left';
  }};
  transform: ${props => {
    if (props.text === 'find & share clarity') return 'rotate(-10deg) translateX(4px)';
    if (props.text === 'so we can all feel') return 'rotate(12deg) translateX(-8px)';
    if (props.isCurved) return 'rotate(-10deg) translateX(-10px)';
    return 'none';
  }};
  white-space: pre-line;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  gap: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HoverText = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: -25px;
  font-size: 14px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
  color: white;
`;

const HandImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: drop-shadow(0 0 0 rgba(255, 223, 0, 0));

  &:hover {
    transform: translateX(20px);
    filter: drop-shadow(0 0 10px rgba(255, 223, 0, 0.5));
  }
`;

const PhoneImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  opacity: ${props => props.isClickable ? 1 : 0.5};
  transition: opacity 0.3s ease, filter 0.3s ease;
  filter: drop-shadow(0 0 0 rgba(255, 223, 0, 0));

  &:hover {
    filter: drop-shadow(0 0 10px rgba(255, 223, 0, 0.5));
  }
`;

const GuyHelloImage = styled.img`
  position: absolute;
  top: 25px;
  right: 30px;
  width: 80px;
  height: 80px;
  object-fit: contain;
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const lines = [
  { text: "hey!", style: { isHey: true } },
  { text: "are you scrolling on your phone,\nwhen you don't actually want to be?", style: {} },
  { text: "or just want to know why\nit's so hard to stop?", style: {} },
  { text: "I feel this way a lot.", style: {} },
  { text: "so, I made this interactive to", style: {} },
  { text: "find & share clarity", style: { isCurved: true } },
  { text: "so we can all feel", style: { isCurved: true } },
  { text: "a bit more", style: { isCurved: true } },
  { text: "in control.", style: { align: 'right' } }
];

interface AnimatedTextScreenProps {
  onNext: () => void;
  hasCompletedAnimation: boolean;
  onAnimationComplete: () => void;
}

const AnimatedTextScreen: React.FC<AnimatedTextScreenProps> = ({ 
  onNext, 
  hasCompletedAnimation,
  onAnimationComplete 
}) => {
  const [visibleLines, setVisibleLines] = useState<number[]>(hasCompletedAnimation ? Array.from({ length: lines.length }, (_, i) => i) : [0]);
  const [showPulse, setShowPulse] = useState(!hasCompletedAnimation);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isHandHovered, setIsHandHovered] = useState(false);

  const showImages = visibleLines.includes(lines.length - 1);
  const showGuyHello = visibleLines.includes(0);

  useEffect(() => {
    // Check if all lines are visible
    if (visibleLines.length >= lines.length && !hasCompletedAnimation) {
      onAnimationComplete();
    }
  }, [visibleLines, hasCompletedAnimation, onAnimationComplete]);

  const handleClick = () => {
    setShowPulse(false);
    if (!hasCompletedAnimation) {
      setVisibleLines(prev => {
        if (prev.length >= lines.length) return prev;
        return [...prev, prev.length];
      });
    }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (visibleLines.length >= lines.length) {
      onNext();
    }
  };

  return (
    <TextContainer onClick={handleClick}>
      {showPulse && <PulseHint>click for more</PulseHint>}
      <GuyHelloImage 
        src={guyHelloImage} 
        alt="Guy Hello" 
        className={showGuyHello ? 'visible' : ''}
      />
      <TextContent>
        {lines.map((line, index) => (
          <TextLine 
            key={index} 
            isVisible={hasCompletedAnimation || visibleLines.includes(index)}
            isCurved={line.style.isCurved}
            align={line.style.align}
            isHey={line.style.isHey}
            text={line.text}
          >
            {line.text}
          </TextLine>
        ))}
      </TextContent>
      <ImageContainer className={showImages ? 'visible' : ''}>
        <ImageWrapper>
          <HoverText isVisible={isHandHovered}>triggers</HoverText>
          <HandImage 
            src={handImage} 
            alt="Hand" 
            onMouseEnter={() => setIsHandHovered(true)}
            onMouseLeave={() => setIsHandHovered(false)}
          />
        </ImageWrapper>
        <ImageWrapper>
          <HoverText isVisible={isPhoneHovered}>can't leave</HoverText>
          <PhoneImage 
            src={isPhoneHovered ? phoneArrowsImage : phoneImage} 
            alt="Phone" 
            onClick={handlePhoneClick}
            onMouseEnter={() => {
              setIsPhoneHovered(true);
              setShowPulse(false);
            }}
            onMouseLeave={() => setIsPhoneHovered(false)}
            isClickable={visibleLines.length >= lines.length}
          />
        </ImageWrapper>
      </ImageContainer>
    </TextContainer>
  );
};

export default AnimatedTextScreen; 