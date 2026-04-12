import styled from 'styled-components';
import Header from '@/components/layout/Header';
import FileExplorer from '@/features/file-explorer/FileExplorer';
import HistoryPanel from '@/features/file-explorer/HistoryPanel';
import EditorPanel from '@/features/editor/EditorPanel';
import AiChatPanel from '@/features/chat/AiChatPanel';
import TeamChatPanel from '@/features/chat/TeamChatPanel';
import { useState } from 'react';

const mockFiles = [
  {
    id: 'main.py',
    name: 'main.py',
    language: 'python',
    content: `# initialize runtime
!pip install -q ultralytics opencv-python-headless

# check GPU status
!nvidia-smi

# prepare dataset
!mkdir -p workspace/data
!unzip -q dataset.zip -d workspace/data

# verify files
!ls -al workspace/data | head

# start preprocessing
!python preprocess.py --input workspace/data --cache true`,
  },
  {
    id: 'preprocess.py',
    name: 'preprocess.py',
    language: 'python',
    content: `def preprocess_dataset(input_path: str, use_cache: bool = True):
    print('preprocess start')
    print(f'input path: {input_path}')
    print(f'use cache: {use_cache}')
    return True


if __name__ == '__main__':
    preprocess_dataset('workspace/data')`,
  },
];

export default function RoomPage() {
  const [selectedFileId, setSelectedFileId] = useState(mockFiles[0].id);

  const selectedFile =
    mockFiles.find((file) => file.id === selectedFileId) ?? mockFiles[0];

  return (
    <PageContainer>
      <Header />

      <Body>
        <LeftColumn>
          <FileExplorer
            files={mockFiles}
            selectedFileId={selectedFileId}
            onSelectFile={setSelectedFileId}
          />
          <HistoryPanel />
        </LeftColumn>

        <CenterColumn>
          <EditorPanel
            fileName={selectedFile.name}
            language={selectedFile.language}
            content={selectedFile.content}
          />
        </CenterColumn>

        <RightColumn>
          <TopChatSection>
            <AiChatPanel />
          </TopChatSection>

          <BottomChatSection>
            <TeamChatPanel />
          </BottomChatSection>
        </RightColumn>
      </Body>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  height: 100vh;
  background: #eef2ff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Body = styled.main`
  display: grid;
  grid-template-columns: 330px 1fr 340px;
  gap: 16px;
  padding: 16px;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const LeftColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 0;
`;

const CenterColumn = styled.section`
  min-width: 0;
  min-height: 0;
`;

const RightColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 0;
`;

const TopChatSection = styled.div`
  flex: 5;
  min-height: 0;
`;

const BottomChatSection = styled.div`
  flex: 2;
  min-height: 0;
`;
