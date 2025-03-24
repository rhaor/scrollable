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

interface TextProps {
  isVisible?: boolean;
  isCurved?: boolean;
  isClickable?: boolean;
  size?: 'small' | 'medium' | 'large';
  rotation?: number;
  translateX?: number;
  align?: 'left' | 'right' | 'center';
}

const Text = styled.p<TextProps>`
  opacity: ${(props: TextProps) => props.isVisible ? 1 : 0};
  transform: translateY(${(props: TextProps) => props.isVisible ? '0' : '20px'});
  transition: all 0.5s ease;
  margin-bottom: ${(props: TextProps) => props.isCurved ? '4px' : '8px'};
  font-size: ${(props: TextProps) => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '24px';
      default: return '18px';
    }
  }};
  text-align: ${(props: TextProps) => {
    if (props.align) return props.align;
    if (props.isCurved) return 'center';
    return 'left';
  }};
  transform: ${(props: TextProps) => {
    const transforms: string[] = [];
    if (props.isCurved) {
      const rotation = props.rotation || -5;
      transforms.push(`rotate(${rotation}deg)`);
    }
    if (props.translateX !== undefined) {
      transforms.push(`translateX(${props.translateX}px)`);
    }
    return transforms.length > 0 ? transforms.join(' ') : 'none';
  }};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px 20px 60px 20px;
  gap: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  margin-top: -20px;

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

interface LineStyle {
  isHey?: boolean;
  isCurved?: boolean;
  rotation?: number;
  translateX?: number;
  align?: 'left' | 'right' | 'center';
}

interface Line {
  text: string;
  style: LineStyle;
}

const lines: Line[] = [
  { text: "hey!", style: { isHey: true } },
  { text: "are you scrolling on your phone,\nwhen you don't actually want to be?", style: {} },
  { text: "or just want to know why\nit's so hard to stop?", style: {} },
  { text: "I feel this way a lot.", style: {} },
  { text: "so, I made this interactive to", style: {} },
  { text: "find & share clarity", style: { isCurved: true, rotation: -5, translateX: -10 } },
  { text: "so we can all feel", style: { isCurved: true, rotation: 3, translateX: 15 } },
  { text: "a bit more", style: { isCurved: true, rotation: -9, translateX: -7 } },
  { text: "in control.", style: { align: 'right' } }
];

interface AnimatedTextScreenProps {
  onNext: () => void;
  hasCompletedAnimation: boolean;
  onAnimationComplete: () => void;
}

interface ButtonProps {
  isVisible?: boolean;
  isClickable?: boolean;
}

const Button = styled.button<ButtonProps>`
  opacity: ${(props: ButtonProps) => props.isVisible ? 1 : 0};
  cursor: ${(props: ButtonProps) => props.isClickable ? 'pointer' : 'default'};
  opacity: ${(props: ButtonProps) => props.isClickable ? 1 : 0.5};
`;

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
          <Text 
            key={index} 
            isVisible={hasCompletedAnimation || visibleLines.includes(index)}
            isCurved={line.style.isCurved}
            size={line.style.isHey ? 'large' : undefined}
            isHey={line.style.isHey}
            rotation={line.style.rotation}
            translateX={line.style.translateX}
            align={line.style.align}
          >
            {line.text}
          </Text>
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