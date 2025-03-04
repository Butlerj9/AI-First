// email-pdf.js - Add to static/js/ directory
document.addEventListener('DOMContentLoaded', function() {
    // Function to add email PDF button
    function addEmailPDFButton() {
        // Only run this on the overview tab
        const activeTab = document.querySelector('.tab-button.active');
        if (!activeTab || activeTab.getAttribute('data-tab') !== 'overview') {
            return;
        }
        
        // Check if button is already added
        if (document.querySelector('.email-pdf-button')) return;
        
        // Find the container element to add the button to
        const cardHeader = document.querySelector('.card .p-6');
        if (!cardHeader) return;
        
        // Create button container with flexbox layout
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex justify-end mb-4';
        
        // Create the email PDF button
        const emailButton = document.createElement('button');
        emailButton.className = 'email-pdf-button flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition';
        
        // Button content with icon and text
        emailButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>Email PDF</span>
        `;
        
        // Add button to container
        buttonContainer.appendChild(emailButton);
        
        // Insert button container after h1 but before content
        const mainTitle = cardHeader.querySelector('#main-title');
        if (mainTitle) {
            mainTitle.insertAdjacentElement('afterend', buttonContainer);
        } else {
            // If main title not found, just add to the top of the card
            cardHeader.insertBefore(buttonContainer, cardHeader.firstChild);
        }
        
        // Add click event to the button
        emailButton.addEventListener('click', showEmailForm);
    }
    
    // Function to show the email form modal
    function showEmailForm() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modalOverlay.id = 'email-modal-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden';
        
        // Modal header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'bg-blue-600 text-white px-6 py-4 flex justify-between items-center';
        modalHeader.innerHTML = `
            <h3 class="text-lg font-medium">Request PDF Copy</h3>
            <button class="text-white hover:text-blue-100" id="close-modal">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
        
        // Modal body with form
        const modalBody = document.createElement('div');
        modalBody.className = 'px-6 py-4';
        modalBody.innerHTML = `
            <p class="mb-4 text-gray-700">Enter your email address to receive a PDF copy of the AI-First Development document.</p>
            <form id="email-pdf-form" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" name="email" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com">
                </div>
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name (optional)</label>
                    <input type="text" id="name" name="name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Name">
                </div>
                <div class="flex items-start">
                    <input type="checkbox" id="consent" name="consent" required
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1">
                    <label for="consent" class="ml-2 block text-sm text-gray-700">
                        I consent to receiving the PDF and understand my email will only be used for this purpose.
                    </label>
                </div>
            </form>
        `;
        
        // Modal footer with buttons
        const modalFooter = document.createElement('div');
        modalFooter.className = 'px-6 py-3 bg-gray-50 flex justify-end space-x-3';
        modalFooter.innerHTML = `
            <button id="cancel-button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
            </button>
            <button id="submit-button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Send PDF
            </button>
        `;
        
        // Assemble modal
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modal.appendChild(modalFooter);
        modalOverlay.appendChild(modal);
        
        // Add modal to document
        document.body.appendChild(modalOverlay);
        
        // Event listeners for modal
        document.getElementById('close-modal').addEventListener('click', closeModal);
        document.getElementById('cancel-button').addEventListener('click', closeModal);
        document.getElementById('submit-button').addEventListener('click', handleFormSubmit);
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Apply dark mode styles if needed
        if (document.body.classList.contains('dark-theme')) {
            applyDarkModeToModal();
        }
        
        // Focus on email input
        setTimeout(() => {
            document.getElementById('email').focus();
        }, 100);
    }
    
    // Function to close the modal
    function closeModal() {
        const modalOverlay = document.getElementById('email-modal-overlay');
        if (modalOverlay) {
            // Add fade-out animation
            modalOverlay.style.opacity = '0';
            modalOverlay.style.transition = 'opacity 0.2s ease-out';
            
            // Remove after animation completes
            setTimeout(() => {
                modalOverlay.remove();
            }, 200);
        }
    }
    
    // Function to handle form submission
    function handleFormSubmit() {
        const form = document.getElementById('email-pdf-form');
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const consent = document.getElementById('consent').checked;
        
        // Basic validation
        if (!email || !consent) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show processing state
        const submitButton = document.getElementById('submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
        `;
        submitButton.disabled = true;
        
        // Simulate API call to send the email (would be an actual API call in production)
        setTimeout(() => {
            // Show success message
            const modalBody = document.querySelector('#email-modal-overlay .px-6.py-4');
            modalBody.innerHTML = `
                <div class="text-center py-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Success!</h3>
                    <p class="text-gray-600">The PDF has been sent to ${email}.</p>
                    <p class="text-gray-600 text-sm mt-2">Please check your inbox and spam folder if you don't see it.</p>
                </div>
            `;
            
            // Change footer buttons
            const modalFooter = document.querySelector('#email-modal-overlay .px-6.py-3.bg-gray-50');
            modalFooter.innerHTML = `
                <button id="close-success-button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-auto">
                    Close
                </button>
            `;
            
            // Add event listener to the new close button
            document.getElementById('close-success-button').addEventListener('click', closeModal);
            
            // Apply dark mode if needed
            if (document.body.classList.contains('dark-theme')) {
                applyDarkModeToModal();
            }
        }, 2000);
    }
    
    // Function to apply dark mode styles to the modal
    function applyDarkModeToModal() {
        const modal = document.querySelector('#email-modal-overlay > div');
        if (!modal) return;
        
        // Apply dark styles
        modal.classList.remove('bg-white');
        modal.classList.add('bg-gray-800');
        
        // Update text colors
        const textElements = modal.querySelectorAll('p, label');
        textElements.forEach(el => {
            el.classList.remove('text-gray-700');
            el.classList.add('text-gray-300');
        });
        
        // Update success message if present
        const successTitle = modal.querySelector('h3.text-gray-900');
        if (successTitle) {
            successTitle.classList.remove('text-gray-900');
            successTitle.classList.add('text-gray-100');
        }
        
        const successText = modal.querySelectorAll('p.text-gray-600');
        successText.forEach(el => {
            el.classList.remove('text-gray-600');
            el.classList.add('text-gray-400');
        });
        
        // Update form inputs
        const inputs = modal.querySelectorAll('input[type="text"], input[type="email"]');
        inputs.forEach(input => {
            input.classList.remove('border-gray-300');
            input.classList.add('border-gray-600', 'bg-gray-700', 'text-white');
        });
        
        // Update modal footer
        const footer = modal.querySelector('.bg-gray-50');
        if (footer) {
            footer.classList.remove('bg-gray-50');
            footer.classList.add('bg-gray-700');
        }
        
        // Update cancel button
        const cancelButton = modal.querySelector('#cancel-button');
        if (cancelButton) {
            cancelButton.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
            cancelButton.classList.add('bg-gray-600', 'text-gray-200', 'border-gray-700');
        }
    }
    
    // Add event listeners for tab changes
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Wait for content to load
            setTimeout(addEmailPDFButton, 500);
        });
    });
    
    // Watch for theme changes to update modal if it's open
    const themeObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.body) {
                if (document.getElementById('email-modal-overlay')) {
                    if (document.body.classList.contains('dark-theme')) {
                        applyDarkModeToModal();
                    } else {
                        // Could add logic to revert to light mode if needed
                    }
                }
            }
        });
    });
    
    themeObserver.observe(document.body, { attributes: true });
    
    // Initial setup
    setTimeout(addEmailPDFButton, 1000);
});
