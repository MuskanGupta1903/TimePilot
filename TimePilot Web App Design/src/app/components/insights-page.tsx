import { ArrowLeft, TrendingUp, Clock, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface InsightsPageProps {
  onBack: () => void;
}

export function InsightsPage({ onBack }: InsightsPageProps) {
  const productivityData = [
    { hour: '8AM', value: 45 },
    { hour: '9AM', value: 72 },
    { hour: '10AM', value: 95 },
    { hour: '11AM', value: 88 },
    { hour: '12PM', value: 52 },
    { hour: '1PM', value: 38 },
    { hour: '2PM', value: 65 },
    { hour: '3PM', value: 78 },
    { hour: '4PM', value: 70 },
    { hour: '5PM', value: 55 }
  ];

  const insights = [
    {
      icon: TrendingUp,
      label: 'Most productive hour detected',
      value: '10–11 AM',
      color: '#81a892'
    },
    {
      icon: Clock,
      label: 'Average delay before starting tasks',
      value: '18 mins',
      color: '#f2cc8f'
    },
    {
      icon: Target,
      label: 'Mission streak',
      value: '3 days completing priority tasks',
      color: '#e76f51'
    },
    {
      icon: Calendar,
      label: 'Total missions completed this week',
      value: '23 tasks',
      color: '#3a7d7c'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div 
        className="border-b px-8 py-6"
        style={{ borderColor: 'rgba(138, 148, 142, 0.15)' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 transition-colors"
          style={{ color: '#9ca39d' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontFamily: 'var(--font-body)' }}>Back to Mission Control</span>
        </button>
        
        <h1 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            letterSpacing: '-0.01em'
          }}
        >
          Mission Logs
        </h1>
        <p style={{ color: '#9ca39d', marginTop: '0.5rem' }}>
          Analytics from your control room operations
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Insight Cards Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-lg border"
                style={{
                  background: '#1a1f1c',
                  borderColor: 'rgba(138, 148, 142, 0.15)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ 
                      background: `${insight.color}20`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: insight.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <p 
                      className="mb-2"
                      style={{ 
                        color: '#9ca39d',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {insight.label}
                    </p>
                    <p 
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.5rem',
                        color: insight.color
                      }}
                    >
                      {insight.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Productivity Chart */}
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: '#1a1f1c',
            borderColor: 'rgba(138, 148, 142, 0.15)'
          }}
        >
          <h3 
            className="mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem'
            }}
          >
            Productivity Pattern Analysis
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(138, 148, 142, 0.1)"
                  vertical={false}
                />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9ca39d"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem'
                  }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(138, 148, 142, 0.15)' }}
                />
                <YAxis 
                  stroke="#9ca39d"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem'
                  }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(138, 148, 142, 0.15)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3a7d7c"
                  strokeWidth={2}
                  dot={{ 
                    fill: '#3a7d7c', 
                    strokeWidth: 2,
                    r: 4
                  }}
                  activeDot={{ 
                    r: 6,
                    fill: '#e76f51'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p 
            className="mt-4"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: '#9ca39d',
              textAlign: 'center'
            }}
          >
            Peak performance detected between 10-11 AM. Schedule critical missions during this window.
          </p>
        </div>

        {/* Week Summary */}
        <div 
          className="mt-6 p-6 rounded-lg border"
          style={{
            background: '#1a1f1c',
            borderColor: 'rgba(138, 148, 142, 0.15)'
          }}
        >
          <h3 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem'
            }}
          >
            Week Summary
          </h3>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Missions Completed', value: '23/28', percentage: 82 },
              { label: 'Focus Hours', value: '18.5h', percentage: 92 },
              { label: 'On-time Starts', value: '19/23', percentage: 83 },
              { label: 'Energy Utilization', value: 'Optimal', percentage: 88 }
            ].map((stat, index) => (
              <div key={index}>
                <div 
                  className="mb-2"
                  style={{
                    color: '#9ca39d',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  {stat.label}
                </div>
                <div 
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem'
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: '#2a302d' }}
                >
                  <div 
                    className="h-full transition-all"
                    style={{ 
                      width: `${stat.percentage}%`,
                      background: stat.percentage > 85 ? '#81a892' : '#3a7d7c'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Recommendations */}
        <div 
          className="mt-6 p-6 rounded-lg border-l-2"
          style={{
            background: 'rgba(58, 125, 124, 0.08)',
            borderLeftColor: '#3a7d7c'
          }}
        >
          <h4 
            className="mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: '#3a7d7c'
            }}
          >
            System Recommendations
          </h4>
          <ul className="space-y-2" style={{ color: '#e8e9e5' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: '#3a7d7c' }}>▸</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}>
                Schedule complex tasks between 10-11 AM for optimal performance
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#3a7d7c' }}>▸</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}>
                Consider adding a 15-min buffer before mission starts to reduce delays
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#3a7d7c' }}>▸</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}>
                Your 3-day streak shows strong momentum. Protect this pattern.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
