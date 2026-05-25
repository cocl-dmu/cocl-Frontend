import { useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import styled, { keyframes } from 'styled-components';
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Clock3,
  Code2,
  Flag,
  FlaskConical,
  Folder,
  Heart,
  Lightbulb,
  Search,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  Settings,
  Sparkles,
} from 'lucide-react';
import catIdeaImg from '@/assets/characters/cat-idea.png';
import catNoImg from '@/assets/characters/cat-no.png';
import catImg from '@/assets/characters/cat.png';
import backgroundRunImg from '@/assets/characters/background-run.png';
import hamImg from '@/assets/characters/ham.png';
import lionImg from '@/assets/characters/lion.png';
import mouseImg from '@/assets/characters/mouse.png';
import rabbitImg from '@/assets/characters/rabbit.png';
import rabbitRun1Img from '@/assets/characters/rabbit-run-1.png';
import rabbitRun2Img from '@/assets/characters/rabbit-run-2.png';
import rabbitRun3Img from '@/assets/characters/rabbit-run-3.png';
import rabbitRun4Img from '@/assets/characters/rabbit-run-4.png';
import teamHappyImg from '@/assets/characters/team-happy.png';
import teamSadImg from '@/assets/characters/team-sad.png';
import whiteImg from '@/assets/characters/white.png';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarAlt: string;
  color: string;
  status: 'current' | 'done' | 'waiting';
};

type ProgressStep = {
  id: number;
  title: string;
  description: string;
  state: 'done' | 'active' | 'waiting';
};

type AiMasterStep = 'analysis' | 'feedback' | 'error';
type ResultModalState = 'success' | 'failure' | null;
type StartCountdownValue = 5 | 4 | 3 | 2 | 1 | 'START';

type MissionFile = {
  id: string;
  name: string;
  language: string;
  content: string;
};

const missionFiles: MissionFile[] = [
  {
    id: 'main.py',
    name: 'main.py',
    language: 'python',
    content: `def even_numbers(numbers):
    result = []
    for n in numbers:
        if n % 2 == 0:
            result.append(n)
    return result

# 실행 예시
data = [1, 2, 3, 4, 5, 6]
print(even_numbers(data))`,
  },
  {
    id: 'sub.py',
    name: 'sub.py',
    language: 'python',
    content: `def is_even(number):
    return number % 2 == 0


def format_result(numbers):
    return ", ".join(str(number) for number in numbers)`,
  },
];

const teamMembers: TeamMember[] = [
  {
    id: 'me',
    name: '나',
    role: '현재',
    avatar: whiteImg,
    avatarAlt: '흰 캐릭터',
    color: '#f8b8b8',
    status: 'current',
  },
  {
    id: 'hyun',
    name: '현',
    role: '',
    avatar: catImg,
    avatarAlt: '파란 리본 캐릭터',
    color: '#b9d9f3',
    status: 'done',
  },
  {
    id: 'junghwa',
    name: '정화',
    role: '',
    avatar: rabbitImg,
    avatarAlt: '토끼 캐릭터',
    color: '#f7de9d',
    status: 'waiting',
  },
  {
    id: 'sungmin',
    name: '성민',
    role: '',
    avatar: mouseImg,
    avatarAlt: '파란 귀 캐릭터',
    color: '#c7e8f7',
    status: 'waiting',
  },
  {
    id: 'sujin',
    name: '수현',
    role: '',
    avatar: lionImg,
    avatarAlt: '노란 캐릭터',
    color: '#f8dfb5',
    status: 'waiting',
  },
];

const progressSteps: ProgressStep[] = [
  {
    id: 1,
    title: '리스트 합계 계산',
    description: '사용자 입력에서 숫자 리스트를 읽어옵니다.',
    state: 'done',
  },
  {
    id: 2,
    title: '짝수만 모아 새 리스트 반환',
    description: '조건문으로 짝수 값을 판별합니다.',
    state: 'active',
  },
  {
    id: 3,
    title: '반환 출력',
    description: '완성된 리스트를 화면에 보여줍니다.',
    state: 'waiting',
  },
  {
    id: 4,
    title: '기능 확인',
    description: '다양한 입력으로 결과를 검증합니다.',
    state: 'waiting',
  },
];

const teamMessages = [
  {
    id: 1,
    name: '성민',
    time: '14:32',
    avatar: mouseImg,
    avatarAlt: '파란 귀 캐릭터',
    color: '#c7e8f7',
    text: '짝수만 따로 모으면 좋아질 것 같지!',
    mine: false,
  },
  {
    id: 2,
    name: '나',
    time: '14:33',
    avatar: whiteImg,
    avatarAlt: '흰 캐릭터',
    color: '#f8b8b8',
    text: '응 좋아. 바로 추가할게',
    mine: true,
  },
  {
    id: 3,
    name: '현',
    time: '14:34',
    avatar: catImg,
    avatarAlt: '파란 리본 캐릭터',
    color: '#b9d9f3',
    text: '그럼 다음은 출력하는 함수 만들면 되겠다',
    mine: false,
  },
  {
    id: 4,
    name: '정화',
    time: '14:34',
    avatar: rabbitImg,
    avatarAlt: '토끼 캐릭터',
    color: '#f7de9d',
    text: '좋게 가보자고!',
    mine: false,
  },
];

const currentTurnFileId = 'sub.py';

const aiMasterSteps: Array<{
  id: AiMasterStep;
  label: string;
}> = [
  { id: 'analysis', label: '코드 분석' },
  { id: 'feedback', label: '코드 피드백' },
  { id: 'error', label: '오류 피드백' },
];

const analysisSteps = [
  { id: 1, label: '코드 구조 분석', icon: Search, active: true },
  { id: 2, label: '로직 검증', icon: Code2, active: false },
  { id: 3, label: '테스트 실행', icon: FlaskConical, active: false },
  { id: 4, label: '결과 생성', icon: Sparkles, active: false },
];

const rabbitRunFrames = [
  rabbitRun1Img,
  rabbitRun2Img,
  rabbitRun3Img,
  rabbitRun4Img,
];

const currentUserId = 'me';
const currentTurnUserId = 'me';
const currentTurnId = 'turn-2';
const turnTimeLimitSeconds = 30;
const turnStartCodeByFile = Object.fromEntries(
  missionFiles.map((file) => [file.id, file.content]),
);

