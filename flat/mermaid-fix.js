// Enhanced Mermaid initialization for more reliable rendering
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mermaid with more robust config
  mermaid.initialize({
    startOnLoad: false, // We'll manually render to ensure proper timing
    theme: document.body.classList.contains('dark-theme') ? 'dark' : 'default',
    securityLevel: 'loose',
    flowchart: { 
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    logLevel: 4, // Add logging for better debugging
    htmlLabelRenderer: true, // Ensure HTML labels are rendered properly
    fontSize: 14, // Standardize font size
    fontFamily: 'Arial',
    themeCSS: '.label { font-family: Arial; }' // Ensure consistent fonts
  });
  
  // Function to initialize or re-initialize mermaid diagrams
  window.renderMermaidDiagrams = function() {
    console.log('Rendering mermaid diagrams...');
    
    // Clear any previous diagrams
    document.querySelectorAll('.mermaid:not([data-processed])').forEach(diagram => {
      // For better error handling, wrap each diagram processing
      try {
        // Add processing indicator
        diagram.setAttribute('data-processing', 'true');
        
        // Pre-process diagram text to ensure compatibility
        const diagramText = diagram.textContent.trim();
        if (diagramText) {
          console.log(`Processing diagram: ${diagramText.substring(0, 50)}...`);
          
          // Clear previous content and add a processing message
          const originalContent = diagram.textContent;
          diagram.innerHTML = '<div class="text-center p-4">Rendering diagram...</div>';
          
          // Use unique ID for each diagram
          const diagramId = 'mermaid-' + Math.random().toString(36).substring(2, 15);
          diagram.id = diagramId;
          
          // Render the diagram with proper error handling
          mermaid.render(diagramId, originalContent)
            .then(result => {
              diagram.innerHTML = result.svg;
              diagram.setAttribute('data-processed', 'true');
              console.log(`Successfully rendered diagram ${diagramId}`);
              
              // Add zoom controls after successful render
              addZoomControls(diagram);
            })
            .catch(error => {
              console.error('Error rendering diagram:', error);
              diagram.innerHTML = `
                <div class="p-4 border border-red-300 bg-red-50 rounded text-center">
                  <p class="text-red-600 font-bold">Error rendering diagram</p>
                  <p class="text-gray-700 text-sm mt-2">${error.message || 'Unknown error'}</p>
                  <div class="mt-3 p-3 bg-gray-100 rounded text-left overflow-auto text-xs font-mono">
                    ${originalContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                  </div>
                </div>
              `;
            })
            .finally(() => {
              // Remove processing indicator
              diagram.removeAttribute('data-processing');
            });
        }
      } catch (e) {
        console.error('Error processing diagram:', e);
        diagram.innerHTML = `<div class="text-red-600 p-4">Error: ${e.message}</div>`;
        diagram.removeAttribute('data-processing');
      }
    });
  };
  
  // Add zoom controls to diagrams
  function addZoomControls(diagram) {
    // Create a container for the diagram and controls
    const container = document.createElement('div');
    container.className = 'diagram-container relative';
    diagram.parentNode.insertBefore(container, diagram);
    container.appendChild(diagram);
    
    // Add controls div
    const controls = document.createElement('div');
    controls.className = 'diagram-controls absolute top-2 right-2 flex space-x-2 bg-white dark:bg-gray-800 rounded shadow p-1';
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
    container.appendChild(controls);
    
    // Get the SVG element
    const svg = diagram.querySelector('svg');
    if (!svg) return;
    
    // Set up initial state
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    const originalWidth = svg.getAttribute('width');
    const originalHeight = svg.getAttribute('height');
    
    // Make SVG responsive
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');
    
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
      const transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      svg.style.transform = transform;
      svg.style.transformOrigin = 'center';
      svg.style.transition = 'transform 0.2s ease';
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
    
    // Make the diagram grabbable
    svg.style.cursor = 'grab';
    
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
  
  // Listen for tab changes
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      // Allow time for the content to load
      setTimeout(window.renderMermaidDiagrams, 200);
    });
  });
  
  // Listen for theme changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class' && mutation.target === document.body) {
        mermaid.initialize({
          theme: document.body.classList.contains('dark-theme') ? 'dark' : 'default'
        });
        setTimeout(window.renderMermaidDiagrams, 200);
      }
    });
  });
  
  observer.observe(document.body, { attributes: true });
  
  // Initial render (with slight delay to ensure content is loaded)
  setTimeout(window.renderMermaidDiagrams, 1000);
});
