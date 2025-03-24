import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { IoHomeOutline, IoHome, IoPlayCircleOutline, IoPlayCircle, IoSettingsOutline, IoSettings } from 'react-icons/io5';

const Container = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: 44px;
  background: white;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 100;
`;

interface TabProps {
  isActive: boolean;
}

interface TabLabelProps {
  isActive: boolean;
}

interface ToggleSwitchProps {
  isActive: boolean;
}

const Tab = styled.div<TabProps>`
  position: relative;
  padding: 12px 16px;
  cursor: pointer;
  color: ${(props: TabProps) => props.isActive ? '#8A2BE2' : '#262626'};
  font-weight: ${(props: TabProps) => props.isActive ? '600' : '400'};
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TabLabel = styled.span<TabLabelProps>`
  font-size: 12px;
  margin-top: 4px;
  color: ${(props: TabLabelProps) => props.isActive ? '#8A2BE2' : '#8e8e8e'};
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #8A2BE2;
  border-radius: 50%;
`;

const SettingsContainer = styled(motion.div)`
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  background: white;
  padding: 16px;
  border-bottom: 1px solid #dbdbdb;
  z-index: 99;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #dbdbdb;
`;

const SettingLabel = styled.span`
  font-size: 16px;
  color: #262626;
  text-align: left;
`;

const ToggleSwitch = styled.div<ToggleSwitchProps>`
  width: 50px;
  height: 28px;
  background: ${(props: ToggleSwitchProps) => props.isActive ? '#8A2BE2' : '#dbdbdb'};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${(props: ToggleSwitchProps) => props.isActive ? '24px' : '2px'};
    transition: left 0.2s;
  }
`;

interface PlatformDesignerNavigatorProps {
  onTabChange: (tab: string) => void;
  onSettingsChange: (settings: PlatformSettings) => void;
}

interface PlatformSettings {
  infiniteScroll: boolean;
  autoplay: boolean;
  unpredictableNotifications: boolean;
  dmNotifications: boolean;
  comments: boolean;
  personalizedRecommendations: boolean;
}

export const PlatformDesignerNavigator: React.FC<PlatformDesignerNavigatorProps> = ({ 
  onTabChange,
  onSettingsChange 
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<PlatformSettings>({
    infiniteScroll: true,
    autoplay: false,
    unpredictableNotifications: true,
    dmNotifications: false,
    comments: true,
    personalizedRecommendations: false
  });

  const handleTabClick = (tab: string) => {
    if (tab === 'settings') {
      setShowSettings(!showSettings);
    } else {
      setShowSettings(false);
      setActiveTab(tab);
      onTabChange(tab);
    }
  };

  const toggleSetting = (setting: keyof PlatformSettings) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting]
      };
      // If toggling infiniteScroll, also toggle autoplay
      if (setting === 'infiniteScroll') {
        newSettings.autoplay = newSettings.infiniteScroll;
      }
      onSettingsChange(newSettings);
      return newSettings;
    });
  };

  return (
    <>
      <Container>
        <Tab
          isActive={activeTab === 'home'}
          onClick={() => handleTabClick('home')}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === 'home' ? <IoHome /> : <IoHomeOutline />}
          <TabLabel isActive={activeTab === 'home'}>Home</TabLabel>
          {activeTab === 'home' && <ActiveIndicator />}
        </Tab>
        <Tab
          isActive={activeTab === 'videos'}
          onClick={() => handleTabClick('videos')}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === 'videos' ? <IoPlayCircle /> : <IoPlayCircleOutline />}
          <TabLabel isActive={activeTab === 'videos'}>Videos</TabLabel>
          {activeTab === 'videos' && <ActiveIndicator />}
        </Tab>
        <Tab
          isActive={activeTab === 'settings'}
          onClick={() => handleTabClick('settings')}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === 'settings' ? <IoSettings /> : <IoSettingsOutline />}
          <TabLabel isActive={activeTab === 'settings'}>Platform Designer</TabLabel>
          {activeTab === 'settings' && <ActiveIndicator />}
        </Tab>
      </Container>
      {showSettings && (
        <SettingsContainer>
          <SettingItem>
            <SettingLabel>Infinite Scroll and Autoplay</SettingLabel>
            <ToggleSwitch
              isActive={settings.infiniteScroll}
              onClick={() => toggleSetting('infiniteScroll')}
            />
          </SettingItem>
          <SettingItem>
            <SettingLabel>Unpredictable Notifications</SettingLabel>
            <ToggleSwitch
              isActive={settings.unpredictableNotifications}
              onClick={() => toggleSetting('unpredictableNotifications')}
            />
          </SettingItem>
          <SettingItem>
            <SettingLabel>DM Notifications</SettingLabel>
            <ToggleSwitch
              isActive={settings.dmNotifications}
              onClick={() => toggleSetting('dmNotifications')}
            />
          </SettingItem>
          <SettingItem>
            <SettingLabel>Comments</SettingLabel>
            <ToggleSwitch
              isActive={settings.comments}
              onClick={() => toggleSetting('comments')}
            />
          </SettingItem>
          <SettingItem>
            <SettingLabel>Personalized Recommendations</SettingLabel>
            <ToggleSwitch
              isActive={settings.personalizedRecommendations}
              onClick={() => toggleSetting('personalizedRecommendations')}
            />
          </SettingItem>
        </SettingsContainer>
      )}
    </>
  );
}; 