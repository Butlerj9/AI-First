// Dedicated Mermaid Diagram Renderer
document.addEventListener('DOMContentLoaded', function() {
  // Configuration for Mermaid
  const mermaidConfig = {
    startOnLoad: false, // We'll manually control rendering
    theme: document.body.classList.contains('dark-theme') ? 'dark' : 'default',
    securityLevel: 'loose', // Required for some diagram features
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    fontFamily: 'Arial',
    fontSize: 14
  };
  
  // Initialize mermaid with our config
  mermaid.initialize(mermaidConfig);
  
  // Function to load and render Mermaid diagrams directly from content
  window.renderMermaidFromContent = function(elementId, content) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element not found: ${elementId}`);
      return;
    }

    try {
      // Clear any existing content and add processing indicator
      element.innerHTML = '<div class="text-center p-4">Rendering diagram...</div>';
      
      // Generate a unique ID for this diagram
      const diagramId = `mermaid-${Math.random().toString(36).substring(2, 15)}`;
      element.id = diagramId;
      
      console.log(`Rendering mermaid diagram with ID: ${diagramId}`);
      console.log(`First 50 chars of content: ${content.substring(0, 50)}...`);

      // Use mermaid.render to generate the SVG
      mermaid.render(diagramId, content)
        .then(result => {
          element.innerHTML = result.svg;
          console.log(`Successfully rendered diagram ${diagramId}`);
          
          // Apply some styling to the SVG for better display
          const svg = element.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', 'auto');
            svg.style.maxWidth = '100%';
            svg.style.borderRadius = '8px';
            
            // Add interactivity
            addZoomControls(element);
          }
        })
        .catch(error => {
          console.error('Error rendering diagram:', error);
          element.innerHTML = `
            <div class="p-4 border border-red-300 bg-red-50 rounded text-center">
              <p class="text-red-600 font-bold">Error rendering diagram</p>
              <p class="text-gray-700 text-sm mt-2">${error.message || 'Unknown error'}</p>
              <pre class="mt-3 p-3 bg-gray-100 rounded text-left overflow-auto text-xs font-mono">
                ${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
              </pre>
            </div>
          `;
        });
    } catch (e) {
      console.error('Error processing diagram:', e);
      element.innerHTML = `<div class="text-red-600 p-4">Error: ${e.message}</div>`;
    }
  };
  
  // Function to load and render Mermaid diagrams from files
  window.renderMermaidFromFile = function(elementId, fileName) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element not found: ${elementId}`);
      return;
    }
    
    // Show loading state
    element.innerHTML = '<div class="text-center p-4">Loading diagram...</div>';
    
    // Fetch the diagram content from the file
    fetch(`/api/files/${fileName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load diagram file (${response.status}): ${fileName}`);
        }
        return response.text();
      })
      .then(content => {
        // Once we have the content, use our render function
        window.renderMermaidFromContent(elementId, content);
      })
      .catch(error => {
        console.error(`Error loading mermaid file ${fileName}:`, error);
        element.innerHTML = `
          <div class="p-4 border border-red-300 bg-red-50 rounded text-center">
            <p class="text-red-600 font-bold">Error loading diagram</p>
            <p class="text-gray-700 text-sm mt-2">${error.message}</p>
            <div class="mt-3 p-2 bg-gray-100 rounded text-left text-sm">
              <strong>Try the following:</strong>
              <ul class="list-disc pl-5 mt-1">
                <li>Check that the file exists in your data directory</li>
                <li>Verify the file name is correct: ${fileName}</li>
                <li>Make sure the file has valid mermaid syntax</li>
              </ul>
            </div>
          </div>
        `;
      });
  };
  
  // Add zoom functionality to the diagram
  function addZoomControls(container) {
    // Get the SVG element
    const svg = container.querySelector('svg');
    if (!svg) return;
    
    // Create controls container
    const controls = document.createElement('div');
    controls.className = 'diagram-controls absolute top-2 right-2 flex space-x-2 bg-white dark:bg-gray-800 rounded shadow p-1 opacity-70 hover:opacity-100 transition-opacity';
    controls.innerHTML = `
      <button class="zoom-in p-1 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Zoom In">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>
      <button class="zoom-out p-1 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Zoom Out">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </button>
      <button class="reset p-1 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Reset View">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </button>
    `;
    
    // Make the container relative for absolute positioning of controls
    container.style.position = 'relative';
    container.appendChild(controls);
    
    // Set up initial state for zooming
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    
    // Make SVG responsive and add basic styling
    svg.style.transition = 'transform 0.2s ease';
    svg.style.transformOrigin = 'center';
    svg.style.cursor = 'grab';
    
    // Add zoom in functionality
    controls.querySelector('.zoom-in').addEventListener('click', () => {
      scale *= 1.2;
      updateTransform();
    });
    
    // Add zoom out functionality
    controls.querySelector('.zoom-out').addEventListener('click', () => {
      scale *= 0.8;
      if (scale < 0.5) scale = 0.5; // Prevent extreme zoom out
      updateTransform();
    });
    
    // Add reset functionality
    controls.querySelector('.reset').addEventListener('click', () => {
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    });
    
    // Function to update the transform
    function updateTransform() {
      svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Make the diagram draggable
    let isDragging = false;
    let startX, startY;
    
    svg.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      svg.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      svg.style.cursor = 'grab';
    });
    
    // Add mousewheel zoom
    svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      scale *= delta;
      if (scale < 0.5) scale = 0.5; // Prevent extreme zoom out
      if (scale > 5) scale = 5; // Prevent extreme zoom in
      updateTransform();
    });
  }
  
  // Add required styles
  const style = document.createElement('style');
  style.textContent = `
    .diagram-container {
      position: relative;
      width: 100%;
      overflow: visible;
    }
    
    .mermaid svg {
      max-width: 100%;
      height: auto;
    }
    
    .diagram-controls {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 10;
    }
    
    .diagram-controls button {
      background-color: white;
      border: none;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    body.dark-theme .diagram-controls button {
      background-color: #2a2a2a;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize diagrams when the tab is loaded
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // For the workflows tab, initialize our diagrams
      if (tabId === 'workflows') {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          initWorkflowDiagrams();
        }, 300);
      }
    });
  });
  
  // Function to initialize diagrams on the workflows tab
  function initWorkflowDiagrams() {
    // Use our new render functions
    window.renderMermaidFromFile('traditional-workflow', 'traditional-workflow.txt');
    window.renderMermaidFromFile('ai-assisted-workflow', 'ai-assisted-workflow.txt');
    window.renderMermaidFromFile('ai-first-workflow', 'ai-first-workflow.txt');
  }
  
  // Initialize if we're already on the workflows tab
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab && activeTab.getAttribute('data-tab') === 'workflows') {
    // Small delay to ensure DOM is fully loaded
    setTimeout(initWorkflowDiagrams, 500);
  }
});
