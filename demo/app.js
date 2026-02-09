// Navigation handling
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    
    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const viewId = this.getAttribute('data-view');
            showView(viewId);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const viewOrder = ['overview', 'google-search', 'facebook-feed', 'instagram-feed', 'instagram-story', 'targeting', 'next-steps'];
        const currentView = document.querySelector('.view.active');
        const currentIndex = viewOrder.indexOf(currentView.id);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % viewOrder.length;
            showView(viewOrder[nextIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + viewOrder.length) % viewOrder.length;
            showView(viewOrder[prevIndex]);
        }
    });
    
    // Story animation
    animateStoryProgress();
});

// Show a specific view
function showView(viewId) {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    
    // Update nav
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === viewId) {
            item.classList.add('active');
        }
    });
    
    // Update views
    views.forEach(view => {
        view.classList.remove('active');
        if (view.id === viewId) {
            view.classList.add('active');
        }
    });
    
    // Restart story animation if showing story view
    if (viewId === 'instagram-story') {
        animateStoryProgress();
    }
}

// Animate story progress bar
function animateStoryProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.transition = 'width 8s linear';
            progressFill.style.width = '100%';
        }, 100);
    }
}

// Approval button handlers
document.addEventListener('DOMContentLoaded', function() {
    const approveBtn = document.querySelector('.approve-btn');
    const feedbackBtn = document.querySelector('.feedback-btn');
    
    if (approveBtn) {
        approveBtn.addEventListener('click', function() {
            this.innerHTML = '✓ Approved!';
            this.style.background = '#28a745';
            this.style.color = '#fff';
            
            // Update all step statuses
            document.querySelectorAll('.step-status').forEach((status, index) => {
                if (index === 0) {
                    setTimeout(() => {
                        status.textContent = 'Complete';
                        status.classList.remove('pending');
                        status.classList.add('complete');
                    }, 300);
                }
            });
            
            // Show success message
            setTimeout(() => {
                alert('Thank you! The proposal has been approved. We will proceed with the next steps.');
            }, 500);
        });
    }
    
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', function() {
            const feedback = prompt('Please share your feedback or requested changes:');
            if (feedback) {
                alert('Thank you for your feedback! We will review and get back to you shortly.');
            }
        });
    }
});

// Add hover effects to phone frames
document.addEventListener('DOMContentLoaded', function() {
    const phoneFrames = document.querySelectorAll('.phone-frame');
    
    phoneFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add click effect to CTA buttons in mockups
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.fb-cta-button, .story-cta, .ig-post-cta');
    
    ctaButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);

            const href = this.getAttribute('data-lead-href');
            if (href) {
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        });
    });
});

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
