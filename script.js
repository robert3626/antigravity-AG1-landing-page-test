// ==========================================================================
// Creative Marketing Agency - Interactive Client Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header Background Blur Shift on Scroll
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Billing Frequency Toggle (Monthly vs Annual)
    const billingCheckbox = document.getElementById('billing-checkbox');
    const labelMonthly = document.getElementById('label-monthly');
    const labelAnnual = document.getElementById('label-annual');
    const priceAmounts = document.querySelectorAll('.pricing-card-price .amount');

    if (billingCheckbox) {
        billingCheckbox.addEventListener('change', () => {
            const isAnnual = billingCheckbox.checked;

            if (isAnnual) {
                labelAnnual.classList.add('active');
                labelMonthly.classList.remove('active');
            } else {
                labelMonthly.classList.add('active');
                labelAnnual.classList.remove('active');
            }

            priceAmounts.forEach(amountEl => {
                const targetValue = isAnnual ? amountEl.getAttribute('data-annual') : amountEl.getAttribute('data-monthly');
                
                // Quick scale fade effect
                amountEl.style.opacity = '0';
                amountEl.style.transform = 'translateY(-6px)';
                
                setTimeout(() => {
                    amountEl.textContent = targetValue;
                    amountEl.style.opacity = '1';
                    amountEl.style.transform = 'translateY(0)';
                }, 150);
            });
        });
    }

    // Add CSS transition for pricing amount swap
    priceAmounts.forEach(el => {
        el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    });

    // 3. Interactive Modal Popup Trigger
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalPlanTitle = document.getElementById('modal-plan-title');
    const contactForm = document.getElementById('contact-form');
    const modalSuccess = document.getElementById('modal-success');
    const modalBtns = document.querySelectorAll('.open-modal-btn, .btn-action, .btn-nav-primary');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = btn.getAttribute('data-plan') || 'Custom Solution';
            modalPlanTitle.textContent = `Get Started with ${plan}`;
            modalBackdrop.classList.add('active');
            if (modalSuccess) modalSuccess.style.display = 'none';
            if (contactForm) contactForm.style.display = 'flex';
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modalBackdrop.classList.remove('active');
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('active');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            if (modalSuccess) modalSuccess.style.display = 'block';

            setTimeout(() => {
                modalBackdrop.classList.remove('active');
            }, 2500);
        });
    }

    // 4. Subtle Mouse Tracking Glow Effect on Cards
    const tiltCards = document.querySelectorAll('.feature-card, .spotlight-card, .pricing-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 35;
            const rotateY = (centerX - x) / 35;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });

        card.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease';
    });

    // 5. Smooth Scroll Navigation Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
