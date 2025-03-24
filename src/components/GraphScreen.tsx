import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import mysteryBoxClosed from '../assets/mysterybox-closed.jpg';
import mysteryBoxReward from '../assets/mysterybox-reward.jpg';
import mysteryBoxEmpty from '../assets/mysterybox-empty.jpg';
import goodBoxClosed from '../assets/goodbox-closed.jpg';
import goodBoxOpen from '../assets/goodbox-expected.jpg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #806991, #40324a);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: white;
  position: relative;
`;

const TextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  margin-top: 15px;
  position: relative;
  height: 120px; // Fixed height for text container
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100px;
  position: relative;
  margin: 40px auto;
`;

const MysteryBoxImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-top: 5px;
`;

const GraphLine = styled(motion.path)`
  fill: none;
  stroke:rgb(246, 224, 255);
  stroke-width: 5;
`;

const GraphArea = styled(motion.path)`
  fill: rgba(123, 87, 157, 0);
`;

const AnimatedText = styled.div<{ isVisible: boolean }>`
  font-size: 16px;
  line-height: 1.5;
  color: white;
  margin-bottom: 16px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
`;

const PromptText = styled.div<{ isVisible: boolean }>`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 20px;
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? 'pulse 2s infinite' : 'none'};
  cursor: pointer;
  pointer-events: auto;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface GraphScreenProps {
  onNext?: () => void;
}

