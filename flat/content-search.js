// content-search.js - Add to static/js/ directory
document.addEventListener('DOMContentLoaded', function() {
    // Function to add search interface
    function addSearchInterface() {
        // Only run this on the overview tab
        const activeTab = document.querySelector('.tab-button.active');
        if (!activeTab || activeTab.getAttribute('data-tab') !== 'overview') {
            return;
        }
        
        // Check if search is already added
        if (document.querySelector('.content-search-container')) return;
        
        const contentCard = document.querySelector('.markdown-content-container');
        if (!contentCard) return;
        
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'content-search-container';
        searchContainer.style.position = 'sticky';
        searchContainer.style.top = '4px'; // Position below progress bar
        searchContainer.style.zIndex = '10';
        searchContainer.style.padding = '8px';
        searchContainer.style.marginBottom = '8px';
        searchContainer.style.backgroundColor = '#ffffff';
        searchContainer.style.borderRadius = '8px';
        searchContainer.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        searchContainer.style.borderBottom = '1px solid #e5e7eb';
        searchContainer.style.display = 'flex';
        searchContainer.style.alignItems = 'center';
        searchContainer.style.gap = '8px';
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search in document...';
        searchInput.className = 'content-search-input';
        searchInput.style.flex = '1';
        searchInput.style.padding = '6px 12px';
        searchInput.style.border = '1px solid #d1d5db';
        searchInput.style.borderRadius = '6px';
        searchInput.style.fontSize = '14px';
        searchInput.style.outline = 'none';
        
        // Create search button
        const searchButton = document.createElement('button');
        searchButton.className = 'content-search-button';
        searchButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        `;
        searchButton.style.backgroundColor = '#3b82f6';
        searchButton.style.color = 'white';
        searchButton.style.border = 'none';
        searchButton.style.borderRadius = '6px';
        searchButton.style.padding = '6px 12px';
        searchButton.style.cursor = 'pointer';
        searchButton.style.display = 'flex';
        searchButton.style.alignItems = 'center';
        searchButton.style.justifyContent = 'center';
        
        // Create results counter
        const resultsCounter = document.createElement('span');
        resultsCounter.className = 'search-results-counter';
        resultsCounter.style.fontSize = '14px';
        resultsCounter.style.color = '#6b7280';
        resultsCounter.style.display = 'none';
        
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'search-prev-button';
        prevButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        `;
        prevButton.style.backgroundColor = '#e5e7eb';
        prevButton.style.color = '#374151';
        prevButton.style.border = 'none';
        prevButton.style.borderRadius = '6px';
        prevButton.style.padding = '6px';
        prevButton.style.cursor = 'pointer';
        prevButton.style.display = 'none';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'search-next-button';
        nextButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        `;
        nextButton.style.backgroundColor = '#e5e7eb';
        nextButton.style.color = '#374151';
        nextButton.style.border = 'none';
        nextButton.style.borderRadius = '6px';
        nextButton.style.padding = '6px';
        nextButton.style.cursor = 'pointer';
        nextButton.style.display = 'none';
        
        // Create close button 
        const closeButton = document.createElement('button');
        closeButton.className = 'search-close-button';
        closeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.color = '#6b7280';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '6px';
        closeButton.style.padding = '6px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.display = 'none';
        
        // Add elements to search container
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        searchContainer.appendChild(resultsCounter);
        searchContainer.appendChild(prevButton);
        searchContainer.appendChild(nextButton);
        searchContainer.appendChild(closeButton);
        
        // Add search container to content card
        contentCard.insertBefore(searchContainer, contentCard.firstChild);
        
        // Store search state
        const searchState = {
            results: [],
            currentIndex: -1,
            markers: []
        };
        
        // Function to perform search
        function performSearch() {
            // Clear previous search
            clearSearch();
            
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;
            
            const content = document.querySelector('.markdown-content');
            if (!content) return;
            
            // Get all text nodes in the content
            const textNodes = getTextNodes(content);
            
            // Find matches in text nodes
            textNodes.forEach(node => {
                const text = node.nodeValue.toLowerCase();
                let index = text.indexOf(query);
                
                while (index !== -1) {
                    // Store the match information
                    searchState.results.push({
                        node: node,
                        startIndex: index,
                        endIndex: index + query.length
                    });
                    
                    // Look for next occurrence
                    index = text.indexOf(query, index + 1);
                }
            });
            
            // Update counter
            resultsCounter.textContent = `${searchState.results.length} results`;
            resultsCounter.style.display = 'inline';
            
            // Show navigation buttons if there are results
            if (searchState.results.length > 0) {
                prevButton.style.display = 'inline-flex';
                nextButton.style.display = 'inline-flex';
                closeButton.style.display = 'inline-flex';
                
                // Highlight all matches
                highlightAllMatches();
                
                // Navigate to first result
                navigateToResult(0);
            } else {
                resultsCounter.textContent = 'No results found';
            }
        }
        
        // Function to get all text nodes
        function getTextNodes(node) {
            const textNodes = [];
            
            function collectTextNodes(node) {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
                    textNodes.push(node);
                } else {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        collectTextNodes(node.childNodes[i]);
                    }
                }
            }
            
            collectTextNodes(node);
            return textNodes;
        }
        
        // Function to highlight all matches
        function highlightAllMatches() {
            // Remove existing markers first
            clearMarkers();
            
            // Create markers for each result
            searchState.results.forEach((result, index) => {
                const { node, startIndex, endIndex } = result;
                
                // Split the text node and insert highlight
                const text = node.nodeValue;
                const before = text.substring(0, startIndex);
                const match = text.substring(startIndex, endIndex);
                const after = text.substring(endIndex);
                
                // Create the elements
                const fragment = document.createDocumentFragment();
                if (before) {
                    fragment.appendChild(document.createTextNode(before));
                }
                
                // Create highlight span
                const highlightSpan = document.createElement('span');
                highlightSpan.textContent = match;
                highlightSpan.className = 'search-highlight';
                highlightSpan.style.backgroundColor = '#fef3c7'; // light yellow
                highlightSpan.style.padding = '0 2px';
                highlightSpan.dataset.searchIndex = index;
                
                // Add to fragment
                fragment.appendChild(highlightSpan);
                
                if (after) {
                    fragment.appendChild(document.createTextNode(after));
                }
                
                // Replace the original node with the fragment
                node.parentNode.replaceChild(fragment, node);
                
                // Store the highlight span for later reference
                searchState.markers.push(highlightSpan);
            });
        }
        
        // Function to clear all highlights
        function clearMarkers() {
            // Remove highlight spans and restore original text
            searchState.markers.forEach(marker => {
                if (marker.parentNode) {
                    const textNode = document.createTextNode(marker.textContent);
                    marker.parentNode.replaceChild(textNode, marker);
                    
                    // Try to merge adjacent text nodes
                    marker.parentNode.normalize();
                }
            });
            
            searchState.markers = [];
        }
        
        // Function to navigate to a specific result
        function navigateToResult(index) {
            // Check bounds
            if (index < 0 || index >= searchState.results.length) return;
            
            // Update current index
            searchState.currentIndex = index;
            
            // Update counter
            resultsCounter.textContent = `${index + 1} of ${searchState.results.length}`;
            
            // Get the highlight span
            const highlightSpan = searchState.markers[index];
            if (!highlightSpan) return;
            
            // Update highlight styles
            searchState.markers.forEach(marker => {
                marker.style.backgroundColor = '#fef3c7'; // reset to light yellow
            });
            
            // Make current highlight stand out
            highlightSpan.style.backgroundColor = '#fcd34d'; // darker yellow
            highlightSpan.style.color = 'black';
            
            // Scroll to the highlight
            highlightSpan.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        
        // Function to clear search
        function clearSearch() {
            clearMarkers();
            searchState.results = [];
            searchState.currentIndex = -1;
            resultsCounter.style.display = 'none';
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            closeButton.style.display = 'none';
        }
        
        // Add event listeners
        searchButton.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        prevButton.addEventListener('click', function() {
            let newIndex = searchState.currentIndex - 1;
            if (newIndex < 0) {
                newIndex = searchState.results.length - 1; // wrap around to the end
            }
            navigateToResult(newIndex);
        });
        
        nextButton.addEventListener('click', function() {
            let newIndex = searchState.currentIndex + 1;
            if (newIndex >= searchState.results.length) {
                newIndex = 0; // wrap around to the beginning
            }
            navigateToResult(newIndex);
        });
        
        closeButton.addEventListener('click', function() {
            clearSearch();
            searchInput.value = '';
        });
        
        // Handle dark mode changes
        function updateDarkModeStyles() {
            const isDarkMode = document.body.classList.contains('dark-theme');
            
            if (isDarkMode) {
                searchContainer.style.backgroundColor = '#1f2937';
                searchInput.style.backgroundColor = '#374151';
                searchInput.style.borderColor = '#4b5563';
                searchInput.style.color = '#e5e7eb';
                
                // Update highlight colors for dark mode
                searchState.markers.forEach(marker => {
                    if (marker.dataset.searchIndex == searchState.currentIndex) {
                        marker.style.backgroundColor = '#d97706'; // dark amber for active in dark mode
                    } else {
                        marker.style.backgroundColor = '#78350f'; // darker amber for inactive in dark mode
                    }
                    marker.style.color = 'white';
                });
            } else {
                searchContainer.style.backgroundColor = '#ffffff';
                searchInput.style.backgroundColor = '#ffffff';
                searchInput.style.borderColor = '#d1d5db';
                searchInput.style.color = 'inherit';
                
                // Update highlight colors for light mode
                searchState.markers.forEach(marker => {
                    if (marker.dataset.searchIndex == searchState.currentIndex) {
                        marker.style.backgroundColor = '#fcd34d'; // darker yellow for active
                    } else {
                        marker.style.backgroundColor = '#fef3c7'; // light yellow for inactive
                    }
                    marker.style.color = 'black';
                });
            }
        }
        
        // Watch for theme changes
        const themeObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class' && 
                    mutation.target === document.body) {
                    updateDarkModeStyles();
                }
            });
        });
        
        themeObserver.observe(document.body, { attributes: true });
        
        // Initial dark mode check
        updateDarkModeStyles();
    }
    
    // Add event listeners for tab changes
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Wait for content to load
            setTimeout(addSearchInterface, 500);
        });
    });
    
    // Initial setup
    setTimeout(addSearchInterface, 1000);
});
