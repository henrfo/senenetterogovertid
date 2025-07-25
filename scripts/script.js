/**
 * Senenetterogovertid - Main JavaScript
 * A sophisticated underwater gallery experience
 */

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    
    // Hide preloader after 2 seconds
    setTimeout(() => {
        console.log('Hiding preloader');
        document.querySelector('.c-preloader').classList.add('is-hidden');
    }, 2000);
    
    initGallery();
    initCursorEffect();
});

/**
 * Gallery navigation functionality
 * Handles slide transitions and navigation
 */
function initGallery() {
    console.log('Initializing gallery');
    const track = document.getElementById('gallery-track');
    const items = document.querySelectorAll('.c-gallery_item');
    const dots = document.querySelectorAll('.c-gallery_nav_dot');
    const navLinks = document.querySelectorAll('.c-header_nav_link');
    let currentIndex = 0;
    
    // Function to go to a specific slide
    function goToSlide(index) {
        console.log('Going to slide', index);
        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active states
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });
        
        navLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });
        
        currentIndex = index;
    }
    
    // Set up dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Set up menu navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Arrow key navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % items.length;
            goToSlide(nextIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            goToSlide(prevIndex);
        }
    });
    
    // Swipe navigation for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            const nextIndex = (currentIndex + 1) % items.length;
            goToSlide(nextIndex);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            goToSlide(prevIndex);
        }
    }
    
    // Mouse wheel navigation
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        clearTimeout(wheelTimeout);
        
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                // Scroll down
                const nextIndex = (currentIndex + 1) % items.length;
                goToSlide(nextIndex);
            } else if (e.deltaY < 0) {
                // Scroll up
                const prevIndex = (currentIndex - 1 + items.length) % items.length;
                goToSlide(prevIndex);
            }
        }, 50);
    });
    
    // Initialize with first slide
    goToSlide(0);
}

/**
 * Custom cursor effect
 * Creates an elegant custom cursor that follows mouse movement
 */
function initCursorEffect() {
    console.log('Initializing cursor effect');
    const cursor = document.querySelector('.c-cursor');
    let cursorVisible = false;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show custom cursor
    document.addEventListener('mouseenter', () => {
        cursor.classList.add('is-active');
        cursorVisible = true;
    });
    
    // Hide custom cursor
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-active');
        cursorVisible = false;
    });
    
    // Track cursor position with smooth animation
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Also update cursor position directly for better responsiveness
        if (cursorVisible) {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }
    });
    
    function updateCursor() {
        // Smooth follow with slight delay
        const easing = 0.2;
        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;
        
        if (cursorVisible) {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor style for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .c-gallery_nav_dot');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('is-pointer');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-pointer');
        });
    });
}