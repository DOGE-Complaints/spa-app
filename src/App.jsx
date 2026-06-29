import { Navigate, Route, Routes } from 'react-router-dom'
import {
  AppShellLayout,
  ProtectedProfilePage,
} from './layout/AppShellLayout.jsx'
import { BoardPage } from './pages/BoardPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { IssuePage } from './pages/IssuePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { StoryComposePage } from './pages/StoryComposePage.jsx'
import { VerifyPage } from './pages/VerifyPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShellLayout />}>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/issue/:id" element={<IssuePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProtectedProfilePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/story/compose" element={<StoryComposePage />} />
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Route>
    </Routes>
  )
}

export default App
