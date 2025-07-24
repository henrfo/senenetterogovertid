// Main app initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  initPreloader();
  initMobileMenu();
  initSmoothScroll();
  initHoverEffects();
  initTeamCanvas();
});

// Preloader animation
function initPreloader() {
  const html = document.documentElement;
  
  // Add loading class to html
  html.classList.add('is-first-loading');
  
  // Remove preloader after delay
  setTimeout(() => {
    html.classList.remove('is-first-loading');
    
    // Allow transitions after preloader is gone
    setTimeout(() => {
      document.body.classList.add('is-ready');
    }, 1000);
  }, 2000);
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggler = document.querySelector('.c-header_menu-toggler');
  const menu = document.querySelector('.c-menu');
  
  if (!menuToggler || !menu) return;
  
  menuToggler.addEventListener('click', () => {
    const isExpanded = menuToggler.getAttribute('aria-expanded') === 'true';
    
    menuToggler.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('is-active');
    
    // Update button text
    menuToggler.textContent = isExpanded ? 'Meny' : 'Lukk';
  });
  
  // Close menu when clicking on menu links
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggler.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-active');
      menuToggler.textContent = 'Meny';
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate header height to adjust scroll position
        const headerHeight = document.querySelector('.c-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Hover shuffle effect for text
function initHoverEffects() {
  const shuffleElements = document.querySelectorAll('[data-hover-shuffle]');
  
  shuffleElements.forEach(element => {
    // Skip if element has children with data-hover-shuffle-child attribute
    if (element.querySelector('[data-hover-shuffle-child]')) return;
    
    const text = element.textContent;
    element.innerHTML = '';
    
    // Wrap each letter in a span
    [...text].forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      element.appendChild(span);
    });
  });
  
  // For elements with data-hover-shuffle-child attribute
  const shuffleChildElements = document.querySelectorAll('[data-hover-shuffle-child]');
  
  shuffleChildElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    
    // Wrap each letter in a span
    [...text].forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      element.appendChild(span);
    });
  });
}

// Simple rotating 3D element for team canvas
function initTeamCanvas() {
  const canvas = document.getElementById('team-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 50;
  
  // Resize canvas to match its display size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  
  // Create particles
  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: 'rgba(0, 0, 0, 0.5)',
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      });
    }
  }
  
  // Animate particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Connect particles with lines if they're close enough
    particles.forEach((particle, index) => {
      for (let j = index + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 - distance / 500})`;
          ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  // Initialize canvas
  resizeCanvas();
  createParticles();
  animate();
  
  // Resize canvas when window size changes
  window.addEventListener('resize', resizeCanvas);
}

// Helper function to detect when elements enter viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Add scroll event listener to detect elements entering viewport
window.addEventListener('scroll', () => {
  const scrollElements = document.querySelectorAll('[data-scroll-call]');
  
  scrollElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('is-inview');
    }
  });
}, { passive: true });