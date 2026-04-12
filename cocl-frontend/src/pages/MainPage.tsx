import styled from 'styled-components';
import Header from '@/components/layout/Header';
import ChatInput from '@/features/chat/components/ChatInput';
import MessageList from '@/features/chat/components/MessageList';
import Sidebar from '@/components/layout/MainSidebar';

const MainPage = () => {
  return (
    <PageContainer>
      {/* 1. 가장 왼쪽에 사이드바 배치 */}
      <Sidebar />

      {/* 2. 오른쪽에 헤더와 컨텐츠를 묶어서 배치 */}
      <MainWrapper>
        <Header />
        <ContentArea>
          <Title>AI Chat</Title>
          <ChatContainer>
            <MessageList />
            <ChatInput />
          </ChatContainer>
        </ContentArea>
      </MainWrapper>
    </PageContainer>
  );
};

export default MainPage;

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex; // 좌(사이드바) - 우(메인 내용) 가로 배치
  height: 100vh;
  width: 100vw;
  background-color: #f8fafc;
  overflow: hidden; // 전체 페이지 스크롤 방지
`;

const MainWrapper = styled.div`
  flex: 1; // 사이드바 제외 남은 가로 공간 모두 차지
  display: flex;
  flex-direction: column; // 위(헤더) - 아래(컨텐츠) 세로 배치
  height: 100%;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  width: 100%;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden; // 내부 요소(MessageList) 스크롤을 위해 설정
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

const ChatContainer = styled.div`
  flex: 1;
  width: 100%;
  background: white;
  border-radius: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;