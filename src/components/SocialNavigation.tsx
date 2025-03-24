import styled from '@emotion/styled';
import { IoHomeOutline, IoHome, IoPlayCircleOutline, IoPlayCircle } from 'react-icons/io5';

const NavContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 90;
`;

const NavTabs = styled.div`
  display: flex;
  gap: 32px;
`;

const TabItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
  cursor: pointer;
  color: ${props => props.active ? '#000' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  border-bottom: 2px solid ${props => props.active ? '#000' : 'transparent'};
`;

const TabText = styled.span`
  font-size: 14px;
`;

interface SocialNavigationProps {
  activeTab: 'home' | 'videos';
  onTabChange: (tab: 'home' | 'videos') => void;
}

export const SocialNavigation = ({
  activeTab,
  onTabChange,
}: SocialNavigationProps) => {
  return (
    <NavContainer>
      <NavTabs>
        <TabItem 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')}
        >
          {activeTab === 'home' ? <IoHome size={20} /> : <IoHomeOutline size={20} />}
          <TabText>Home</TabText>
        </TabItem>
        <TabItem 
          active={activeTab === 'videos'} 
          onClick={() => onTabChange('videos')}
        >
          {activeTab === 'videos' ? <IoPlayCircle size={20} /> : <IoPlayCircleOutline size={20} />}
          <TabText>Videos</TabText>
        </TabItem>
      </NavTabs>
    </NavContainer>
  );
}; 