import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Homepage from './components/Homepage'

function App() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'signup', 'homepage'
  const [user, setUser] = useState(null)

  // Login successful hone par call hoga
  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setCurrentView('homepage')
  }

  // Logout par call hoga
  const handleLogout = () => {
    setUser(null)
    setCurrentView('login')
  }

  // Signup successful hone par call hoga
  const handleSignupSuccess = () => {
    setCurrentView('login')
  }

  return (
    <div className="app">
      {/* Agar homepage show karna hai */}
      {currentView === 'homepage' ? (
        <Homepage user={user} onLogout={handleLogout} />
      ) : (
        /* Agar login/signup form show karna hai */
        <div className="container">
          <div className="card">
            <div className="header">
              <h1>{currentView === 'signup' ? '👤 Create Account' : '🔐 User Login'}</h1>
              <p>
                {currentView === 'signup' 
                  ? 'Create your account with secure password' 
                  : 'Welcome back! Please login to your account'
                }
              </p>
            </div>

            {/* Form Toggle */}
            <div style={{
              display: 'flex',
              background: '#f8f9fa',
              borderRadius: '10px',
              padding: '5px',
              marginBottom: '20px'
            }}>
              <button
                onClick={() => setCurrentView('signup')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  background: currentView === 'signup' ? '#667eea' : 'transparent',
                  color: currentView === 'signup' ? 'white' : '#666',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Sign Up
              </button>
              <button
                onClick={() => setCurrentView('login')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  background: currentView === 'login' ? '#667eea' : 'transparent',
                  color: currentView === 'login' ? 'white' : '#666',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Login
              </button>
            </div>

            {/* Render Current Form */}
            {currentView === 'signup' ? (
              <Signup 
                onSwitchToLogin={() => setCurrentView('login')}
                onSignupSuccess={handleSignupSuccess}
              />
            ) : (
              <Login 
                onSwitchToSignup={() => setCurrentView('signup')}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App