export default function RoomPage() {
  const [selectedFileId, setSelectedFileId] = useState(missionFiles[0].id);
  const [fileContents, setFileContents] = useState<Record<string, string>>(
    () => turnStartCodeByFile,
  );
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);
  const [startCountdown, setStartCountdown] =
    useState<StartCountdownValue>(3);
  const [aiMasterStep, setAiMasterStep] = useState<AiMasterStep>('analysis');
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [resultModal, setResultModal] = useState<ResultModalState>(null);
  const [isAiJudging, setIsAiJudging] = useState(false);
  const [turnDeadlineAt, setTurnDeadlineAt] = useState(
    () => Date.now() + turnTimeLimitSeconds * 1000,
  );
  const [remainingSeconds, setRemainingSeconds] = useState(
    turnTimeLimitSeconds,
  );
  const judgingTimerRef = useRef<number | null>(null);
  const startTimerRef = useRef<number | null>(null);
  const canFollowCurrentTurn = missionFiles.length > 1;
  const isMyTurn = currentTurnUserId === currentUserId;
  const isTurnExpired = remainingSeconds <= 0;
  const isTurnActionLocked =
    !isMyTurn || isAiJudging || isTurnExpired || isStartModalOpen;
  const isSuccessResult = resultModal === 'success';
  const timerText = `${String(Math.floor(remainingSeconds / 60)).padStart(2, '0')} : ${String(
    remainingSeconds % 60,
  ).padStart(2, '0')}`;
  const randomizedTurnOrder = useMemo(
    () => [...teamMembers].sort(() => Math.random() - 0.5),
    [],
  );
  const selectedFile = useMemo(
    () => {
      const file =
        missionFiles.find((missionFile) => missionFile.id === selectedFileId) ??
        missionFiles[0];

      return {
        ...file,
        content: fileContents[file.id] ?? file.content,
      };
    },
    [fileContents, selectedFileId],
  );

  useEffect(() => {
    return () => {
      if (judgingTimerRef.current !== null) {
        window.clearTimeout(judgingTimerRef.current);
      }

      if (startTimerRef.current !== null) {
        window.clearInterval(startTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isStartModalOpen) {
      return;
    }

    const sequence: StartCountdownValue[] = [5, 4, 3, 2, 1, 'START'];
    let sequenceIndex = 0;
    setStartCountdown(sequence[sequenceIndex]);

    startTimerRef.current = window.setInterval(() => {
      sequenceIndex += 1;

      if (sequenceIndex < sequence.length) {
        setStartCountdown(sequence[sequenceIndex]);
        return;
      }

      if (startTimerRef.current !== null) {
        window.clearInterval(startTimerRef.current);
        startTimerRef.current = null;
      }

      setIsStartModalOpen(false);
      setRemainingSeconds(turnTimeLimitSeconds);
      setTurnDeadlineAt(Date.now() + turnTimeLimitSeconds * 1000);
    }, 1000);

    return () => {
      if (startTimerRef.current !== null) {
        window.clearInterval(startTimerRef.current);
        startTimerRef.current = null;
      }
    };
  }, [isStartModalOpen]);

  useEffect(() => {
    setIsAiJudging(false);
    setRemainingSeconds(turnTimeLimitSeconds);
    setTurnDeadlineAt(Date.now() + turnTimeLimitSeconds * 1000);

    if (judgingTimerRef.current !== null) {
      window.clearTimeout(judgingTimerRef.current);
      judgingTimerRef.current = null;
    }
  }, [currentTurnId]);

  useEffect(() => {
    if (isStartModalOpen) {
      setRemainingSeconds(turnTimeLimitSeconds);
      return;
    }

    const updateRemainingTime = () => {
      const secondsLeft = Math.max(
        0,
        Math.ceil((turnDeadlineAt - Date.now()) / 1000),
      );

      setRemainingSeconds(secondsLeft);
    };

    updateRemainingTime();
    const timerId = window.setInterval(updateRemainingTime, 250);

    return () => window.clearInterval(timerId);
  }, [isStartModalOpen, turnDeadlineAt]);

  const handleSubmitTurn = () => {
    if (isTurnActionLocked) {
      return;
    }

    setAiMasterStep('analysis');
    setIsHintOpen(false);
    setIsAiJudging(true);

    if (judgingTimerRef.current !== null) {
      window.clearTimeout(judgingTimerRef.current);
    }

    judgingTimerRef.current = window.setTimeout(() => {
      setIsAiJudging(false);
      setResultModal('success');
      judgingTimerRef.current = null;
    }, 2600);
  };

  return (
    <PageShell>
      <TopBar>
        <BrandArea aria-label="네코네코 홈">
          <BrandText>네코네코</BrandText>
          <BrandLeaf>☘</BrandLeaf>
        </BrandArea>

        <TopStatusArea>
          <TimerPill aria-label={`남은 시간 ${remainingSeconds}초`}>
            <Clock3 size={18} />
            <span>남은 시간</span>
            <strong>{timerText}</strong>
          </TimerPill>

          <LifePill aria-label="팀 목숨 2개 남음">
            <span>팀 목숨</span>
            <Heart size={24} fill="#ff7b6e" />
            <Heart size={24} fill="#ff7b6e" />
            <Heart size={24} />
          </LifePill>

          <LanguagePill>
            <span>🐍</span>
            Python
          </LanguagePill>
        </TopStatusArea>

        <HeaderRightArea>
          <TeamArea>
            <TeamTitle>Team Chikawa</TeamTitle>
            <HeaderAvatars>
              {teamMembers.map((member) => (
                <AvatarCircle
                  key={member.id}
                  $color={member.color}
                  title={member.name}
                >
                  <AvatarImage src={member.avatar} alt={member.avatarAlt} />
                </AvatarCircle>
              ))}
            </HeaderAvatars>
          </TeamArea>

          <IconButton aria-label="설정">
            <Settings size={22} />
          </IconButton>
        </HeaderRightArea>
      </TopBar>

      <GameLayout>
        <LeftRail>
          <MissionPanel>
            <PanelTitle>
              <Flag size={24} fill="#558b45" />
              미션
            </PanelTitle>
            <MissionText>
              짝수를 모아 리스트를
              <br />
              반환하는 함수를 작성하세요.
            </MissionText>
            <MissionMascot
              src={hamImg}
              alt="미션을 안내하는 흰 캐릭터"
            />
          </MissionPanel>

          <CardPanel>
            <SmallHeading>파일</SmallHeading>
            <FileList>
              {missionFiles.map((file) => (
                <FileButton
                  key={file.id}
                  $active={file.id === selectedFileId}
                  onClick={() => setSelectedFileId(file.id)}
                >
                  <Folder size={15} />
                  {file.name}
                </FileButton>
              ))}
            </FileList>
          </CardPanel>

          <TeamCardPanel>
            <TeamPanelHeader>
              <SmallHeading>팀원</SmallHeading>
              <FollowButton
                type="button"
                disabled={!canFollowCurrentTurn}
                onClick={() => {
                  if (canFollowCurrentTurn) {
                    setSelectedFileId(currentTurnFileId);
                  }
                }}
                title={
                  canFollowCurrentTurn
                    ? '현재 턴 사용자가 수정 중인 파일로 이동'
                    : '파일이 하나일 때는 따라가기가 필요하지 않습니다'
                }
              >
                따라가기
              </FollowButton>
            </TeamPanelHeader>

            <MemberList $count={teamMembers.length}>
              {teamMembers.map((member) => (
                <MemberRow
                  key={member.id}
                  $current={member.status === 'current'}
                >
                  <AvatarCircle $color={member.color}>
                    <AvatarImage src={member.avatar} alt={member.avatarAlt} />
                  </AvatarCircle>
                  <MemberName>
                    {member.name}
                    {member.role ? ` (${member.role})` : ''}
                  </MemberName>
                  {member.status === 'current' ? <TurnBadge>현재 턴</TurnBadge> : null}
                </MemberRow>
              ))}
            </MemberList>
          </TeamCardPanel>
        </LeftRail>

        <MainColumn>
          <EditorCard>
            <EditorTab>{selectedFile.name}</EditorTab>
            <EditorFrame>
              <Editor
                height="100%"
                language={selectedFile.language}
                value={selectedFile.content}
                theme="vs-light"
                onChange={(value) => {
                  if (isTurnActionLocked) {
                    return;
                  }

                  setFileContents((currentContents) => ({
                    ...currentContents,
                    [selectedFile.id]: value ?? '',
                  }));
                }}
                options={{
                  readOnly: isTurnActionLocked,
                  fontSize: 18,
                  lineHeight: 32,
                  fontFamily: "'Fira Code', Consolas, monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  overviewRulerBorder: false,
                  hideCursorInOverviewRuler: true,
                  glyphMargin: false,
                  folding: false,
                  lineNumbersMinChars: 3,
                  padding: { top: 18, bottom: 18 },
                  renderLineHighlight: 'line',
                }}
              />
            </EditorFrame>
            <EditorFooter>
              <PrimaryButton
                type="button"
                disabled={isTurnActionLocked}
                $active={isMyTurn && !isAiJudging}
                onClick={handleSubmitTurn}
              >
                <Play size={18} fill="currentColor" />
                {isAiJudging ? '분석 중' : '제출 하기'}
              </PrimaryButton>
              <GhostButton
                type="button"
                disabled={isTurnActionLocked}
                onClick={() => {
                  if (isTurnActionLocked) {
                    return;
                  }

                  setFileContents(turnStartCodeByFile);
                }}
              >
                <RotateCcw size={17} />
                초기화
              </GhostButton>
            </EditorFooter>
          </EditorCard>

          <ProgressCard>
            <ProgressTitle>미션 진행도</ProgressTitle>
            <ProgressSteps>
              {progressSteps.map((step) => (
                <StepCard key={step.id} $state={step.state}>
                  <StepNumber $state={step.state}>{step.id}</StepNumber>
                  <StepIcon>
                    {step.state === 'done' ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
                  </StepIcon>
                  <StepTitle>{step.title}</StepTitle>
                  <StepText>{step.description}</StepText>
                  <StepStatus>
                    {step.state === 'done'
                      ? '완료'
                      : step.state === 'active'
                        ? '진행 중'
                        : '대기 중'}
                  </StepStatus>
                </StepCard>
              ))}
            </ProgressSteps>
          </ProgressCard>
        </MainColumn>

        <RightRail>
          <AiMasterCard>
            <AssistantHeader>
              <AssistantIcon>
                <Bot size={21} />
              </AssistantIcon>
              <AssistantTitle>AI 마스터</AssistantTitle>
            </AssistantHeader>

            <AssistantBody>
              <AiStepNav aria-label="AI 마스터 상태">
                {aiMasterSteps.map((step) => (
                  <AiStepButton
                    key={step.id}
                    type="button"
                    $active={aiMasterStep === step.id}
                    onClick={() => {
                      setAiMasterStep(step.id);
                      setIsHintOpen(false);
                    }}
                  >
                    {step.label}
                  </AiStepButton>
                ))}
              </AiStepNav>

              <AssistantContentArea>
                {aiMasterStep === 'analysis' ? (
                  <AnalysisView>
                    <AssistantStatusText>
                      AI 마스터가 <strong>코드를 분석</strong>하고 있어요!
                    </AssistantStatusText>
                    <AssistantSubcopy>
                      잠시만 기다려주세요. 약 5~10초 소요
                    </AssistantSubcopy>
                    <AnalysisSteps>
                      {analysisSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                          <AnalysisStep key={step.id} $active={step.active}>
                            <StepCircle $active={step.active}>
                              <Icon size={24} />
                            </StepCircle>
                            {index < analysisSteps.length - 1 ? <StepConnector /> : null}
                            <StepLabel $active={step.active}>
                              <StepIndex $active={step.active}>{step.id}</StepIndex>
                              {step.label}
                            </StepLabel>
                          </AnalysisStep>
                        );
                      })}
                    </AnalysisSteps>
                    <AnalysisTrack>
                      <Runner aria-label="달리는 토끼 캐릭터">
                        {rabbitRunFrames.map((frame, index) => (
                          <RunnerFrame
                            key={frame}
                            src={frame}
                            alt=""
                            $index={index}
                          />
                        ))}
                      </Runner>
                    </AnalysisTrack>
                    <AssistantNotice>
                      {isAiJudging
                        ? '제출한 코드를 분석하고 있어요...'
                        : '코드 구조를 분석하고 있어요...'}
                    </AssistantNotice>
                  </AnalysisView>
                ) : null}

                {aiMasterStep === 'feedback' ? (
                  <FeedbackView>
                    <FloatingMascot src={catIdeaImg} alt="힌트를 든 캐릭터" />
                    <FeedbackCard>
                      <FeedbackTitle>코드를 분석했어요!</FeedbackTitle>
                      <FeedbackText>
                        짝수 판별 조건(if n % 2 == 0)이 올바르게 작성되었어요.
                        이제 짝수를 result 리스트에 추가하는 흐름을 이어가보세요.
                      </FeedbackText>
                    </FeedbackCard>
                    <InlineHintPanel $open={isHintOpen}>
                      <HintHeading>
                        <Lightbulb size={20} />
                        힌트 보기
                      </HintHeading>
                      <HintText>
                        리스트 컴프리헨션을 사용하면 더 간결하게 작성할 수 있어요!
                      </HintText>
                    </InlineHintPanel>
                  </FeedbackView>
                ) : null}

                {aiMasterStep === 'error' ? (
                  <FeedbackView>
                    <FloatingMascot src={catNoImg} alt="오류를 알려주는 캐릭터" />
                    <ErrorCard>
                      <ErrorTitle>
                        <AlertCircle size={22} />
                        코드에 문제가 있어요!
                      </ErrorTitle>
                      <FeedbackText>
                        짝수만 필터링해야 하는데, 현재 코드는 모든 숫자를 그대로
                        반환하고 있어요. 미션 조건을 만족하지 못했습니다.
                      </FeedbackText>
                      <ErrorDivider />
                      <FixTitle>
                        <Lightbulb size={20} />
                        수정 방향
                      </FixTitle>
                      <FeedbackText>
                        if n % 2 == 0 조건을 사용해서 짝수만 result 리스트에
                        추가해보세요!
                      </FeedbackText>
                      <InlineHintPanel $open={isHintOpen}>
                        <HintHeading>
                          <Lightbulb size={20} />
                          힌트 보기
                        </HintHeading>
                        <HintText>
                          append를 호출하기 전에 짝수인지 확인하는 조건문을 먼저
                          통과시켜보세요.
                        </HintText>
                      </InlineHintPanel>
                    </ErrorCard>
                  </FeedbackView>
                ) : null}
              </AssistantContentArea>

              {aiMasterStep !== 'analysis' ? (
                <AssistantFooter>
                  <HintButton
                    type="button"
                    onClick={() => setIsHintOpen((open) => !open)}
                    $open={isHintOpen}
                  >
                    <Lightbulb size={22} />
                    {isHintOpen ? '힌트 닫기' : '힌트 보기'}
                  </HintButton>
                </AssistantFooter>
              ) : null}
            </AssistantBody>
          </AiMasterCard>

          <TeamChatCard>
            <ChatHeader>
              <TitleWithIcon>
                팀 채팅
                <MessageSquare size={18} />
              </TitleWithIcon>
            </ChatHeader>

            <Messages>
              {teamMessages.map((message) => (
                <ChatMessage key={message.id} $mine={message.mine}>
                  {!message.mine ? (
                    <AvatarCircle $color={message.color}>
                      <AvatarImage src={message.avatar} alt={message.avatarAlt} />
                    </AvatarCircle>
                  ) : null}
                  <MessageContent $mine={message.mine}>
                    <MessageMeta>
                      <strong>{message.name}</strong>
                      <span>{message.time}</span>
                    </MessageMeta>
                    <Bubble $mine={message.mine}>{message.text}</Bubble>
                  </MessageContent>
                  {message.mine ? (
                    <AvatarCircle $color={message.color}>
                      <AvatarImage src={message.avatar} alt={message.avatarAlt} />
                    </AvatarCircle>
                  ) : null}
                </ChatMessage>
              ))}
            </Messages>

            <ChatInputRow>
              <ChatInput placeholder="메시지를 입력하세요..." aria-label="팀 채팅 메시지" />
              <SmileButton type="button" aria-label="이모지 선택">
                :)
              </SmileButton>
              <SendButton type="button" aria-label="메시지 전송">
                <Send size={20} fill="currentColor" />
              </SendButton>
            </ChatInputRow>
          </TeamChatCard>
        </RightRail>
      </GameLayout>

      {resultModal ? (
        <ResultOverlay role="dialog" aria-modal="true">
          <ResultModalCard $result={resultModal}>
            <ResultKicker>
              {isSuccessResult ? '축하드립니다!' : '아쉽지만...'}
            </ResultKicker>
            <ResultTitle $result={resultModal}>
              {isSuccessResult ? '성공하셨습니다!' : '실패하셨습니다!'}
            </ResultTitle>
            <ResultCharacters
              src={isSuccessResult ? teamHappyImg : teamSadImg}
              alt={isSuccessResult ? '성공한 팀 캐릭터' : '실패한 팀 캐릭터'}
            />
            <ResultMessage>
              {isSuccessResult
                ? '모든 코드를 잘 작성했어요!'
                : '팀 목숨을 모두 사용했어요.'}
            </ResultMessage>

            {isSuccessResult ? (
              <ExecutionBlock>
                <ExecutionTitle>실행 결과</ExecutionTitle>
                <ExecutionOutput>[2, 4, 6]</ExecutionOutput>
              </ExecutionBlock>
            ) : null}

            <ResultAction
              type="button"
              $result={resultModal}
              onClick={() => setResultModal(null)}
            >
              게임 종료
            </ResultAction>
          </ResultModalCard>
        </ResultOverlay>
      ) : null}

      {isStartModalOpen ? (
        <GameStartOverlay role="dialog" aria-modal="true">
          <GameStartModal>
            <ConfettiDot $top="22px" $left="92px" $color="#f6c763" />
            <ConfettiDot $top="34px" $left="360px" $color="#d78bd7" />
            <ConfettiDot $top="80px" $right="70px" $color="#74b96b" />
            <StartTitle>게임 시작 준비!</StartTitle>
            <StartSubcopy>잠시후 게임이 시작됩니다</StartSubcopy>

            <StartMissionCard>
              <StartSectionHeader>
                <Flag size={22} />
                미션
              </StartSectionHeader>
              <StartMissionText>
                짝수만 모아 반환하는 리스트 함수를 작성하세요
              </StartMissionText>
              <StartMascot src={hamImg} alt="미션을 안내하는 캐릭터" />
            </StartMissionCard>

            <TurnOrderCard>
              <StartSectionHeader>
                <UsersIcon aria-hidden="true">♧</UsersIcon>
                턴 순서
              </StartSectionHeader>
              <TurnOrderList>
                {randomizedTurnOrder.map((member, index) => (
                  <TurnOrderItem key={member.id}>
                    <TurnOrderAvatar $color={member.color}>
                      <AvatarImage src={member.avatar} alt={member.avatarAlt} />
                    </TurnOrderAvatar>
                    <TurnOrderNumber>{index + 1}</TurnOrderNumber>
                    <TurnOrderName>
                      {member.name}
                      {member.role ? ` (${member.role})` : ''}
                    </TurnOrderName>
                  </TurnOrderItem>
                ))}
              </TurnOrderList>
            </TurnOrderCard>

            <CountdownStage>
              <SparkleDot $top="36px" $left="74px" $color="#8da9de" />
              <SparkleDot $top="68px" $left="42px" $color="#f3bb43" />
              <SparkleDot $top="42px" $right="68px" $color="#79bc76" />
              <CountdownCircle $start={startCountdown === 'START'}>
                {startCountdown !== 'START' ? (
                  <CountdownGauge viewBox="0 0 128 128" aria-hidden="true">
                    <CountdownGaugeTrack cx="64" cy="64" r="54" />
                    <CountdownGaugeProgress
                      key={startCountdown}
                      cx="64"
                      cy="64"
                      r="54"
                    />
                  </CountdownGauge>
                ) : null}
                <span>
                  {startCountdown === 'START' ? 'START!' : startCountdown}
                </span>
              </CountdownCircle>
            </CountdownStage>

            <CountdownHelp>
              카운트다운이 끝나면 게임이 자동으로 시작됩니다!
            </CountdownHelp>
          </GameStartModal>
        </GameStartOverlay>
      ) : null}
    </PageShell>
  );
}

