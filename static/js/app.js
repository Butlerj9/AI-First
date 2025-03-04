// Main application JavaScript - UPDATED VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Initialize app
    initApp();
});

// Global data storage
const appData = {
    markdown: null,
    diagrams: {
        traditional: null,
        aiAssisted: null,
        aiFirst: null
    }
};

// Main initialization function
async function initApp() {
    // Set up tab navigation
    setupTabs();
    
    // Load initial data
    await Promise.all([
        loadMarkdown(),
        loadDiagrams()
    ]);
    
    // Show overview tab by default
    document.getElementById('tab-executive').click();
}

// Tab navigation setup - Make globally accessible
function setupTabs() {
    console.log('Setting up tabs');
    const tabs = document.querySelectorAll('.tab-button');
    
    // Remove existing click event listeners from all tabs
    tabs.forEach(tab => {
        const oldTab = tab;
        const newTab = oldTab.cloneNode(true);
        if (oldTab.parentNode) {
            oldTab.parentNode.replaceChild(newTab, oldTab);
        }
    });
    
    // Now add fresh event listeners to all tabs
    const refreshedTabs = document.querySelectorAll('.tab-button');
    refreshedTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab styling
            document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Get tab ID and load content
            const tabId = tab.getAttribute('data-tab');
            loadTabContent(tabId);
        });
    });
}


// Simplified and improved implementation tab function
function initImplementationTab() {
    console.log('Initializing implementation tab');
    
    // Get the content area
    const contentArea = document.getElementById('tab-content');
    if (!contentArea) {
        console.error('Content area not found');
        return;
    }
    
    // Get the implementation template
    const template = document.getElementById('implementation-template');
    if (!template) {
        console.error('Implementation template not found');
        return;
    }
    
    // Clone and append the template content
    const content = template.content.cloneNode(true);
    contentArea.innerHTML = '';
    contentArea.appendChild(content);
    
    // After template is loaded, initialize any interactive elements
    setTimeout(() => {
        const workflowDiagrams = document.querySelectorAll('.workflow-diagram');
        workflowDiagrams.forEach(diagram => {
            diagram.style.cursor = 'zoom-in';
            
            // Add click to zoom functionality
            diagram.addEventListener('click', function() {
                if (this.classList.contains('zoomed')) {
                    this.classList.remove('zoomed');
                    this.style.transform = '';
                    this.style.cursor = 'zoom-in';
                    this.style.maxWidth = '100%';
                } else {
                    this.classList.add('zoomed');
                    this.style.transform = 'scale(1.4)';
                    this.style.cursor = 'zoom-out';
                    this.style.maxWidth = '140%';
                }
            });
        });
        
        console.log('Implementation tab fully initialized');
    }, 100);
}


// Load tab content based on tab ID
function loadTabContent(tabId) {
    const contentArea = document.getElementById('tab-content');
    
    // Clear current content
    contentArea.innerHTML = '';
    
    // Get template for this tab
    const template = document.getElementById(`${tabId}-template`);
    if (!template) {
        // If using the sources tab and there's a loadSourcesContent function, call it
        if (tabId === 'sources' && typeof loadSourcesContent === 'function') {
            loadSourcesContent();
            return;
        }
        
        contentArea.innerHTML = `<div class="p-8 text-center">No template found for tab: ${tabId}</div>`;
        return;
    }
    
    // Clone template content
    const content = template.content.cloneNode(true);
    contentArea.appendChild(content);
    
    // Initialize tab-specific content
    switch (tabId) {
        case 'executive':
            initExecutiveSummaryTab();
            break;
        case 'overview':
            initOverviewTab();
            break;
        case 'dashboard':
            initDashboardTab();
            break;
        case 'implementation':
            // No special initialization needed for implementation tab
            break;
        case 'comparison':
            initComparisonTab();
            break;
        case 'workflows':
            // Now using the unified Mermaid handler
            if (typeof window.initWorkflowDiagrams === 'function') {
                window.initWorkflowDiagrams();
            } else {
                console.error('initWorkflowDiagrams function not found. Make sure unified-mermaid.js is loaded.');
            }
            break;
        case 'sources':
            // Use the external sources content loader if available
            if (typeof loadSourcesContent === 'function') {
                loadSourcesContent();
            } else {
                // Fallback to internal loader
                loadSourcesTab();
            }
            break;
    }
}

// Load markdown content
async function loadMarkdown() {
    try {
        const response = await fetch('/api/markdown');
        const data = await response.json();
        
        if (data.error) {
            console.error('Error loading markdown:', data.error);
            return;
        }
        
        appData.markdown = data.content;
        appData.headings = data.headings;
    } catch (error) {
        console.error('Error fetching markdown:', error);
    }
}

// Load mermaid diagrams
async function loadDiagrams() {
    try {
        // Load traditional workflow
        const traditionalResponse = await fetch('/api/files/traditional-workflow.txt');
        appData.diagrams.traditional = await traditionalResponse.text();
        
        // Load AI-assisted workflow
        const aiAssistedResponse = await fetch('/api/files/ai-assisted-workflow.txt');
        appData.diagrams.aiAssisted = await aiAssistedResponse.text();
        
        // Load AI-first workflow
        const aiFirstResponse = await fetch('/api/files/ai-first-workflow.txt');
        appData.diagrams.aiFirst = await aiFirstResponse.text();
    } catch (error) {
        console.error('Error loading diagrams:', error);
    }
}

