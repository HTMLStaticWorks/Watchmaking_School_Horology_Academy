/* 
  Watchmaking School & Horology Academy
  Main JavaScript
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Safe LocalStorage Wrapper ---
    const safeLocalStorage = {
        getItem(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                console.warn('localStorage is not available:', e);
                return null;
            }
        },
        setItem(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                console.warn('localStorage is not available:', e);
            }
        }
    };

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Theme Toggle ---
    const themeBtns = document.querySelectorAll('.theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeBtns.forEach(btn => {
                const icon = btn.querySelector('i');
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            });
            safeLocalStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeBtns.forEach(btn => {
                const icon = btn.querySelector('i');
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            });
            safeLocalStorage.setItem('theme', 'light');
        }
    };

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });

    // Check saved theme on load
    const savedTheme = safeLocalStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // --- RTL Toggle ---
    const rtlBtns = document.querySelectorAll('.rtl-toggle');

    const applyDirection = (dir) => {
        if (dir === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
            rtlBtns.forEach(b => b.textContent = 'LTR');
            safeLocalStorage.setItem('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            rtlBtns.forEach(b => b.textContent = 'RTL');
            safeLocalStorage.setItem('dir', 'ltr');
        }
    };

    rtlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            applyDirection(newDir);
        });
    });

    // Check saved direction on load
    const savedDir = safeLocalStorage.getItem('dir');
    if (savedDir) {
        applyDirection(savedDir);
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;
                const speed = 200;
                const inc = target / speed;

                const updateCount = () => {
                    const current = +entry.target.innerText;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.toggle('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    if (navMenu.classList.contains('active')) {
                        icon.classList.replace('fa-bars', 'fa-times');
                    } else {
                        icon.classList.replace('fa-times', 'fa-bars');
                    }
                }
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Back to Top ---
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Skeleton Loading Effect ---
    window.addEventListener('load', () => {
        const skeletons = document.querySelectorAll('.skeleton');
        skeletons.forEach(s => s.classList.remove('skeleton'));
    });
});
