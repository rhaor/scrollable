import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import arrowLeftImage from '../assets/arrow-left.jpg';
import arrowRightImage from '../assets/arrow-right.jpg';

interface Screen {
  number: number;
  title: string;
}

interface BottomNavProps {
  currentScreen: number;
  onNext: () => void;
  onPrev: () => void;
  screens: Screen[];
  showPrevButton?: boolean;
  showNextButton?: boolean;
  onScreenChange: (screen: number) => void;
}

interface ExpandableMenuProps {
  isExpanded: boolean;
}

interface MenuItemProps {
  isActive: boolean;
}

const NavContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 100;
`;

const NavButton = styled.button`
  padding: 8px 12px;
  border: 2px solid #E6E6E6;
  border-radius: 20px;
  background: white;
  color: #262626;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    border-color: #8A2BE2;
    background-color: #F5F0FF;
    color: #8A2BE2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

const ArrowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ScreenButton = styled.button`
  padding: 8px 12px;
  border: 2px solid #E6E6E6;
  border-radius: 20px;
  background: white;
  color: #262626;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 140px;
  max-width: 160px;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    border-color: #8A2BE2;
    background-color: #F5F0FF;
    color: #8A2BE2;
  }
`;

const ExpandableMenu = styled.div<ExpandableMenuProps>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 12px;
  width: 200px;
  opacity: ${(props: ExpandableMenuProps) => props.isExpanded ? 1 : 0};
  visibility: ${(props: ExpandableMenuProps) => props.isExpanded ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MenuItem = styled.button<MenuItemProps>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: ${(props: MenuItemProps) => props.isActive ? '#F5F0FF' : 'none'};
  color: ${(props: MenuItemProps) => props.isActive ? '#8A2BE2' : '#262626'};
  font-size: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #F5F0FF;
    color: #8A2BE2;
  }
`;

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNext,
  onPrev,
  screens,
  showPrevButton = true,
  showNextButton = true,
  onScreenChange
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentScreenInfo = screens.find(screen => screen.number === currentScreen);

  return (
    <NavContainer>
      {showPrevButton && (
        <NavButton onClick={onPrev}>
          back
        </NavButton>
      )}
      
      <div ref={menuRef}>
        <ScreenButton onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
          {currentScreen}. {currentScreenInfo?.title}
        </ScreenButton>

        <ExpandableMenu isExpanded={isMenuExpanded}>
          {screens.map(screen => (
            <MenuItem
              key={screen.number}
              isActive={screen.number === currentScreen}
              onClick={() => {
                setIsMenuExpanded(false);
                onScreenChange(screen.number);
              }}
            >
              {screen.number}. {screen.title}
            </MenuItem>
          ))}
        </ExpandableMenu>
      </div>

      {showNextButton && (
        <NavButton onClick={onNext}>
          next
        </NavButton>
      )}
    </NavContainer>
  );
}; 