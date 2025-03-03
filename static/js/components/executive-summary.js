// Enhanced-executive-summary.js - Place this in static/js/components/ directory
const ExecutiveSummary = () => {
  // Using createElement for compatibility
  return React.createElement('div', { className: 'flex flex-col gap-6 p-4' },
    // Title section with improved styling
    React.createElement('div', { className: 'text-center mb-6' },
      React.createElement('h1', { className: 'text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600' }, 'AI-First Development'),
      React.createElement('p', { className: 'text-lg text-gray-600 dark:text-gray-300 mt-2' }, 'Executive Summary & Business Case')
    ),
    
    // Main summary card with visual indicators
    React.createElement('div', { className: 'card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 dark:bg-opacity-20 shadow-lg' },
      React.createElement('div', { className: 'p-6' },
        React.createElement('h2', { className: 'text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center' }, 
          React.createElement('svg', { className: 'w-8 h-8 mr-3 text-blue-600', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
            React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M13 10V3L4 14h7v7l9-11h-7z' })
          ),
          'Executive Summary'
        ),
        React.createElement('p', { className: 'text-lg mb-6 leading-relaxed' },
          'AI-first development fundamentally transforms how software is created, resulting in ',
          React.createElement('span', { className: 'font-semibold text-blue-700 dark:text-blue-300' }, '5-50× productivity improvements'),
          ' while potentially enhancing quality. This represents a step-change in development capabilities that organizations can no longer afford to ignore.'
        ),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mt-8' },
          // Why Now?
          React.createElement('div', { className: 'relative border-l-4 border-blue-500 pl-4 py-3 bg-white dark:bg-gray-800 rounded-r shadow-sm' },
            React.createElement('div', { className: 'absolute -left-3 -top-3 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold' }, '1'),
            React.createElement('h3', { className: 'font-bold text-lg mb-2 text-blue-700 dark:text-blue-300' }, 'Why Now?'),
            React.createElement('p', { className: 'text-gray-700 dark:text-gray-300' },
              'Modern LLMs have reached the ',
              React.createElement('span', { className: 'font-medium' }, '90% code correctness threshold'),
              ' in first-pass generation. This capability milestone enables fundamentally different workflows beyond just assistance.'
            )
          ),
          
          // Business Impact
          React.createElement('div', { className: 'relative border-l-4 border-blue-500 pl-4 py-3 bg-white dark:bg-gray-800 rounded-r shadow-sm' },
            React.createElement('div', { className: 'absolute -left-3 -top-3 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold' }, '2'),
            React.createElement('h3', { className: 'font-bold text-lg mb-2 text-blue-700 dark:text-blue-300' }, 'Business Impact'),
            React.createElement('p', { className: 'text-gray-700 dark:text-gray-300' },
              'Organizations implementing AI-first development report ',
              React.createElement('span', { className: 'font-medium' }, '10-20× productivity gains'),
              ' for standard tasks, dramatically faster time-to-market, and improved developer satisfaction.'
            )
          ),
          
          // Competitive Edge
          React.createElement('div', { className: 'relative border-l-4 border-blue-500 pl-4 py-3 bg-white dark:bg-gray-800 rounded-r shadow-sm' },
            React.createElement('div', { className: 'absolute -left-3 -top-3 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold' }, '3'),
            React.createElement('h3', { className: 'font-bold text-lg mb-2 text-blue-700 dark:text-blue-300' }, 'Competitive Edge'),
            React.createElement('p', { className: 'text-gray-700 dark:text-gray-300' },
              'Early adopters are creating ',
              React.createElement('span', { className: 'font-medium' }, '10× more features'),
              ' with the same team size. This represents a strategic advantage that will be increasingly difficult to overcome as the gap widens.'
            )
          )
        )
      )
    ),
    
    // Benefits and roadmap grid with improved visualization
    React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
      // Key Benefits card with visual icons
      React.createElement('div', { className: 'card shadow-md' },
        React.createElement('div', { className: 'p-6' },
          React.createElement('h2', { className: 'text-xl font-semibold mb-4 flex items-center' },
            React.createElement('svg', { className: 'w-6 h-6 mr-2 text-green-500', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
              React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
            ),
            'Key Benefits'
          ),
          React.createElement('ul', { className: 'space-y-4' },
            React.createElement('li', { className: 'flex items-start' },
              React.createElement('span', { className: 'flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mt-0.5' }, '✓'),
              React.createElement('div', { className: 'ml-3' },
                React.createElement('span', { className: 'font-semibold block text-green-700 dark:text-green-400' }, 'Dramatic Productivity Gains'),
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, '5-50× acceleration depending on task complexity')
              )
            ),
            React.createElement('li', { className: 'flex items-start' },
              React.createElement('span', { className: 'flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mt-0.5' }, '✓'),
              React.createElement('div', { className: 'ml-3' },
                React.createElement('span', { className: 'font-semibold block text-green-700 dark:text-green-400' }, 'Faster Time to Market'),
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Features that took weeks now take days or hours')
              )
            ),
            React.createElement('li', { className: 'flex items-start' },
              React.createElement('span', { className: 'flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mt-0.5' }, '✓'),
              React.createElement('div', { className: 'ml-3' },
                React.createElement('span', { className: 'font-semibold block text-green-700 dark:text-green-400' }, 'Better Design Exploration'),
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Multiple architectures can be tested in parallel')
              )
            ),
            React.createElement('li', { className: 'flex items-start' },
              React.createElement('span', { className: 'flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mt-0.5' }, '✓'),
              React.createElement('div', { className: 'ml-3' },
                React.createElement('span', { className: 'font-semibold block text-green-700 dark:text-green-400' }, 'Comprehensive Testing'),
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'More time for test creation and edge case handling')
              )
            ),
            React.createElement('li', { className: 'flex items-start' },
              React.createElement('span', { className: 'flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mt-0.5' }, '✓'),
              React.createElement('div', { className: 'ml-3' },
                React.createElement('span', { className: 'font-semibold block text-green-700 dark:text-green-400' }, 'Knowledge Democratization'),
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Contextual assistance reduces knowledge silos')
              )
            )
          )
        )
      ),
      
      // Implementation Roadmap card with visual timeline
      React.createElement('div', { className: 'card shadow-md' },
        React.createElement('div', { className: 'p-6' },
          React.createElement('h2', { className: 'text-xl font-semibold mb-4 flex items-center' },
            React.createElement('svg', { className: 'w-6 h-6 mr-2 text-blue-500', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
              React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' })
            ),
            'Implementation Roadmap'
          ),
          React.createElement('div', { className: 'relative pl-10 space-y-5 pt-2 before:absolute before:top-2 before:left-4 before:h-full before:w-0.5 before:bg-blue-200 dark:before:bg-blue-700 before:-bottom-6' },
            // Phase 1
            React.createElement('div', { className: 'relative' },
              React.createElement('div', { className: 'absolute -left-6 top-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm z-10' }, '1'),
              React.createElement('div', { className: 'bg-white dark:bg-gray-800 p-3 rounded shadow-sm border-l-4 border-blue-500' },
                React.createElement('h3', { className: 'font-semibold text-lg text-blue-700 dark:text-blue-300' }, 'Foundation (1-2 months)'),
                React.createElement('p', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Select tools, provide initial training, identify pilot projects, establish metrics')
              )
            ),
            // Phase 2
            React.createElement('div', { className: 'relative' },
              React.createElement('div', { className: 'absolute -left-6 top-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm z-10' }, '2'),
              React.createElement('div', { className: 'bg-white dark:bg-gray-800 p-3 rounded shadow-sm border-l-4 border-blue-500' },
                React.createElement('h3', { className: 'font-semibold text-lg text-blue-700 dark:text-blue-300' }, 'Pilot (2-3 months)'),
                React.createElement('p', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Implement AI-assisted workflows on pilot projects, develop testing frameworks')
              )
            ),
            // Phase 3
            React.createElement('div', { className: 'relative' },
              React.createElement('div', { className: 'absolute -left-6 top-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm z-10' }, '3'),
              React.createElement('div', { className: 'bg-white dark:bg-gray-800 p-3 rounded shadow-sm border-l-4 border-blue-500' },
                React.createElement('h3', { className: 'font-semibold text-lg text-blue-700 dark:text-blue-300' }, 'Scaling (3-6 months)'),
                React.createElement('p', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Expand to more teams, integrate into CI/CD, implement multi-LLM workflows')
              )
            ),
            // Phase 4
            React.createElement('div', { className: 'relative' },
              React.createElement('div', { className: 'absolute -left-6 top-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm z-10' }, '4'),
              React.createElement('div', { className: 'bg-white dark:bg-gray-800 p-3 rounded shadow-sm border-l-4 border-blue-500' },
                React.createElement('h3', { className: 'font-semibold text-lg text-blue-700 dark:text-blue-300' }, 'Advanced (6+ months)'),
                React.createElement('p', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Deploy self-healing systems, implement continuous improvement via AI analysis')
              )
            )
          )
        )
      )
    ),
    
    // ROI card with improved visualization
    React.createElement('div', { className: 'card shadow-md' },
      React.createElement('div', { className: 'p-6' },
        React.createElement('h2', { className: 'text-xl font-semibold mb-4 flex items-center' },
          React.createElement('svg', { className: 'w-6 h-6 mr-2 text-green-500', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
            React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
          ),
          'ROI & Business Case'
        ),
        React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-5' },
          React.createElement('div', { className: 'relative overflow-hidden border rounded-lg p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 dark:bg-opacity-20 dark:border-green-700 shadow-sm' },
            React.createElement('div', { className: 'absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold' }, 'IMMEDIATE'),
            React.createElement('h3', { className: 'text-lg font-semibold mb-2 text-green-700 dark:text-green-300 mt-5' }, 'First 3 Months'),
            React.createElement('div', { className: 'border-t pt-2 border-green-200 dark:border-green-700' },
              React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Tool Cost'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-medium' }, '~$10/dev/month')
              ),
              React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Productivity Boost'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-medium' }, '3-5×')
              ),
              React.createElement('div', { className: 'flex justify-between items-center' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Typical ROI'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-semibold' }, '2-3× investment')
              )
            )
          ),
          React.createElement('div', { className: 'relative overflow-hidden border rounded-lg p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 dark:bg-opacity-20 dark:border-green-700 shadow-sm' },
            React.createElement('div', { className: 'absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold' }, 'MEDIUM-TERM'),
            React.createElement('h3', { className: 'text-lg font-semibold mb-2 text-green-700 dark:text-green-300 mt-5' }, '6-12 Months'),
            React.createElement('div', { className: 'border-t pt-2 border-green-200 dark:border-green-700' },
              React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Productivity Boost'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-medium' }, '10× for standard tasks')
              ),
              React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Time to Market'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-medium' }, '30-50% faster')
              ),
              React.createElement('div', { className: 'flex justify-between items-center' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Typical ROI'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-semibold' }, '5-8× investment')
              )
            )
          ),
          React.createElement('div', { className: 'relative overflow-hidden border rounded-lg p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 dark:bg-opacity-20 dark:border-green-700 shadow-sm' },
            React.createElement('div', { className: 'absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 text-xs font-bold' }, 'LONG-TERM'),
            React.createElement('h3', { className: 'text-lg font-semibold mb-2 text-green-700 dark:text-green-300 mt-5' }, 'Beyond 12 Months'),
            React.createElement('div', { className: 'border-t pt-2 border-green-200 dark:border-green-700' },
              React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Team Capabilities'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-medium' }, 'Expand without headcount')
              ),
              React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Competitive Advantage'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-medium' }, 'Significant')
              ),
              React.createElement('div', { className: 'flex justify-between items-center' },
                React.createElement('span', { className: 'text-gray-600 dark:text-gray-300 text-sm' }, 'Typical ROI'),
                React.createElement('span', { className: 'text-green-700 dark:text-green-300 font-semibold' }, '10×+ investment')
              )
            )
          )
        ),
        React.createElement('div', { className: 'mt-8 p-4 border border-yellow-300 bg-yellow-50 rounded-lg dark:bg-yellow-900 dark:bg-opacity-20 dark:border-yellow-700' },
          React.createElement('h3', { className: 'text-lg font-bold mb-2 flex items-center' },
            React.createElement('svg', { className: 'w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-400', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
              React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
            ),
            'The Cost of Waiting'
          ),
          React.createElement('p', { className: 'text-gray-800 dark:text-gray-200' },
            'Organizations that delay adoption face increasing competitive disadvantage. As competitors achieve 10× productivity gains, they\'ll be able to deliver features and improvements at a pace impossible to match with traditional development methods. The gap will continue to widen as AI capabilities improve and early adopters refine their methodologies.'
          )
        )
      )
    ),
    
    // Action button
    React.createElement('div', { className: 'flex justify-center mt-6' },
      React.createElement('button', { 
        className: 'px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center',
        onClick: () => {
          // Navigate to the detailed implementation guide
          const overviewTab = document.getElementById('tab-overview');
          if (overviewTab) overviewTab.click();
        }
      }, 
        React.createElement('span', {}, 'View Full AI-First Implementation Guide'),
        React.createElement('svg', { className: 'ml-2 w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
          React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M14 5l7 7m0 0l-7 7m7-7H3' })
        )
      )
    )
  );
};

// Export the component
export default ExecutiveSummary;