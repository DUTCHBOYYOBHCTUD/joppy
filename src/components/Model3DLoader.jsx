import React from 'react';
import { Box, RefreshCw } from 'lucide-react';

export class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("3D Model render warning caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          background: 'rgba(5, 14, 23, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 1,
          padding: '2rem',
          textAlign: 'center',
          pointerEvents: 'auto'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box size={28} color="#10b981" />
          </div>
          <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>
            {this.props.title || '3D Architecture View'}
          </h4>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', maxWidth: '340px', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {this.props.description || 'Experience New Zealand’s world-renowned education architecture in full 3D.'}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })} 
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={15} /> Reload 3D Landmark
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ModelLoadingFallback = ({ title = "Interactive 3D Landmark" }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    pointerEvents: 'none',
    zIndex: 1,
    background: 'radial-gradient(circle at 50% 45%, #0e2b45 0%, #050E17 100%)'
  }}>
    <div style={{
      width: '44px',
      height: '44px',
      border: '3px solid rgba(16, 185, 129, 0.2)',
      borderTopColor: '#10b981',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <span style={{ color: 'rgba(16, 185, 129, 0.85)', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
      Loading 3D Atmosphere...
    </span>
  </div>
);

