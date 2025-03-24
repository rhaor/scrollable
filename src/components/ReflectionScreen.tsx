import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import guyQuestionImage from '../assets/guy-question.jpg';

interface AnimatedTextProps {
  isVisible: boolean;
}

interface PromptTextProps {
  isVisible: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #8a7ba1, #4a3b5a);
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding: 20px;
  text-align: center;
  color: white;
`;

const GuyImage = styled.img`
  width: 100%;
  max-width: 60px;
  height: auto;
  margin-bottom: 20px;
  // border-radius: 8px;
`;

const TextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const AnimatedText = styled(motion.div)<AnimatedTextProps>`
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 14px;
  opacity: ${(props: AnimatedTextProps) => props.isVisible ? 1 : 0};
  transform: translateY(${(props: AnimatedTextProps) => props.isVisible ? 0 : 20}px);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const PromptText = styled(motion.div)<PromptTextProps>`
  font-size: 14px;
  color: ${(props: PromptTextProps) => props.isVisible ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)'};
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  opacity: ${(props: PromptTextProps) => props.isVisible ? 1 : 0};
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.3s ease;
`;

interface ReflectionScreenProps {
  onNext?: () => void;
}

export const ReflectionScreen: React.FC<ReflectionScreenProps> = ({ onNext }) => {
  const [currentLine, setCurrentLine] = useState(1);
  const [showPrompt, setShowPrompt] = useState(true);

  const lines = [
    "how did that feel?",
    "I'm guessing it wasn't quite as appealing as your own feed, but I'm curious what you think: did particular content or features stand out?",
    <><BoldText>we're not alone</BoldText> in having trouble prying ourselves away - a large survey reported that people spend on average <BoldText>6 hours</BoldText> a day on social media.</>,
    <>and <BoldText>43%</BoldText> said they felt they were consuming too much content. (1) </>,
    <><BoldText>so why are we staying longer on these platforms than we'd like?</BoldText></>,
  ];

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
      <GuyImage src={guyQuestionImage} alt="Guy Question" />
      <TextContainer>
        {lines.map((line, index) => (
          <AnimatedText key={index} isVisible={index < currentLine}>
            {line}
          </AnimatedText>
        ))}
        {showPrompt && (
          <PromptText isVisible={currentLine < lines.length}>
            click to continue
          </PromptText>
        )}
      </TextContainer>
    </Container>
  );
}; 