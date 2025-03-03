// TOC Height Enhancement Script
function enhanceTOCHeight() {
    // Apply the custom styles
    const style = document.createElement('style');
    style.textContent = `
    /* Extended TOC container styles for full height display without scrolling */
    .toc-container {
        position: relative !important; /* Changed from sticky to relative */
        height: auto !important;
        max-height: none !important; /* Remove max-height constraint */
        overflow-y: visible !important; /* No scrolling */
        padding-right: 1rem;
        padding-bottom: 2rem;
        border-right: 1px solid #e5e7eb;
    }

    /* Allow the TOC to stretch to full height */
    #toc-links {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    /* Make TOC links more readable */
    .toc-link {
        display: block;
        padding: 0.125rem 0;
        color: #4b5563;
        text-decoration: none;
        transition: color 0.2s;
        line-height: 1.4; /* Slightly increased for readability */
    }

    /* Improve indentation for level 3 headings */
    .toc-link.level-3 {
        padding-left: 1.5rem;
        font-size: 0.9rem;
        border-left: 2px solid #e5e7eb;
        margin-left: 0.5rem;
    }

    /* Active link highlighting */
    .toc-link.active {
        color: #2563eb;
        font-weight: 600;
    }

    /* Make the TOC heading more compact */
    .toc-container h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
        color: #1e40af;
    }

    /* For main content area, ensure it has no height limits */
    .markdown-content {
        max-height: none !important;
        height: auto !important;
    }

    /* Ensure the card container is full height */
    .card {
        height: auto !important;
        min-height: 100% !important;
        max-height: none !important;
    }

    /* Fix the grid layout for better TOC and content display */
    .grid.grid-cols-1.md\\:grid-cols-4.gap-6 {
        display: grid !important;
        grid-template-columns: minmax(250px, 1fr) minmax(0, 3fr) !important;
    }

    /* Stretch the main container */
    main.flex-grow {
        min-height: calc(100vh - 200px);
    }
    `;
    document.head.appendChild(style);
    
    // Function to dynamically adjust TOC height based on content height
    function adjustTOCHeight() {
        const tocContainer = document.querySelector('.toc-container');
        if (!tocContainer) return;
        
        // Get the markdown content element
        const markdownContent = document.querySelector('.markdown-content');
        if (!markdownContent) return;
        
        // Get the card container
        const card = markdownContent.closest('.card');
        
        // Calculate the content height
        const contentHeight = markdownContent.scrollHeight;
        
        // Set TOC height to match the content height, not limiting to viewport
        tocContainer.style.minHeight = `${contentHeight}px`;
        
        // Ensure no max-height constraint and no scrolling
        tocContainer.style.maxHeight = 'none';
        tocContainer.style.overflowY = 'visible';
        
        // If we have a card container, make sure it's full height too
        if (card) {
            card.style.height = 'auto';
            card.style.minHeight = `${contentHeight}px`;
        }
        
        console.log('TOC height adjusted to match content:', contentHeight);
    }
    
    // Run initial adjustment
    setTimeout(adjustTOCHeight, 300); // Small delay to ensure content is rendered
    
    // Re-adjust on window resize
    window.addEventListener('resize', adjustTOCHeight);
    
    // Re-adjust when the page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(adjustTOCHeight, 500);
    });
    
    // Add adjustment when tab changes
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Allow time for new content to load
            setTimeout(adjustTOCHeight, 500);
        });
    });
    
    // One more adjustment after everything should be loaded
    setTimeout(adjustTOCHeight, 2000);
}

// Run enhancement when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceTOCHeight);
} else {
    enhanceTOCHeight();
}