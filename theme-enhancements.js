/* ========================================
   ENTIRIUS THEME ENHANCEMENTS
   JavaScript for dynamic theme functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  /* ===== HEADER ENHANCEMENTS ===== */
  function enhanceHeaders() {
    const headers = document.querySelectorAll('h1');
    headers.forEach(header => {
      // Apply gradient only to logo/brand headers, not all H1s
      if (header.classList.contains('logo') || 
          header.classList.contains('brand') || 
          header.closest('.logo, .brand')) {
        header.style.background = 'var(--titanium-gradient)';
        header.style.webkitBackgroundClip = 'text';
        header.style.webkitTextFillColor = 'transparent';
        header.style.backgroundClip = 'text';
      }
    });
  }

  /* ===== CARD ENHANCEMENTS ===== */
  function enhanceCards() {
    const cards = document.querySelectorAll('.card, [class*="card"], [class*="api-"]');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--accent-pink)';
        this.style.boxShadow = '0 8px 24px rgba(233, 30, 99, 0.15)';
        this.style.transform = 'translateY(-2px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-subtle)';
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0)';
      });
    });
  }

  /* ===== NAVIGATION ENHANCEMENTS ===== */
  function enhanceNavigation() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* ===== ACTIVE TAB DETECTION ===== */
  function setActiveNavTab() {
    const currentPath = window.location.pathname;
    const navTabs = document.querySelectorAll('.nav-tabs-item');
    
    navTabs.forEach(tab => {
      tab.classList.remove('current-page');
      const href = tab.getAttribute('href');
      
      // Match current path with tab href
      if (href && (currentPath.startsWith(href) || currentPath.includes(href.substring(1)))) {
        tab.classList.add('current-page');
      }
    });
  }

  /* ===== CODE BLOCK ENHANCEMENTS ===== */
  function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
      // Skip if copy button already exists
      if (block.querySelector('.copy-button')) return;
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.className = 'copy-button';
      copyButton.style.cssText = `
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        background: var(--bg-elevated);
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
        border-radius: 4px;
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 10;
      `;
      
      // Position parent relatively
      block.style.position = 'relative';
      
      // Show/hide copy button on hover
      block.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
      });
      
      block.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
      });
      
      // Copy functionality
      copyButton.addEventListener('click', async () => {
        const code = block.querySelector('code');
        const text = code ? code.textContent : block.textContent;
        
        try {
          await navigator.clipboard.writeText(text);
          copyButton.textContent = 'Copied!';
          copyButton.style.color = 'var(--accent-green)';
          
          setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.style.color = 'var(--text-secondary)';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });
      
      block.appendChild(copyButton);
    });
  }

  /* ===== ANALYTICS TRACKING ===== */
  function initializeAnalytics() {
    // Only run if gtag is available
    if (typeof gtag !== 'function') return;

    // Track API method interactions
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('api-method') || e.target.closest('.api-method')) {
        const method = e.target.textContent || e.target.closest('.api-method').textContent;
        gtag('event', 'api_method_interaction', {
          'api_method': method.trim(),
          'section': 'documentation'
        });
      }
    });

    // Track navigation usage
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && link.href.includes('#')) {
        gtag('event', 'internal_navigation', {
          'link_text': link.textContent.trim(),
          'target_section': link.getAttribute('href')
        });
      }
    });
  }

  /* ===== ACCESSIBILITY ENHANCEMENTS ===== */
  function enhanceAccessibility() {
    // Enhanced focus management for accessibility
    document.addEventListener('keydown', function(e) {
      // Skip to main content on Tab key
      if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const mainContent = document.querySelector('#content-area, main, [role="main"]');
        if (mainContent) {
          e.preventDefault();
          mainContent.focus();
        }
      }
    });
  }

  /* ===== DYNAMIC CONTENT OBSERVER ===== */
  function initializeObserver() {
    // Performance-optimized mutation observer for SPA behavior
    let observerTimeout;
    const observer = new MutationObserver(function(mutations) {
      // Debounce observer callbacks to prevent excessive function calls
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        enhanceHeaders();
        enhanceCards();
        enhanceCodeBlocks();
        setActiveNavTab();
      }, 100);
    });

    // Watch for dynamic content changes (Mintlify's SPA behavior)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return observer;
  }

  /* ===== INITIALIZATION ===== */
  function initialize() {
    console.log('🎨 Initializing Entirius theme enhancements...');
    
    // Core enhancements
    enhanceHeaders();
    enhanceCards();
    enhanceNavigation();
    enhanceCodeBlocks();
    setActiveNavTab();
    
    // Optional enhancements
    initializeAnalytics();
    enhanceAccessibility();
    
    // Dynamic content monitoring
    initializeObserver();
    
    console.log('✅ Entirius theme enhancements loaded successfully');
  }

  // Start the theme enhancements
  initialize();
});