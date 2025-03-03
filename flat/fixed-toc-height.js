// Improved TOC Height Management Script
document.addEventListener('DOMContentLoaded', function() {
  // Apply enhanced TOC styles with better tab navigation support
  const style = document.createElement('style');
  style.textContent = `
    /* Fixed TOC container styles for reliable display across tab navigation */
    .toc-container {
      position: relative !important;
      height: auto !important;
      max-height: none !important;
      overflow-y: visible !important;
      padding-right: 1rem;
      padding-bottom: 2rem;
      border-right: 1px solid #e5e7eb;
    }

    /* Ensure proper grid layout for overview page */
    .grid.grid-cols-1.md\\:grid-cols-4.gap-6 {
      display: grid !important;
      grid-template-columns: 250px 1fr !important;
    }

    /* Fix column positioning */
    .md\\:col-span-1 {
      grid-column: 1 !important;
      display: block !important;
    }

    .md\\:col-span-3 {
      grid-column: 2 !important;
    }

    /* Ensure TOC links display properly */
    #toc-links {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    /* Active link styling */
    .toc-link.active {
      color: #2563eb;
      font-weight: 600;
      border-left-color: #2563eb;
    }

    /* Level 3 heading indentation */
    .toc-link.level-3 {
      padding-left: 1.5rem;
      font-size: 0.9rem;
      border-left: 2px solid #e5e7eb;
      margin-left: 0.5rem;
    }
  `;
  document.head.appendChild(style);

  // Main function to adjust TOC height and ensure proper display
  function fixTOCLayout() {
    // First make sure we're on the overview tab
    const activeTab = document.querySelector('.tab-button.active');
    if (!activeTab || activeTab.getAttribute('data-tab') !== 'overview') {
      return; // Not on overview tab, no TOC to fix
    }

    // Get the TOC container
    const tocContainer = document.querySelector('.toc-container');
    if (!tocContainer) return;

    // Get the markdown content and its container
    const markdownContent = document.querySelector('.markdown-content');
    if (!markdownContent) return;
    
    const card = markdownContent.closest('.card');
    
    // Fix grid layout if needed
    const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4.gap-6');
    if (gridContainer) {
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
    
    // Ensure TOC container has proper height
    const contentHeight = markdownContent.scrollHeight || 800; // Use 800px as fallback min height
    tocContainer.style.minHeight = `${contentHeight}px`;
    
    // Make sure TOC is visible
    tocContainer.style.display = 'block';
    tocContainer.style.visibility = 'visible';
    tocContainer.style.opacity = '1';
    
    // Ensure proper positioning
    tocContainer.style.position = 'relative';
    tocContainer.style.top = '0';
    
    // If we have a card container, make sure it displays properly
    if (card) {
      card.style.height = 'auto';
      card.style.minHeight = `${contentHeight}px`;
    }
  }
  
  // Setup event listeners to ensure TOC displays correctly
  
  // 1. When tabs are clicked
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Small delay to allow content to load
      setTimeout(fixTOCLayout, 100);
      // Additional check a bit later for dynamic content
      setTimeout(fixTOCLayout, 500);
    });
  });
  
  // 2. When window is resized
  window.addEventListener('resize', fixTOCLayout);
  
  // 3. When content might change
  document.addEventListener('scroll', function() {
    // Debounce for performance
    if (window.tocFixTimeout) clearTimeout(window.tocFixTimeout);
    window.tocFixTimeout = setTimeout(fixTOCLayout, 200);
  });
  
  // 4. When page is fully loaded
  window.addEventListener('load', function() {
    fixTOCLayout();
    // Double-check after a delay
    setTimeout(fixTOCLayout, 1000);
  });
  
  // Run initial fix
  fixTOCLayout();
  
  // Additional check after everything is loaded
  setTimeout(fixTOCLayout, 1500);
});