const PageShell = styled.div`
  position: relative;
  height: 100vh;
  background: #f8f9f5;
  color: #273326;
  overflow: hidden;

  @media (max-width: 1180px) {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
`;

const TopBar = styled.header`
  height: 78px;
  padding: 14px 28px 10px;
  display: grid;
  grid-template-columns: 280px minmax(500px, 1fr) 540px;
  align-items: center;
  column-gap: 24px;

  @media (max-width: 1180px) {
    height: auto;
    padding: 18px 20px;
    grid-template-columns: 1fr auto;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    justify-items: start;
  }
`;

const BrandArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const BrandText = styled.div`
  color: #80ba55;
  font-size: 35px;
  font-weight: 900;
  letter-spacing: 0;
  text-shadow:
    -1px -1px 0 #437e36,
    1px -1px 0 #437e36,
    -1px 1px 0 #437e36,
    1px 1px 0 #437e36;
`;

const BrandLeaf = styled.span`
  color: #6aa848;
  font-size: 24px;
`;

const TopStatusArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1180px) {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

const Pill = styled.div`
  height: 48px;
  border: 1px solid #d9e2d6;
  border-radius: 8px;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #53604e;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
`;

const TimerPill = styled(Pill)`
  padding: 0 18px;

  strong {
    color: #5b8b38;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

const LifePill = styled(Pill)`
  padding: 0 18px;
  color: #1f2a1e;

  svg {
    color: #ff7b6e;
    stroke-width: 1.8;
  }
`;

const LanguagePill = styled(Pill)`
  padding: 0 16px;
  gap: 8px;
  color: #1f2a1e;
`;

const HeaderRightArea = styled.div`
  width: 100%;
  justify-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-width: 0;

  @media (max-width: 1180px) {
    grid-column: 1;
    grid-row: 3;
    justify-self: start;
  }
`;

const TeamArea = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

const TeamTitle = styled.div`
  color: #1e281d;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
`;

const HeaderAvatars = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 46px;
  align-items: center;
  justify-content: start;
  gap: 12px;
  max-width: 310px;
  overflow: hidden;
`;

const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid #d9e2d6;
  border-radius: 999px;
  background: #ffffff;
  color: #9aa69a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f1f6ee;
    color: #668f51;
  }
