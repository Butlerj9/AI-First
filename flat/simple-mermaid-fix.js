// Simple Mermaid Fix - Place in static/js/simple-mermaid-fix.js
document.addEventListener('DOMContentLoaded', function() {
  // Basic Mermaid configuration
  mermaid.initialize({
    startOnLoad: false,
    theme: document.body.classList.contains('dark-theme') ? 'dark' : 'default',
    securityLevel: 'loose'
  });

  // Function to initialize workflow tab diagrams
  function initWorkflowsDiagrams() {
    console.log('Initializing workflow diagrams');
    
    // Try to get diagram content via AJAX
    function loadDiagram(elementId, filename) {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      // Show loading indicator
      element.innerHTML = '<div class="text-center p-4">Loading diagram...</div>';
      
      // Make an AJAX request to fetch the diagram content
      fetch('/api/files/' + filename)
        .then(response => response.text())
        .then(content => {
          // Update the element with the diagram content
          element.textContent = content;
          element.className = 'mermaid';
          
          // Render the diagram
          mermaid.init(undefined, element);
        })
        .catch(error => {
          console.error('Error loading diagram:', error);
          element.innerHTML = '<div class="p-4 text-red-500">Error loading diagram: ' + error.message + '</div>';
        });
    }
    
    // Load each diagram
    loadDiagram('traditional-workflow', 'traditional-workflow.txt');
    loadDiagram('ai-assisted-workflow', 'ai-assisted-workflow.txt');
    loadDiagram('ai-first-workflow', 'ai-first-workflow.txt');
  }
  
  // Handle tab switching to initialize diagrams
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      if (tabId === 'workflows') {
        // Wait for the tab content to be loaded
        setTimeout(initWorkflowsDiagrams, 200);
      }
    });
  });
  
  // Check if we're already on the workflows tab
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab && activeTab.getAttribute('data-tab') === 'workflows') {
    // Initialize diagrams after a delay to ensure content is loaded
    setTimeout(initWorkflowsDiagrams, 500);
  }
});
