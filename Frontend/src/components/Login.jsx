import { useState } from 'react'
import axios from 'axios'

function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [form, setForm] = useState({ 
    email: '', 
    password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation for login
    if (!form.email.trim() || !form.password) {
      setMessage('❌ Please fill in email and password')
      return
    }

    setLoading(true)
    setMessage('🔄 Logging in...')
    
    try {
      console.log('📤 Sending login data:', { email: form.email, password: '***' })

      // Login endpoint call
      const response = await axios.post('https://rust-bkd-1.onrender.com/login', {
        email: form.email.trim(),
        password: form.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      })
      
      console.log('✅ Login response:', response.data)
      setMessage('✅ Login successful! Welcome back.')
      
      // Reset form on successful login
      setForm({ email: '', password: '' })
      
      // Call onLoginSuccess to switch to homepage
      if (onLoginSuccess) {
        // Extract user data from response or create from form
        const userData = {
          name: response.data.name || form.email.split('@')[0], // Use name from response or extract from email
          email: form.email,
          // Add any other user data you get from backend
          ...response.data
        }
        onLoginSuccess(userData)
      }
      
    } catch (error) {
      console.error('❌ Login error:', error)
      
      if (error.response) {
        if (error.response.status === 401) {
          setMessage('❌ Invalid email or password')
        } else {
          setMessage(`❌ Server Error (${error.response.status}): ${error.response.data}`)
        }
      } else if (error.request) {
        setMessage('❌ Network Error: Could not connect to server.')
      } else {
        setMessage('❌ Error: ' + error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear message when user starts typing
    if (message) {
      setMessage('')
    }
  }

  return (
    <div>
      {/* Message Display */}
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label htmlFor="login-email">
            Email Address *
            <span style={{color: '#667eea', marginLeft: '5px'}}>
              {form.email && /\S+@\S+\.\S+/.test(form.email) && '✓'}
            </span>
          </label>
          <input 
            id="login-email"
            type="email" 
            placeholder="Enter your email address" 
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="login-password">
            Password *
            <span style={{color: '#667eea', marginLeft: '5px'}}>
              {form.password.length >= 1 && '✓'}
            </span>
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password" 
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              style={{ paddingRight: '100px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${loading ? 'loading' : ''}`}
          disabled={loading || !form.email || !form.password}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Logging in...
            </>
          ) : (
            '🔐 Login'
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ color: '#666' }}>
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignup}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login