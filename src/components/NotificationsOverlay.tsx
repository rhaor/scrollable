import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding-top: 60px;
`;

const NotificationContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  max-height: 80vh;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dbdbdb;
  font-weight: 600;
`;

const NotificationList = styled.div`
  overflow-y: auto;
  max-height: calc(80vh - 53px);
`;

const NotificationItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #f0f0f0;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
`;

const Username = styled.span`
  font-weight: 600;
`;

const Time = styled.div`
  color: #8e8e8e;
  font-size: 12px;
  margin-top: 2px;
`;

interface NotificationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsOverlay = ({ isOpen, onClose }: NotificationsOverlayProps) => {
  const notifications = [
    {
      id: 1,
      username: 'user123',
      action: 'liked your post',
      time: '1h',
    },
    {
      id: 2,
      username: 'photography_lover',
      action: 'started following you',
      time: '2h',
    },
    {
      id: 3,
      username: 'travel_enthusiast',
      action: 'commented on your photo',
      time: '3h',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <NotificationContainer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <Header>Notifications</Header>
            <NotificationList>
              {notifications.map(notification => (
                <NotificationItem key={notification.id}>
                  <Avatar />
                  <NotificationContent>
                    <div>
                      <Username>{notification.username}</Username>
                      {' '}
                      {notification.action}
                    </div>
                    <Time>{notification.time}</Time>
                  </NotificationContent>
                </NotificationItem>
              ))}
            </NotificationList>
          </NotificationContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}; 