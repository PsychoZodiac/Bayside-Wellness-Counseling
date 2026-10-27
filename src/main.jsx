import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ErrorBoundary from './ErrorBoundary'

const container = document.getElementById('root')

if (!container) {
  throw new Error('The root element is missing from index.html.')
}

const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

if (container.innerHTML.trim()) {
  hydrateRoot(container, app)
} else {
  // Vite development starts from the empty root in the source template.
  createRoot(container).render(app)
}
