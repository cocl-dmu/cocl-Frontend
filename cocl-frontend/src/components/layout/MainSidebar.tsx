import styled from 'styled-components';
import { User, Plus, Users, Play, FileText } from 'lucide-react';

const Sidebar = () => {
  return (
    <SidebarContainer>
      {/* 1. 상단 현재 방 정보 */}
      <RoomInfoSection>
        <AvatarCircle>
          <User size={24} color="#3b82f6" />
        </AvatarCircle>
        <RoomText>
          <RoomName>알고리즘 방</RoomName>
          <MemberCount><Users size={12} /> 8 ...</MemberCount>
        </RoomText>
      </RoomInfoSection>

      {/* 2. 주요 액션 버튼들 */}
      <ActionButtons>
        <PrimaryButton><Plus size={18} /> 방 만들기</PrimaryButton>
        <SecondaryButton><Plus size={18} /> 친구 초대</SecondaryButton>
        <SecondaryButton><Play size={18} /> 코드 실행</SecondaryButton>
      </ActionButtons>

      {/* 3. Rooms 리스트 */}
      <NavSection>
        <SectionTitle>Rooms</SectionTitle>
        <NavItem><FileText size={18} /> Algorithm System</NavItem>
        <NavItem><FileText size={18} /> Web Project</NavItem>
        <NavItem><FileText size={18} /> Data Structure</NavItem>
      </NavSection>

      {/* 4. History 리스트 */}
      <NavSection>
        <SectionTitle>History</SectionTitle>
        <HistoryItem>
          <HistoryCircle /> Algorithm System
        </HistoryItem>
        <HistoryItem>
          <HistoryCircle /> Web Project
        </HistoryItem>
      </NavSection>
    </SidebarContainer>
  );
};

export default Sidebar;

// --- Styled Components ---

const SidebarContainer = styled.aside`
  width: 260px;
  height: 100%;
  background-color: #f1f5ff; // 이미지 속 특유의 연한 블루 배경
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-right: 1px solid #e2e8f0;
`;

const RoomInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
`;

const AvatarCircle = styled.div`
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const RoomText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
`;

const MemberCount = styled.span`
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BaseButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  &:hover { background-color: #2563eb; }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #eef2ff;
  color: #6366f1;
  &:hover { background-color: #e0e7ff; }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 8px;
  padding-left: 8px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #64748b;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: #1e293b;
  }
`;

const HistoryItem = styled(NavItem)`
  font-size: 13px;
`;

const HistoryCircle = styled.div`
  width: 18px;
  height: 18px;
  background-color: #cbd5e1;
  border-radius: 50%;
`;
