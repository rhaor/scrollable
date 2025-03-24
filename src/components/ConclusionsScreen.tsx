import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #806991, #40324a);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: left;
  color: white;
  position: relative;
`;

const TextContainer = styled.div`
  max-width: 600px;
  // margin-left: 20px;
  text-align: left;
  position: relative;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const AnimatedText = styled(motion.div)`
  font-size: 16px;
  line-height: 1.5;
  color: white;
  margin-bottom: 10px;
  opacity: 0;
  // transform: translateY(20px);
`;

const PromptText = styled(motion.div)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  cursor: pointer;
  pointer-events: auto;
`;

const LinkText = styled.a`
  color: #FFD700;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #FFE55C;
  }
`;

interface ConclusionsScreenProps {
  onNext?: () => void;
}

export const ConclusionsScreen: React.FC<ConclusionsScreenProps> = ({ onNext }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  const lines = [
    "nice designing!",
    "so what do we do from here?",
    "while we probably can't rely on platform change right now, there are some things we can do:",
    <>1. surprisingly, we can literally <BoldText>remove features</BoldText> like we've been doing using tools like <LinkText href="https://unhook.app" target="_blank" rel="noopener noreferrer">Unhook</LinkText> and <LinkText href="https://socialfocus.app" target="_blank" rel="noopener noreferrer">SocialFocus</LinkText></>,
    <>2. take this <BoldText>awareness</BoldText> and eye for design x getting us hooked to work towards <BoldText>intentionality with social media</BoldText></>,
    <>3. <BoldText>keep learning</BoldText>! I recommend checking out <LinkText href="https://youtu.be/4TMPXK9tw5U?si=hXdgXf_kooj0VAQr" target="_blank" rel="noopener noreferrer">Dino Ambrosi's TED talk</LinkText>.</>,
    <><BoldText>what do you plan to do next?</BoldText></>,
  ];

  const handleClick = () => {
    if (currentLine < lines.length) {
      setCurrentLine(prev => prev + 1);
      setShowPrompt(false);
    } else {
      onNext?.();
    }
  };

  return (
    <Container onClick={handleClick}>
      <TextContainer>
        <AnimatePresence>
          {lines.slice(0, currentLine + 1).map((line, index) => (
            <AnimatedText
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {line}
            </AnimatedText>
          ))}
        </AnimatePresence>
        {showPrompt && (
          <PromptText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: currentLine * 0.2 + 0.5 }}
          >
            click to continue
          </PromptText>
        )}
      </TextContainer>
    </Container>
  );
}; 