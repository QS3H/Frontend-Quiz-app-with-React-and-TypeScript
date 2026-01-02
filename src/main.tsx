/**
 * Application Entry Point
 *
 * This file bootstraps the React application using the new React 18+ createRoot API.
 * It renders the main App component into the DOM with StrictMode for development warnings.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Mount the React application to the DOM
// Uses createRoot (React 18+) for concurrent features and automatic batching
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
