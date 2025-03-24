import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom,rgb(255, 255, 255),rgb(230, 195, 255));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow-y: auto;
`;

const Title = styled(motion.h1)`
  font-size: 32px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 40px;
`;

const Section = styled(motion.div)`
  margin-bottom: 40px;
  max-width: 600px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 12px;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #666;
  margin-bottom: 8px;
`;

const TextContainer = styled.div`
  max-width: 600px;
  text-align: center;
  position: relative;
  padding-top: 20px;
`;

const credits = {
  title: "Credits",
  sections: [
    {
      title: "An explorable explanation by",
      content: [
        "Rebecca Hao",
        "made in EDUC 432"
      ]
    },
    {
      title: "Special thanks",
      content: [
        "Hari - I learned a lot in this class!",
        "Teachers I spoke to!",
        "Friends :)",
      ]
    },
    {
      title: "Thanks for playing/learning!",
      content: [
      ]
    },
    {
      title: "Sources",
      content: [
        "[1] Talker Research, Media Consumption Report, 2024",
        "[2] Ali Abdaal, You're Destroying Your Mind - How to Control Dopamine",
        "[3] Mujika et al., 2022. Addiction by Design: Some Dimensions and Challenges of Excessive Social Media Use",
        "and much more inspo!"
      ]
    }
  ]
};

interface CreditsScreenProps {
  onNext?: () => void;
}

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ onNext }) => {
  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {credits.title}
      </Title>
      {credits.sections.map((section, index) => (
        <Section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <SectionTitle>{section.title}</SectionTitle>
          {section.content.map((text, textIndex) => (
            <Text key={textIndex}>{text}</Text>
          ))}
        </Section>
      ))}
    </Container>
  );
}; 