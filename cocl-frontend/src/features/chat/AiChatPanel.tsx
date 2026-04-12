import styled from 'styled-components';
import { Bot, X, Send, FileText, TriangleAlert, Wand2 } from 'lucide-react';

export default function AiChatPanel() {
  return (
    <Container>
      <Header>
        <TitleWrap>
          <BotBadge>
            <Bot size={16} />
          </BotBadge>
          <Title>AI Chat</Title>
        </TitleWrap>

        <CloseButton>
          <X size={18} />
        </CloseButton>
      </Header>

      <CurrentFile>현재 파일: main.py</CurrentFile>

      <ActionRow>
        <PrimaryAction>
          <FileText size={14} />
          코드 설명
        </PrimaryAction>

        <SecondaryAction>
          <TriangleAlert size={14} />
          오류 분석
        </SecondaryAction>

        <SecondaryAction>
          <Wand2 size={14} />
          리팩토링
        </SecondaryAction>
      </ActionRow>

      <MessageArea>
        <MessageCard>
          <MessageHeader>
            <BotBadgeSmall>
              <Bot size={14} />
            </BotBadgeSmall>
            <MessageTitle>이 코드는 "데이터 전처리 자동화 스크립트"입니다.</MessageTitle>
          </MessageHeader>

          <MessageBody>
            <SectionTitle>🔑 핵심 기능</SectionTitle>
            <BulletList>
              <li>dataset 압축 해제</li>
              <li>GPU 상태 확인</li>
              <li>전처리 실행</li>
              <li>결과 로그 출력</li>
            </BulletList>
          </MessageBody>
        </MessageCard>
      </MessageArea>

      <InputSection>
        <InputWrapper>
          <ChatInput placeholder="Type message..." />
          <SendButton>
            <Send size={18} />
          </SendButton>
        </InputWrapper>
      </InputSection>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 24px;
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BotBadge = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #eaf2ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BotBadgeSmall = styled(BotBadge)`
  width: 20px;
  height: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #4b5563;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

const CurrentFile = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #6b7280;
`;

const ActionRow = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

const BaseAction = styled.button`
  height: 34px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  color: #374151;
`;

const PrimaryAction = styled(BaseAction)`
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryAction = styled(BaseAction)`
  &:hover {
    background: #f9fafb;
  }
`;

const MessageArea = styled.div`
  margin-top: 14px;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 4px;
`;

const MessageCard = styled.div`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;
  padding: 12px;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const MessageTitle = styled.div`
  font-size: 13px;
  line-height: 1.45;
  color: #111827;
  font-weight: 500;
`;

const MessageBody = styled.div`
  margin-top: 12px;
  padding-left: 28px;
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 16px;
  color: #374151;
  font-size: 12px;
  line-height: 1.6;
`;

const InputSection = styled.div`
  margin-top: 12px;
`;

const InputWrapper = styled.div`
  height: 42px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 0 6px 0 12px;
  display: flex;
  align-items: center;
  background: #ffffff;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: #374151;

  &::placeholder {
    color: #9ca3af;
  }
`;

const SendButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;
  background: #3b82f6;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;
