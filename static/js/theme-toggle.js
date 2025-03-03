// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.setAttribute('title', 'Toggle dark mode');
    
    // Create SVG icons for sun and moon
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;
    
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultDark = savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme);
    
    // Apply initial theme
    if (defaultDark) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = sunIcon;
    } else {
        themeToggle.innerHTML = moonIcon;
    }
    
    // Add toggle button to the DOM
    document.body.appendChild(themeToggle);
    
    // Add event listener for theme toggle
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        
        if (isDark) {
            themeToggle.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
            
            // Reinitialize charts if they exist
            if (typeof reinitializeCharts === 'function') {
                reinitializeCharts();
            }
            
            // Reinitialize mermaid if it exists
            if (typeof mermaid !== 'undefined') {
                try {
                    mermaid.initialize({
                        theme: 'dark',
                        securityLevel: 'loose'
                    });
                    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                } catch (e) {
                    console.warn('Mermaid re-initialization failed:', e);
                }
            }
        } else {
            themeToggle.innerHTML = moonIcon;
            localStorage.setItem('theme', 'light');
            
            // Reinitialize charts if they exist
            if (typeof reinitializeCharts === 'function') {
                reinitializeCharts();
            }
            
            // Reinitialize mermaid if it exists
            if (typeof mermaid !== 'undefined') {
                try {
                    mermaid.initialize({
                        theme: 'default',
                        securityLevel: 'loose'
                    });
                    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                } catch (e) {
                    console.warn('Mermaid re-initialization failed:', e);
                }
            }
        }
    });
    
    // Helper function for reinitializing charts
    window.reinitializeCharts = function() {
        // This will be implemented if needed for chart reinitialization
        // Call appropriate chart init functions based on current tab
        const activeTabId = document.querySelector('.tab-button.active')?.getAttribute('data-tab');
        if (activeTabId === 'dashboard') {
            if (typeof initDashboardTab === 'function') {
                initDashboardTab();
            }
        } else if (activeTabId === 'comparison') {
            if (typeof initComparisonTab === 'function') {
                initComparisonTab();
            }
        }
    };
});
