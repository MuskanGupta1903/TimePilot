import { Rocket } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dotted grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(138, 148, 142, 0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo and brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <Rocket className="w-10 h-10" style={{ color: '#e76f51' }} />
          <span className="text-3xl tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            TimePilot
          </span>
        </div>

        {/* Hero headline */}
        <h1 
          className="mb-6" 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '4rem',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}
        >
          Command Your Day.
        </h1>

        {/* Subtext */}
        <p 
          className="mb-12 max-w-2xl mx-auto opacity-80"
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: '1.25rem',
            lineHeight: '1.6',
            color: '#9ca39d'
          }}
        >
          TimePilot sends reminders when you actually need them — based on time, workload, and energy.
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative px-8 py-4 rounded-lg transition-all duration-300 overflow-hidden"
          style={{
            background: '#e76f51',
            color: '#0f1412',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.125rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Today's Mission
            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
            style={{ background: '#fff' }}
          />
        </button>

        {/* Dashboard preview mockup */}
        <div className="mt-20 relative">
          <div 
            className="rounded-xl overflow-hidden border"
            style={{
              background: '#1a1f1c',
              borderColor: 'rgba(138, 148, 142, 0.2)',
              boxShadow: '0 0 40px rgba(58, 125, 124, 0.15)'
            }}
          >
            <div 
              className="h-12 flex items-center px-4 border-b"
              style={{ borderColor: 'rgba(138, 148, 142, 0.15)' }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#e76f51' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#f2cc8f' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#3a7d7c' }} />
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-3 gap-6">
              {/* Left panel preview */}
              <div className="space-y-3">
                <div className="h-8 rounded" style={{ background: '#2a302d', width: '80%' }} />
                <div className="h-6 rounded" style={{ background: '#2a302d', width: '90%' }} />
                <div className="h-6 rounded" style={{ background: '#2a302d', width: '75%' }} />
                <div className="h-6 rounded" style={{ background: '#2a302d', width: '85%' }} />
              </div>

              {/* Center panel preview */}
              <div className="space-y-4">
                <div 
                  className="h-20 rounded-lg border p-3"
                  style={{ 
                    background: '#1a1f1c',
                    borderColor: '#e76f51',
                    boxShadow: '0 0 16px rgba(231, 111, 81, 0.2)'
                  }}
                >
                  <div className="h-3 rounded mb-2" style={{ background: '#e76f51', width: '60%' }} />
                  <div className="h-2 rounded" style={{ background: '#2a302d', width: '40%' }} />
                </div>
                <div 
                  className="h-20 rounded-lg border p-3"
                  style={{ background: '#1a1f1c', borderColor: 'rgba(138, 148, 142, 0.2)' }}
                >
                  <div className="h-3 rounded mb-2" style={{ background: '#3a7d7c', width: '70%' }} />
                  <div className="h-2 rounded" style={{ background: '#2a302d', width: '50%' }} />
                </div>
              </div>

              {/* Right panel preview */}
              <div className="space-y-3">
                <div className="h-8 rounded" style={{ background: '#2a302d', width: '70%' }} />
                <div 
                  className="h-12 rounded p-2"
                  style={{ 
                    background: 'rgba(242, 204, 143, 0.1)',
                    border: '1px solid rgba(242, 204, 143, 0.3)'
                  }}
                >
                  <div className="h-2 rounded mb-1" style={{ background: '#f2cc8f', width: '90%' }} />
                  <div className="h-2 rounded" style={{ background: '#f2cc8f', width: '70%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
