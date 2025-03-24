import React, { useState } from 'react';
import styled from '@emotion/styled';
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
`;

const TextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  margin-bottom: 20px;
`;

const AnimatedText = styled.div<{ isVisible: boolean }>`
  margin-top: 15px;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  color: white;
  margin-bottom: 5px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
`;

const PromptText = styled.div<{ isVisible: boolean }>`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0px;
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

const PostContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #E5E5E5;
`;

const ProfilePic = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #E5E5E5;
  margin-right: 12px;
`;

const Username = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
`;

const PostImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1.2;
  background-color: #E5E5E5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MysteryBoxImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PostContent = styled.div`
  padding: 12px;
`;

const PostText = styled.div`
  font-size: 14px;
  color: #262626;
  line-height: 1.5;
`;

interface MysteryScreenProps {
  onNext?: () => void;
}

export const MysteryScreen: React.FC<MysteryScreenProps> = ({ onNext }) => {
  const [currentLine, setCurrentLine] = useState(1);
  const [showPrompt, setShowPrompt] = useState(true);

  const getCurrentImage = () => {
    switch (currentLine) {
      case 3: // "it could be really amazing"
        return mysteryBoxReward;
      case 4: // "or neutral"
        return mysteryBoxEmpty;
      case 5: // "or even emotionally upsetting"
        return mysteryBoxBad;
      default:
        return mysteryBoxClosed;
    }
  };

  const lines = [
    "before we see a post (or get a notification), we don't know how it's going to make us feel.",
    "it's like a mystery box.",
    "it could be really amazing, ",
    "or neutral,",
    "or even emotionally upsetting."
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
      <PostContainer>
        <PostHeader>
          <ProfilePic />
          <Username>@mysterybox</Username>
        </PostHeader>
        <PostImageContainer>
          <MysteryBoxImage src={getCurrentImage()} alt="Mystery Box" />
        </PostImageContainer>
        <PostContent>
          <PostText>
            How good is the upcoming post going to be? 🤔
          </PostText>
        </PostContent>
      </PostContainer>
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

    </Container>
  );
}; 