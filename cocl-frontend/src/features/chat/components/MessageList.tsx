import styled from 'styled-components';
import { Bot } from 'lucide-react';

const MessageList = () => {
  return (
    <ListContainer>
      {/* AI 메시지 예시 */}
      <MessageRow>
        <BotIcon><Bot size={20} /></BotIcon>
        <BubbleColumn>
          <AiBubble>안녕하세요! 무엇을 도와드릴까요?</AiBubble>
          <ButtonGroup>
            <PrimaryBtn>+ 방 만들기</PrimaryBtn>
            <SecondaryBtn>친구 초대</SecondaryBtn>
          </ButtonGroup>
        </BubbleColumn>
      </MessageRow>

      {/* 사용자 메시지 예시 */}
      <UserRow>
        <UserBubble>알고리즘 방 만들어줘</UserBubble>
      </UserRow>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MessageRow = styled.div`
  display: flex;
  gap: 12px;
`;

const BotIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BubbleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AiBubble = styled.div`
  background: #f8fafc;
  padding: 14px 20px;
  border-radius: 20px;
  border-top-left-radius: 4px;
  max-width: 400px;
  color: #334155;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserBubble = styled.div`
  background: #eff6ff;
  padding: 14px 20px;
  border-radius: 20px;
  border-top-right-radius: 4px;
  color: #1e40af;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const PrimaryBtn = styled.button`
  padding: 6px 14px;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  cursor: pointer;
`;

const SecondaryBtn = styled.button`
  padding: 6px 14px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  cursor: pointer;
`;

export default MessageList;