`;

const GameLayout = styled.main`
  height: calc(100vh - 78px);
  min-height: 700px;
  padding: 0 28px 18px;
  display: grid;
  grid-template-columns: 280px minmax(500px, 1fr) 540px;
  gap: 24px;

  @media (max-width: 1180px) {
    height: auto;
    min-height: 0;
    padding: 0 20px 24px;
    grid-template-columns: minmax(0, 1fr);
  }
`;

const LeftRail = styled.aside`
  display: grid;
  grid-template-rows: 250px 160px minmax(390px, 1fr);
  gap: 18px;
  min-height: 0;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: auto;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.section`
  display: grid;
  grid-template-rows: minmax(0, 1fr) 270px;
  gap: 14px;
  min-width: 0;
  min-height: 0;

  @media (max-width: 1180px) {
    grid-template-rows: 580px auto;
  }
`;

const RightRail = styled.aside`
  display: grid;
  grid-template-rows: minmax(410px, 1.35fr) minmax(270px, 0.8fr);
  gap: 18px;
  min-height: 0;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 360px 360px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: 340px 360px;
  }
`;

const PanelBase = styled.section`
  border: 1px solid #dce5d7;
  border-radius: 8px;
  background: #ffffff;
  min-width: 0;
`;

const MissionPanel = styled(PanelBase)`
  position: relative;
  padding: 28px 24px;
  overflow: visible;
`;

