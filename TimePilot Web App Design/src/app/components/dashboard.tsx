import { useState } from 'react';
import { 
  Target, 
  Radar, 
  Zap, 
  BookOpen, 
  Clock, 
  Circle,
  Plus,
  ChevronRight,
  Battery,
  BatteryMedium,
  BatteryFull,
  X
} from 'lucide-react';

interface Task {
  id: string;
  name: string;
  timeRange: string;
  duration: string;
  status: 'CRITICAL' | 'STANDARD' | 'LOW ORBIT';
  isActive?: boolean;
  category?: string;
}

interface Alert {
  id: string;
  time: string;
  message: string;
}

interface DashboardProps {
  onOpenFocus: () => void;
  onOpenInsights: () => void;
}

export function Dashboard({ onOpenFocus, onOpenInsights }: DashboardProps) {
  const [activeView, setActiveView] = useState('mission');
  const [energyLevel, setEnergyLevel] = useState<'low' | 'steady' | 'full'>('steady');
  const [showAddMission, setShowAddMission] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Deep Work Block — Design System',
      timeRange: '09:00 - 11:00',
      duration: '2h',
      status: 'CRITICAL',
      isActive: true,
      category: 'Design'
    },
    {
      id: '2',
      name: 'Chemistry Revision',
      timeRange: '11:30 - 12:00',
      duration: '30m',
      status: 'STANDARD',
      category: 'Study'
    },
    {
      id: '3',
      name: 'Team Sync Call',
      timeRange: '14:00 - 14:30',
      duration: '30m',
      status: 'STANDARD',
      category: 'Meeting'
    },
    {
      id: '4',
      name: 'Review Pull Requests',
      timeRange: '15:00 - 15:45',
      duration: '45m',
      status: 'LOW ORBIT',
      category: 'Code Review'
    }
  ]);

  const [newMission, setNewMission] = useState({
    name: '',
    timeRange: '',
    duration: '',
    status: 'STANDARD' as Task['status'],
    category: 'General'
  });

  const alerts: Alert[] = [
    {
      id: '1',
      time: 'T–120 min',
      message: "You'll need 30 mins for Chemistry revision"
    },
    {
      id: '2',
      time: 'T–30 min',
      message: 'Start wrapping up current activity'
    },
    {
      id: '3',
      time: 'T–0',
      message: 'Mission start — Deep Work Block'
    }
  ];

  const scheduledTime = 8.5;
  const availableTime = 5;
  const isOverloaded = scheduledTime > availableTime;

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'CRITICAL':
        return '#e76f51';
      case 'STANDARD':
        return '#3a7d7c';
      case 'LOW ORBIT':
        return '#9ca39d';
    }
  };

  const menuItems = [
    { id: 'mission', label: "Today's Mission", icon: Target },
    { id: 'radar', label: 'Task Radar', icon: Radar },
    { id: 'energy', label: 'Energy Levels', icon: Zap },
    { id: 'logs', label: 'Mission Logs', icon: BookOpen }
  ];

  const handleAddMission = () => {
    if (!newMission.name || !newMission.timeRange || !newMission.duration) {
      return;
    }

    const mission: Task = {
      id: String(tasks.length + 1),
      name: newMission.name,
      timeRange: newMission.timeRange,
      duration: newMission.duration,
      status: newMission.status,
      category: newMission.category
    };

    setTasks([...tasks, mission]);
    setShowAddMission(false);
    setNewMission({
      name: '',
      timeRange: '',
      duration: '',
      status: 'STANDARD',
      category: 'General'
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDEBAR - Command Panel */}
      <div 
        className="w-64 border-r flex flex-col"
        style={{ 
          background: '#161b18',
          borderColor: 'rgba(138, 148, 142, 0.15)'
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(138, 148, 142, 0.15)' }}>
          <span 
            className="text-xl tracking-wide"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            TimePilot
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (item.id === 'logs') onOpenInsights();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(231, 111, 81, 0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid #e76f51' : '3px solid transparent',
                  color: isActive ? '#e76f51' : '#9ca39d'
                }}
              >
                <Icon className="w-5 h-5" />
                <span style={{ fontFamily: 'var(--font-body)' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* CENTER PANEL - Mission Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          {activeView === 'mission' && (
            <>
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2rem'
                    }}
                  >
                    Mission Timeline
                  </h2>
                  <p style={{ color: '#9ca39d', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                    Tuesday, January 27, 2026
                  </p>
                </div>
                <button
                  onClick={() => setShowAddMission(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    background: '#e76f51',
                    color: '#0f1412',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Log New Mission
                </button>
              </div>

              {/* Task Cards */}
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="relative rounded-lg border p-5 transition-all duration-300 cursor-pointer group"
                    style={{
                      background: '#1a1f1c',
                      borderColor: task.isActive ? getStatusColor(task.status) : 'rgba(138, 148, 142, 0.15)',
                      boxShadow: task.isActive 
                        ? `0 0 24px ${getStatusColor(task.status)}40` 
                        : '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                    onClick={() => task.isActive && onOpenFocus()}
                  >
                    {/* Active indicator */}
                    {task.isActive && (
                      <div 
                        className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse"
                        style={{ background: getStatusColor(task.status) }}
                      />
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <h3 
                        className="flex-1"
                        style={{ 
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.125rem'
                        }}
                      >
                        {task.name}
                      </h3>
                      <ChevronRight 
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#9ca39d' }}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2" style={{ color: '#9ca39d' }}>
                        <Clock className="w-4 h-4" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                          {task.timeRange}
                        </span>
                      </div>
                      
                      <div 
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ 
                          background: `${getStatusColor(task.status)}20`,
                          color: getStatusColor(task.status),
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {task.duration}
                      </div>

                      <div 
                        className="px-3 py-1 rounded-full text-xs ml-auto"
                        style={{ 
                          background: `${getStatusColor(task.status)}15`,
                          color: getStatusColor(task.status),
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {task.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeView === 'radar' && (
            <>
              <div className="mb-8">
                <h2 
                  className="mb-1"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem'
                  }}
                >
                  Task Radar
                </h2>
                <p style={{ color: '#9ca39d', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                  Proximity detection and priority mapping
                </p>
              </div>

              {/* Radar visualization */}
              <div className="mb-8 relative aspect-square max-w-md mx-auto">
                <div 
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: 'rgba(138, 148, 142, 0.2)' }}
                />
                <div 
                  className="absolute inset-[20%] rounded-full border"
                  style={{ borderColor: 'rgba(138, 148, 142, 0.15)' }}
                />
                <div 
                  className="absolute inset-[40%] rounded-full border"
                  style={{ borderColor: 'rgba(138, 148, 142, 0.15)' }}
                />
                
                {/* Center point */}
                <div 
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{ background: '#3a7d7c' }}
                />

                {/* Task blips */}
                <div 
                  className="absolute w-4 h-4 rounded-full"
                  style={{ 
                    top: '30%', 
                    left: '40%',
                    background: '#e76f51',
                    boxShadow: '0 0 12px rgba(231, 111, 81, 0.6)'
                  }}
                />
                <div 
                  className="absolute w-3 h-3 rounded-full"
                  style={{ 
                    top: '45%', 
                    left: '65%',
                    background: '#3a7d7c',
                    boxShadow: '0 0 8px rgba(58, 125, 124, 0.6)'
                  }}
                />
                <div 
                  className="absolute w-3 h-3 rounded-full"
                  style={{ 
                    top: '60%', 
                    left: '35%',
                    background: '#3a7d7c',
                    boxShadow: '0 0 8px rgba(58, 125, 124, 0.6)'
                  }}
                />
                <div 
                  className="absolute w-2 h-2 rounded-full"
                  style={{ 
                    top: '70%', 
                    left: '55%',
                    background: '#9ca39d',
                    boxShadow: '0 0 6px rgba(156, 163, 157, 0.4)'
                  }}
                />

                {/* Crosshairs */}
                <div 
                  className="absolute top-1/2 left-0 right-0 h-px"
                  style={{ background: 'rgba(138, 148, 142, 0.2)' }}
                />
                <div 
                  className="absolute top-0 bottom-0 left-1/2 w-px"
                  style={{ background: 'rgba(138, 148, 142, 0.2)' }}
                />
              </div>

              {/* Task list by category */}
              <div className="space-y-6">
                {['Design', 'Study', 'Meeting', 'Code Review'].map((category) => {
                  const categoryTasks = tasks.filter(t => t.category === category);
                  if (categoryTasks.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 
                        className="mb-3"
                        style={{ 
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1rem',
                          color: '#9ca39d'
                        }}
                      >
                        {category} Sector
                      </h3>
                      <div className="space-y-2">
                        {categoryTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-4 rounded-lg border"
                            style={{
                              background: '#1a1f1c',
                              borderColor: 'rgba(138, 148, 142, 0.15)'
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ background: getStatusColor(task.status) }}
                              />
                              <span style={{ fontFamily: 'var(--font-body)' }}>
                                {task.name}
                              </span>
                            </div>
                            <span 
                              style={{ 
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.875rem',
                                color: '#9ca39d'
                              }}
                            >
                              {task.timeRange}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeView === 'energy' && (
            <>
              <div className="mb-8">
                <h2 
                  className="mb-1"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem'
                  }}
                >
                  Energy Levels
                </h2>
                <p style={{ color: '#9ca39d', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                  Configure crew capacity and optimal performance windows
                </p>
              </div>

              {/* Current Energy Status */}
              <div 
                className="mb-8 p-8 rounded-lg border text-center"
                style={{
                  background: '#1a1f1c',
                  borderColor: 'rgba(138, 148, 142, 0.15)'
                }}
              >
                <div 
                  className="inline-block mb-4"
                  style={{ 
                    color: energyLevel === 'full' ? '#81a892' : energyLevel === 'steady' ? '#3a7d7c' : '#f2cc8f'
                  }}
                >
                  {energyLevel === 'full' ? (
                    <BatteryFull className="w-20 h-20" />
                  ) : energyLevel === 'steady' ? (
                    <BatteryMedium className="w-20 h-20" />
                  ) : (
                    <Battery className="w-20 h-20" />
                  )}
                </div>
                <h3 
                  className="mb-2"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem'
                  }}
                >
                  {energyLevel === 'full' ? 'Full Charge' : energyLevel === 'steady' ? 'Steady' : 'Low Power'}
                </h3>
                <p style={{ color: '#9ca39d', fontSize: '0.9375rem' }}>
                  {energyLevel === 'full' 
                    ? 'Optimal conditions for critical missions'
                    : energyLevel === 'steady'
                    ? 'Standard operational capacity'
                    : 'Consider rescheduling non-essential tasks'}
                </p>
              </div>

              {/* Energy Selection */}
              <div 
                className="mb-8 p-6 rounded-lg border"
                style={{
                  background: '#1a1f1c',
                  borderColor: 'rgba(138, 148, 142, 0.15)'
                }}
              >
                <h4 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem'
                  }}
                >
                  Set Current Energy Level
                </h4>
                
                <div className="space-y-3">
                  {(['low', 'steady', 'full'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setEnergyLevel(level)}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-all"
                      style={{
                        background: energyLevel === level ? 'rgba(58, 125, 124, 0.2)' : 'transparent',
                        border: energyLevel === level ? '2px solid #3a7d7c' : '2px solid transparent'
                      }}
                    >
                      <Circle 
                        className="w-5 h-5"
                        style={{ 
                          fill: energyLevel === level ? '#3a7d7c' : 'transparent',
                          color: energyLevel === level ? '#3a7d7c' : '#9ca39d'
                        }}
                      />
                      <div className="flex-1 text-left">
                        <div 
                          style={{ 
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem',
                            color: energyLevel === level ? '#e8e9e5' : '#9ca39d',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {level === 'low' ? 'Low Power' : level === 'steady' ? 'Steady' : 'Full Charge'}
                        </div>
                        <div 
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.875rem',
                            color: '#9ca39d'
                          }}
                        >
                          {level === 'low' 
                            ? 'Minimum capacity mode'
                            : level === 'steady'
                            ? 'Normal operations'
                            : 'Maximum performance available'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy patterns */}
              <div 
                className="p-6 rounded-lg border"
                style={{
                  background: '#1a1f1c',
                  borderColor: 'rgba(138, 148, 142, 0.15)'
                }}
              >
                <h4 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem'
                  }}
                >
                  Detected Energy Pattern
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#9ca39d', fontSize: '0.875rem' }}>Morning (6AM-12PM)</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <div 
                          key={i}
                          className="w-2 h-6 rounded-sm"
                          style={{ 
                            background: i <= 4 ? '#81a892' : '#2a302d'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#9ca39d', fontSize: '0.875rem' }}>Afternoon (12PM-6PM)</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <div 
                          key={i}
                          className="w-2 h-6 rounded-sm"
                          style={{ 
                            background: i <= 3 ? '#3a7d7c' : '#2a302d'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#9ca39d', fontSize: '0.875rem' }}>Evening (6PM-12AM)</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <div 
                          key={i}
                          className="w-2 h-6 rounded-sm"
                          style={{ 
                            background: i <= 2 ? '#f2cc8f' : '#2a302d'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - Incoming Signals & Widgets */}
      <div 
        className="w-80 border-l overflow-y-auto"
        style={{ 
          background: '#161b18',
          borderColor: 'rgba(138, 148, 142, 0.15)'
        }}
      >
        <div className="p-6 space-y-6">
          {/* Incoming Signals */}
          <div>
            <h3 
              className="mb-4"
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1.125rem'
              }}
            >
              Incoming Signals
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg border-l-2"
                  style={{
                    background: 'rgba(242, 204, 143, 0.08)',
                    borderLeftColor: '#f2cc8f',
                    boxShadow: '0 0 12px rgba(242, 204, 143, 0.1)'
                  }}
                >
                  <div 
                    className="mb-1"
                    style={{ 
                      color: '#f2cc8f',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {alert.time}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#e8e9e5' }}>
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Capacity Check */}
          <div 
            className="p-4 rounded-lg border"
            style={{
              background: '#1a1f1c',
              borderColor: isOverloaded ? '#e76f51' : 'rgba(138, 148, 142, 0.15)'
            }}
          >
            <h4 
              className="mb-3"
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem'
              }}
            >
              Capacity Check
            </h4>
            
            <div className="mb-3">
              <div className="flex justify-between mb-2" style={{ fontSize: '0.875rem' }}>
                <span style={{ color: '#9ca39d' }}>Available Time</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{availableTime}h</span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ background: '#2a302d' }}
              >
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((scheduledTime / availableTime) * 100, 100)}%`,
                    background: isOverloaded ? '#e76f51' : '#3a7d7c'
                  }}
                />
              </div>
              <div className="flex justify-between mt-2" style={{ fontSize: '0.875rem' }}>
                <span style={{ color: '#9ca39d' }}>Scheduled</span>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    color: isOverloaded ? '#e76f51' : '#3a7d7c'
                  }}
                >
                  {scheduledTime}h
                </span>
              </div>
            </div>

            {isOverloaded && (
              <p 
                style={{ 
                  fontSize: '0.875rem',
                  color: '#e76f51',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: '1.5'
                }}
              >
                You scheduled 8h 30m into a 5h window. Recommend offloading 2 low-priority tasks.
              </p>
            )}
          </div>

          {/* Energy Selector */}
          <div 
            className="p-4 rounded-lg border"
            style={{
              background: '#1a1f1c',
              borderColor: 'rgba(138, 148, 142, 0.15)'
            }}
          >
            <h4 
              className="mb-3"
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem'
              }}
            >
              Crew Energy Status
            </h4>
            
            <div className="space-y-2">
              {(['low', 'steady', 'full'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setEnergyLevel(level)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
                  style={{
                    background: energyLevel === level ? 'rgba(58, 125, 124, 0.2)' : 'transparent',
                    border: energyLevel === level ? '1px solid #3a7d7c' : '1px solid transparent'
                  }}
                >
                  <Circle 
                    className="w-4 h-4"
                    style={{ 
                      fill: energyLevel === level ? '#3a7d7c' : 'transparent',
                      color: energyLevel === level ? '#3a7d7c' : '#9ca39d'
                    }}
                  />
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: energyLevel === level ? '#e8e9e5' : '#9ca39d'
                    }}
                  >
                    {level === 'low' ? 'Low Power' : level === 'steady' ? 'Steady' : 'Full Charge'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Mission Dialog */}
      {showAddMission && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(15, 20, 18, 0.9)' }}
          onClick={() => setShowAddMission(false)}
        >
          <div 
            className="relative w-full max-w-lg p-8 rounded-lg border"
            style={{
              background: '#1a1f1c',
              borderColor: 'rgba(138, 148, 142, 0.2)',
              boxShadow: '0 0 40px rgba(58, 125, 124, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAddMission(false)}
              className="absolute top-6 right-6 p-2 rounded-lg transition-colors"
              style={{
                background: 'rgba(138, 148, 142, 0.1)',
                color: '#9ca39d'
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h3 
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem'
              }}
            >
              Log New Mission
            </h3>

            {/* Form */}
            <div className="space-y-4">
              {/* Mission Name */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#9ca39d'
                  }}
                >
                  Mission Name
                </label>
                <input
                  type="text"
                  value={newMission.name}
                  onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
                  placeholder="Enter mission name"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    background: '#0f1412',
                    borderColor: 'rgba(138, 148, 142, 0.2)',
                    color: '#e8e9e5',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>

              {/* Time Range */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#9ca39d'
                  }}
                >
                  Time Range
                </label>
                <input
                  type="text"
                  value={newMission.timeRange}
                  onChange={(e) => setNewMission({ ...newMission, timeRange: e.target.value })}
                  placeholder="e.g., 09:00 - 11:00"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    background: '#0f1412',
                    borderColor: 'rgba(138, 148, 142, 0.2)',
                    color: '#e8e9e5',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              {/* Duration */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#9ca39d'
                  }}
                >
                  Duration
                </label>
                <input
                  type="text"
                  value={newMission.duration}
                  onChange={(e) => setNewMission({ ...newMission, duration: e.target.value })}
                  placeholder="e.g., 2h or 45m"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    background: '#0f1412',
                    borderColor: 'rgba(138, 148, 142, 0.2)',
                    color: '#e8e9e5',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#9ca39d'
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  value={newMission.category}
                  onChange={(e) => setNewMission({ ...newMission, category: e.target.value })}
                  placeholder="e.g., Design, Study, Meeting"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    background: '#0f1412',
                    borderColor: 'rgba(138, 148, 142, 0.2)',
                    color: '#e8e9e5',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>

              {/* Priority Status */}
              <div>
                <label 
                  className="block mb-3"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#9ca39d'
                  }}
                >
                  Priority Status
                </label>
                <div className="flex gap-3">
                  {(['CRITICAL', 'STANDARD', 'LOW ORBIT'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setNewMission({ ...newMission, status })}
                      className="flex-1 px-4 py-3 rounded-lg border transition-all"
                      style={{
                        background: newMission.status === status ? `${getStatusColor(status)}20` : 'transparent',
                        borderColor: newMission.status === status ? getStatusColor(status) : 'rgba(138, 148, 142, 0.2)',
                        color: newMission.status === status ? getStatusColor(status) : '#9ca39d',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddMission(false)}
                  className="flex-1 px-4 py-3 rounded-lg border transition-colors"
                  style={{
                    background: 'transparent',
                    borderColor: 'rgba(138, 148, 142, 0.2)',
                    color: '#9ca39d',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMission}
                  className="flex-1 px-4 py-3 rounded-lg transition-colors"
                  style={{
                    background: '#e76f51',
                    color: '#0f1412',
                    fontFamily: 'var(--font-heading)',
                    border: 'none'
                  }}
                >
                  Log Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}