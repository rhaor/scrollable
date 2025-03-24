import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import mysteryBoxClosed from '../assets/mysterybox-closed.jpg';
import mysteryBoxReward from '../assets/mysterybox-reward.jpg';
import mysteryBoxEmpty from '../assets/mysterybox-empty.jpg';
import mysteryBoxBad from '../assets/mysterybox-bad.jpg';

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
  position: relative;
  height: 80px; // Reduced from 120px
`;

const BoldText = styled.span`
  font-weight: 600;
`;

interface AnimatedTextProps {
  isVisible: boolean;
}

const AnimatedText = styled.div<AnimatedTextProps>`
  font-size: 16px;
  line-height: 1.5;
  color: white;
  margin-bottom: 5px;
  opacity: ${(props: AnimatedTextProps) => props.isVisible ? 1 : 0};
  transform: translateY(${(props: AnimatedTextProps) => props.isVisible ? '0' : '20px'});
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
`;

interface PromptTextProps {
  isVisible: boolean;
}

const PromptText = styled.div<PromptTextProps>`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  opacity: ${(props: PromptTextProps) => props.isVisible ? 1 : 0};
  animation: ${(props: PromptTextProps) => props.isVisible ? 'pulse 2s infinite' : 'none'};
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

const FeatureContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

const FeaturePair = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
`;

const FeatureText = styled(motion.div)`
  font-size: 16px;
  line-height: 1.5;
  color:rgb(255, 255, 255);
  flex: 1;
  margin-right: 24px;
