import { Bell, Settings, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../../store/useAuthStore';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <HeaderContainer>
      <LogoSection>
        <LogoIcon />
        <LogoText>CoCl AI</LogoText>
      </LogoSection>

      <IconSection>
        <IconButton>
          <Bell size={24} />
          <NotificationDot />
        </IconButton>
        <IconButton>
          <Settings size={24} />
        </IconButton>
        
        <ProfileContainer>
          <ProfileButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <ProfileImage />
            <UserName>{user?.name}</UserName>
          </ProfileButton>

          {isProfileOpen && (
            <ProfileMenu>
              <MenuItem>
                <User size={18} /> 마이페이지
              </MenuItem>
              <LogoutMenuItem onClick={logout}>
                <LogOut size={18} /> 로그아웃
              </LogoutMenuItem>
            </ProfileMenu>
          )}
        </ProfileContainer>
      </IconSection>
    </HeaderContainer>
  );
}

// --- Styled Components ---

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: #ffffff;
  border-bottom: 1px solid #cfe9f3;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3b82f6;
  border-radius: 8px;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #3b82f6;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 4px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f1f5f9;
  }
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background-color: #cbd5e1;
  border-radius: 50%;
  overflow: hidden;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #475569;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 192px;
  background-color: #ffffff;
  border: 1px solid #cfe9f3;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 50;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f1f5f9;
  }
`;

const LogoutMenuItem = styled(MenuItem)`
  color: #ef4444;
  
  &:hover {
    background-color: #fef2f2;
  }
`;