document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.section');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    
    // let navbarTimeout; // 注释掉导航栏定时器变量

    // Simulate loading delay
    setTimeout(() => {
        loader.style.display = 'none';
        container.style.display = 'block';
        // resetNavbarTimeout(); // 注释掉自动隐藏导航栏的定时器
    }, 3000);

    // Smooth scroll to section on nav-link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            smoothScroll(targetSection);

            // Shrink navbar
            // header.style.transform = 'translateY(-100%)'; // 注释掉导航栏收起代码

            // Reset navbar auto-hide timer
            // resetNavbarTimeout(); // 注释掉自动隐藏导航栏的定时器
        });
    });

    // Smooth scroll function
    function smoothScroll(target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    }

    // Reset navbar auto-hide timer
    // function resetNavbarTimeout() {
    //     clearTimeout(navbarTimeout);
    //     navbarTimeout = setTimeout(() => {
    //         header.style.transform = 'translateY(-100%)';
    //     }, 1500);
    // }

    // Smoothly shrink navbar on scroll down and restore on scroll up
    let lastScrollTop = 0;
    let ticking = false;

    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Find the section currently in view
                let currentSection = null;
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSection = section;
                    }
                });

                if (currentSection) {
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    currentSection.classList.add('active');
                }

                // Manage header transition
                const currentScroll = window.scrollY;
                if (currentScroll > lastScrollTop) {
                    // header.style.transform = 'translateY(-100%)'; // 注释掉导航栏收起代码
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScrollTop = currentScroll;
                ticking = false;

                // Reset navbar auto-hide timer on scroll
                // resetNavbarTimeout(); // 注释掉自动隐藏导航栏的定时器
            });
            ticking = true;
        }
    });

    // Initialize auto-hide timer
    // resetNavbarTimeout(); // 注释掉自动隐藏导航栏的定时器

    // Reset navbar auto-hide timer on user interaction
    ['mousemove', 'keypress', 'touchstart'].forEach(event => {
        document.addEventListener(event, () => {
            header.style.transform = 'translateY(0)';
            // resetNavbarTimeout(); // 注释掉自动隐藏导航栏的定时器
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    // Detect mobile devices
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 800;
    }

    if (isMobile()) {
        console.log("移动访问");
            } else {
        console.log("PC访问");
    }
});
