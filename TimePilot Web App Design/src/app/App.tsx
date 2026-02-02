import { useState } from 'react';
import { LandingPage } from '@/app/components/landing-page';
import { Dashboard } from '@/app/components/dashboard';
import { FocusMode } from '@/app/components/focus-mode';
import { InsightsPage } from '@/app/components/insights-page';

type View = 'landing' | 'dashboard' | 'insights';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [showFocusMode, setShowFocusMode] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#0f1412', color: '#e8e9e5' }}>
      {currentView === 'landing' && (
        <LandingPage onStart={() => setCurrentView('dashboard')} />
      )}

      {currentView === 'dashboard' && (
        <Dashboard 
          onOpenFocus={() => setShowFocusMode(true)}
          onOpenInsights={() => setCurrentView('insights')}
        />
      )}

      {currentView === 'insights' && (
        <InsightsPage onBack={() => setCurrentView('dashboard')} />
      )}

      {showFocusMode && (
        <FocusMode onClose={() => setShowFocusMode(false)} />
      )}
    </div>
  );
}
