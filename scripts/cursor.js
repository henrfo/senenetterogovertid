/**
 * Simple standalone cursor script
 * Ensures the custom cursor is visible and works properly
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create a cursor element if it doesn't exist
    let cursor = document.querySelector('.c-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'c-cursor';
        document.body.appendChild(cursor);
    }
    
    // Make cursor visible immediately
    cursor.style.opacity = '1';
    cursor.style.backgroundColor = 'white';
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '10000';
    cursor.style.transform = 'translate(-50%, -50%)';
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Track cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .c-gallery_nav_dot');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '2px solid white';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.backgroundColor = 'white';
            cursor.style.border = 'none';
        });
    });
    
    // Keep cursor visible when entering window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
});