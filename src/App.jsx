import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  AppShellLayout,
  ProtectedProfilePage,
} from './layout/AppShellLayout.jsx'
import { BoardPage } from './pages/BoardPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { HowItWorksPage } from './pages/HowItWorksPage.jsx'
import { IssuePage } from './pages/IssuePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { NextFeedHostPage } from './pages/NextFeedHostPage.jsx'
import { StorySubmitPage } from './pages/StorySubmitPage.jsx'
import { VerifyPage } from './pages/VerifyPage.jsx'

function StoryComposeRedirect() {
  const { search } = useLocation()
  return <Navigate to={`/story/submit${search}`} replace />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShellLayout />}>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/issue/:id" element={<IssuePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProtectedProfilePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/story/submit" element={<StorySubmitPage />} />
        <Route path="/story/compose" element={<StoryComposeRedirect />} />
        {/* NS-01: next feed host above catch-all — feed body → next-feed */}
        <Route path="/next/feed" element={<NextFeedHostPage />} />
        <Route path="/next/feed/issue/:id" element={<NextFeedHostPage />} />
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Route>
    </Routes>
  )
}

export default App
