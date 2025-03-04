// improved-toc-navigation.js - Add to static/js/ directory
document.addEventListener('DOMContentLoaded', function() {
    // Function to enhance TOC navigation
    function enhanceTOCNavigation() {
        // Only run this on the overview tab
        const activeTab = document.querySelector('.tab-button.active');
        if (!activeTab || activeTab.getAttribute('data-tab') !== 'overview') {
            return;
        }
        
        const contentContainer = document.querySelector('.markdown-content-container');
        const tocLinks = document.querySelectorAll('.toc-link');
        const tocContainer = document.querySelector('.toc-container');
        
        if (!contentContainer || !tocLinks.length || !tocContainer) return;
        
        // Get all section headings from the content
        const headings = contentContainer.querySelectorAll('h2, h3');
        const headingPositions = [];
        
        // Store the positions of all headings
        headings.forEach(heading => {
            headingPositions.push({
                id: heading.id,
                top: heading.offsetTop - contentContainer.offsetTop
            });
        });
        
        // Update active TOC link based on scroll position
        function updateActiveTOCLink() {
            const scrollPosition = contentContainer.scrollTop;
            
            // Find the current heading
            let currentHeadingIndex = -1;
            
            for (let i = 0; i < headingPositions.length; i++) {
                // Add a small offset to handle cases right at the boundary
                if (headingPositions[i].top <= scrollPosition + 50) {
                    currentHeadingIndex = i;
                } else {
                    break;
                }
            }
            
            // Remove active class from all links
            tocLinks.forEach(link => {
                link.classList.remove('active');
                // Remove highlight effect
                link.style.borderLeftColor = '';
                link.style.paddingLeft = '';
            });
            
            // Add active class to current link
            if (currentHeadingIndex >= 0) {
                const currentHeadingId = headingPositions[currentHeadingIndex].id;
                
                // Find the matching TOC link
                const activeLink = Array.from(tocLinks).find(link => {
                    const href = link.getAttribute('href');
                    return href === `#${currentHeadingId}`;
                });
                
                if (activeLink) {
                    // Add active class
                    activeLink.classList.add('active');
                    
                    // Add highlight effect
                    activeLink.style.borderLeft = '3px solid #3b82f6';
                    activeLink.style.paddingLeft = '1rem';
                    
                    // Scroll the TOC to keep the active link visible
                    const linkTop = activeLink.offsetTop;
                    const tocHeight = tocContainer.clientHeight;
                    const linkHeight = activeLink.clientHeight;
                    
                    // Check if the active link is outside the visible area
                    if (linkTop < tocContainer.scrollTop || 
                        linkTop + linkHeight > tocContainer.scrollTop + tocHeight) {
                        
                        // Scroll to position the active link in the middle
                        tocContainer.scrollTop = linkTop - (tocHeight / 2) + (linkHeight / 2);
                    }
                }
            }
        }
        
        // Add smooth scrolling to TOC links
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target heading ID
                const targetId = this.getAttribute('href').substring(1);
                const targetHeading = document.getElementById(targetId);
                
                if (targetHeading) {
                    // Scroll to the heading with smooth behavior
                    contentContainer.scrollTo({
                        top: targetHeading.offsetTop - contentContainer.offsetTop - 20, // 20px offset for padding
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without scrolling the page
                    if (history.pushState) {
                        history.pushState(null, null, `#${targetId}`);
                    }
                }
            });
        });
        
        // Add scroll event listener
        contentContainer.addEventListener('scroll', updateActiveTOCLink);
        
        // Initial update
        updateActiveTOCLink();
    }
    
    // Set up event listeners for tab changes
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Wait for content to load
            setTimeout(enhanceTOCNavigation, 500);
        });
    });
    
    // Handle dark mode changes for TOC highlighting
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.body) {
                
                const activeLink = document.querySelector('.toc-link.active');
                if (activeLink) {
                    if (document.body.classList.contains('dark-theme')) {
                        activeLink.style.borderLeftColor = '#60a5fa'; // lighter blue for dark mode
                    } else {
                        activeLink.style.borderLeftColor = '#3b82f6'; // standard blue for light mode
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Initial setup
    setTimeout(enhanceTOCNavigation, 1000);
});
