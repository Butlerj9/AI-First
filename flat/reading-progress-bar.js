// reading-progress-bar.js - Add to static/js/ directory
document.addEventListener('DOMContentLoaded', function() {
    // Create the progress bar element
    function createProgressBar() {
        // Create container for the progress bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.style.position = 'sticky';
        progressContainer.style.top = '0';
        progressContainer.style.width = '100%';
        progressContainer.style.height = '4px';
        progressContainer.style.backgroundColor = '#f3f4f6'; // light gray
        progressContainer.style.zIndex = '10';
        
        // Create the progress bar itself
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.height = '4px';
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = '#3b82f6'; // blue
        progressBar.style.transition = 'width 0.1s ease';
        
        // Append progress bar to container
        progressContainer.appendChild(progressBar);
        
        return progressContainer;
    }
    
    // Function to update progress bar
    function updateProgressBar() {
        const contentContainer = document.querySelector('.markdown-content-container');
        if (!contentContainer) return;
        
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        // Calculate scroll percentage
        const scrollTop = contentContainer.scrollTop;
        const scrollHeight = contentContainer.scrollHeight;
        const clientHeight = contentContainer.clientHeight;
        
        // Calculate how far we've scrolled as a percentage
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        // Update progress bar width
        progressBar.style.width = scrollPercentage + '%';
        
        // Update the color based on progress
        // Start blue, transition to green as we get closer to completion
        const hue = 210 + (scrollPercentage * 0.55); // 210 is blue, goes toward 265 (green-blue)
        progressBar.style.backgroundColor = `hsl(${hue}, 90%, 55%)`;
    }
    
    // Function to add progress bar to content container
    function addProgressBarToContent() {
        // Check if we're on the overview tab
        const activeTab = document.querySelector('.tab-button.active');
        if (!activeTab || activeTab.getAttribute('data-tab') !== 'overview') {
            return;
        }
        
        const contentContainer = document.querySelector('.markdown-content-container');
        if (!contentContainer) return;
        
        // Don't add if it already exists
        if (contentContainer.querySelector('.progress-container')) return;
        
        // Create and add progress bar
        const progressContainer = createProgressBar();
        contentContainer.insertBefore(progressContainer, contentContainer.firstChild);
        
        // Add scroll event listener to update progress
        contentContainer.addEventListener('scroll', updateProgressBar);
        
        // Initial update
        updateProgressBar();
    }
    
    // Watch for tab changes
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Wait for content to load
            setTimeout(addProgressBarToContent, 500);
        });
    });
    
    // Handle dark mode changes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.body) {
                
                const progressContainer = document.querySelector('.progress-container');
                if (progressContainer) {
                    if (document.body.classList.contains('dark-theme')) {
                        progressContainer.style.backgroundColor = '#1f2937'; // dark gray for dark mode
                    } else {
                        progressContainer.style.backgroundColor = '#f3f4f6'; // light gray for light mode
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Initial setup if page loads on overview tab
    setTimeout(addProgressBarToContent, 1000);
});
