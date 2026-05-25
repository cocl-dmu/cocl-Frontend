import { useState } from 'react';
import styled from 'styled-components';
import { X, CheckCircle2 } from 'lucide-react';
import cutiesImg from '@/assets/cuties.png';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(false); 

  // Zustand 스토어에서 login 함수 가져오기
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    // 1. (나중에는 여기서 API 통신을 하겠죠?)
    // 2. 지금은 바로 성공 처리!
    login(); 
    
    // 3. 메인 페이지("/")로 이동
    navigate('/');
    
    alert('로그인 성공! 환영합니다 동그래.');
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton><X size={24} /></CloseButton>

        {/* --- 왼쪽 섹션 --- */}
        <Section $isLight={isLogin}>
          {isLogin ? (
            /* [로그인 모드] 왼쪽: 입력 폼 */
            <FormWrapper>
              <FormHeader>
                <h2>Welcome back</h2>
                <p>Login to your account</p>
              </FormHeader>
              <InputGroup>
                <Label>ID</Label>
                <StyledInput type="text" placeholder="아이디를 입력하세요" />
              </InputGroup>
              <InputGroup>
                <Label>Password</Label>
                <StyledInput type="password" placeholder="비밀번호를 입력하세요" />
              </InputGroup>
              <SubmitButton onClick={handleLogin}>Login</SubmitButton>
              <ForgotPassword>Forgot your password?</ForgotPassword>
            </FormWrapper>
          ) : (
            /* [회원가입 모드] 왼쪽: 이미지 안내 */
            <ContentWrapper>
              <Title>Join CodeCloud</Title>
              <Description>협업을 위해 계정을 만들어보세요!</Description>
              <Illustration src={cutiesImg} alt="cuties" />
              <SwitchText>
                Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
              </SwitchText>
            </ContentWrapper>
          )}
        </Section>

        {/* --- 오른쪽 섹션 --- */}
        <Section $isLight={!isLogin}>
          {isLogin ? (
            /* [로그인 모드] 오른쪽: 이미지 안내 */
            <ContentWrapper>
              <Illustration src={cutiesImg} alt="cuties" />
              <Title>New to CodeCloud?</Title>
              <Description>팀원들과 함께 실시간으로 코딩해보세요.</Description>
              <OutlineButton onClick={() => setIsLogin(false)}>Sign Up</OutlineButton>
            </ContentWrapper>
          ) : (
            /* [회원가입 모드] 오른쪽: 상세 입력 폼 */
            <FormWrapper>
              <FormHeader>
                <h2>Create your account</h2>
                <p>Sign up to get started</p>
              </FormHeader>

              <InputGroup>
                <Label>ID</Label>
                <InputWrapper>
                  <StyledInput type="text" />
                  <CheckCircle2 className="check-icon" size={18} />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <StyledInput type="password" />
              </InputGroup>

              <InputGroup>
                <Label>Confirm Password</Label>
                <StyledInput type="password" />
              </InputGroup>

              <InputGroup>
                <Label>Email</Label>
                <StyledInput type="email" />
              </InputGroup>

              <InputGroup>
                <Label>Name</Label>
                <StyledInput type="text" />
              </InputGroup>

              <CheckboxGroup>
                <label><input type="checkbox" /> Agree to Privacy Policy <span>*</span></label>
                <label><input type="checkbox" /> Marketing emails</label>
              </CheckboxGroup>

              <SubmitButton>Sign Up</SubmitButton>
            </FormWrapper>
          )}
        </Section>
      </ModalContainer>
    </Overlay>
  );
};

export default AuthModal;

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 900px;
  min-height: 600px;
  display: flex;
  border-radius: 32px; // 이미지의 핵심: 둥근 모서리
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  z-index: 10;
  &:hover { color: #64748b; }
`;

const Section = styled.div<{ $isLight: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background-color: ${props => (props.$isLight ? '#ffffff' : '#f8fafc')};
  transition: background-color 0.4s ease;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 14px;
  margin-bottom: 32px;
  line-height: 1.5;
`;

const Illustration = styled.img`
  width: 100%;
  max-width: 280px;
  margin-bottom: 24px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 320px;
`;

const FormHeader = styled.div`
  margin-bottom: 24px;
  h2 { font-size: 22px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
  p { font-size: 14px; color: #94a3b8; }
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 6px;
  margin-left: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  .check-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #22c55e;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #60a5fa; }
`;

const CheckboxGroup = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #64748b;
    cursor: pointer;
    span { color: #f87171; }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  background: #5f8cf5; // 이미지 속 버튼 색상
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #4b76e0; }
`;

const SwitchText = styled.p`
  margin-top: 24px;
  font-size: 13px;
  color: #94a3b8;
  span {
    color: #3b82f6;
    font-weight: 600;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;

const ForgotPassword = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #60a5fa;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const OutlineButton = styled.button`
  padding: 12px 40px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #475569;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;
;
