// Navigation enhancement script for ictVoIP Billing Documentation
// This script helps maintain breadcrumb state and TOC hierarchy

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to maintain breadcrumb state
    function maintainBreadcrumbs() {
        const breadcrumbs = document.querySelector('.wy-breadcrumbs');
        if (breadcrumbs) {
            // Ensure breadcrumbs are visible
            breadcrumbs.style.display = 'block';
            breadcrumbs.style.visibility = 'visible';
            breadcrumbs.style.opacity = '1';
            
            // Add sticky positioning
            breadcrumbs.style.position = 'sticky';
            breadcrumbs.style.top = '0';
            breadcrumbs.style.zIndex = '100';
        }
    }
    
    // Function to maintain TOC hierarchy
    function maintainTOCHierarchy() {
        const tocItems = document.querySelectorAll('.wy-menu-vertical li');
        
        tocItems.forEach(function(item) {
            // Ensure current page is highlighted
            if (item.classList.contains('current')) {
                const link = item.querySelector('a');
                if (link) {
                    link.style.background = '#2980B9';
                    link.style.color = 'white';
                }
                
                // Ensure parent items are expanded
                const parent = item.parentElement.closest('li');
                if (parent) {
                    parent.classList.add('current');
                    const parentLink = parent.querySelector('a');
                    if (parentLink) {
                        parentLink.style.background = '#3498db';
                        parentLink.style.color = 'white';
                    }
                }
            }
        });
    }
    
    // Function to fix navigation state
    function fixNavigationState() {
        // Ensure TOC sidebar is visible
        const sidebar = document.querySelector('.wy-nav-side');
        if (sidebar) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.bottom = '0';
            sidebar.style.left = '0';
            sidebar.style.width = '300px';
            sidebar.style.zIndex = '200';
        }
        
        // Ensure content area is properly positioned
        const content = document.querySelector('.wy-nav-content');
        if (content) {
            content.style.marginLeft = '300px';
        }
    }
    
    // Function to handle page navigation
    function handleNavigation() {
        // Store current page info in sessionStorage
        const currentPath = window.location.pathname;
        const currentTitle = document.title;
        
        sessionStorage.setItem('currentPage', currentPath);
        sessionStorage.setItem('currentTitle', currentTitle);
        
        // Maintain breadcrumb hierarchy
        const breadcrumbItems = document.querySelectorAll('.wy-breadcrumbs li');
        const breadcrumbData = [];
        
        breadcrumbItems.forEach(function(item) {
            const link = item.querySelector('a');
            if (link) {
                breadcrumbData.push({
                    text: link.textContent,
                    href: link.href
                });
            } else {
                breadcrumbData.push({
                    text: item.textContent,
                    href: null
                });
            }
        });
        
        sessionStorage.setItem('breadcrumbData', JSON.stringify(breadcrumbData));
    }
    
    // Function to restore navigation state
    function restoreNavigationState() {
        const storedBreadcrumbData = sessionStorage.getItem('breadcrumbData');
        if (storedBreadcrumbData) {
            try {
                const breadcrumbData = JSON.parse(storedBreadcrumbData);
                const breadcrumbs = document.querySelector('.wy-breadcrumbs');
                
                if (breadcrumbs && breadcrumbData.length > 0) {
                    // Ensure breadcrumbs are visible and properly structured
                    breadcrumbs.style.display = 'block';
                    breadcrumbs.style.visibility = 'visible';
                    breadcrumbs.style.opacity = '1';
                }
            } catch (e) {
                console.log('Error restoring breadcrumb state:', e);
            }
        }
    }
    
    // Initialize navigation enhancements
    function initNavigation() {
        maintainBreadcrumbs();
        maintainTOCHierarchy();
        fixNavigationState();
        handleNavigation();
        restoreNavigationState();
        
        // Set up event listeners for navigation
        const tocLinks = document.querySelectorAll('.wy-menu-vertical a');
        tocLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Store navigation state before navigating
                handleNavigation();
            });
        });
    }
    
    // Run initialization
    initNavigation();
    
    // Re-run on page load and navigation
    window.addEventListener('load', initNavigation);
    window.addEventListener('popstate', initNavigation);
    
    // Monitor for dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Check if breadcrumbs or TOC were modified
                const breadcrumbs = document.querySelector('.wy-breadcrumbs');
                const toc = document.querySelector('.wy-menu-vertical');
                
                if (mutation.target === breadcrumbs || mutation.target === toc) {
                    setTimeout(function() {
                        maintainBreadcrumbs();
                        maintainTOCHierarchy();
                    }, 100);
                }
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Ensure navigation state is maintained on page unload
    window.addEventListener('beforeunload', function() {
        handleNavigation();
    });
}); 