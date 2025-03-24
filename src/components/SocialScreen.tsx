import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { SocialHeader } from './SocialHeader';
import { SocialNavigation } from './SocialNavigation';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { filterContentByCategories } from '../data/contentDatabase';
import type { Post, Video } from '../data/contentDatabase';
import { IoHeartOutline, IoHeart, IoChatbubbleOutline, IoBookmarkOutline, IoPaperPlaneOutline, IoCloseOutline } from 'react-icons/io5';
import { ExploreDialog } from './ExploreDialog';

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 44px;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  height: calc(100% - 44px); // Subtract header height
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

const PostImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 8px;
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
  color: #262626;
`;

const LikesCount = styled.div`
  font-weight: 600;
  font-size: 14px;
  text-align: left;
`;

const Comments = styled.div`
  padding: 0 12px;
  text-align: left;
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
  text-align: left;
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background-color: #fafafa;
  padding: 1px;
  margin-top: 44px; // Add margin to account for navigation height
`;

const VideoThumbnail = styled.div`
  position: relative;
  aspect-ratio: 9/16;
`;

const VideoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 16px 8px 8px;
  font-size: 12px;
  line-height: 1.4;
`;

const DMOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DMHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DMTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #262626;
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const DMList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

const DMItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

const DMAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #f0f0f0;
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

const DMBadge = styled.div`
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

interface SocialScreenProps {
  onNext?: () => void;
  isVisible: boolean;
}

export const SocialScreen: React.FC<SocialScreenProps> = ({ onNext, isVisible }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'videos'>('home');
  const { selectedCategories } = useUserPreferences();
  const { posts, videos } = filterContentByCategories(selectedCategories);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isDMOpen, setIsDMOpen] = useState(false);
  const [unreadDMs, setUnreadDMs] = useState(3);
  const [showExploreDialog, setShowExploreDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDMs, setShowDMs] = useState(false);
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState('');
  const [commentingPost, setCommentingPost] = useState<string | null>(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dmRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const categoryDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      setShowExploreDialog(true);
    }
  }, [isVisible]);

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
    setIsDMOpen(true);
  };

  const handleCloseDM = () => {
    setIsDMOpen(false);
    setUnreadDMs(0);
  };

  const handleExplore = () => {
    setShowExploreDialog(false);
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
            <PostImage src={post.imageUrl} alt="" />
            <PostActions>
              <LikeButton onClick={() => toggleLike(post.id)}>
                {likedPosts.has(post.id) ? '❤️' : '🤍'}
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
            </Comments>
            <TimeAgo>{post.timeAgo}</TimeAgo>
          </PostCard>
        ))
      )}
    </ContentContainer>
  );

  const renderVideosContent = () => (
    <ContentContainer>
      {videos.length > 0 ? (
        <VideosGrid>
          {videos.map(video => (
            <VideoThumbnail key={video.id}>
              <VideoPreview src={video.thumbnail} alt={video.title} />
              <VideoTitle>{video.title}</VideoTitle>
            </VideoThumbnail>
          ))}
        </VideosGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No videos yet</EmptyStateTitle>
          <EmptyStateText>Select some categories to see videos in your feed</EmptyStateText>
        </EmptyState>
      )}
    </ContentContainer>
  );

  return (
    <ScreenContainer isVisible={isVisible}>
      {showExploreDialog && <ExploreDialog onExplore={handleExplore} />}
      <SocialHeader
        hasNotifications={true}
        onNotificationsClick={() => {}}
        onDMClick={() => setIsDMOpen(true)}
        unreadDMs={3}
        notificationCount={0}
        testButtonState="test"
        onTestButtonClick={() => {}}
        hideTestButton={true}
      />
      <SocialNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === 'home' ? renderHomeContent() : renderVideosContent()}
      {isDMOpen && (
        <DMOverlay>
          <DMHeader>
            <DMTitle>Messages</DMTitle>
            <CloseButton onClick={handleCloseDM}>
              <IoCloseOutline />
            </CloseButton>
          </DMHeader>
          <DMList>
            <DMItem>
              <DMAvatar />
              <DMContent>
                <DMUsername>travel_lover</DMUsername>
                <DMLastMessage>Hey! Loved your travel post about Paris! ✈️</DMLastMessage>
                <DMTime>2h ago</DMTime>
              </DMContent>
            </DMItem>
            <DMItem>
              <DMAvatar />
              <DMContent>
                <DMUsername>bookworm_123</DMUsername>
                <DMLastMessage>Have you read the latest thriller? It's amazing!</DMLastMessage>
                <DMTime>5h ago</DMTime>
              </DMContent>
            </DMItem>
            <DMItem>
              <DMAvatar />
              <DMContent>
                <DMUsername>sports_fan</DMUsername>
                <DMLastMessage>Great game yesterday! 🏀</DMLastMessage>
                <DMTime>1d ago</DMTime>
              </DMContent>
            </DMItem>
            <DMItem>
              <DMAvatar />
              <DMContent>
                <DMUsername>movie_buff</DMUsername>
                <DMLastMessage>That new action movie is incredible! 🎬</DMLastMessage>
                <DMTime>2d ago</DMTime>
              </DMContent>
            </DMItem>
          </DMList>
        </DMOverlay>
      )}
    </ScreenContainer>
  );
}; 