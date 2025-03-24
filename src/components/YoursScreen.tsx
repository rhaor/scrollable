import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialHeader } from './SocialHeader';
import { PlatformDesignerNavigator } from './PlatformDesignerNavigator';
import { MysteryBox } from './MysteryBox';
import { IoHeartOutline, IoHeart, IoChatbubbleOutline, IoBookmarkOutline, IoPaperPlaneOutline, IoCloseOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import guyYay from '../assets/guy-yay.jpg';

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-top:100px; // the header is there?
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  text-align: left;
`;

const PostCard = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const PostHeader = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const PostImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #E5E5E5;
  border-radius: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PostActions = styled.div`
  padding: 0 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const LikesCount = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Comments = styled.div`
  padding: 0 12px;
`;

const Comment = styled.div`
  margin: 4px 0;
  font-size: 14px;
`;

const CommentUsername = styled.span`
  font-weight: 600;
  margin-right: 6px;
`;

const TimeAgo = styled.div`
  color: #8e8e8e;
  font-size: 12px;
  padding: 0 12px;
  margin-top: 8px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #8e8e8e;
`;

const EmptyStateTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const EmptyStateText = styled.p`
  font-size: 14px;
  line-height: 1.4;
`;

const VideoCard = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 16px;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #E5E5E5;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const VideoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  padding: 0 12px;
`;

const VideoDescription = styled.p`
  font-size: 14px;
  color: #8e8e8e;
  padding: 0 12px;
  line-height: 1.4;
`;

const DMDialog = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DMDialogHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DMDialogTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 24px;
  color: #262626;
`;

const DMList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const DMItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #dbdbdb;
  cursor: pointer;
`;

const DMAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #E5E5E5;
  margin-right: 12px;
`;

const DMContent = styled.div`
  flex: 1;
`;

const DMUsername = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const DMLastMessage = styled.div`
  font-size: 14px;
  color: #8e8e8e;
`;

const DMTime = styled.div`
  font-size: 12px;
  color: #8e8e8e;
`;

const BottomBoxesContainer = styled.div`
  position: fixed;
  bottom: 60px; // Lowered from 80px to 60px
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 16px;
  z-index: 1000;
  padding: 16px;
  background: linear-gradient(to bottom, transparent, white);
`;

const ViewMoreComments = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #8e8e8e;
  font-size: 14px;
  cursor: pointer;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DialogContent = styled.div`
  background: linear-gradient(to bottom, #806991, #40324a);
  padding: 32px;
  border-radius: 24px;
  width: 80%;
  max-width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: white;
  position: relative;
  z-index: 10000;
`;

const Instructions = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: white;
  margin-bottom: 16px;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const GoButton = styled.button`
  background-color: white;
  color: #40324a;
  border: none;
  padding: 12px 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    background-color: #f5f5f5;
  }
`;

interface BoxPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

interface Box {
  id: string;
  position: BoxPosition;
}

const posts = [
  {
    id: 'mystery1',
    username: 'user123',
    likes: 3567,
    comments: [
      { username: 'mike_84', text: 'What\'s inside? 🤔' },
      { username: 'emma_97', text: 'I need to know!' }
    ],
    timeAgo: '6h'
  },
  {
    id: 'mystery2',
    username: 'explorer456',
    likes: 2103,
    comments: [
      { username: 'lisa_95', text: 'The suspense is killing me! 🎁' },
      { username: 'david_91', text: 'Can\'t wait to see what\'s in there!' }
    ],
    timeAgo: '8h'
  },
  {
    id: 'mystery3',
    username: 'adventurer789',
    likes: 4892,
    comments: [
      { username: 'tom_89', text: 'This is so intriguing! 🔍' },
      { username: 'sophie_96', text: 'Tell us what\'s inside!' }
    ],
    timeAgo: '3h'
  },
  {
    id: 'mystery4',
    username: 'seeker101',
    likes: 3245,
    comments: [
      { username: 'olivia_98', text: 'The mystery is real! 🎯' },
      { username: 'ryan_87', text: 'I\'m so curious!' }
    ],
    timeAgo: '5h'
  }
];

const videos = [
  {
    id: 'video1',
    title: 'The Mystery of Social Media',
    description: 'Explore how social platforms use mystery to keep us engaged.',
    duration: '2:30'
  },
  {
    id: 'video2',
    title: 'Understanding Digital Rewards',
    description: 'Learn about the psychology behind social media rewards.',
    duration: '3:15'
  },
  {
    id: 'video3',
    title: 'Breaking the Scroll',
    description: 'Tips for mindful social media use.',
    duration: '1:45'
  }
];

const dms = [
  {
    id: 'dm1',
    username: 'travel_lover',
    lastMessage: 'Check out this amazing place!',
    time: '2h'
  },
  {
    id: 'dm2',
    username: 'bookworm',
    lastMessage: 'Just finished reading that book we discussed',
    time: '5h'
  },
  {
    id: 'dm3',
    username: 'sports_fan',
    lastMessage: 'Did you see the game last night?',
    time: '1d'
  },
  {
    id: 'dm4',
    username: 'movie_buff',
    lastMessage: 'New trailer just dropped!',
    time: '2d'
  }
];

interface YoursScreenProps {
  onNext?: () => void;
}

export const YoursScreen: React.FC<YoursScreenProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [hasNotifications, setHasNotifications] = useState(true);
  const [unreadDMs, setUnreadDMs] = useState(3);
  const [showDMDialog, setShowDMDialog] = useState(false);
  const [testButtonState, setTestButtonState] = useState<'test' | 'graph' | 'guy'>('test');
  const [isTestSelected, setIsTestSelected] = useState(false);
  const [boxStates, setBoxStates] = useState<Record<string, 'closed' | 'reward' | 'empty' | 'bad' | 'good'>>({});
  const [settings, setSettings] = useState({
    infiniteScroll: true,
    autoplay: true,
    unpredictableNotifications: true,
    dmNotifications: false,
    comments: true,
    personalizedRecommendations: false
  });
  const [notificationCount, setNotificationCount] = useState(0);
  const [dmCount, setDmCount] = useState(0);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  const handleTestButtonClick = async () => {
    if (testButtonState === 'test') {
      setIsTestSelected(true);
      
      // Get all visible box IDs
      const visibleBoxIds = [
        ...boxes.map(box => box.id),
        ...(settings.infiniteScroll && settings.autoplay ? ['bottom-1', 'bottom-2', 'bottom-3'] : []),
        ...posts.map(post => `post-${post.id}`),
        ...(settings.comments ? posts.map(post => `comments-${post.id}`) : [])
      ];

      // Animate all boxes
      const newBoxStates: Record<string, 'closed' | 'reward' | 'empty' | 'bad' | 'good'> = {};
      
      for (const boxId of visibleBoxIds) {
        // Determine box state based on personalized recommendations setting
        let state: 'closed' | 'reward' | 'empty' | 'bad' | 'good';
        if (settings.personalizedRecommendations) {
          // Higher chance of reward when personalized recommendations is on
          const rand = Math.random();
          if (rand < 0.4) state = 'reward';
          else if (rand < 0.6) state = 'good';
          else if (rand < 0.8) state = 'empty';
          else state = 'bad';
        } else {
          // Equal chance for all states when personalized recommendations is off
          const rand = Math.random();
          if (rand < 0.25) state = 'reward';
          else if (rand < 0.5) state = 'good';
          else if (rand < 0.75) state = 'empty';
          else state = 'bad';
        }
        newBoxStates[boxId] = state;
      }
      
      setBoxStates(newBoxStates);

      // First show the dopamine graph text
      setTestButtonState('graph');
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Then show the guy image
      setTestButtonState('guy');
    } else if (testButtonState === 'guy') {
      setTestButtonState('test');
      setIsTestSelected(false);
      setBoxStates({});
    }
  };

  const handleSettingsChange = (newSettings: typeof settings) => {
    setSettings(newSettings);
    // If infinite scroll is turned off, clear any existing boxes
    if (!newSettings.infiniteScroll) {
      setBoxes(prev => prev.filter(box => !box.id.startsWith('bottom-')));
    }
  };

  // Effect for unpredictable notifications
  useEffect(() => {
    let timeoutId: number;

    const getRandomDelay = () => Math.random() * 10000 + 5000; // Random delay between 5-15 seconds

    const scheduleNextNotification = () => {
      if (!settings.unpredictableNotifications) return;
      
      const delay = getRandomDelay();
      timeoutId = window.setTimeout(() => {
        setNotificationCount(prev => prev + 1);
        // Add a new box with position clustered towards top-right
        const boxId = `notification-${Date.now()}`;
        const position = {
          top: `${Math.random() * 30 + 5}%`, // 5% to 35% from top
          right: `${Math.random() * 20 + 5}%` // 5% to 25% from right
        };
        setBoxes(prev => [...prev, { id: boxId, position }]);
        scheduleNextNotification(); // Schedule the next notification
      }, delay);
    };

    if (settings.unpredictableNotifications) {
      scheduleNextNotification();
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [settings.unpredictableNotifications]);

  // Effect for DM notifications
  useEffect(() => {
    let timeoutId: number;

    const getRandomDelay = () => Math.random() * 10000 + 5000; // Random delay between 5-15 seconds

    const scheduleNextNotification = () => {
      if (!settings.dmNotifications) return;
      
      const delay = getRandomDelay();
      timeoutId = window.setTimeout(() => {
        setDmCount(prev => prev + 1);
        // Add a new box with position clustered towards top-right
        const boxId = `dm-${Date.now()}`;
        const position = {
          top: `${Math.random() * 30 + 5}%`, // 5% to 35% from top
          right: `${Math.random() * 20 + 5}%` // 5% to 25% from right
        };
        setBoxes(prev => [...prev, { id: boxId, position }]);
        scheduleNextNotification(); // Schedule the next notification
      }, delay);
    };

    if (settings.dmNotifications) {
      scheduleNextNotification();
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [settings.dmNotifications]);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  };

  const handleDMClick = () => {
    setShowDMDialog(true);
    setUnreadDMs(0);
  };

  const handleWelcome = () => {
    setShowWelcomeDialog(false);
  };

  const renderWelcomeDialog = () => {
    if (!showWelcomeDialog) return null;

    return createPortal(
      <DialogOverlay onClick={handleWelcome}>
        <DialogContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Instructions>
            <BoldText>Mission 3</BoldText>
            <br />
            <br />
            How can social media best serve you? Try your hand at making a platform that benefits you in the ways that you want but you still have control and intentionality over.
            <br />
            Click the "Test" button to see how your design works, in the context of dopamine and unpredictability.
          </Instructions>
          <GoButton onClick={handleWelcome}>
            Accept!
          </GoButton>
        </DialogContent>
      </DialogOverlay>,
      document.body
    );
  };

  const renderHomeContent = () => (
    <ContentContainer>
      {posts.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>No posts yet</EmptyStateTitle>
          <EmptyStateText>Select some categories in the onboarding screen to see content here.</EmptyStateText>
        </EmptyState>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id}>
            <PostHeader>
              <Username>{post.username}</Username>
            </PostHeader>
            <PostImage>
              <MysteryBox 
                size="small" 
                state={boxStates[`post-${post.id}`] || 'closed'}
                isSelected={isTestSelected}
              />
            </PostImage>
            <PostActions>
              <LikeButton onClick={() => toggleLike(post.id)}>
                {likedPosts.has(post.id) ? <IoHeart /> : <IoHeartOutline />}
              </LikeButton>
              <LikesCount>{post.likes.toLocaleString()} likes</LikesCount>
            </PostActions>
            <Comments>
              {post.comments.map((comment, index) => (
                <Comment key={index}>
                  <CommentUsername>{comment.username}</CommentUsername>
                  {comment.text}
                </Comment>
              ))}
              {renderComments(post.id)}
            </Comments>
            <TimeAgo>{post.timeAgo}</TimeAgo>
          </PostCard>
        ))
      )}
    </ContentContainer>
  );

  const renderVideosContent = () => (
    <ContentContainer>
      {videos.map((video) => (
        <VideoCard key={video.id}>
          <VideoPlaceholder />
          <VideoTitle>{video.title}</VideoTitle>
          <VideoDescription>{video.description}</VideoDescription>
        </VideoCard>
      ))}
    </ContentContainer>
  );

  const renderDMDialog = () => (
    <AnimatePresence>
      {showDMDialog && (
        <DMDialog
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <DMDialogHeader>
            <DMDialogTitle>Direct Messages</DMDialogTitle>
            <CloseButton onClick={() => setShowDMDialog(false)}>
              <IoCloseOutline />
            </CloseButton>
          </DMDialogHeader>
          <DMList>
            {dms.map((dm) => (
              <DMItem key={dm.id}>
                <DMAvatar />
                <DMContent>
                  <DMUsername>{dm.username}</DMUsername>
                  <DMLastMessage>{dm.lastMessage}</DMLastMessage>
                  <DMTime>{dm.time}</DMTime>
                </DMContent>
              </DMItem>
            ))}
          </DMList>
        </DMDialog>
      )}
    </AnimatePresence>
  );

  const renderBottomBoxes = () => {
    if (!settings.infiniteScroll || !settings.autoplay) {
      return null;
    }

    return (
      <BottomBoxesContainer>
        {[1, 2, 3].map((i) => (
          <MysteryBox
            key={`bottom-${i}`}
            size="small"
            state={boxStates[`bottom-${i}`] || 'closed'}
            isSelected={isTestSelected}
          />
        ))}
      </BottomBoxesContainer>
    );
  };

  const renderFloatingBoxes = () => {
    return boxes.map((box) => (
      <MysteryBox
        key={box.id}
        size="small"
        position={box.position}
        state={boxStates[box.id] || 'closed'}
        isSelected={isTestSelected}
      />
    ));
  };

  const renderComments = (postId: string) => {
    if (!settings.comments) return null;

    return (
      <ViewMoreComments>
        View more comments
        <MysteryBox 
          size="small" 
          state={boxStates[`comments-${postId}`] || 'closed'}
          isSelected={isTestSelected}
        />
      </ViewMoreComments>
    );
  };

  return (
    <ScreenContainer>
      {renderWelcomeDialog()}
      <SocialHeader
        hasNotifications={true}
        onNotificationsClick={() => {}}
        onDMClick={handleDMClick}
        unreadDMs={unreadDMs + dmCount}
        notificationCount={notificationCount}
        testButtonState={testButtonState}
        onTestButtonClick={handleTestButtonClick}
        guyImage={guyYay}
      />
      <PlatformDesignerNavigator 
        onTabChange={setActiveTab} 
        onSettingsChange={handleSettingsChange}
      />
      {activeTab === 'home' ? renderHomeContent() : renderVideosContent()}
      {renderDMDialog()}
      {renderBottomBoxes()}
      {renderFloatingBoxes()}
    </ScreenContainer>
  );
}; 