import styled from 'styled-components';
import { Menu, Send } from 'lucide-react';

const ChatInput = () => {
  return (
    <InputSection>
      <InputWrapper>
        <MenuIcon><Menu size={20} /></MenuIcon>
        <StyledInput placeholder="무엇을 도와드릴까요?" />
        <SendIcon><Send size={20} /></SendIcon>
      </InputWrapper>
    </InputSection>
  );
};

const InputSection = styled.div`
  padding: 24px;
  background: white;
  border-top: 1px solid #f1f5f9;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 8px 16px;
  &:focus-within { border-color: #3b82f6; }
`;

const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px;
  outline: none;
  color: #334155;
`;

const MenuIcon = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
`;

const SendIcon = styled(MenuIcon)`
  &:hover { color: #2563eb; }
`;

export default ChatInput;