`;

const IconContainer = styled(motion.div)`
  width: 48px;
  height: 48px;
  background-color: #E5E5E5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Badge = styled(motion.div)`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background-color: #FF3B30;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const VideoPlaceholder = styled(motion.div)`
  width: 200px;
  aspect-ratio: 16/9;
  background-color: #E5E5E5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: relative;
  animation: bgChange 8s infinite;

  @keyframes bgChange {
    0%, 25% { background-color: #E5E5E5; }
    30%, 55% { background-color: #D1C4E9; }
    60%, 85% { background-color: #B39DDB; }
    90%, 100% { background-color: #E5E5E5; }
  }

  &::after {
    content: '🔁'; // do not change this
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100px;
  position: relative;
  margin: 0px auto;
`;

const GraphLine = styled(motion.path)`
  fill: none;
  stroke: rgb(246, 224, 255);
  stroke-width: 5;
`;

const GraphArea = styled(motion.path)`
  fill: rgba(123, 87, 157, 0);
`;

interface MysteryBoxProps {
  state: 'closed' | 'reward' | 'empty' | 'bad';
}

const MysteryBox = styled(motion.div)<MysteryBoxProps>`
  width: 48px;
  height: 48px;
  background-image: url(${(props: MysteryBoxProps) => {
    switch (props.state) {
      case 'closed': return mysteryBoxClosed;
      case 'reward': return mysteryBoxReward;
      case 'empty': return mysteryBoxEmpty;
      case 'bad': return mysteryBoxBad;
    }
  }});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;

interface FeaturesScreenProps {
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
    const x1 = (i - startX) / width;
    const peak1 = 0.25 * Math.exp(-x1 * x1);
    return 0.5 + peak1;
  });
};

const generatePhasicPositive = (points: number[]): number[] => {
  const result = Array(points.length).fill(0.5);
  const startX = points.length * 2/3;
  const width = points.length / 8;
  
  return points.map((_, i) => {
    const x1 = (i - startX) / width;
    const peak = 0.4 * Math.exp(-x1 * x1);
    
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
    const x1 = (i - startX) / width;
    const dip = -0.3 * Math.exp(-x1 * x1);
    return 0.5 + dip;
  });
};

export const FeaturesScreen: React.FC<FeaturesScreenProps> = ({ onNext }) => {
  const [currentLine, setCurrentLine] = useState(1);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [showDMs, setShowDMs] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [transformedFeatures, setTransformedFeatures] = useState<number[]>([]);
  const [showGraph, setShowGraph] = useState(false);
  const [mysteryBoxStates, setMysteryBoxStates] = useState<Array<'closed' | 'reward' | 'empty' | 'bad'>>(['closed', 'closed', 'closed']);
  const controls = useAnimation();

  const animateGraphSequence = async (sequence: 'cue' | 'cueNegative' | 'cuePositive') => {
    const points = Array(100).fill(0.5);
    
    switch (sequence) {
      case 'cue':
        await controls.start({
          d: generatePath(generateCueWave(points)),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        await controls.start({
          d: generatePath(points),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        break;
      case 'cueNegative':
        await controls.start({
          d: generatePath(generateCueWave(points)),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        await controls.start({
          d: generatePath(generatePhasicNegative(points)),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        await controls.start({
          d: generatePath(points),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        break;
      case 'cuePositive':
        await controls.start({
          d: generatePath(generateCueWave(points)),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        await controls.start({
          d: generatePath(generatePhasicPositive(points)),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        await controls.start({
          d: generatePath(points),
          transition: { duration: 0.5, ease: "easeInOut" }
        });
        break;
    }
  };

  const handleClick = async () => {
    if (currentLine === 1) {
      setShowPrompt(false);
      setShowHeart(true);
      setCurrentLine(prev => prev + 1);
    } else if (currentLine < lines.length) {
      setCurrentLine(prev => prev + 1);
      if (currentLine === 2) {
        setShowDMs(true);
      } else if (currentLine === 3) {
        setShowVideo(true);
      }
    } else if (transformedFeatures.length < 3) {
      setTransformedFeatures(prev => [...prev, transformedFeatures.length]);
    } else if (!showGraph) {
      setShowGraph(true);
    } else {
      // Cycle through mystery boxes in sequence with corresponding graph animations
      setMysteryBoxStates(prev => {
        const newStates = [...prev];
        if (newStates[0] === 'closed') {
          newStates[0] = 'empty';
          animateGraphSequence('cue');
        } else if (newStates[0] === 'empty' && newStates[1] === 'closed') {
          newStates[1] = 'bad';
          animateGraphSequence('cueNegative');
        } else if (newStates[1] === 'bad' && newStates[2] === 'closed') {
          newStates[2] = 'reward';
          animateGraphSequence('cuePositive');
        }
        return newStates;
      });
    }
  };

  const lines = [
    "the platforms use many types of these unexpected rewards.",
    "like not knowing what a notification is about...",
    "or what a direct message says...",
    "and the uncertainty of autoplay and infinite scroll.",
    <>the <BoldText>unpredictability</BoldText> and <BoldText>novelty</BoldText> keep us in an engagement loop.</>,
  ];

  return (
    <Container onClick={handleClick}>
      {showGraph && (
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
      )}
      <TextContainer>
        <AnimatedText isVisible={currentLine > 0}>
          {lines[0]}
        </AnimatedText>
        {showPrompt && (
          <PromptText isVisible={currentLine < lines.length || transformedFeatures.length < 3 || !showGraph}>
            click to continue
          </PromptText>
        )}
      </TextContainer>
      <AnimatePresence>
        {showHeart && (
          <FeaturePair
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FeatureText>{lines[1]}</FeatureText>
            {transformedFeatures.includes(0) ? (
              <MysteryBox
                state={mysteryBoxStates[0]}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              />
            ) : (
              <IconContainer>
                ❤️
                <Badge
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  3
                </Badge>
              </IconContainer>
            )}
          </FeaturePair>
        )}
        {showDMs && (
          <FeaturePair
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FeatureText>{lines[2]}</FeatureText>
            {transformedFeatures.includes(1) ? (
              <MysteryBox
                state={mysteryBoxStates[1]}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              />
            ) : (
              <IconContainer>
                💬
                <Badge
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  5
                </Badge>
              </IconContainer>
            )}
          </FeaturePair>
        )}
        {showVideo && (
          <FeaturePair
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FeatureText>{lines[3]}</FeatureText>
            {transformedFeatures.includes(2) ? (
              <MysteryBox
                state={mysteryBoxStates[2]}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              />
            ) : (
              <VideoPlaceholder />
            )}
          </FeaturePair>
        )}
      </AnimatePresence>
        {currentLine > 4 && (
          <AnimatedText isVisible={true}>
            {lines[4]}
          </AnimatedText>
        )}
    </Container>
  );
}; 