const PanelTitle = styled.h2`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #26351f;
  font-size: 20px;
  font-weight: 900;
`;

const MissionText = styled.p`
  margin: 44px 0 0;
  color: #1f2f1e;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.8;
`;

const MissionMascot = styled.img`
  position: absolute;
  right: -34px;
  bottom: -30px;
  width: 140px;
  height: 140px;
  object-fit: contain;
  z-index: 1;
`;

const CardPanel = styled(PanelBase)`
  padding: 20px 18px;
`;

const TeamCardPanel = styled(CardPanel)`
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const SmallHeading = styled.h3`
  margin: 0;
  color: #2d3c29;
  font-size: 18px;
  font-weight: 900;
`;

const FileList = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 7px;
  max-height: 128px;
  overflow-y: auto;
  padding-right: 2px;
`;

const FileButton = styled.button<{ $active: boolean }>`
  min-height: 36px;
  padding: 0 13px;
  border: 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 9px;
  background: ${({ $active }) => ($active ? '#668342' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#283224')};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ $active }) => ($active ? '#668342' : '#f2f7ee')};
  }
`;

const TeamPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FollowButton = styled.button`
  min-width: 96px;
  height: 34px;
  padding: 0 18px;
  border: 0;
  border-radius: 9px;
  background: #91ba76;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #7faa63;
  }

  &:disabled {
    background: #dce6d5;
    color: #8b9a83;
    cursor: default;
  }
`;

