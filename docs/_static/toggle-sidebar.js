document.addEventListener('DOMContentLoaded', function() {
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '☰';
    toggleButton.className = 'sidebar-toggle-js';
    toggleButton.title = 'Show Table of Contents';
    
    // Add click handler
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('show-right-sidebar');
        
        // Change button symbol and title
        if (document.body.classList.contains('show-right-sidebar')) {
            toggleButton.innerHTML = '✕';
            toggleButton.title = 'Hide Table of Contents';
        } else {
            toggleButton.innerHTML = '☰';
            toggleButton.title = 'Show Table of Contents';
        }
    });
    
    // Add button to page
    document.body.appendChild(toggleButton);
});