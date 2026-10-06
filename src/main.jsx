import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/fonts.css'
import './styles/tokens.css'
import './index.css'
import App from './App.jsx'
import { AuthSessionProvider } from './auth/AuthSessionContext.jsx'
import { SessionShellProvider } from './auth/SessionShellContext.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import { applyDefaultTheme } from './theme/bootTheme.js'

/* REQ21-03: reinforce default dark (inline head script is primary FOUC guard). */
applyDefaultTheme()

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
