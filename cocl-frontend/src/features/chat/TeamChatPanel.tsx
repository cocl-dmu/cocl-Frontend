import styled from 'styled-components';
import { MessageSquare, MoreHorizontal, Send } from 'lucide-react';

const messages = [
  {
    id: 1,
    name: '띵딩이',
    color: '#f59e0b',
    text: 'Should we add path tracking?',
  },
  {
    id: 2,
    name: '찡딩이',
    color: '#22c55e',
    text: 'Great idea!',
  },
];

export default function TeamChatPanel() {
  return (
    <Container>
      <Header>
        <TitleWrap>
          <MessageSquare size={18} />
          <Title>Team Chat</Title>
        </TitleWrap>

        <MoreButton>
          <MoreHorizontal size={18} />
        </MoreButton>
      </Header>

      <MessageArea>
        <MessageCard>
          {messages.map((message) => (
            <MessageRow key={message.id}>
              <Name $color={message.color}>{message.name}</Name>
              <MessageText>{message.text}</MessageText>
            </MessageRow>
          ))}
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
  color: #111827;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
`;

const MoreButton = styled.button`
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

const MessageArea = styled.div`
  margin-top: 12px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
`;

const MessageCard = styled.div`
  min-height: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.45;
`;

const Name = styled.span<{ $color: string }>`
  font-weight: 700;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const MessageText = styled.span`
  color: #374151;
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