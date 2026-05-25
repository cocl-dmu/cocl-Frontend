import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RoomPage from './pages/RoomPage';
import AuthModal from './components/AuthModal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/rooms/:gameRoomId/play" element={<RoomPage />} />
        <Route path="/login" element={<AuthModal />} />
      </Routes>
    </BrowserRouter>
  );
}