// Initialize overview tab
function initOverviewTab() {
    // Add table of contents
    const tocContainer = document.getElementById('toc-container');
    if (tocContainer) {
        const tocTemplate = document.getElementById('toc-template');
        tocContainer.appendChild(tocTemplate.content.cloneNode(true));
        
        // Add TOC links
        const tocLinks = document.getElementById('toc-links');
        const headings = window.tocData || appData.headings || [];
        
        headings.forEach(heading => {
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.className = `toc-link ${heading.level === 3 ? 'level-3' : ''}`;
            link.textContent = heading.text;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Highlight clicked link
                    document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
            
            tocLinks.appendChild(link);
        });
    }
    
    // Add markdown content
    const markdownContent = document.getElementById('markdown-content');
    if (markdownContent && appData.markdown) {
        // Instead of direct assignment, use the enhanced renderer
        markdownContent.innerHTML = renderMarkdown(appData.markdown);
        
        // Add click handlers for any links to tabs
        document.querySelectorAll('#markdown-content a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#tab-')) {
                    e.preventDefault();
                    const tabId = href.substring(5); // Remove the "#tab-" prefix
                    const tabButton = document.getElementById(`tab-${tabId}`);
                    if (tabButton) {
                        tabButton.click();
                    }
                }
            });
        });
    }
}

// Initialize dashboard tab with charts
function initDashboardTab() {
    // Use Recharts if available, otherwise fallback to D3
    if (typeof Recharts !== 'undefined') {
        renderRechartsCharts();
    } else {
        renderD3Charts();
    }
}

