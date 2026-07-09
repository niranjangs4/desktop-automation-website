/* 
   NexoraIO Desktop Automation Landing Page
   Core JavaScript - Interactive Controls and Animations
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ------------------------------------------------------------
    // 1. Sticky Navigation & Scrollspy
    // ------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scrollspy (highlight current nav item)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Dynamic Nav coloring: check if current section is light or dark
        const currentSection = document.getElementById(currentSectionId);
        if (currentSection && currentSection.classList.contains('light-section')) {
            navbar.classList.add('light-section-nav-color');
        } else {
            navbar.classList.remove('light-section-nav-color');
        }
    });

    // ------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // ------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ------------------------------------------------------------
    // 3. Solution Section Tabs & Interactive App View
    // ------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const selectorBox = document.getElementById('solution-selector-box');
    const pathText = document.getElementById('solution-path-text');
    const methodBadge = document.getElementById('solution-method-badge');
    const appTitle = document.getElementById('solution-app-title');
    const appStatusText = document.getElementById('solution-status-text');

    // Data for the interactive tabs
    const tabData = {
        'windows': {
            title: 'InventoryManager.exe (Win32 / WPF)',
            path: 'WinApp / Pane[0] / Grid[1] / Row[4] / Cell["InStock"]',
            method: 'Native Windows API',
            top: '80px',
            left: '30px',
            width: '180px',
            height: '25px',
            status: 'Success (Confidence: 100%)',
            color: 'var(--secondary)'
        },
        'progress': {
            title: 'CustomerOrder.w (Progress OpenEdge / ABL)',
            path: 'ABLWindow / Frame["OrderFrame"] / Fill-In["Cust-Num"]',
            method: 'OpenEdge Widget Agent',
            top: '55px',
            left: '110px',
            width: '130px',
            height: '26px',
            status: 'Success (Object Hierarchy Mapping)',
            color: 'var(--primary)'
        },
        'java': {
            title: 'OracleERPClient.jar (Java Swing / .NET)',
            path: 'JFrame / JPanel / JTabbedPane / JButton[text="Save"]',
            method: 'Java Access Bridge / UIAutomation',
            top: '115px',
            left: '20px',
            width: '90px',
            height: '28px',
            status: 'Success (Accessibility Tree Identified)',
            color: 'var(--success)'
        },
        'citrix': {
            title: 'Citrix Workspace Virtual Desktop',
            path: 'RDP-Stream / MatchAnchor[image="submit_btn.png"]',
            method: 'AI Vision OCR + Image Match',
            top: '40px',
            left: '150px',
            width: '110px',
            height: '35px',
            status: 'Success (Match Score: 99.8%)',
            color: 'var(--warning)'
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get selected type
            const type = btn.getAttribute('data-type');
            const data = tabData[type];

            if (data) {
                // Animate element selector box
                selectorBox.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                selectorBox.style.top = data.top;
                selectorBox.style.left = data.left;
                selectorBox.style.width = data.width;
                selectorBox.style.height = data.height;
                selectorBox.style.borderColor = data.color;
                selectorBox.style.boxShadow = `0 0 20px 0 ${data.color}`;

                // Update text details
                appTitle.textContent = data.title;
                pathText.textContent = data.path;
                methodBadge.textContent = data.method;
                methodBadge.style.background = `${data.color}20`; // 12% opacity color
                methodBadge.style.color = data.color;
                
                appStatusText.textContent = data.status;
            }
        });
    });

    // ------------------------------------------------------------
    // 4. Scroll Reveal & Sequential Timeline Animation
    // ------------------------------------------------------------
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ------------------------------------------------------------
    // 5. Stat Counter Up Animation
    // ------------------------------------------------------------
    const statsSection = document.querySelector('.stats-row');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateCounters = () => {
        if (!statsSection || statsAnimated) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const suffix = stat.getAttribute('data-suffix') || '';
                const prefix = stat.getAttribute('data-prefix') || '';
                let count = 0;
                const duration = 2000; // 2 seconds
                const stepTime = Math.max(Math.floor(duration / target), 15);
                
                const timer = setInterval(() => {
                    count += Math.ceil(target / (duration / stepTime));
                    if (count >= target) {
                        stat.textContent = prefix + target.toLocaleString() + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = prefix + count.toLocaleString() + suffix;
                    }
                }, stepTime);
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check

    // ------------------------------------------------------------
    // 6. Modals: Demo Booking & Partner Forms
    // ------------------------------------------------------------
    const modalOverlay = document.getElementById('booking-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const bookingForm = document.getElementById('booking-form');
    const submitBtn = document.getElementById('submit-btn');
    const toast = document.getElementById('toast');
    const formSubject = document.getElementById('form-subject');
 
    // Trigger buttons
    const demoBtns = document.querySelectorAll('.trigger-demo');
    const partnerBtns = document.querySelectorAll('.trigger-partner');
    const salesBtns = document.querySelectorAll('.trigger-sales');
 
    const openModal = (type) => {
        if (!modalOverlay) return;
        
        if (type === 'partner') {
            modalTitle.textContent = 'Partner with NexoraIO';
            modalDesc.textContent = 'Join our network of system integrators and automation leaders. Submit this form to start details verification.';
            formSubject.value = 'Partner Request';
            if (submitBtn) submitBtn.innerHTML = 'Apply to Partner <i data-lucide="arrow-right" class="btn-icon"></i>';
        } else if (type === 'sales') {
            modalTitle.textContent = 'Contact Enterprise Sales';
            modalDesc.textContent = 'Talk to our solution architects about deploying NexoraIO with customized legacy SLA support agreements.';
            formSubject.value = 'Sales Inquiry';
            if (submitBtn) submitBtn.innerHTML = 'Contact Sales <i data-lucide="arrow-right" class="btn-icon"></i>';
        } else {
            modalTitle.textContent = 'Book a Free Live Demo';
            modalDesc.textContent = 'See our desktop agent automate Progress OpenEdge, Java, and Citrix workflows live. Select a date to meet our team.';
            formSubject.value = 'Demo Booking';
            if (submitBtn) submitBtn.innerHTML = 'Confirm Demo Booking <i data-lucide="arrow-right" class="btn-icon"></i>';
        }
        
        // Re-render Lucide icons inside submit button if updated
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
 
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };
 
    const closeModal = () => {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        bookingForm.reset();
    };
 
    demoBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal('demo'); }));
    partnerBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal('partner'); }));
    salesBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal('sales'); }));
 
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
 
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
 
    // ------------------------------------------------------------
    // 7. Lead Capture Form Submission Handling (AJAX to Netlify)
    // ------------------------------------------------------------
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
 
            // Set loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loader-dot">Processing...</span>';
 
            // Prepare Form Data for Netlify Forms AJAX post
            const formData = new FormData(bookingForm);
            formData.append('form-name', 'booking-form'); // Required by Netlify
 
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    closeModal();
                    showToast('Thank you! Your request has been received. Our team will contact you shortly.');
                } else {
                    showToast('Oops! Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showToast('Network error. Please check your connection and try again.');
            })
            .finally(() => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }
 
    // Success Toast notification helper
    const showToast = (message) => {
        if (!toast) return;
        const toastMsg = toast.querySelector('.toast-message');
        if (toastMsg) toastMsg.textContent = message;
 
        toast.classList.add('active');
 
        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000); // hide after 5 seconds
    };
});
