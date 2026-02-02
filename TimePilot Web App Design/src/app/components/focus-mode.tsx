import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FocusModeProps {
  onClose: () => void;
}

export function FocusMode({ onClose }: FocusModeProps) {
  const [time, setTime] = useState({ hours: 1, minutes: 58, seconds: 42 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Radar sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#0f1412'
      }}
    >
      {/* Animated radar background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(58, 125, 124, 0.1) 40px, rgba(58, 125, 124, 0.1) 41px)`,
          }}
        />
        
        {/* Radar sweep line */}
        <div 
          className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
          style={{
            background: `linear-gradient(to right, transparent, rgba(58, 125, 124, 0.4))`,
            transform: `translate(-100%, -50%) rotate(${rotation}deg)`,
            transformOrigin: 'right center'
          }}
        />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 rounded-lg transition-colors z-10"
        style={{
          background: 'rgba(138, 148, 142, 0.1)',
          color: '#9ca39d'
        }}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Status header */}
        <div 
          className="mb-8 inline-block px-4 py-2 rounded-full border"
          style={{
            background: 'rgba(58, 125, 124, 0.15)',
            borderColor: '#3a7d7c',
            color: '#3a7d7c',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            letterSpacing: '0.1em'
          }}
        >
          FOCUS LOCK ENGAGED
        </div>

        {/* Task name */}
        <h2 
          className="mb-12"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            color: '#e8e9e5',
            letterSpacing: '-0.01em'
          }}
        >
          Deep Work Block — Design System
        </h2>

        {/* Timer */}
        <div 
          className="mb-16 inline-flex items-center gap-4 px-12 py-8 rounded-2xl border"
          style={{
            background: 'rgba(26, 31, 28, 0.8)',
            borderColor: 'rgba(138, 148, 142, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-center">
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '5rem',
                lineHeight: '1',
                color: '#e76f51',
                fontWeight: '300',
                letterSpacing: '0.05em'
              }}
            >
              {formatTime(time.hours)}
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#9ca39d',
                marginTop: '0.5rem',
                letterSpacing: '0.1em'
              }}
            >
              HOURS
            </div>
          </div>

          <div 
            style={{
              fontSize: '5rem',
              color: '#3a7d7c',
              opacity: 0.5,
              lineHeight: '1'
            }}
          >
            :
          </div>

          <div className="text-center">
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '5rem',
                lineHeight: '1',
                color: '#e76f51',
                fontWeight: '300',
                letterSpacing: '0.05em'
              }}
            >
              {formatTime(time.minutes)}
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#9ca39d',
                marginTop: '0.5rem',
                letterSpacing: '0.1em'
              }}
            >
              MINUTES
            </div>
          </div>

          <div 
            style={{
              fontSize: '5rem',
              color: '#3a7d7c',
              opacity: 0.5,
              lineHeight: '1'
            }}
          >
            :
          </div>

          <div className="text-center">
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '5rem',
                lineHeight: '1',
                color: '#e76f51',
                fontWeight: '300',
                letterSpacing: '0.05em'
              }}
            >
              {formatTime(time.seconds)}
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#9ca39d',
                marginTop: '0.5rem',
                letterSpacing: '0.1em'
              }}
            >
              SECONDS
            </div>
          </div>
        </div>

        {/* System message */}
        <p 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: '#9ca39d',
            letterSpacing: '0.05em'
          }}
        >
          Distractions muted. You're cleared for deep work.
        </p>
      </div>
    </div>
  );
}
