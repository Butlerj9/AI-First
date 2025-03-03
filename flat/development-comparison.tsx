import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const DevelopmentComparison = () => {
  // Development metrics data
  const developmentMetricsData = [
    { 
      metric: 'Task completion time', 
      traditional: 1, 
      aiAssisted: 1.75, 
      aiFirst: 10, 
      description: 'Baseline vs 1.5-2x vs 5-20x faster' 
    },
    { 
      metric: 'Features per sprint', 
      traditional: 1, 
      aiAssisted: 1.35, 
      aiFirst: 3, 
      description: 'Baseline vs 20-50% more vs 2-4x more' 
    },
    { 
      metric: 'PR completion rate', 
      traditional: 1, 
      aiAssisted: 1.26, 
      aiFirst: 3, 
      description: 'Baseline vs 26% more vs up to 3x more' 
    },
    { 
      metric: 'Time to MVP', 
      traditional: 1, 
      aiAssisted: 3, 
      aiFirst: 10, 
      description: 'Weeks/months vs days/weeks vs hours/days' 
    }
  ];

  // Custom Tooltip for both Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return React.createElement('div', { 
        style: { 
          backgroundColor: '#333', 
          color: '#fff',
          padding: '12px', 
          border: '1px solid #555',
          borderRadius: '6px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
          fontSize: '14px',
          minWidth: '160px'
        }
      },
        React.createElement('p', { 
          style: { 
            fontWeight: 'bold', 
            marginBottom: '8px',
            borderBottom: '1px solid #555',
            paddingBottom: '5px',
            color: '#e0e0e0'
          }
        }, label),
        payload.map((entry, index) => 
          React.createElement('p', { 
            key: `item-${index}`,
            style: { 
              color: entry.color || '#fff',
              margin: '4px 0',
              display: 'flex',
              justifyContent: 'space-between'
            }
          }, 
            React.createElement('span', { style: { marginRight: '10px' } }, entry.name),
            React.createElement('span', { style: { fontWeight: 'bold' } }, 
              typeof entry.formatter === 'function' 
                ? entry.formatter(entry.value) 
                : entry.unit 
                  ? `${entry.value}${entry.unit}` 
                  : `${entry.value}`
            )
          )
        )
      );
    }
    return null;
  };

  // Updated Radar Chart Colors - Using distinct colors as requested
  const radarColors = {
    traditional: "#FF5252",    // Red for Traditional
    aiAssisted: "#4CAF50",     // Green for AI-Assisted
    aiFirst: "#2196F3"         // Blue for AI-First
  };

  // Role comparison data for radar chart
  const roleComparisonData = [
    {
      subject: 'Code Generation',
      traditional: 30,
      aiAssisted: 70,
      aiFirst: 95,
      fullMark: 100,
    },
    {
      subject: 'First-Pass Accuracy',
      traditional: 70,
      aiAssisted: 78,
      aiFirst: 90,
      fullMark: 100,
    },
    {
      subject: 'Development Speed',
      traditional: 10,
      aiAssisted: 30,
      aiFirst: 90,
      fullMark: 100,
    },
    {
      subject: 'Verification Effort',
      traditional: 70,
      aiAssisted: 65,
      aiFirst: 40,
      fullMark: 100,
    },
    {
      subject: 'Knowledge Required',
      traditional: 90,
      aiAssisted: 75,
      aiFirst: 60,
      fullMark: 100,
    }
  ];
  
  // Enhanced comparison table data
  const comparisonTable = [
    {
      aspect: 'Code Generation',
      traditional: 'Manual coding with no AI help',
      aiAssisted: 'Human writes with AI suggestions',
      aiFirst: 'AI generates bulk of code with human guidance'
    },
    {
      aspect: 'Development Speed',
      traditional: 'Baseline',
      aiAssisted: '~1.5-2× faster',
      aiFirst: 'Up to 10× faster for appropriate tasks'
    },
    // ... (rest of the existing comparison table data)
  ];

  // Implementation phases
  const implementationPhases = [
    {
      phase: "Foundation (1-2 months)",
      tasks: [
        "Evaluate and select AI coding tools appropriate for your tech stack",
        "Provide initial team training on AI tool usage",
        "Identify low-risk, high-value pilot projects for AI implementation",
        "Establish baseline metrics for current development process",
        "Create initial prompt templates and guidelines"
      ]
    },
    // ... (rest of the existing implementation phases)
  ];

  // Configuration for dark mode styling
  const darkModeConfig = {
    cardBg: '#222',
    textColor: '#e0e0e0',
    borderColor: '#444',
    gridColor: '#333',
  };

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-900 text-gray-100">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-white">Development Approach Comparison</h1>
        <p className="text-lg text-gray-300">Traditional vs AI-Assisted vs AI-First</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Development Metrics Chart */}
        <Card className="bg-[#222] border-[#444] shadow-xl">
          <CardHeader className="border-b border-[#444]">
            <CardTitle className="text-gray-100">Development Productivity Metrics</CardTitle>
          </CardHeader>
          <CardContent className="h-64 bg-[#1a1a1a]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={developmentMetricsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="metric" 
                  tick={{ fill: '#e0e0e0' }}
                  axisLine={{ stroke: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <YAxis 
                  label={{ 
                    value: 'Relative Improvement (×)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#e0e0e0' }
                  }}
                  tick={{ fill: '#e0e0e0' }}
                  axisLine={{ stroke: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <Tooltip 
                  content={CustomTooltip} 
                  formatter={(value) => [`${value}×`, 'Multiplier']}
                />
                <Legend wrapperStyle={{ color: '#e0e0e0' }} />
                <Bar dataKey="traditional" name="Traditional" fill="#9e9e9e" /> {/* Gray */}
                <Bar dataKey="aiAssisted" name="AI-Assisted" fill="#60a5fa" /> {/* Light Blue */}
                <Bar dataKey="aiFirst" name="AI-First" fill="#2196F3" /> {/* Blue */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart for Role Comparison */}
        <Card className="bg-[#222] border-[#444] shadow-xl">
          <CardHeader className="border-b border-[#444]">
            <CardTitle className="text-gray-100">Development Approach Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-64 bg-[#1a1a1a]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                outerRadius={120} // Increased from 90 to make chart larger
                data={roleComparisonData}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }} // Reduced margins to give more space to chart
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <PolarGrid stroke="#444" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#e0e0e0', fontSize: 12 }}
                />
                {/* Removed visible PolarRadiusAxis */}
                <PolarRadiusAxis 
                  domain={[0, 100]} 
                  axisLine={false}
                  tick={false}
                  tickCount={0}
                  stroke="transparent"
                  radialLines={false}
                />
                <Radar 
                  name="Traditional" 
                  dataKey="traditional" 
                  stroke="#FF5252" 
                  fill="#FF5252" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="AI-Assisted" 
                  dataKey="aiAssisted" 
                  stroke="#4CAF50" 
                  fill="#4CAF50" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="AI-First" 
                  dataKey="aiFirst" 
                  stroke="#2196F3" 
                  fill="#2196F3" 
                  fillOpacity={0.6} 
                />
                <Legend 
                  iconSize={12}
                  wrapperStyle={{ 
                    paddingTop: '10px',
                    color: '#e0e0e0'
                  }}
                />
                <Tooltip 
                  content={CustomTooltip}
                  cursor={{ fill: 'transparent' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Detailed Comparison Table */}
      <Card className="bg-[#222] border-[#444] shadow-xl">
        <CardHeader className="border-b border-[#444]">
          <CardTitle className="text-gray-100">Comprehensive Development Approach Comparison</CardTitle>
        </CardHeader>
        <CardContent className="bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-gray-700 text-left text-gray-200">Aspect</th>
                  <th className="p-2 border border-gray-700 text-left text-gray-200">Traditional</th>
                  <th className="p-2 border border-gray-700 text-left text-gray-200">AI-Assisted</th>
                  <th className="p-2 border border-gray-700 text-left text-gray-200">AI-First</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    <td className="p-2 border border-gray-700 font-medium text-gray-200">{row.aspect}</td>
                    <td className="p-2 border border-gray-700 text-gray-300">{row.traditional}</td>
                    <td className="p-2 border border-gray-700 text-gray-300">{row.aiAssisted}</td>
                    <td className="p-2 border border-gray-700 text-gray-300">{row.aiFirst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Business Impact Comparison */}
      <Card className="bg-[#222] border-[#444] shadow-xl">
        <CardHeader className="border-b border-[#444]">
          <CardTitle className="text-gray-100">Business Impact Comparison</CardTitle>
        </CardHeader>
        <CardContent className="bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-gray-700 text-left text-gray-200">Business Metric</th>
                  <th className="p-2 border border-gray-700 text-left text-gray-200">Traditional</th>
                  <th className="p-2 border border-gray-700 text-left text-gray-200">AI-Assisted</th>
                  <th className="p-2 border border-gray-700 text-left text-gray-200">AI-First</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-900">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Time-to-Market</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Baseline</td>
                  <td className="p-2 border border-gray-700 text-gray-300">30-50% faster</td>
                  <td className="p-2 border border-gray-700 text-gray-300">70-90% faster</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Development Costs</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Baseline</td>
                  <td className="p-2 border border-gray-700 text-gray-300">10-20% reduction</td>
                  <td className="p-2 border border-gray-700 text-gray-300">40-60% reduction</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Feature Delivery Rate</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Baseline</td>
                  <td className="p-2 border border-gray-700 text-gray-300">1.5× improvement</td>
                  <td className="p-2 border border-gray-700 text-gray-300">3-5× improvement</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Team Scalability</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Linear with team size</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Slightly better than linear</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Sub-linear (smaller teams achieve more)</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Product Quality</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Variable</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Moderate improvement</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Significant improvement with proper testing</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Competitive Advantage</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Baseline</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Incremental improvement</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Potentially disruptive</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">ROI Timeline</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Standard</td>
                  <td className="p-2 border border-gray-700 text-gray-300">3-6 months</td>
                  <td className="p-2 border border-gray-700 text-gray-300">1-3 months</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="p-2 border border-gray-700 font-medium text-gray-200">Innovation Capacity</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Limited by resources</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Moderately improved</td>
                  <td className="p-2 border border-gray-700 text-gray-300">Dramatically expanded</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Phases */}
      <Card className="bg-[#222] border-[#444] shadow-xl">
        <CardHeader className="border-b border-[#444]">
          <CardTitle className="text-gray-100">AI-First Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="bg-[#1a1a1a]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {implementationPhases.map((phase, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">{phase.phase}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-[#222] border-[#444] shadow-xl">
        <CardHeader className="border-b border-[#444]">
          <CardTitle className="text-gray-100">Key Takeaways: AI-First Development</CardTitle>
        </CardHeader>
        <CardContent className="bg-[#1a1a1a]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-700 rounded-lg p-4 bg-blue-900 bg-opacity-20">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Productivity Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>5-20× acceleration for appropriate tasks</li>
                <li>Dramatic reduction in time-to-market</li>
                <li>More features delivered with the same team size</li>
                <li>Sub-linear team scaling with codebase growth</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-4 bg-blue-900 bg-opacity-20">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Role Evolution</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Engineers shift from writing code to orchestrating AI</li>
                <li>Focus on requirements, architecture, and quality</li>
                <li>New roles emerge: AI Engineer, Prompt Engineer</li>
                <li>Less time on implementation, more on strategy</li>
              </ul>
            </div>
            <div className="border border-gray-700 rounded-lg p-4 bg-blue-900 bg-opacity-20">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Implementation Keys</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Start with low-risk, high-value components</li>
                <li>Build testing frameworks early</li>
                <li>Implement in phases, measuring results</li>
                <li>Focus on team training and cultural adaptation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentComparison;