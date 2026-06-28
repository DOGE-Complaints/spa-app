import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthSessionProvider } from './auth/AuthSessionContext.jsx'
import { SessionShellProvider } from './auth/SessionShellContext.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <AuthSessionProvider>
        <SessionShellProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </SessionShellProvider>
      </AuthSessionProvider>
    </I18nProvider>
  </StrictMode>,
)
