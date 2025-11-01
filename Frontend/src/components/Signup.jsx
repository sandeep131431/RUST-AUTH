import { useState } from 'react'
import axios from 'axios'

function Signup({ onSwitchToLogin }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setMessage('❌ Please fill in all required fields')
      return
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      setMessage('❌ Please enter a valid email address')
      return
    }

    if (form.password.length < 6) {
      setMessage('❌ Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setMessage('🔄 Creating account...')
    
    try {
      console.log('📤 Sending signup data:', { ...form, password: '***' })

      const response = await axios.post('http://localhost:8000/user', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      })
      
      console.log('✅ Server response:', response.data)
      setMessage('✅ Account created successfully! You can now login.')
      
      // Reset form and switch to login
      setForm({ name: '', email: '', password: '' })
      onSwitchToLogin()
      
    } catch (error) {
      console.error('❌ Full error details:', error)
      
      if (error.response) {
        setMessage(`❌ Server Error (${error.response.status}): ${error.response.data}`)
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

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { text: '', color: '#666' }
    
    let strength = 0
    if (password.length >= 6) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    
    const levels = [
      { text: 'Very Weak', color: '#dc3545' },
      { text: 'Weak', color: '#fd7e14' },
      { text: 'Fair', color: '#ffc107' },
      { text: 'Good', color: '#20c997' },
      { text: 'Strong', color: '#198754' }
    ]
    
    return levels[Math.min(strength, 4)]
  }

  const passwordStrength = getPasswordStrength(form.password)

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
          <label htmlFor="name">
            Full Name *
            <span style={{color: '#667eea', marginLeft: '5px'}}>
              {form.name.length > 0 && '✓'}
            </span>
          </label>
          <input 
            id="name"
            type="text" 
            placeholder="Enter your full name" 
            value={form.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required 
            maxLength={50}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">
            Email Address *
            <span style={{color: '#667eea', marginLeft: '5px'}}>
              {form.email && /\S+@\S+\.\S+/.test(form.email) && '✓'}
            </span>
          </label>
          <input 
            id="email"
            type="email" 
            placeholder="Enter your email address" 
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">
            Password *
            <span style={{color: '#667eea', marginLeft: '5px'}}>
              {form.password.length >= 6 && '✓'}
            </span>
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password (min. 6 characters)" 
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              minLength={6}
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
          
          {/* Password Strength Indicator */}
          {form.password && (
            <div style={{ 
              marginTop: '5px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>Strength:</span>
              <span style={{ color: passwordStrength.color, fontWeight: '600' }}>
                {passwordStrength.text}
              </span>
              <div style={{
                flex: 1,
                height: '4px',
                backgroundColor: '#e1e5e9',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(form.password.length >= 6 ? 1 : 0) * 25 + 
                          (/[A-Z]/.test(form.password) ? 1 : 0) * 25 +
                          (/[0-9]/.test(form.password) ? 1 : 0) * 25 +
                          (/[^A-Za-z0-9]/.test(form.password) ? 1 : 0) * 25}%`,
                  height: '100%',
                  backgroundColor: passwordStrength.color,
                  transition: 'all 0.3s ease'
                }} />
              </div>
            </div>
          )}
          
          {/* Password Requirements */}
          <div style={{ 
            marginTop: '8px',
            fontSize: '0.75rem',
            color: '#666'
          }}>
            <div>Password must contain:</div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '5px',
              marginTop: '5px'
            }}>
              <span style={{ color: form.password.length >= 6 ? '#198754' : '#dc3545' }}>
                {form.password.length >= 6 ? '✅' : '❌'} 6+ characters
              </span>
              <span style={{ color: /[A-Z]/.test(form.password) ? '#198754' : '#dc3545' }}>
                {/[A-Z]/.test(form.password) ? '✅' : '❌'} Uppercase letter
              </span>
              <span style={{ color: /[0-9]/.test(form.password) ? '#198754' : '#dc3545' }}>
                {/[0-9]/.test(form.password) ? '✅' : '❌'} Number
              </span>
              <span style={{ color: /[^A-Za-z0-9]/.test(form.password) ? '#198754' : '#dc3545' }}>
                {/[^A-Za-z0-9]/.test(form.password) ? '✅' : '❌'} Special character
              </span>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${loading ? 'loading' : ''}`}
          disabled={loading || !form.name || !form.email || !form.password || form.password.length < 6}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Creating Account...
            </>
          ) : (
            '✨ Create Account'
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ color: '#666' }}>
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signup