// Render charts using Recharts
function renderRechartsCharts() {
    const { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;
    
    // Custom Tooltip Component for Charts
    const CustomTooltip = ({ active, payload, label, valueFormatter = (value) => value, title = 'Details' }) => {
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
                React.createElement('span', { style: { fontWeight: 'bold' } }, valueFormatter(entry.value))
            )
            )
        );
        }
        return null;
    };
    
    const speedData = [
        { name: 'Traditional', speed: 1, color: '#FF5252' },  // Red for Traditional
        { name: 'AI-Assisted', speed: 2, color: '#4CAF50' },  // Green for AI-Assisted
        { name: 'AI-First', speed: 10, color: '#2196F3' },   // Blue for AI-First
    ];
    
    const SpeedChart = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
        React.createElement(BarChart, { 
            data: speedData, 
            margin: { top: 20, right: 30, left: 50, bottom: 5 }  // Increased left margin
        },
            React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
            React.createElement(XAxis, { dataKey: "name" }),
            React.createElement(YAxis, { 
                label: { 
                    value: 'Speed Multiplier (×)', 
                    angle: -90, 
                    position: 'insideLeft',
                    dy: 80  // Shift label down and to the right
                }
            }),
            React.createElement(Tooltip, { 
                content: CustomTooltip,
                valueFormatter: (value) => `${value}×`
            }),
            React.createElement(Bar, { 
                dataKey: "speed", 
                fill: "#2196F3",  // Default blue
                // Add each bar explicitly to control colors
                children: speedData.map((entry, index) => 
                    React.createElement(Cell, { 
                        key: `cell-${index}`, 
                        fill: entry.color 
                    })
                )
            })
        )
    );
    
    // Task Acceleration Chart with Custom Tooltip
    const taskData = [
        { name: 'Boilerplate/Scaffolding', factor: 15 },
        { name: 'Standard Components', factor: 15 },
        { name: 'Unit Test Generation', factor: 12 },
        { name: 'Documentation', factor: 15 },
        { name: 'Language Translation', factor: 12 },
        { name: 'Business Logic', factor: 4 },
        { name: 'Common Debugging', factor: 4 },
        { name: 'Refactoring', factor: 4 },
    ].sort((a, b) => b.factor - a.factor);
    
    const TasksChart = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
        React.createElement(BarChart, {
            data: taskData,
            layout: "vertical",
            margin: { top: 5, right: 30, left: 120, bottom: 5 }
        },
            React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
            React.createElement(XAxis, { type: "number", label: { value: 'Acceleration Factor (×)', position: 'insideBottom', offset: -5 } }),
            React.createElement(YAxis, { type: "category", dataKey: "name", width: 100 }),
            React.createElement(Tooltip, { 
                content: CustomTooltip,
                valueFormatter: (value) => `${value}×`
            }),
            React.createElement(Bar, { dataKey: "factor", fill: "#3b82f6" })
        )
    );
    
    // Error Reduction Chart with Custom Tooltip
    const errorData = [
        { name: 'First Run', accuracy: 80 },
        { name: 'Second Iteration', accuracy: 95 },
        { name: 'Third Iteration', accuracy: 98 },
        { name: 'Fourth Iteration', accuracy: 99 },
        { name: 'Fifth Iteration', accuracy: 99.5 },
        { name: 'Human Review', accuracy: 100 },
    ];
    
    const ErrorChart = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
        React.createElement(LineChart, {
            data: errorData,
            margin: { top: 20, right: 30, left: 20, bottom: 5 }
        },
            React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
            React.createElement(XAxis, { dataKey: "name" }),
            React.createElement(YAxis, { domain: [75, 100], label: { value: 'Accuracy (%)', angle: -90, position: 'insideLeft' } }),
            React.createElement(Tooltip, { 
                content: CustomTooltip,
                valueFormatter: (value) => `${value}%`
            }),
            React.createElement(Line, { type: "monotone", dataKey: "accuracy", stroke: "#3b82f6", strokeWidth: 2 })
        )
    );
    
    // Developer Time Allocation Chart
    const timeData = [
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
    
    // Updated Time Allocation Chart Configuration
    const distinctColors = {
        coding: "#FF5252",    // Red
        review: "#4CAF50",    // Green
        architecture: "#2196F3", // Blue
        testing: "#FF9800"    // Orange
    };
  
  // Time Chart with Custom Tooltip
    const TimeChart = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
        React.createElement(BarChart, { 
        data: timeData,
        margin: { top: 20, right: 30, left: 20, bottom: 5 },
        stackOffset: "expand",
        layout: "vertical",
        barCategoryGap: 20
        },
        React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
        React.createElement(XAxis, { 
            type: "number", 
            tickFormatter: (value) => `${Math.round(value * 100)}%` 
        }),
        React.createElement(YAxis, { type: "category", dataKey: "category", width: 100 }),
        React.createElement(Tooltip, { 
            content: CustomTooltip,
            formatter: (value, name, props) => [`${value}%`, name]
        }),
        React.createElement(Legend),
        React.createElement(Bar, { 
            dataKey: "coding", 
            name: "Writing Code", 
            stackId: "a", 
            fill: distinctColors.coding 
        }),
        React.createElement(Bar, { 
            dataKey: "review", 
            name: "Code Review", 
            stackId: "a", 
            fill: distinctColors.review 
        }),
        React.createElement(Bar, { 
            dataKey: "architecture", 
            name: "Architecture & Design", 
            stackId: "a", 
            fill: distinctColors.architecture 
        }),
        React.createElement(Bar, { 
            dataKey: "testing", 
            name: "Testing", 
            stackId: "a", 
            fill: distinctColors.testing 
        })
        )
    );
  
    // Fallback D3 Rendering Function
    function renderDeveloperTimeAllocationD3(selector) {
        const container = document.querySelector(selector);
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Clear previous content
        container.innerHTML = '';
    
        // Add title and legend manually for D3 version
        const header = document.createElement('div');
        header.innerHTML = `
        <h3 class="text-center mb-2">Developer Time Allocation</h3>
        <div class="flex justify-center mb-4">
            <div class="flex items-center mr-4">
            <div class="w-4 h-4 bg-red-500 mr-2"></div>
            <span>Writing Code</span>
            </div>
            <div class="flex items-center mr-4">
            <div class="w-4 h-4 bg-green-500 mr-2"></div>
            <span>Code Review</span>
            </div>
            <div class="flex items-center mr-4">
            <div class="w-4 h-4 bg-blue-500 mr-2"></div>
            <span>Architecture</span>
            </div>
            <div class="flex items-center">
            <div class="w-4 h-4 bg-orange-500 mr-2"></div>
            <span>Testing</span>
            </div>
        </div>
        `;
        container.appendChild(header);
        
        const chartContainer = document.createElement('div');
        chartContainer.innerHTML = `
        <div class="text-center text-gray-500">
            <p>Traditional: 70% Writing Code, 10% Review, 10% Architecture, 10% Testing</p>
            <p>AI-Assisted: 40% Writing Code, 20% Review, 25% Architecture, 15% Testing</p>
            <p>AI-First: 15% Writing Code, 35% Review, 40% Architecture, 10% Testing</p>
        </div>
        `;
        container.appendChild(chartContainer);
    }
    
    // ROI Chart
    const roiData = [
        { name: 'Average', value: 3.5 },
        { name: 'Top Performers', value: 8 }
    ];
    
    const COLORS = ['#3b82f6', '#93c5fd'];
    
    const RoiChart = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
        React.createElement(PieChart, {},
            React.createElement(Pie, {
                data: roiData,
                cx: "50%",
                cy: "50%",
                labelLine: false,
                outerRadius: 80,
                fill: "#8884d8",
                dataKey: "value",
                label: ({name, value}) => `${name}: ${value}×`,
                children: roiData.map((entry, index) => 
                    React.createElement(Cell, { 
                        key: `cell-${index}`, 
                        fill: COLORS[index % COLORS.length] 
                    })
                )
            }),
            React.createElement(Tooltip, { formatter: (value) => [`${value}×`, 'ROI Multiple'] })
        )
    );
    
    // Render all charts
    ReactDOM.render(SpeedChart, document.getElementById('speed-chart'));
    ReactDOM.render(TasksChart, document.getElementById('tasks-chart'));
    ReactDOM.render(ErrorChart, document.getElementById('error-chart'));
    ReactDOM.render(TimeChart, document.getElementById('time-chart'));
    ReactDOM.render(RoiChart, document.getElementById('roi-chart'));
}

