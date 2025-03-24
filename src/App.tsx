import React, { useState } from 'react'
import styled from '@emotion/styled'
import { MobileContainer } from './components/MobileContainer'
import { Screen } from './components/Screen'
import { SocialScreen } from './components/SocialScreen'
import { OnboardingScreen } from './components/OnboardingScreen'
import AnimatedTextScreen from './components/AnimatedTextScreen'
import { UserPreferencesProvider } from './context/UserPreferencesContext'
import { BottomNav } from './components/BottomNav'
import { ReflectionScreen } from './components/ReflectionScreen'
import { MysteryScreen } from './components/MysteryScreen'
import { GraphScreen } from './components/GraphScreen'
import { FeaturesScreen } from './components/FeaturesScreen'
import { MysteryFeedScreen } from './components/MysteryFeedScreen'
import { YoursScreen } from './components/YoursScreen'
import { ConclusionsScreen } from './components/ConclusionsScreen'
import { CreditsScreen } from './components/CreditsScreen'
import './App.css'

const screens = [
  { number: 1, title: 'welcome' },
  { number: 2, title: 'customize' },
  { number: 3, title: 'mission 1' },
  { number: 4, title: 'reflect' },
  { number: 5, title: 'boxes' },
  { number: 6, title: 'dopamine' },
  { number: 7, title: 'features' },
  { number: 8, title: 'design to hook' },
  { number: 9, title: 'design to serve' },
  { number: 10, title: 'parting thoughts' },
  { number: 11, title: 'credits' }
]

function App() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [hasCompletedAnimation, setHasCompletedAnimation] = useState(false)

  const handleNext = () => {
    if (currentScreen < screens.length) {
      setCurrentScreen(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentScreen > 1) {
      setCurrentScreen(prev => prev - 1)
    }
  }

  const handleScreenChange = (newScreen: number) => {
    setCurrentScreen(newScreen)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <AnimatedTextScreen
            onAnimationComplete={() => setHasCompletedAnimation(true)}
            hasCompletedAnimation={hasCompletedAnimation}
            onNext={handleNext}
          />
        )
      case 2:
        return <OnboardingScreen />
      case 3:
        return <SocialScreen isVisible={currentScreen === 3} />
      case 4:
        return <ReflectionScreen onNext={handleNext} />
      case 5:
        return <MysteryScreen onNext={handleNext} />
      case 6:
        return <GraphScreen onNext={handleNext} />
      case 7:
        return <FeaturesScreen onNext={handleNext} />
      case 8:
        return <MysteryFeedScreen onNext={handleNext} />
      case 9:
        return <YoursScreen onNext={handleNext} />
      case 10:
        return <ConclusionsScreen onNext={handleNext} />
      case 11:
        return <CreditsScreen onNext={handleNext} />
      default:
        return null
    }
  }

  return (
    <UserPreferencesProvider>
      <MobileContainer>
        {renderScreen()}
        {currentScreen > 1 && (
          <BottomNav
            currentScreen={currentScreen}
            onNext={handleNext}
            onPrev={handlePrev}
            screens={screens}
            showPrevButton={currentScreen > 1}
            showNextButton={currentScreen < screens.length}
            onScreenChange={handleScreenChange}
          />
        )}
      </MobileContainer>
    </UserPreferencesProvider>
  )
}

export default App
