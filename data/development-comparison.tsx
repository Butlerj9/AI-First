import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const DevelopmentComparison = () => {
  // Updated development metrics data with an overall category
  const developmentMetricsData = [
    { 
      metric: 'Overall Performance', 
      traditional: 1, 
      aiAssisted: 1.5, 
      aiFirst: 6, 
      description: 'Aggregate performance across various metrics' 
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

  // Radar chart configuration
  const radarChartData = [
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
      subject: 'Verification Efficiency',
      traditional: 70,
      aiAssisted: 65,
      aiFirst: 40,
      fullMark: 100,
    },
    {
      subject: 'Knowledge Efficiency',
      traditional: 90,
      aiAssisted: 75,
      aiFirst: 60,
      fullMark: 100,
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Development Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Development Productivity Metrics</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={developmentMetricsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis 
                  label={{ 
                    value: 'Relative Improvement (×)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -10 
                  }} 
                />
                <Tooltip 
                  formatter={(value) => [`${value}×`, 'Multiplier']} 
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                <Bar dataKey="traditional" name="Traditional" fill="#FF5252" />
                <Bar dataKey="aiAssisted" name="AI-Assisted" fill="#4CAF50" />
                <Bar dataKey="aiFirst" name="AI-First" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart for Role Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Development Approach Comparison</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                outerRadius="90%" 
                data={radarChartData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
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
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevelopmentComparison;