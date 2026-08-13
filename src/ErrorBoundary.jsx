import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Bayside app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: "'DM Sans', sans-serif",
          background: '#FAF7F4',
          color: '#2C3A3A',
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40,
            fontWeight: 300,
            marginBottom: 16,
          }}>
            Something went wrong.
          </h1>
          <p style={{
            fontSize: 16,
            color: '#4A5A5A',
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            We are sorry for the inconvenience. Please try refreshing the page, or return home to continue.
          </p>
          
            href="/"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: '#2E7D7A',
              padding: '14px 32px',
              borderRadius: 2,
              textDecoration: 'none',
            }}
          >
            Return Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
