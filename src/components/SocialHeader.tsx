import styled from '@emotion/styled';
import { useState } from 'react';
import { IoHeartOutline, IoPaperPlaneOutline } from 'react-icons/io5';
import { NotificationsOverlay } from './NotificationsOverlay';
import guyHooked from '../assets/guy-hooked.jpg';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #262626;
`;

const TestButton = styled.button`
  background: none;
  border: 1px solid #dbdbdb;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fafafa;
  }
`;

const GraphContainer = styled.div`
  width: 200px;
  height: 40px;
  background: #fafafa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #262626;
`;

const GuyImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 20px;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  color: #262626;

  &:hover {
    opacity: 0.7;
  }
`;

const NotificationBadge = styled.div`
  background-color: #ed4956;
  color: white;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  position: absolute;
  top: -8px;
  right: -8px;
`;

interface Props {
  hasNotifications: boolean;
  onNotificationsClick: () => void;
  onDMClick: () => void;
  unreadDMs: number;
  notificationCount: number;
  testButtonState: 'test' | 'graph' | 'guy';
  onTestButtonClick: () => void;
  guyImage?: string;
}

export const SocialHeader: React.FC<Props> = ({
  hasNotifications,
  onNotificationsClick,
  onDMClick,
  unreadDMs,
  notificationCount,
  testButtonState,
  onTestButtonClick,
  guyImage = guyHooked
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(true);
    if (onNotificationsClick) {
      onNotificationsClick();
    }
  };

  const renderTestButton = () => {
    switch (testButtonState) {
      case 'test':
        return (
          <TestButton onClick={onTestButtonClick}>
            Test
          </TestButton>
        );
      case 'graph':
        return <GraphContainer onClick={onTestButtonClick}>Dopamine Graph</GraphContainer>;
      case 'guy':
        return (
          <GuyImage src={guyImage} alt="Guy" onClick={onTestButtonClick} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <Logo>Scrollable</Logo>
          {renderTestButton()}
        </LogoContainer>
        <IconsContainer>
          <IconWrapper onClick={handleNotificationsClick}>
            <IoHeartOutline />
            {hasNotifications && <NotificationBadge>{notificationCount}</NotificationBadge>}
          </IconWrapper>
          <IconWrapper onClick={onDMClick}>
            <IoPaperPlaneOutline />
            {unreadDMs > 0 && <NotificationBadge>{unreadDMs}</NotificationBadge>}
          </IconWrapper>
        </IconsContainer>
      </HeaderContainer>
      <NotificationsOverlay 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}; 