const MemberList = styled.div<{ $count: number }>`
  flex: 1;
  min-height: 0;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $count }) =>
    $count >= 5 ? 'space-between' : 'flex-start'};
  gap: ${({ $count }) => ($count >= 5 ? '0' : $count <= 3 ? '22px' : '14px')};
  overflow: hidden;
  padding: 2px 0 4px;
`;

const MemberRow = styled.div<{ $current: boolean }>`
  height: 44px;
  padding: 0 10px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 0;
  background: ${({ $current }) => ($current ? '#f4faef' : 'transparent')};
`;

const MemberName = styled.div`
  color: #1d2a1b;
  font-size: 13px;
  font-weight: 800;
  flex: 1;
  min-width: 0;
`;

const TurnBadge = styled.span`
  height: 19px;
  padding: 0 8px;
  border-radius: 999px;
  background: #668342;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 900;
`;

const AvatarCircle = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 2px solid #2b2d27;
  background: ${({ $color }) => $color};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditorCard = styled(PanelBase)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const EditorTab = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  height: 43px;
  min-width: 108px;
  padding: 0 24px;
  border: 1px solid #dfe6db;
  border-bottom-color: #ffffff;
  border-radius: 2px 2px 0 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  color: #4e7444;
  font-size: 16px;
  font-weight: 800;
`;

const EditorFrame = styled.div`
  flex: 1;
  min-height: 0;
  padding-top: 57px;
  border-bottom: 1px solid #e1e8dc;

  .monaco-editor .current-line {
    background: #f4f8ed;
  }
`;

const EditorFooter = styled.div`
  height: 58px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PrimaryButton = styled.button<{ $active: boolean }>`
  height: 38px;
  padding: 0 19px;
  border: 0;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? '#5d963f' : '#a8aaa6')};
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? '#4f8735' : '#878b83')};
  }

  &:disabled {
    cursor: default;
    opacity: 1;
  }
`;

const GhostButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: 1px solid #d9e1d5;
  border-radius: 7px;
  background: #ffffff;
  color: #51604c;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #f4f8ef;
  }

  &:disabled {
    color: #a5aca1;
    background: #f7f8f5;
    cursor: default;
  }
`;

const ProgressCard = styled(PanelBase)`
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ProgressTitle = styled.h3`
  margin: 0;
  color: #25311f;
  font-size: 18px;
  font-weight: 900;
`;

const ProgressSteps = styled.div`
  margin-top: 20px;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(110px, 1fr));
  gap: 18px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StepCard = styled.article<{ $state: ProgressStep['state'] }>`
  position: relative;
  min-height: 0;
  height: 100%;
  padding: 34px 16px 18px;
  border: 1px solid
    ${({ $state }) => ($state === 'active' ? '#9ac67a' : '#e2e8dc')};
  border-radius: 4px;
  background: ${({ $state }) => ($state === 'active' ? '#f3faee' : '#ffffff')};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.span<{ $state: ProgressStep['state'] }>`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: ${({ $state }) => ($state === 'waiting' ? '#98a19a' : '#79b55a')};
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 900;
`;

const StepIcon = styled.div`
  color: #7aa55e;
  display: flex;
  justify-content: center;
`;

const StepTitle = styled.div`
  margin-top: 6px;
  color: #263322;
  font-size: 14px;
  font-weight: 900;
`;

const StepText = styled.p`
  margin: 5px 0 0;
  color: #768173;
  font-size: 11px;
  line-height: 1.45;
  flex: 1;
  display: flex;
  align-items: center;
`;

const StepStatus = styled.div`
  margin: 7px auto 0;
  width: fit-content;
  min-width: 42px;
  height: 17px;
  padding: 0 8px;
  border-radius: 999px;
  background: #eef4ea;
  color: #678559;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
`;

const AiMasterCard = styled(PanelBase)`
  padding: 28px 30px 24px;
  min-height: 0;
`;

const AssistantHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AssistantIcon = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 9px;
  background: #e6ece3;
  color: #6f7a70;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const AssistantTitle = styled.h3`
  margin: 0;
  color: #273326;
  font-size: 17px;
  font-weight: 900;
`;

const AssistantBody = styled.div`
  height: calc(100% - 45px);
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 22px;
`;

const AiStepNav = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  flex-shrink: 0;
`;

const AiStepButton = styled.button<{ $active: boolean }>`
  height: 34px;
  border: 1px solid ${({ $active }) => ($active ? '#94bf78' : '#e0e8db')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#f1faeb' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#5f9744' : '#8b9687')};
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    border-color: #94bf78;
    color: #5f9744;
  }
`;

const AssistantContentArea = styled.div`
  flex: 1;
  min-height: 0;
  margin-top: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 4px 2px;
  scrollbar-width: thin;
  scrollbar-color: #cbd8c3 transparent;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: #cbd8c3;
  }
`;

const AssistantFooter = styled.div`
  flex-shrink: 0;
  min-height: 62px;
  padding-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background: #ffffff;
`;

const AnalysisView = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AssistantStatusText = styled.div`
  color: #303a2e;
  font-size: 15px;
  font-weight: 900;

  strong {
    color: #65ad50;
  }
`;

const AssistantSubcopy = styled.div`
  margin-top: 6px;
  color: #9a9f97;
  font-size: 11px;
  font-weight: 700;
`;

const AnalysisSteps = styled.div`
  width: 100%;
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: start;
`;

