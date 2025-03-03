// mermaid-pan-zoom-improved.js - Add to static/js/ directory
document.addEventListener('DOMContentLoaded', function() {
  // Wait for mermaid diagrams to be rendered
  setTimeout(initMermaidPanZoom, 1000);
});

function initMermaidPanZoom() {
  // Find all rendered mermaid diagrams
  const mermaidDivs = document.querySelectorAll('.mermaid');
  
  mermaidDivs.forEach((div, index) => {
    // Check if the diagram has already been processed
    if (div.getAttribute('data-pan-zoom-initialized')) return;
    
    // Find the SVG element inside the mermaid div
    const svg = div.querySelector('svg');
    if (!svg) return;
    
    // Set the svg to be zoomable and pannable
    makeSvgPanZoomable(svg, div, index);
    
    // Mark this diagram as processed
    div.setAttribute('data-pan-zoom-initialized', 'true');
  });
}

function makeSvgPanZoomable(svg, container, index) {
  // Add viewBox if it doesn't exist
  if (!svg.getAttribute('viewBox')) {
    const width = svg.getAttribute('width') || svg.getBoundingClientRect().width;
    const height = svg.getAttribute('height') || svg.getBoundingClientRect().height;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  }
  
  // Set SVG to responsive mode
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.maxWidth = '100%';
  
  // Create controls container
  const controlsId = `diagram-controls-${index}`;
  let controls = document.getElementById(controlsId);
  
  if (!controls) {
    controls = document.createElement('div');
    controls.id = controlsId;
    controls.className = 'diagram-controls';
    controls.innerHTML = `
      <button class="zoom-in" title="Zoom In">+</button>
      <button class="zoom-out" title="Zoom Out">−</button>
      <button class="reset" title="Reset View">↺</button>
      <button class="fullscreen" title="Toggle Fullscreen">⛶</button>
    `;
    
    // Insert before the diagram
    container.parentNode.insertBefore(controls, container);
  }
  
  // Add CSS styles
  if (!document.getElementById('mermaid-pan-zoom-styles')) {
    const style = document.createElement('style');
    style.id = 'mermaid-pan-zoom-styles';
    style.textContent = `
      .diagram-controls {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      
      .diagram-controls button {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        background-color: #f3f4f6;
        border: 1px solid #d1d5db;
        color: #374151;
        font-size: 18px;
        line-height: 1;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .diagram-controls button:hover {
        background-color: #e5e7eb;
      }
      
      .diagram-fullscreen {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100vw !important;
        height: 100vh !important;
        background-color: rgba(255, 255, 255, 0.95);
        z-index: 9999;
        padding: 20px;
        overflow: auto;
        display: flex;
        flex-direction: column;
      }
      
      .diagram-fullscreen .diagram-controls {
        position: sticky;
        top: 0;
        z-index: 10000;
        background-color: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      /* Dark mode styles */
      body.dark-theme .diagram-controls button {
        background-color: #374151;
        border-color: #4b5563;
        color: #e5e7eb;
      }
      
      body.dark-theme .diagram-controls button:hover {
        background-color: #4b5563;
      }
      
      body.dark-theme .diagram-fullscreen {
        background-color: rgba(31, 41, 55, 0.95);
      }
      
      body.dark-theme .diagram-fullscreen .diagram-controls {
        background-color: #1f2937;
      }
      
      /* Draggable SVG style */
      .mermaid svg {
        cursor: grab;
      }
      
      .mermaid svg.dragging {
        cursor: grabbing;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add event listeners for buttons
  const zoomInBtn = controls.querySelector('.zoom-in');
  const zoomOutBtn = controls.querySelector('.zoom-out');
  const resetBtn = controls.querySelector('.reset');
  const fullscreenBtn = controls.querySelector('.fullscreen');
  
  // Initialize zoom and pan state
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
  const originalViewBox = [...viewBox];
  
  // Track mouse position for zooming
  let mouseX = 0;
  let mouseY = 0;
  
  // Update mouse position on mousemove
  svg.addEventListener('mousemove', function(e) {
    const svgRect = svg.getBoundingClientRect();
    mouseX = e.clientX - svgRect.left;
    mouseY = e.clientY - svgRect.top;
  });
  
  // Update the view transform
  function updateTransform() {
    // SVG root group - first g element inside the SVG
    const rootGroup = svg.querySelector('g');
    if (rootGroup) {
      rootGroup.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      rootGroup.style.transformOrigin = 'center';
    }
  }
  
  // Reset to original view
  function resetView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    viewBox = [...originalViewBox];
    svg.setAttribute('viewBox', viewBox.join(' '));
    updateTransform();
  }
  
  // Zoom function with focus on mouse position
  function zoom(factor, focusX, focusY) {
    // If no focus point provided, use center or last known mouse position
    if (focusX === undefined || focusY === undefined) {
      const svgRect = svg.getBoundingClientRect();
      focusX = mouseX || svgRect.width / 2;
      focusY = mouseY || svgRect.height / 2;
    }
    
    // Calculate the position relative to the current transform
    const svgRect = svg.getBoundingClientRect();
    const viewportCenterX = svgRect.width / 2;
    const viewportCenterY = svgRect.height / 2;
    
    // Calculate point before zoom
    const pointBeforeZoomX = (focusX - viewportCenterX - translateX) / scale;
    const pointBeforeZoomY = (focusY - viewportCenterY - translateY) / scale;
    
    // Apply zoom factor
    const oldScale = scale;
    scale *= factor;
    
    // Calculate point after zoom
    const pointAfterZoomX = (focusX - viewportCenterX - translateX) / scale;
    const pointAfterZoomY = (focusY - viewportCenterY - translateY) / scale;
    
    // Adjust translation to keep the focus point in the same position
    translateX += (pointBeforeZoomX - pointAfterZoomX) * scale;
    translateY += (pointBeforeZoomY - pointAfterZoomY) * scale;
    
    // Update SVG transform
    updateTransform();
  }
  
  // Zoom in function at mouse position
  function zoomIn(e) {
    let focusX, focusY;
    
    // If triggered by event, use that position
    if (e && e.clientX && e.clientY) {
      const svgRect = svg.getBoundingClientRect();
      focusX = e.clientX - svgRect.left;
      focusY = e.clientY - svgRect.top;
    }
    
    zoom(1.2, focusX, focusY);
  }
  
  // Zoom out function at mouse position
  function zoomOut(e) {
    let focusX, focusY;
    
    // If triggered by event, use that position
    if (e && e.clientX && e.clientY) {
      const svgRect = svg.getBoundingClientRect();
      focusX = e.clientX - svgRect.left;
      focusY = e.clientY - svgRect.top;
    }
    
    zoom(0.8, focusX, focusY);
  }
  
  // Toggle fullscreen mode
  function toggleFullscreen() {
    container.classList.toggle('diagram-fullscreen');
    if (container.classList.contains('diagram-fullscreen')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Reset view when entering/exiting fullscreen to avoid confusion
    resetView();
  }
  
  // Add button event listeners
  zoomInBtn.addEventListener('click', function(e) {
    // Use button position as focus point
    const rect = this.getBoundingClientRect();
    const fakeEvent = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2 + 50  // Offset down to zoom below the button
    };
    zoomIn(fakeEvent);
  });
  
  zoomOutBtn.addEventListener('click', function(e) {
    // Use button position as focus point
    const rect = this.getBoundingClientRect();
    const fakeEvent = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2 + 50  // Offset down to zoom below the button
    };
    zoomOut(fakeEvent);
  });
  
  resetBtn.addEventListener('click', resetView);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  
  // Add mouse wheel zoom
  container.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn(e);
    } else {
      zoomOut(e);
    }
  });
  
  // Add pan functionality
  let isDragging = false;
  let lastX, lastY;
  
  svg.addEventListener('mousedown', function(e) {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    svg.classList.add('dragging');
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      
      translateX += dx;
      translateY += dy;
      updateTransform();
    }
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
    svg.classList.remove('dragging');
  });
  
  // Escape key to exit fullscreen
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && container.classList.contains('diagram-fullscreen')) {
      container.classList.remove('diagram-fullscreen');
      document.body.style.overflow = '';
    }
  });
  
  // Double-click to reset
  svg.addEventListener('dblclick', resetView);
  
  // Initialize with default view
  updateTransform();
}

// Re-initialize when tab changes or after mermaid might have reloaded
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('tab-button')) {
    // Wait for the tab content to be loaded and mermaid to render
    setTimeout(initMermaidPanZoom, 1000);
  }
});

// Initialize when page is loaded
window.addEventListener('load', function() {
  // Extra init in case mermaid was slow to load
  setTimeout(initMermaidPanZoom, 1500);
});

// Watch for theme changes
const themeObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === 'class' && 
        (mutation.target.classList.contains('dark-theme') || 
         !mutation.target.classList.contains('dark-theme'))) {
      // Theme changed, reinitialize controls
      setTimeout(initMermaidPanZoom, 500);
    }
  });
});

themeObserver.observe(document.body, { attributes: true });