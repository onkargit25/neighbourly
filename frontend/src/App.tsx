import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ProfileSetupPage } from '@/pages/auth/ProfileSetupPage';
import { JoinCommunityPage } from '@/pages/auth/JoinCommunityPage';
import { AppLayout } from '@/pages/app/AppLayout';
import { HomePage } from '@/pages/app/HomePage';
import { MarketPage } from '@/pages/app/MarketPage';
import { NotificationsPage } from '@/pages/app/NotificationsPage';
import { ProfilePage } from '@/pages/app/ProfilePage';
import { SecretaryDashboard } from '@/pages/secretary/SecretaryDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile-setup" element={<ProfileSetupPage />} />
              <Route path="/join-community" element={<JoinCommunityPage />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="market" element={<MarketPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              <Route path="/secretary" element={<SecretaryDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