const generatePath = (points: number[]): string => {
  const width = 600;
  const height = 300;
  const step = width / (points.length - 1);
  
  return points.map((point, i) => {
    const x = i * step;
    const y = height - (point * height);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
};

const generateAreaPath = (points: number[]): string => {
  const width = 600;
  const height = 300;
  const step = width / (points.length - 1);
  
  const topPoints = points.map((point, i) => {
    const x = i * step;
    const y = height - (point * height);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  const bottomPoints = points.map((point, i) => {
    const x = (points.length - 1 - i) * step;
    const y = height;
    return `L ${x} ${y}`;
  }).join(' ');
  
  return `${topPoints} ${bottomPoints} Z`;
};

const generateCueWave = (points: number[]): number[] => {
  const result = Array(points.length).fill(0.5);
  const startX = points.length / 3;
  const width = points.length / 6;
  
  return points.map((_, i) => {
    // Initial rise and fall
    const x1 = (i - startX) / width;
    const peak1 = 0.25 * Math.exp(-x1 * x1);
    
    // Slight dip below baseline
    // const x2 = (i - (startX + width)) / width;
    // const dip = -0.1 * Math.exp(-x2 * x2);
    
    return 0.5 + peak1; // +dip
  });
};

const generatePhasicPositive = (points: number[]): number[] => {
  const result = Array(points.length).fill(0.5);
  const startX = points.length * 2/3;
  const width = points.length / 8;
  
  return points.map((_, i) => {
    // Sharp peak
    const x1 = (i - startX) / width;
    const peak = 0.4 * Math.exp(-x1 * x1);
    
    // Final dip
    const x2 = (i - (startX + width)) / (width / 2);
    const dip = -0.2 * Math.exp(-x2 * x2);
    
    return 0.5 + peak + dip;
  });
};

const generatePhasicNegative = (points: number[]): number[] => {
  const result = Array(points.length).fill(0.5);
  const startX = points.length * 2/3;
  const width = points.length / 8;
  
  return points.map((_, i) => {
    // // Initial rise
    // const x1 = (i - startX) / width;
    // const rise = 0.2 * Math.exp(-x1 * x1);
    
    // Sharp dip
    const x1 = (i - startX) / width;
    const dip = -0.3 * Math.exp(-x1 * x1);

    return 0.5 + dip;
  });
};

// don't clean this up even if unused right now 
const generateBothWithPhasicPositive = (points: number[]): number[] => {
  const result = Array(points.length).fill(0.5);
  const startX = points.length * 2/3;
  const width = points.length / 8;
  const startX_cue = points.length / 3;
  const width_cue = points.length / 6;
  
  return points.map((_, i) => {
    // Initial rise and fall of cue
    const x0 = (i - startX_cue) / width_cue;
    const peak0 = 0.25 * Math.exp(-x0 * x0);

    // Sharp peak
    const x1 = (i - startX) / width;
    const peak = 0.4 * Math.exp(-x1 * x1);
    
    // Final dip
    const x2 = (i - (startX + width)) / (width / 2);
    const dip = -0.2 * Math.exp(-x2 * x2);
    
    return 0.5 + peak0 + peak + dip;
  });
};

// don't clean this up even if unused right now 
const generateBothWithPhasicNegative = (points: number[]): number[] => {
  const result = Array(points.length).fill(0.5);
  const startX = points.length * 2/3;
  const width = points.length / 8;
  const startX_cue = points.length / 3;
  const width_cue = points.length / 6;
  
  return points.map((_, i) => {
    // Initial rise and fall of cue
    const x0 = (i - startX_cue) / width_cue;
    const peak0 = 0.25 * Math.exp(-x0 * x0);

    
    // Sustained dip
    const x2 = (i - (startX + width * 2)) / width;
    const dip = x2 > 0 ? -0.3 * (1 - Math.exp(-x2 / 2)) : 0;
    
    return 0.5 + peak0 + dip;
  });
};

export const GraphScreen: React.FC<GraphScreenProps> = ({ onNext }) => {
  const [currentLine, setCurrentLine] = useState(1);
  const [showPrompt, setShowPrompt] = useState(true);
  const controls = useAnimation();
  
  const getCurrentImage = (line: number) => {
    switch (line) {
      case 2:
        return mysteryBoxClosed;
      case 3:
        return mysteryBoxReward;
      case 4:
        return goodBoxClosed;
      case 5:
        return goodBoxOpen;
      case 6:
        return mysteryBoxClosed;
      case 7:
        return mysteryBoxEmpty;
      default:
        return mysteryBoxClosed;
    }
  };

  const lines = [
    "so this uncertainty is one of the ways social media platforms keep our attention.",
    "first, dopamine, a chemical in our brain, is released in anticipation of a potential reward.",
    "then, it's when we receive an unexpected reward that our dopamine peaks. this reinforces the behavior that led to it.",
    "if the reward is expected,", 
    "the levels don't change too much.", 
    "and if an expected reward...",
    "is absent, the levels dip, which leaves us craving more.",
  ];

  useEffect(() => {
    const animateGraph = async () => {
      const points = Array(100).fill(0.5);
      
      switch (currentLine) {
        case 2:
          // Cue function for anticipation
          await controls.start({
            d: generatePath(generateCueWave(points)),
            transition: { duration: 1, ease: "easeInOut" }
          });
          break;
        case 3:
          // Phasic positive for unexpected reward
          await controls.start({
            d: generatePath(generatePhasicPositive(points)),
            transition: { duration: 1, ease: "easeInOut" }
          });
          break;
        case 4:
          // Cue function for expected reward
          await controls.start({
            d: generatePath(generateCueWave(points)),
            transition: { duration: 1, ease: "easeInOut" }
          });
          break;
        case 6:
          await controls.start({
            d: generatePath(generateCueWave(points)),
            transition: { duration: 1.5, ease: "easeInOut" }
          });
          break;
        case 7:
          await controls.start({
            d: generatePath(generatePhasicNegative(points)),
            transition: { duration: 1, ease: "easeInOut" }
          });
          break;
        default:
          // Return to baseline for other lines
          await controls.start({
            d: generatePath(points),
            transition: { duration: 1, ease: "easeInOut" }
          });
      }
    };

    animateGraph();
  }, [currentLine, controls]);

  const handleClick = () => {
    if (currentLine === 1) {
      setShowPrompt(false);
    }
    if (currentLine < lines.length) {
      setCurrentLine(prev => prev + 1);
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <Container onClick={handleClick}>
      <TextContainer>
        <AnimatedText isVisible={true}>
          {lines[currentLine - 1]}
        </AnimatedText>
        {showPrompt && (
          <PromptText isVisible={currentLine < lines.length}>
            click to continue
          </PromptText>
        )}
      </TextContainer>
      <GraphContainer>
        <svg width="100%" height="100%" viewBox="0 0 600 300">
          <GraphArea
            initial={{ d: generateAreaPath(Array(100).fill(0.5)) }}
            animate={controls}
          />
          <GraphLine
            initial={{ d: generatePath(Array(100).fill(0.5)) }}
            animate={controls}
          />
        </svg>
      </GraphContainer>
      <MysteryBoxImage src={getCurrentImage(currentLine)} alt="Mystery Box" />
    </Container>
  );
}; 