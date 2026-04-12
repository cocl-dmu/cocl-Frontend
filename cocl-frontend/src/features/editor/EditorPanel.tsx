import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { Play, Share2, Expand } from 'lucide-react';

type EditorPanelProps = {
  fileName: string;
  language: string;
  content: string;
};

const outputLines = [
  '[12:04:11] Installing dependencies...',
  '[12:04:18] ultralytics installed successfully',
  '[12:04:19] Checking GPU status',
  'NVIDIA-SMI 550.54.14    Driver Version: 550.54.14    CUDA Version: 12.4',
  '[12:04:22] Dataset extracted to workspace/data',
  '[12:04:24] Preprocessing started',
  '[12:04:28] Found 1248 images',
  '[12:04:31] Cache created successfully',
  '[12:04:33] Process finished with exit code 0',
];

export default function EditorPanel({
  fileName,
  language,
  content,
}: EditorPanelProps) {
  return (
    <Container>
      <TopBar>
        <TabName>{fileName}</TabName>

        <ToolbarActions>
          <LanguageSelect>{language}</LanguageSelect>

          <RunButton>
            <Play size={14} fill="currentColor" />
            Run
          </RunButton>

          <ShareButton>
            <Share2 size={14} />
            Share Result
          </ShareButton>
        </ToolbarActions>
      </TopBar>

      <EditorSection>
        <StyledEditorWrapper>
          <Editor
            height="100%"
            language={language}
            value={content}
            theme="vs-light"
            options={{
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
              lineNumbersMinChars: 3,
              roundedSelection: false,
              wordWrap: 'on',
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              glyphMargin: false,
            }}
          />
        </StyledEditorWrapper>
      </EditorSection>

      <OutputSection>
        <OutputHeader>
          <OutputTitle>Output</OutputTitle>

          <OutputHeaderRight>
            <OutputBadge>Terminal</OutputBadge>
            <IconButton>
              <Expand size={16} />
            </IconButton>
          </OutputHeaderRight>
        </OutputHeader>

        <TerminalCard>
          <TerminalLineNumbers>
            {outputLines.map((_, index) => (
              <TerminalLineNumber key={index}>{index + 1}</TerminalLineNumber>
            ))}
          </TerminalLineNumbers>

          <TerminalContent>
            {outputLines.map((line, index) => (
              <TerminalLine key={index}>{line}</TerminalLine>
            ))}
          </TerminalContent>
        </TerminalCard>
      </OutputSection>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #dbe4f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

const TopBar = styled.div`
  height: 52px;
  padding: 0 18px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  flex-shrink: 0;
`;

const TabName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LanguageSelect = styled.div`
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  background: #f8fafc;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;

const BaseButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border: 1px solid transparent;
`;

const RunButton = styled(BaseButton)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const ShareButton = styled(BaseButton)`
  background: #ffffff;
  color: #374151;
  border-color: #d1d5db;

  &:hover {
    background: #f9fafb;
  }
`;

const EditorSection = styled.div`
  flex: 1;
  min-height: 0;
  background: #ffffff;
`;

const StyledEditorWrapper = styled.div`
  height: 100%;
  min-height: 0;
`;

const OutputSection = styled.div`
  height: 200px;
  flex-shrink: 0;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const OutputHeader = styled.div`
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const OutputTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const OutputHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OutputBadge = styled.div`
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: #e5e7eb;
  color: #4b5563;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
`;

const IconButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #4b5563;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const TerminalCard = styled.div`
  flex: 1;
  min-height: 0;
  margin: 0 12px 12px;
  border-radius: 14px;
  overflow: auto;
  border: 1px solid #dbe4f0;
  background: #ffffff;
  display: flex;
  align-items: flex-start;
`;

const TerminalLineNumbers = styled.div`
  width: 38px;
  padding: 12px 6px 12px 0;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TerminalLineNumber = styled.div`
  text-align: right;
  font-size: 12px;
  line-height: 22px;
  color: #64748b;
  user-select: none;
`;

const TerminalContent = styled.div`
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TerminalLine = styled.pre`
  margin: 0;
  color: #374151;
  font-size: 12px;
  line-height: 22px;
  white-space: pre-wrap;
  font-family:
    'Fira Code',
    'Consolas',
    'Menlo',
    monospace;
`;