// Fallback D3 charts (simplified versions)
function renderD3Charts() {
    // Simple D3 bar chart for speed comparison
    renderSimpleBarChart(
        '#speed-chart',
        [
            { name: 'Traditional', value: 1 },
            { name: 'AI-Assisted', value: 2 },
            { name: 'AI-First', value: 10 }
        ],
        'Speed Multiplier (×)'
    );
    
    // Simple D3 horizontal bar chart for tasks
    renderSimpleHorizontalBarChart(
        '#tasks-chart',
        [
            { name: 'Boilerplate', value: 15 },
            { name: 'Components', value: 15 },
            { name: 'Unit Tests', value: 12 },
            { name: 'Documentation', value: 15 },
            { name: 'Translation', value: 12 },
            { name: 'Business Logic', value: 4 },
            { name: 'Debugging', value: 4 },
            { name: 'Refactoring', value: 4 }
        ].sort((a, b) => b.value - a.value),
        'Acceleration Factor (×)'
    );
    
    // Simple D3 line chart for error reduction
    renderSimpleLineChart(
        '#error-chart',
        [
            { name: 'First Run', value: 80 },
            { name: 'Second', value: 95 },
            { name: 'Third', value: 98 },
            { name: 'Fourth', value: 99 },
            { name: 'Fifth', value: 99.5 },
            { name: 'Human', value: 100 }
        ],
        'Accuracy (%)'
    );
    
    // Simple placeholder for time allocation (stacked bar is complex)
    document.getElementById('time-chart').innerHTML = `
        <div class="flex h-full items-center justify-center">
            <div class="text-center">
                <p class="text-gray-500">Developer Time Allocation</p>
                <p class="text-sm text-gray-400">Traditional: 70% Coding, 10% Review, 10% Architecture, 10% Testing</p>
                <p class="text-sm text-gray-400">AI-Assisted: 40% Coding, 20% Review, 25% Architecture, 15% Testing</p>
                <p class="text-sm text-gray-400">AI-First: 15% Coding, 35% Review, 40% Architecture, 10% Testing</p>
            </div>
        </div>
    `;
    
    // Simple D3 pie chart for ROI
    renderSimplePieChart(
        '#roi-chart',
        [
            { name: 'Average', value: 3.5 },
            { name: 'Top Performers', value: 8 }
        ],
        'ROI Multiple (×)'
    );
}

// Initialize comparison tab
function initComparisonTab() {
    // Productivity metrics data
    const productivityData = [
      { metric: 'Task completion time', traditional: 1, aiAssisted: 1.75, aiFirst: 10 },
      { metric: 'Features per sprint', traditional: 1, aiAssisted: 1.35, aiFirst: 3 },
      { metric: 'PR completion rate', traditional: 1, aiAssisted: 1.26, aiFirst: 3 },
      { metric: 'Time to MVP', traditional: 1, aiAssisted: 3, aiFirst: 10 },
    ];
  
    // Radar chart data
    const radarData = [
      { subject: 'Code Generation', traditional: 30, aiAssisted: 70, aiFirst: 95, fullMark: 100 },
      { subject: 'First-Pass Accuracy', traditional: 70, aiAssisted: 78, aiFirst: 90, fullMark: 100 },
      { subject: 'Development Speed', traditional: 10, aiAssisted: 30, aiFirst: 90, fullMark: 100 },
      { subject: 'Verification Efficiency', traditional: 30, aiAssisted: 35, aiFirst: 60, fullMark: 100 },
      { subject: 'Knowledge Efficiency', traditional: 10, aiAssisted: 25, aiFirst: 40, fullMark: 100 },
    ];
  
    if (typeof Recharts !== 'undefined') {
      const {
        BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
        Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
      } = Recharts;
  
// Inside initComparisonTab() function
const ProductivityChart = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
    React.createElement(BarChart, {
      data: productivityData,
      margin: { top: 20, right: 30, left: 40, bottom: 30 } // Increased bottom margin for labels
    },
        React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
        React.createElement(XAxis, { 
            dataKey: "metric",
            interval: 0, // Show all labels
            angle: -8, // Very slight angle
            height: 60,  // Provide space for angled labels
            tick: {
              fontSize: 13, // Slightly larger font
              textAnchor: 'end', // Align text end for better angled positioning
              dx: 30, // Shift labels slightly to the right
              dy: 5 // Adjust vertical positioning
            },
            tickLine: { 
              transform: 'translate(-10, 0)' // Adjust tick lines to match label shift
            }
          }),
      React.createElement(YAxis, {
        label: {
          value: 'Relative Improvement (×)',
          angle: -90,
          position: 'insideLeft',
          offset: -20,
          dx: 20,
          style: { textAnchor: 'middle' }
        }
      }),
      React.createElement(Tooltip, { formatter: (value) => [`${value}×`, 'Multiplier'] }),
      React.createElement(Legend),
      React.createElement(Bar, { dataKey: "traditional", name: "Traditional", fill: "#FF5252" }),
      React.createElement(Bar, { dataKey: "aiAssisted", name: "AI-Assisted", fill: "#4CAF50" }),
      React.createElement(Bar, { dataKey: "aiFirst", name: "AI-First", fill: "#2196F3" })
    )
  );
  
  const RadarChartComponent = React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
    React.createElement(RadarChart, {
      outerRadius: 120,
      data: radarData,
      startAngle: 90, // Offset the start angle to improve readability
      endAngle: -270 // Match the start angle offset
    },
      React.createElement(PolarGrid, { radialLines: true }), // Use radial lines for clearer gridding
      React.createElement(PolarAngleAxis, { 
        dataKey: "subject",
        tickLine: false // Remove tick lines for cleaner look
      }),
      React.createElement(PolarRadiusAxis, { 
        tick: false, // Remove tick labels
        axisLine: false // Remove axis line
      }),
      React.createElement(Radar, { 
        name: "AI-First", 
        dataKey: "aiFirst", 
        stroke: "#2196F3", 
        fill: "#2196F3", 
        fillOpacity: 0.6 
      }),
      React.createElement(Radar, { 
        name: "AI-Assisted", 
        dataKey: "aiAssisted", 
        stroke: "#4CAF50", 
        fill: "#4CAF50", 
        fillOpacity: 0.6 
      }),
      React.createElement(Radar, { 
        name: "Traditional", 
        dataKey: "traditional", 
        stroke: "#FF5252", 
        fill: "#FF5252", 
        fillOpacity: 0.6 
      }),
      React.createElement(Legend),
      React.createElement(Tooltip)
    )
  );
  
      // Render the charts
      ReactDOM.render(ProductivityChart, document.getElementById('productivity-chart'));
      ReactDOM.render(RadarChartComponent, document.getElementById('radar-chart'));
      
      // Add explanation text as a separate DOM element after rendering the chart
      setTimeout(() => {
        const radarContainer = document.getElementById('radar-chart');
        if (radarContainer) {
          const explanationDiv = document.createElement('div');
          explanationDiv.className = 'absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white p-2 rounded text-xs max-w-xs z-10';
          explanationDiv.style.position = 'absolute';
          explanationDiv.style.top = '8px';
          explanationDiv.style.right = '8px';
          explanationDiv.style.backgroundColor = 'rgba(31, 41, 55, 0.75)';
          explanationDiv.style.color = 'white';
          explanationDiv.style.padding = '8px';
          explanationDiv.style.borderRadius = '4px';
          explanationDiv.style.fontSize = '0.75rem';
          explanationDiv.style.maxWidth = '12rem';
          explanationDiv.style.zIndex = '10';
          
          explanationDiv.innerHTML = `
            <p style="font-weight: bold; margin-bottom: 4px;">Chart Values (0-100):</p>
            <p style="margin-bottom: 4px;">0 = Minimal capability</p>
            <p>100 = Maximum capability</p>
          `;
          
          radarContainer.style.position = 'relative';
          radarContainer.appendChild(explanationDiv);
        }
      }, 500);
    } else {
      // Fallback to D3 (unchanged)
      renderSimpleBarChart(
        '#productivity-chart',
        productivityData.map(d => ({ name: d.metric, value: d.aiFirst })),
        'AI-First Improvement (×)'
      );
  
      document.getElementById('radar-chart').innerHTML = `
        <div class="flex h-full items-center justify-center">
          <div class="text-center">
            <p class="text-gray-500">Development Approach Comparison</p>
            <p class="text-sm text-gray-400">AI-First excels in Code Generation (95/100) and Development Speed (90/100)</p>
            <p class="text-sm text-gray-400">Traditional requires more Knowledge (90/100) and Verification Effort (70/100)</p>
            <p class="text-xs text-gray-500 mt-2">(Scale: 0 = Minimal capability, 100 = Maximum capability)</p>
          </div>
        </div>
      `;
    }
}

