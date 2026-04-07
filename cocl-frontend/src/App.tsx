import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import MainPage from './pages/MainPage';
import AuthModal from './components/AuthModal';

export default function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<AuthModal />} />
      </Routes>
    </BrowserRouter>
  );
}