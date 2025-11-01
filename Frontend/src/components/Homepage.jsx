
import React from 'react';

function Homepage({ user, onLogout }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '15px 30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#667eea',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            🚀
          </div>
          <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>
            Welcome to App
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#666', fontWeight: '500' }}>
            👋 Hello, {user?.name || 'User'}!
          </span>
          <button 
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff5252'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: '#333', 
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎉 Welcome to Your Dashboard!
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            maxWidth: '600px',
            margin: '0 auto 30px',
            lineHeight: '1.6'
          }}>
            You have successfully logged in. Explore your personalized dashboard and manage your account with ease.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '2px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }} className="card-hover">
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '15px'
            }}>
              📊
            </div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Analytics</h3>
            <p style={{ color: '#666', margin: 0 }}>View your usage statistics and insights</p>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '2px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }} className="card-hover">
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '15px'
            }}>
              ⚙️
            </div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Settings</h3>
            <p style={{ color: '#666', margin: 0 }}>Manage your account preferences</p>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '2px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }} className="card-hover">
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '15px'
            }}>
              👥
            </div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Users</h3>
            <p style={{ color: '#666', margin: 0 }}>Connect with other users</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px',
          border: '2px solid #e9ecef'
        }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>📈 Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#667eea',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px'
              }}>
                ✅
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '600', color: '#333' }}>
                  Successful Login
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Just now • From your current device
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#20c997',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px'
              }}>
                🎯
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '600', color: '#333' }}>
                  Welcome to the platform
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Explore features and get started
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              📝 Edit Profile
            </button>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#51cf66',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              🔔 Notifications
            </button>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#ffd43b',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              ❓ Get Help
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '50px',
        color: 'white',
        padding: '20px'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          © 2024 Your App Name. All rights reserved.
        </p>
      </footer>

      <style jsx>{`
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default Homepage;