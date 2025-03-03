// Tab Navigation Fix Script - Ensures TOC displays correctly when returning to overview tab
document.addEventListener('DOMContentLoaded', function() {
  // Store original tab switching function
  const originalLoadTabContent = window.loadTabContent || function() {};
  
  // Override tab content loading function if it exists
  if (window.loadTabContent) {
    window.loadTabContent = function(tabId) {
      // Call the original function
      originalLoadTabContent(tabId);
      
      // If returning to overview tab, ensure TOC is properly displayed
      if (tabId === 'overview') {
        // Small delay to ensure content is loaded
        setTimeout(function() {
          // Get the grid container
          const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4.gap-6');
          if (gridContainer) {
            // Force grid display
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = '250px 1fr';
            
            // Fix column positions
            const tocColumn = gridContainer.querySelector('.md\\:col-span-1');
            if (tocColumn) {
              tocColumn.style.gridColumn = '1';
              tocColumn.style.display = 'block';
            }
            
            const contentColumn = gridContainer.querySelector('.md\\:col-span-3');
            if (contentColumn) {
              contentColumn.style.gridColumn = '2';
            }
          }
          
          // Ensure TOC container is visible
          const tocContainer = document.querySelector('.toc-container');
          if (tocContainer) {
            tocContainer.style.display = 'block';
            tocContainer.style.visibility = 'visible';
            tocContainer.style.position = 'relative';
            tocContainer.style.top = '0';
          }
        }, 100);
      }
    };
  }
  
  // Direct fix for tab navigation
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // If overview tab, add special handling
      if (tabId === 'overview') {
        setTimeout(function() {
          // Fix TOC display
          const tocContainer = document.querySelector('.toc-container');
          if (tocContainer) {
            tocContainer.style.position = 'relative';
            tocContainer.style.display = 'block';
            tocContainer.style.visibility = 'visible';
          }
          
          // Fix grid layout
          const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4.gap-6');
          if (gridContainer) {
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = '250px 1fr';
          }
        }, 200);
      }
    });
  });
});
