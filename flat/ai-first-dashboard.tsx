import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AiFirstDashboard = () => {
  // Development speed data (from document)
  const speedComparisonData = [
    { name: 'Traditional', speed: 1, color: '#94a3b8' },
    { name: 'AI-Assisted', speed: 2, color: '#60a5fa' },
    { name: 'AI-First', speed: 10, color: '#3b82f6' },
  ];

  // Task acceleration data (from document)
  const taskAccelerationData = [
    { name: 'Boilerplate/Scaffolding', factor: 15, category: 'Highest' },
    { name: 'Standard Components', factor: 15, category: 'Highest' },
    { name: 'Unit Test Generation', factor: 12, category: 'Highest' },
    { name: 'Documentation', factor: 15, category: 'Highest' },
    { name: 'Language Translation', factor: 12, category: 'Highest' },
    { name: 'Business Logic', factor: 4, category: 'Moderate' },
    { name: 'Common Debugging', factor: 4, category: 'Moderate' },
    { name: 'Refactoring', factor: 4, category: 'Moderate' },
    { name: 'Integration Tests', factor: 3.5, category: 'Moderate' },
    { name: 'UI Components', factor: 3, category: 'Moderate' },
    { name: 'Novel Algorithms', factor: 1.8, category: 'Lower' },
    { name: 'Complex Debugging', factor: 1.5, category: 'Lower' },
    { name: 'Performance-Critical Code', factor: 1.7, category: 'Lower' },
    { name: 'Complex UI Interactions', factor: 1.5, category: 'Lower' },
    { name: 'Deep Domain Knowledge', factor: 1.5, category: 'Lower' },
  ];

  // Sort task acceleration data by factor
  const sortedTaskData = [...taskAccelerationData].sort((a, b) => b.factor - a.factor);
  
  // Top 8 tasks for the chart
  const topTasksData = sortedTaskData.slice(0, 8);

  // Error reduction iteration data (from document)
  const iterationData = [
    { name: 'First Run', accuracy: 80 },
    { name: 'Second Iteration', accuracy: 95 },
    { name: 'Third Iteration', accuracy: 98 },
    { name: 'Fourth Iteration', accuracy: 99 },
    { name: 'Fifth Iteration', accuracy: 99.5 },
    { name: 'Human Review', accuracy: 100 },
  ];

  // Role comparison data
  const roleComparisonData = [
    {
      category: 'Traditional',
      coding: 70,
      review: 10,
      architecture: 10,
      testing: 10
    },
    {
      category: 'AI-Assisted',
      coding: 40,
      review: 20,
      architecture: 25,
      testing: 15
    },
    {
      category: 'AI-First',
      coding: 15,
      review: 35,
      architecture: 40,
      testing: 10
    }
  ];

  // ROI data (from document)
  const roiData = [
    { name: 'Average', value: 3.5 },
    { name: 'Top Performers', value: 8 }
  ];
  
  const COLORS = ['#3b82f6', '#93c5fd'];

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">AI-First Development Dashboard</h1>
        <p className="text-lg text-gray-600">Key metrics and insights from AI-First workflows</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Development Speed Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Development Speed Multiplier</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={speedComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Speed Multiplier (×)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}×`, 'Speed Multiplier']} />
                <Bar dataKey="speed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Acceleration Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Task Acceleration Factors (Top 8)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topTasksData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: 'Acceleration Factor (×)', position: 'insideBottom', offset: -5 }} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => [`${value}×`, 'Acceleration Factor']} />
                <Bar dataKey="factor" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Reduction Through Iterations */}
        <Card>
          <CardHeader>
            <CardTitle>Error Reduction Through Iterations</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={iterationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[75, 100]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Developer Time Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Developer Time Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roleComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                stackOffset="expand"
                layout="vertical"
                barCategoryGap={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="category" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, 'Time Spent']} />
                <Legend />
                <Bar dataKey="coding" name="Writing Code" stackId="a" fill="#3b82f6" />
                <Bar dataKey="review" name="Code Review" stackId="a" fill="#93c5fd" />
                <Bar dataKey="architecture" name="Architecture & Design" stackId="a" fill="#60a5fa" />
                <Bar dataKey="testing" name="Testing" stackId="a" fill="#bfdbfe" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI on AI Investments */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Return on AI Development Investment</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-around w-full">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roiData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}×`}
                    >
                      {roiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}×`, 'ROI Multiple']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="md:w-1/2 p-4">
                <h3 className="text-lg font-semibold mb-2">Key ROI Factors:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Tool costs (~$10/developer/month) are modest compared to productivity gains</li>
                  <li>Training investment typically takes days to weeks, not months</li>
                  <li>Highest ROI when time-to-market is critical or development talent is scarce</li>
                  <li>Projects with substantial boilerplate or repetitive logic see greater returns</li>
                  <li>Risk-adjusted ROI remains strongly positive in most scenarios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-First Development Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Generation-Debugging Batch Method</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Day 1:</span>
                  <span>Focus entirely on creating new code, features, or modules with AI assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Day 2:</span>
                  <span>Systematically test, refine, and improve the code generated on Day 1</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Benefits:</span>
                  <span>Reduced context-switching, focused creative output, systematic error correction</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Key Implementation Components</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Multi-LLM Review:</span>
                  <span>Different AI models for different roles (coder, reviewer, tester)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Large Codebase Management:</span>
                  <span>Chunking, metadata extraction, and context optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Workflow Automation:</span>
                  <span>Continuous documentation, testing, and improvement cycles</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiFirstDashboard;
