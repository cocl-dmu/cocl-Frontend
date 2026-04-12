import styled from 'styled-components';
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  FileCode2,
  FolderPlus,
  FilePlus,
} from 'lucide-react';

type FileItem = {
  id: string;
  name: string;
  language: string;
  content: string;
};

type FileExplorerProps = {
  files: FileItem[];
  selectedFileId: string;
  onSelectFile: (fileId: string) => void;
};

export default function FileExplorer({
  files,
  selectedFileId,
  onSelectFile,
}: FileExplorerProps) {
  return (
    <Container>
      <SearchBox>
        <Search size={16} />
        <SearchInput placeholder="Search Folders..." />
      </SearchBox>

      <TreeSection>
        <FolderHeader>
          <FolderTitle>
            <ChevronDown size={16} />
            <span>Algorithm Study</span>
          </FolderTitle>

          <MoreButton>
            <MoreHorizontal size={16} />
          </MoreButton>
        </FolderHeader>

        <FileList>
          {files.map((file) => (
            <FileRow
              key={file.id}
              $active={file.id === selectedFileId}
              onClick={() => onSelectFile(file.id)}
            >
              <FileLeft>
                <FileCode2 size={14} />
                <FileName>{file.name}</FileName>
              </FileLeft>
            </FileRow>
          ))}
        </FileList>
      </TreeSection>

      <BottomActions>
        <ActionButton>
          <FilePlus size={15} />
          New File
        </ActionButton>

        <ActionButton>
          <FolderPlus size={15} />
          New Folder
        </ActionButton>
      </BottomActions>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  border-radius: 24px;
  border: 1px solid #dbe4f0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
`;

const SearchBox = styled.div`
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  color: #9ca3af;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #374151;
  background: transparent;

  &::placeholder {
    color: #b6beca;
  }
`;

const TreeSection = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const FolderHeader = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FolderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

const MoreButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #6b7280;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
`;

const FileRow = styled.button<{ $active: boolean }>`
  height: 30px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background: ${({ $active }) => ($active ? '#eef2ff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1f2937' : '#4b5563')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ $active }) => ($active ? '#e6edff' : '#f8fafc')};
  }
`;

const FileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileName = styled.span`
  font-size: 13px;
`;

const BottomActions = styled.div`
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ActionButton = styled.button`
  height: 36px;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 12px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;