// Simple D3 bar chart function
function renderSimpleBarChart(selector, data, yLabel) {
    const container = document.querySelector(selector);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Set up SVG
    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Set up margins
    const margin = {top: 20, right: 30, bottom: 40, left: 50};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerWidth])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.1])
        .range([innerHeight, 0]);
    
    // Create chart group
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));
    
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // Add y-axis label
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 10)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .text(yLabel);
    
    // Add bars
    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.name))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.value))
        .attr('fill', '#3b82f6');
}

// Simple D3 horizontal bar chart function
function renderSimpleHorizontalBarChart(selector, data, xLabel) {
    const container = document.querySelector(selector);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Set up SVG
    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Set up margins
    const margin = {top: 20, right: 30, bottom: 40, left: 120};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create scales
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.2);
    
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.1])
        .range([0, innerWidth]);
    
    // Create chart group
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));
    
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // Add x-axis label
    g.append('text')
        .attr('transform', `translate(${innerWidth/2},${innerHeight + 35})`)
        .attr('text-anchor', 'middle')
        .text(xLabel);
    
    // Add bars
    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', d => yScale(d.name))
        .attr('width', d => xScale(d.value))
        .attr('height', yScale.bandwidth())
        .attr('fill', '#3b82f6');
}

// Simple D3 line chart function
function renderSimpleLineChart(selector, data, yLabel) {
    const container = document.querySelector(selector);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Set up SVG
    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Set up margins
    const margin = {top: 20, right: 30, bottom: 40, left: 50};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerWidth])
        .padding(0.1);
    
    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.value) * 0.95, 100])
        .range([innerHeight, 0]);
    
    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.name) + xScale.bandwidth() / 2)
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);
    
    // Create chart group
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));
    
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // Add y-axis label
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 10)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .text(yLabel);
    
    // Add line
    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Add points
    g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr('cy', d => yScale(d.value))
        .attr('r', 4)
        .attr('fill', '#3b82f6');
}

