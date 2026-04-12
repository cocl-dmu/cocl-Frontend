import styled from 'styled-components';
import { Activity, MoreHorizontal } from 'lucide-react';

const historyItems = [
  {
    id: 1,
    name: '띵딩이',
    time: '5 min ago',
    statusColor: '#f59e0b',
    image:
      'https://api.dicebear.com/7.x/thumbs/svg?seed=dding',
  },
  {
    id: 2,
    name: '찡딩이',
    time: '1 day ago',
    statusColor: '#22c55e',
    image:
      'https://api.dicebear.com/7.x/thumbs/svg?seed=jjing',
  },
];

export default function HistoryPanel() {
  return (
    <Container>
      <Header>
        <TitleWrap>
          <Activity size={16} />
          <Title>History</Title>
        </TitleWrap>

        <MoreButton>
          <MoreHorizontal size={16} />
        </MoreButton>
      </Header>

      <List>
        {historyItems.map((item) => (
          <HistoryCard key={item.id}>
            <Left>
              <Avatar src={item.image} alt={item.name} />
              <TextWrap>
                <Name>{item.name}</Name>
                <Time>{item.time}</Time>
              </TextWrap>
            </Left>

            <StatusDot $color={item.statusColor} />
          </HistoryCard>
        ))}
      </List>

      <ViewAllButton>View All History →</ViewAllButton>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #dbe4f0;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  font-size: 14px;
  font-weight: 700;
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HistoryCard = styled.div`
  min-height: 56px;
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #f3f4f6;
  flex-shrink: 0;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #111827;
`;

const Time = styled.span`
  margin-top: 2px;
  font-size: 10px;
  color: #6b7280;
`;

const StatusDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const ViewAllButton = styled.button`
  margin-top: 2px;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;