const AnalysisTrack = styled.div`
  width: 100%;
  margin-top: 18px;
  height: 178px;
  border: 1px solid #efe4ce;
  border-radius: 12px;
  background:
    url(${backgroundRunImg}) center / cover no-repeat,
    #fffaf0;
  position: relative;
  overflow: hidden;
`;

const StepCircle = styled.div<{ $active: boolean }>`
  width: 58px;
  height: 58px;
  margin: 0 auto;
  border-radius: 999px;
  border: 2px solid ${({ $active }) => ($active ? '#b9dda7' : '#e1e6e8')};
  background: #ffffff;
  color: ${({ $active }) => ($active ? '#4d8d45' : '#9aa1a6')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $active }) =>
    $active ? '0 8px 20px rgba(109, 173, 85, 0.16)' : 'none'};
`;

const AnalysisStep = styled.div<{ $active: boolean }>`
  position: relative;
  min-width: 0;
  text-align: center;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 29px;
  left: calc(50% + 36px);
  width: calc(100% - 72px);
  border-top: 3px dotted #d3d8d7;
`;

const StepLabel = styled.div<{ $active: boolean }>`
  margin-top: 10px;
  color: ${({ $active }) => ($active ? '#4c9850' : '#6f767b')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 900;
`;

const StepIndex = styled.span<{ $active: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#199653' : '#697178')};
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 900;
`;

const runAcross = keyframes`
  0% {
    left: 16px;
  }
  100% {
    left: calc(100% - 190px);
  }
`;

const frameFade = keyframes`
  0%, 20% {
    opacity: 1;
  }
  25%, 100% {
    opacity: 0;
  }
`;

const countdownSweep = keyframes`
  from {
    stroke-dashoffset: 339.292;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const Runner = styled.div`
  position: absolute;
  left: 16px;
  top: 26px;
  width: 178px;
  height: 178px;
  z-index: 2;
  animation: ${runAcross} 5.6s linear infinite;
`;

const RunnerFrame = styled.img<{ $index: number }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scale(1.45);
  opacity: 0;
  animation: ${frameFade} 0.56s steps(1, end) infinite;
  animation-delay: ${({ $index }) => `${$index * 0.14}s`};
`;

const AssistantNotice = styled.div`
  width: 100%;
  height: 36px;
  margin-top: 16px;
  border: 1px solid #e1e8dc;
  border-radius: 5px;
  background: #f8fbf4;
  color: #7b9d65;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 900;
`;

const FeedbackView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 42px 18px 10px;
`;

const FloatingMascot = styled.img`
  position: absolute;
  top: -4px;
  right: 46px;
  width: 92px;
  height: 76px;
  object-fit: contain;
  z-index: 0;
`;

const FeedbackCard = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
  background: #ffffff;
  padding: 28px 34px;
  min-height: 118px;
`;

const FeedbackTitle = styled.h4`
  margin: 0 0 10px;
  color: #172014;
  font-size: 15px;
  font-weight: 900;
`;

const FeedbackText = styled.p`
  margin: 0;
  color: #172014;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.7;
  white-space: pre-line;
`;

const ErrorCard = styled(FeedbackCard)`
  border-color: #ffcfcf;
  background: #fff7f7;
  padding: 24px 32px 26px;
  min-height: 0;
  overflow: hidden;
`;

const ErrorTitle = styled.h4`
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #ed5757;
  font-size: 15px;
  font-weight: 900;
`;

const ErrorDivider = styled.div`
  margin: 14px 0;
  border-top: 1px dashed #f2c7c7;
`;

const FixTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #1c2519;
  font-size: 15px;
  font-weight: 900;
`;

const HintButton = styled.button<{ $open: boolean }>`
  position: relative;
  z-index: 1;
  min-width: 156px;
  height: 52px;
  margin-top: 0;
  border: 1px solid #f1dfca;
  border-radius: 12px;
  background: ${({ $open }) => ($open ? '#f5fbef' : '#fffaf3')};
  color: ${({ $open }) => ($open ? '#5f9744' : '#75a766')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: #fff4e8;
  }
`;

const InlineHintPanel = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '170px' : '0')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  margin-top: ${({ $open }) => ($open ? '16px' : '0')};
  border: 1px solid #f1dfca;
  border-radius: 12px;
  background: #fffaf3;
  padding: ${({ $open }) => ($open ? '15px 24px 18px' : '0 24px')};
  overflow: hidden;
  transition:
    max-height 0.22s ease,
    opacity 0.18s ease,
    margin-top 0.22s ease,
    padding 0.22s ease;
`;

const HintHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #75a766;
  font-size: 18px;
  font-weight: 900;
`;

const HintText = styled.p`
  margin: 12px 0 0 34px;
  color: #111a0f;
  font-size: 13px;
  font-weight: 900;
  line-height: 1.65;
`;

const TeamChatCard = styled(PanelBase)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ChatHeader = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

const TitleWithIcon = styled.h3`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #273326;
  font-size: 15px;
  font-weight: 900;
`;

const Messages = styled.div`
  flex: 1;
  min-height: 0;
  margin-top: 18px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;
`;

const ChatMessage = styled.div<{ $mine: boolean }>`
  display: flex;
  justify-content: ${({ $mine }) => ($mine ? 'flex-end' : 'flex-start')};
  align-items: flex-start;
  gap: 9px;
`;

const MessageContent = styled.div<{ $mine: boolean }>`
  max-width: 74%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $mine }) => ($mine ? 'flex-end' : 'flex-start')};
`;

const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #667064;
  font-size: 11px;

  strong {
    color: #253221;
    font-weight: 900;
  }
`;

const Bubble = styled.div<{ $mine: boolean }>`
  margin-top: 4px;
  padding: 8px 13px;
  border-radius: 12px;
  background: ${({ $mine }) => ($mine ? '#f1f6e9' : '#ffffff')};
  border: ${({ $mine }) => ($mine ? '0' : '1px solid #e4eadf')};
  color: #1f2c1c;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.5;
`;

const ChatInputRow = styled.div`
  height: 42px;
  margin-top: 14px;
  border: 1px solid #e0e6dc;
  border-radius: 8px;
  padding: 0 6px 0 13px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ChatInput = styled.input`
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  color: #2b3328;
  font-size: 13px;

  &::placeholder {
    color: #b3bbb0;
  }
`;

const SmileButton = styled.button`
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #b0b8ad;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: #f3f7ee;
  }
`;

const SendButton = styled.button`
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: #8dbb75;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #76a761;
  }
`;

const GameStartOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 18;
  background: rgba(22, 24, 22, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const GameStartModal = styled.div`
  position: relative;
  width: min(560px, 100%);
  min-height: 620px;
  border-radius: 10px;
  background: #ffffff;
  padding: 34px 38px 42px;
  box-shadow: 0 24px 64px rgba(17, 23, 16, 0.26);
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StartTitle = styled.h2`
  margin: 0;
  color: #111b0f;
  text-align: center;
  font-size: 30px;
  font-weight: 900;
`;

const StartSubcopy = styled.p`
  margin: 10px 0 22px;
  color: #8a9286;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
`;

const StartMissionCard = styled.div`
  position: relative;
  min-height: 84px;
  padding: 20px 178px 18px 28px;
  border: 1px solid #e0e8dc;
  border-radius: 7px;
  background: #ffffff;
`;

const StartSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #26361f;
  font-size: 18px;
  font-weight: 900;

  svg {
    color: #5f9b48;
    fill: #5f9b48;
  }
`;

const StartMissionText = styled.div`
  margin-top: 12px;
  color: #24311f;
  font-size: 13px;
  font-weight: 800;
`;

const StartMascot = styled.img`
  position: absolute;
  right: 34px;
  bottom: 6px;
  width: 112px;
  height: 112px;
  object-fit: contain;
`;

const TurnOrderCard = styled.div`
  margin-top: 10px;
  padding: 20px 28px 18px;
  border: 1px solid #e0e8dc;
  border-radius: 7px;
  background: #ffffff;
`;

const UsersIcon = styled.span`
  color: #5f9b48;
  font-size: 22px;
  line-height: 1;
`;

const TurnOrderList = styled.div`
  position: relative;
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(58px, 1fr));
  align-items: start;
  gap: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 26px;
    left: 36px;
    right: 36px;
    border-top: 4px dotted #bfd9aa;
  }
`;

const TurnOrderItem = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TurnOrderAvatar = styled.div<{ $color: string }>`
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: 2px solid #d7dfd2;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TurnOrderNumber = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  width: 19px;
  height: 19px;
  transform: translateX(-32px);
  border-radius: 999px;
  background: #71ae55;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 900;
`;

const TurnOrderName = styled.div`
  margin-top: 6px;
  color: #273326;
  font-size: 11px;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
`;

const CountdownStage = styled.div`
  position: relative;
  flex: 1;
  min-height: 185px;
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountdownCircle = styled.div<{ $start: boolean }>`
  position: relative;
  width: ${({ $start }) => ($start ? '240px' : '128px')};
  height: ${({ $start }) => ($start ? '128px' : '128px')};
  border-radius: ${({ $start }) => ($start ? '0' : '999px')};
  background: ${({ $start }) => ($start ? 'transparent' : '#f0f5ea')};
  box-shadow: ${({ $start }) =>
    $start ? 'none' : '0 0 0 18px rgba(235, 242, 229, 0.62)'};
  color: #619b48;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $start }) => ($start ? '48px' : '76px')};
  font-weight: 900;
  letter-spacing: 0;

  &::before {
    content: '';
    position: absolute;
    width: 98px;
    height: 98px;
    border-radius: 999px;
    background: #ffffff;
    z-index: 2;
  }

  ${({ $start }) =>
    $start
      ? `
        &::before {
          display: none;
        }
      `
      : ''}

  span {
    position: relative;
    z-index: 3;
  }
`;

const CountdownGauge = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  z-index: 1;
`;

const CountdownGaugeTrack = styled.circle`
  fill: none;
  stroke: #dfe9d7;
  stroke-width: 12;
`;

const CountdownGaugeProgress = styled.circle`
  fill: none;
  stroke: #6faa55;
  stroke-width: 12;
  stroke-linecap: round;
  stroke-dasharray: 339.292;
  stroke-dashoffset: 339.292;
  animation: ${countdownSweep} 1s linear forwards;
`;

const CountdownHelp = styled.p`
  margin: 0;
  color: #75806f;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
`;

const ConfettiDot = styled.span<{
  $top: string;
  $color: string;
  $left?: string;
  $right?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  width: 6px;
  height: 6px;
  border-radius: 1px;
  background: ${({ $color }) => $color};
  transform: rotate(28deg);
`;

const SparkleDot = styled(ConfettiDot)`
  width: 8px;
  height: 8px;
`;

const ResultOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  background: rgba(22, 24, 22, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ResultModalCard = styled.div<{ $result: Exclude<ResultModalState, null> }>`
  width: min(560px, 100%);
  min-height: ${({ $result }) => ($result === 'success' ? '540px' : '470px')};
  border-radius: 8px;
  background: #ffffff;
  padding: 48px 58px 44px;
  box-shadow: 0 22px 60px rgba(17, 23, 16, 0.24);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultKicker = styled.div`
  color: #101510;
  font-size: 22px;
  font-weight: 900;
`;

const ResultTitle = styled.h2<{ $result: Exclude<ResultModalState, null> }>`
  margin: 10px 0 18px;
  color: ${({ $result }) => ($result === 'success' ? '#4e8a3c' : '#d74d3f')};
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0;
`;

const ResultCharacters = styled.img`
  width: 300px;
  height: 126px;
  object-fit: contain;
`;

const ResultMessage = styled.p`
  margin: 16px 0 0;
  color: #7a8278;
  font-size: 14px;
  font-weight: 800;
`;

const ExecutionBlock = styled.div`
  width: 100%;
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid #d8ded4;
`;

const ExecutionTitle = styled.div`
  color: #2d352b;
  font-size: 14px;
  font-weight: 900;
`;

const ExecutionOutput = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 14px;
  border-radius: 3px;
  background: #faf7f4;
  color: #5fa34a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fira Code', Consolas, monospace;
  font-size: 16px;
  font-weight: 900;
`;

const ResultAction = styled.button<{ $result: Exclude<ResultModalState, null> }>`
  width: 156px;
  height: 52px;
  margin-top: auto;
  border: 0;
  border-radius: 5px;
  background: ${({ $result }) => ($result === 'success' ? '#5d963f' : '#d84b3c')};
  color: #ffffff;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;