// Simple D3 pie chart function
function renderSimplePieChart(selector, data, label) {
    const container = document.querySelector(selector);
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Set up SVG
    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create chart group
    const g = svg.append('g')
        .attr('transform', `translate(${width/2},${height/2})`);
    
    // Set colors
    const colors = ['#3b82f6', '#93c5fd'];
    
    // Create pie layout
    const pie = d3.pie()
        .value(d => d.value);
    
    // Create arc generator
    const radius = Math.min(width, height) / 2 - 30;
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    // Create outer arc for labels
    const labelArc = d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.8);
    
    // Add slices
    const arcs = g.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g');
    
    arcs.append('path')
        .attr('fill', (d, i) => colors[i % colors.length])
        .attr('d', arc);
    
    // Add labels
    arcs.append('text')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text(d => `${d.data.name}: ${d.data.value}×`);
    
    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .text(label);
}

// Initialize executive summary tab
function initExecutiveSummaryTab() {
    // Find the container
    const container = document.getElementById('executive-summary-container');
    if (!container) {
        console.error('Executive summary container not found');
        return;
    }
    
    // Clear loading indicator
    container.innerHTML = '';
    
    try {
        // Check if ExecutiveSummary has been imported as a global variable
        if (typeof window.ExecutiveSummary === 'function') {
            console.log('Using globally imported ExecutiveSummary component');
            ReactDOM.render(React.createElement(window.ExecutiveSummary), container);
            return;
        }
        
        // Try to dynamically import the executive-summary.js file
        const scriptSrc = '/static/js/components/executive-summary.js';
        
        // Check if script is already loaded
        const scriptExists = Array.from(document.scripts).some(script => 
            script.src.includes('executive-summary.js'));
            
        if (!scriptExists) {
            console.log('Loading ExecutiveSummary component script');
            // Create a promise to load the script
            const loadScript = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = scriptSrc;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load ExecutiveSummary script'));
                document.head.appendChild(script);
            });
            
            // Wait for script to load, then render
            loadScript
                .then(() => {
                    if (typeof ExecutiveSummary === 'function') {
                        ReactDOM.render(React.createElement(ExecutiveSummary), container);
                    } else {
                        throw new Error('ExecutiveSummary not defined after loading script');
                    }
                })
                .catch(error => {
                    console.error('Error loading ExecutiveSummary:', error);
                    // Fallback: Define inline component
                    defineInlineComponent();
                });
                
            return; // Exit to let async loading complete
        }
        
        // Fallback: Define an inline component
        defineInlineComponent();
        
    } catch (error) {
        console.error('Error initializing executive summary tab:', error);
        container.innerHTML = `<div class="p-8 text-center">Error loading Executive Summary: ${error.message}</div>`;
    }
    
    // Helper function to define an inline component
    function defineInlineComponent() {
        console.log('Using inline ExecutiveSummary component');
        // Define the component inline
        const InlineExecutiveSummary = () => {
            return React.createElement('div', { className: 'flex flex-col gap-6 p-4' },
                // Title section
                React.createElement('div', { className: 'text-center mb-4' },
                    React.createElement('h1', { className: 'text-3xl font-bold' }, 'AI-First Development'),
                    React.createElement('p', { className: 'text-lg text-gray-600' }, 'Executive Summary & Business Case')
                ),
                
                // Main summary card
                React.createElement('div', { className: 'card bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' },
                    React.createElement('div', { className: 'p-6' },
                        React.createElement('h2', { className: 'text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4' }, 'Executive Summary'),
                        React.createElement('p', { className: 'text-lg mb-4' },
                            'AI-first development fundamentally transforms how software is created, resulting in 5-50× productivity improvements ' +
                            'while potentially enhancing quality. This represents a step-change in development capabilities that ' +
                            'organizations can no longer afford to ignore.'
                        ),
                        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mt-6' },
                            // Why Now?
                            React.createElement('div', { className: 'border-l-4 border-blue-500 pl-4 py-2' },
                                React.createElement('h3', { className: 'font-bold text-lg mb-1' }, 'Why Now?'),
                                React.createElement('p', {},
                                    'Modern LLMs have reached the ',
                                    React.createElement('span', { className: 'font-medium' }, '90% code correctness threshold'),
                                    ' in first-pass generation. This enables fundamentally different workflows beyond just assistance.'
                                )
                            ),
                            
                            // Business Impact
                            React.createElement('div', { className: 'border-l-4 border-blue-500 pl-4 py-2' },
                                React.createElement('h3', { className: 'font-bold text-lg mb-1' }, 'Business Impact'),
                                React.createElement('p', {},
                                    'Organizations implementing AI-first development report ',
                                    React.createElement('span', { className: 'font-medium' }, '10-20× productivity gains'),
                                    ' for standard tasks, dramatically faster time-to-market, and improved developer satisfaction.'
                                )
                            ),
                            
                            // Competitive Edge
                            React.createElement('div', { className: 'border-l-4 border-blue-500 pl-4 py-2' },
                                React.createElement('h3', { className: 'font-bold text-lg mb-1' }, 'Competitive Edge'),
                                React.createElement('p', {},
                                    'Early adopters are creating ',
                                    React.createElement('span', { className: 'font-medium' }, '10× more features'),
                                    ' with the same team size. This advantage will be increasingly difficult to overcome as the gap widens.'
                                )
                            )
                        )
                    )
                ),
                
                // Benefits and roadmap grid
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
                    // Key Benefits card
                    React.createElement('div', { className: 'card' },
                        React.createElement('div', { className: 'p-6' },
                            React.createElement('h2', { className: 'text-xl font-semibold mb-4' }, 'Key Benefits'),
                            React.createElement('ul', { className: 'space-y-3' },
                                React.createElement('li', { className: 'flex items-start' },
                                    React.createElement('span', { className: 'text-blue-500 font-bold mr-2' }, '✓'),
                                    React.createElement('span', {},
                                        React.createElement('span', { className: 'font-semibold' }, 'Dramatic Productivity Gains: '),
                                        '5-50× acceleration depending on task complexity'
                                    )
                                ),
                                React.createElement('li', { className: 'flex items-start' },
                                    React.createElement('span', { className: 'text-blue-500 font-bold mr-2' }, '✓'),
                                    React.createElement('span', {},
                                        React.createElement('span', { className: 'font-semibold' }, 'Faster Time to Market: '),
                                        'Features that took weeks now take days or hours'
                                    )
                                ),
                                React.createElement('li', { className: 'flex items-start' },
                                    React.createElement('span', { className: 'text-blue-500 font-bold mr-2' }, '✓'),
                                    React.createElement('span', {},
                                        React.createElement('span', { className: 'font-semibold' }, 'Comprehensive Testing: '),
                                        'More time for test creation and edge case handling'
                                    )
                                ),
                                React.createElement('li', { className: 'flex items-start' },
                                    React.createElement('span', { className: 'text-blue-500 font-bold mr-2' }, '✓'),
                                    React.createElement('span', {},
                                        React.createElement('span', { className: 'font-semibold' }, 'Developer Satisfaction: '),
                                        'Focus shifts to creative problem-solving'
                                    )
                                )
                            )
                        )
                    ),
                    
                    // Implementation Roadmap card
                    React.createElement('div', { className: 'card' },
                        React.createElement('div', { className: 'p-6' },
                            React.createElement('h2', { className: 'text-xl font-semibold mb-4' }, 'Implementation Roadmap'),
                            React.createElement('div', { className: 'space-y-4' },
                                // Phase 1
                                React.createElement('div', { className: 'relative pl-8' },
                                    React.createElement('div', { className: 'w-4 h-4 rounded-full bg-blue-500 absolute left-0 top-0' }),
                                    React.createElement('div', { className: 'h-full border-l-2 border-blue-300 absolute left-2 top-4 -mb-4' }),
                                    React.createElement('h3', { className: 'font-semibold text-lg' }, 'Phase 1: Foundation (1-2 months)'),
                                    React.createElement('p', {}, 'Select tools, provide initial training, identify pilot projects')
                                ),
                                // Phase 2
                                React.createElement('div', { className: 'relative pl-8' },
                                    React.createElement('div', { className: 'w-4 h-4 rounded-full bg-blue-500 absolute left-0 top-0' }),
                                    React.createElement('div', { className: 'h-full border-l-2 border-blue-300 absolute left-2 top-4 -mb-4' }),
                                    React.createElement('h3', { className: 'font-semibold text-lg' }, 'Phase 2: Pilot (2-3 months)'),
                                    React.createElement('p', {}, 'Implement AI-assisted workflows, develop testing frameworks')
                                ),
                                // Phase 3
                                React.createElement('div', { className: 'relative pl-8' },
                                    React.createElement('div', { className: 'w-4 h-4 rounded-full bg-blue-500 absolute left-0 top-0' }),
                                    React.createElement('h3', { className: 'font-semibold text-lg' }, 'Phase 3: Scaling (3-6 months)'),
                                    React.createElement('p', {}, 'Expand to more teams, integrate into CI/CD pipelines')
                                )
                            )
                        )
                    )
                ),
                
                // ROI card
                React.createElement('div', { className: 'card' },
                    React.createElement('div', { className: 'p-6' },
                        React.createElement('h2', { className: 'text-xl font-semibold mb-4' }, 'ROI & Business Case'),
                        React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-6' },
                            React.createElement('div', { className: 'border rounded-lg p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20' },
                                React.createElement('h3', { className: 'text-lg font-semibold mb-2 text-green-700 dark:text-green-300' }, 'Immediate Returns'),
                                React.createElement('p', { className: 'mb-2' }, 'In the first 3 months:'),
                                React.createElement('ul', { className: 'list-disc ml-5 space-y-1' },
                                    React.createElement('li', {}, 'Tool costs: ~$10/dev/month'),
                                    React.createElement('li', {}, 'Productivity boost: 3-5× in pilot projects'),
                                    React.createElement('li', {}, 'Typical ROI: 2-3× investment')
                                )
                            ),
                            React.createElement('div', { className: 'border rounded-lg p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20' },
                                React.createElement('h3', { className: 'text-lg font-semibold mb-2 text-green-700 dark:text-green-300' }, 'Medium-Term Impact'),
                                React.createElement('p', { className: 'mb-2' }, 'Within 6-12 months:'),
                                React.createElement('ul', { className: 'list-disc ml-5 space-y-1' },
                                    React.createElement('li', {}, 'Productivity boost: 10× for standard tasks'),
                                    React.createElement('li', {}, '30-50% faster time to market'),
                                    React.createElement('li', {}, 'Typical ROI: 5-8× investment')
                                )
                            ),
                            React.createElement('div', { className: 'border rounded-lg p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20' },
                                React.createElement('h3', { className: 'text-lg font-semibold mb-2 text-green-700 dark:text-green-300' }, 'Long-Term Transformation'),
                                React.createElement('p', { className: 'mb-2' }, 'Beyond 12 months:'),
                                React.createElement('ul', { className: 'list-disc ml-5 space-y-1' },
                                    React.createElement('li', {}, 'Team capabilities expand without headcount growth'),
                                    React.createElement('li', {}, 'Products evolve faster than competition'),
                                    React.createElement('li', {}, 'Typical ROI: 10× or more on investment')
                                )
                            )
                        ),
                        React.createElement('div', { className: 'mt-8 p-4 border border-yellow-300 bg-yellow-50 rounded-lg dark:bg-yellow-900 dark:bg-opacity-20 dark:border-yellow-700' },
                            React.createElement('h3', { className: 'text-lg font-bold mb-2' }, 'The Cost of Waiting'),
                            React.createElement('p', {},
                                'Organizations that delay adoption face increasing competitive disadvantage. As competitors achieve 10× ' +
                                'productivity gains, they\'ll be able to deliver features and improvements at a pace impossible to match ' +
                                'with traditional methods.'
                            )
                        )
                    )
                ),
                
                // Action button
                React.createElement('div', { className: 'flex justify-center mt-4' },
                    React.createElement('button', { 
                        className: 'px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors',
                        onClick: () => {
                            // Navigate to the detailed implementation guide
                            const overviewTab = document.getElementById('tab-overview');
                            if (overviewTab) overviewTab.click();
                        }
                    }, 'View Full AI-First Implementation Guide')
                )
            );
        };
        
        // Render the inline component
        ReactDOM.render(React.createElement(InlineExecutiveSummary), container);
    }
}

