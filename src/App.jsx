import { Navigate, Route, Routes } from 'react-router-dom'
import { BoardPage } from './pages/BoardPage.jsx'
import { IssuePage } from './pages/IssuePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/board" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/issue/:id" element={<IssuePage />} />
      <Route path="*" element={<Navigate to="/board" replace />} />
    </Routes>
  )
}

export default App