// Update the setupTabs function to include sources tab initialization
function updateSetupTabs() {
    // Add the sources tab
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            addSourcesTab();
        }, 500);
    });
    
    // Make sure setupTabs is available globally
    window.setupTabs = setupTabs;
}

// Add the Sources tab to navigation
function addSourcesTab() {
    // Find the tabs container
    const tabsContainer = document.querySelector('.tabs-container');
    if (!tabsContainer) {
        console.error('Tabs container not found');
        return;
    }
    
    // Check if the tab already exists
    if (document.getElementById('tab-sources')) {
        console.log('Sources tab already exists');
        return;
    }
    
    // Create the new tab button
    const sourcesTabButton = document.createElement('button');
    sourcesTabButton.id = 'tab-sources';
    sourcesTabButton.className = 'tab-button';
    sourcesTabButton.setAttribute('data-tab', 'sources');
    sourcesTabButton.textContent = 'Sources';
    
    // Add the button to the tabs container
    tabsContainer.appendChild(sourcesTabButton);
    
    // Re-initialize all tabs
    setupTabs();
    
    console.log('Sources tab button added');
}

// Function to load the sources tab content
function loadSourcesTab() {
    const contentArea = document.getElementById('tab-content');
    if (!contentArea) {
      console.error('Tab content area not found');
      return;
    }
    
    // Clear current content
    contentArea.innerHTML = '';
    
    // Get sources template
    const template = document.getElementById('sources-template');
    if (template) {
      // Clone template content
      const content = template.content.cloneNode(true);
      contentArea.appendChild(content);
      
      console.log('Sources tab content loaded from template');
    } else {
      // Use embedded HTML if the template is not found
      contentArea.innerHTML = `
        <div class="flex flex-col gap-6 sources-tab">
            <div class="text-center mb-4">
                <h1 class="text-2xl font-bold">Sources & References</h1>
                <p class="text-lg text-gray-600">Academic and industry sources supporting AI-First development methodologies</p>
            </div>
  
            <div class="mb-6">
              <div class="flex items-center border rounded-lg p-2 bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input id="sources-search" type="text" placeholder="Search sources..." class="w-full outline-none text-gray-700" />
              </div>
            </div>
  
            <!-- Research Studies & Industry Reports -->
            <div class="card">
                <div class="p-6">
                    <h2 class="text-xl font-semibold mb-4">Research Studies & Industry Reports</h2>
                    <div class="space-y-4">
                        <!-- Sources go here -->
                    </div>
                </div>
            </div>
        </div>
      `;
      
      console.log('Sources tab content loaded from embedded HTML');
    }
    
    // Add search functionality
    setTimeout(addSourcesSearch, 200);
}

// Add search functionality for sources
function addSourcesSearch() {
  // Create search input if it doesn't already exist
  const searchInput = document.getElementById('sources-search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const sourceItems = document.querySelectorAll('.source-item');
      
      sourceItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Show/hide sections based on content
      document.querySelectorAll('.card').forEach(card => {
        const visibleItems = card.querySelectorAll('.source-item[style="display: block"]').length;
        const hiddenItems = card.querySelectorAll('.source-item[style="display: none"]').length;
        const totalItems = visibleItems + hiddenItems;
        
        if (visibleItems === 0 && totalItems > 0) {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
        }
      });
    });
  }
}

// Run this script to update the app with sources tab
updateSetupTabs();

window.addEventListener('load', function() {
  // Make sure mermaid is initialized only once
  if (typeof mermaid !== 'undefined' && typeof window.mermaidInitialized === 'undefined') {
    window.mermaidInitialized = true;
    
    console.log('Initializing Mermaid from app.js');
    mermaid.initialize({
      startOnLoad: false,
      theme: document.body.classList.contains('dark-theme') ? 'dark' : 'default',
      securityLevel: 'loose'
    });
  }
});