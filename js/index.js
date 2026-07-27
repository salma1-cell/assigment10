document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    var html = document.documentElement;
    var themeBtns = document.querySelectorAll('.theme-toggle-button');

    var savedTheme = localStorage.getItem('theme');

    var isDark =
        savedTheme === 'dark' ||
        (
            !savedTheme &&
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );

    function applyTheme(darkMode) {

        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        localStorage.setItem(
            'theme',
            darkMode ? 'dark' : 'light'
        );

        themeBtns.forEach(function (btn) {
            btn.setAttribute(
                'aria-pressed',
                darkMode ? 'true' : 'false'
            );
        });
    }

    applyTheme(isDark);

    themeBtns.forEach(function (btn) {

        btn.addEventListener('click', function () {

            var darkMode =
                html.classList.contains('dark');

            applyTheme(!darkMode);

        });

    });


    /* =====================================================
       HEADER + SCROLL TO TOP + ACTIVE NAVBAR
    ===================================================== */

    var header =
        document.getElementById('header');

    var scrollToTopBtn =
        document.getElementById('scroll-to-top');

    var navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    // Only sections that have a matching Navbar link
    var sections = Array.from(
        document.querySelectorAll('section[id]')
    ).filter(function (section) {

        return document.querySelector(
            '.nav-links a[href="#' +
            section.id +
            '"]'
        );

    });


    function updateScrollElements() {

        var scrollY = window.scrollY;


        // Header shadow
        if (header) {

            if (scrollY > 50) {

                header.classList.add(
                    'shadow-md'
                );

            } else {

                header.classList.remove(
                    'shadow-md'
                );

            }

        }


        // Scroll to top button
        if (scrollToTopBtn) {

            if (scrollY > 500) {

                scrollToTopBtn.classList.remove(
                    'opacity-0',
                    'invisible'
                );

                scrollToTopBtn.classList.add(
                    'opacity-100',
                    'visible'
                );

            } else {

                scrollToTopBtn.classList.remove(
                    'opacity-100',
                    'visible'
                );

                scrollToTopBtn.classList.add(
                    'opacity-0',
                    'invisible'
                );

            }

        }


        // Active Navbar link
        var currentSection = '';


        sections.forEach(function (section) {

            var sectionTop =
                section.offsetTop;

            var sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollY >= sectionTop - 150 &&
                scrollY < sectionBottom - 150
            ) {

                currentSection =
                    section.id;

            }

        });


        // Activate Home at the top
        if (scrollY < 150) {

            var homeSection =
                document.getElementById(
                    'hero-section'
                );

            if (homeSection) {

                currentSection =
                    'hero-section';

            }

        }


   navLinks.forEach(function (link) {
    var href = link.getAttribute('href');

    // Reset active state
    link.classList.remove('text-primary', 'active');
    link.classList.add('text-slate-600', 'dark:text-slate-300');

    // Exact match
    if (currentSection && href === '#' + currentSection) {
        link.classList.remove('text-slate-600', 'dark:text-slate-300');
        link.classList.add('text-primary', 'active');
    }
});

    }


    // Scroll event
    window.addEventListener(
        'scroll',
        updateScrollElements,
        {
            passive: true
        }
    );


    // Resize event
    window.addEventListener(
        'resize',
        updateScrollElements
    );


    // Initial state
    updateScrollElements();


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    if (scrollToTopBtn) {

        scrollToTopBtn.addEventListener(
            'click',
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            }
        );

    }


    /* =====================================================
       NAVBAR SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            'click',
            function (e) {

                var targetId =
                    link.getAttribute('href');


                // Ignore empty or invalid links
                if (
                    !targetId ||
                    targetId === '#'
                ) {
                    return;
                }


                var target =
                    document.querySelector(
                        targetId
                    );


                // Prevent crash if target doesn't exist
                if (!target) {
                    return;
                }


                e.preventDefault();


                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });


                // Update URL without jumping
                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        '',
                        targetId
                    );

                }

            }
        );

    });


    /* =====================================================
       PORTFOLIO FILTER
    ===================================================== */

    var filterBtns =
        document.querySelectorAll(
            '.portfolio-filter'
        );

    var portfolioItems =
        document.querySelectorAll(
            '.portfolio-item'
        );


    filterBtns.forEach(function (btn) {

        btn.addEventListener(
            'click',
            function () {

                var filterValue =
                    btn.getAttribute(
                        'data-filter'
                    );


                // Reset buttons
                filterBtns.forEach(
                    function (button) {

                        button.classList.remove(
                            'active',
                            'bg-linear-to-r',
                            'from-primary',
                            'to-secondary',
                            'text-white'
                        );

                        button.classList.add(
                            'bg-white',
                            'dark:bg-slate-800',
                            'text-slate-600',
                            'dark:text-slate-300'
                        );

                    }
                );


                // Activate selected button
                btn.classList.add(
                    'active',
                    'bg-linear-to-r',
                    'from-primary',
                    'to-secondary',
                    'text-white'
                );

                btn.classList.remove(
                    'bg-white',
                    'dark:bg-slate-800',
                    'text-slate-600',
                    'dark:text-slate-300'
                );


                // Filter items
                portfolioItems.forEach(
                    function (item) {

                        var category =
                            item.getAttribute(
                                'data-category'
                            );


                        var shouldShow =
                            filterValue === 'all' ||
                            category === filterValue;


                        if (shouldShow) {

                            item.classList.remove(
                                'hidden'
                            );


                            item.animate(
                                [
                                    {
                                        transform:
                                            'scale(0.9)',
                                        opacity: 0
                                    },
                                    {
                                        transform:
                                            'scale(1)',
                                        opacity: 1
                                    }
                                ],
                                {
                                    duration: 300,
                                    easing: 'ease-out'
                                }
                            );

                        } else {

                            item.classList.add(
                                'hidden'
                            );

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       TESTIMONIAL CAROUSEL
    ===================================================== */

    var carousel =
        document.getElementById(
            'testimonials-carousel'
        );

    var prevBtn =
        document.getElementById(
            'prev-testimonial'
        );

    var nextBtn =
        document.getElementById(
            'next-testimonial'
        );

    var indicators =
        document.querySelectorAll(
            '.carousel-indicator'
        );

    var testimonialCards =
        document.querySelectorAll(
            '.testimonial-card'
        );

    var currentIndex = 0;

    var totalItems =
        testimonialCards.length;


    function updateCarousel() {

        // Stop if carousel isn't in HTML
        if (
            !carousel ||
            totalItems === 0
        ) {

            return;

        }


        var visibleItems;


        if (window.innerWidth >= 1024) {

            visibleItems = 3;

        } else if (
            window.innerWidth >= 640
        ) {

            visibleItems = 2;

        } else {

            visibleItems = 1;

        }


        var maxIndex =
            Math.max(
                0,
                totalItems - visibleItems
            );


        if (
            currentIndex > maxIndex
        ) {

            currentIndex = 0;

        }


        if (
            currentIndex < 0
        ) {

            currentIndex =
                maxIndex;

        }


        var itemWidth =
            100 / visibleItems;


        var isRTL =
            html.getAttribute('dir') === 'rtl';


        var direction =
            isRTL ? 1 : -1;


        var translateValue =
            currentIndex *
            itemWidth *
            direction;


        carousel.style.transform =
            'translateX(' +
            translateValue +
            '%)';


        // Update indicators
        indicators.forEach(
            function (dot, index) {

                var isActive =
                    index === currentIndex;


                dot.classList.toggle(
                    'bg-accent',
                    isActive
                );

                dot.classList.toggle(
                    'scale-125',
                    isActive
                );


                dot.classList.toggle(
                    'bg-slate-400',
                    !isActive
                );

                dot.classList.toggle(
                    'dark:bg-slate-600',
                    !isActive
                );


                dot.setAttribute(
                    'aria-selected',
                    isActive
                        ? 'true'
                        : 'false'
                );

            }
        );

    }


    // Next
    if (nextBtn) {

        nextBtn.addEventListener(
            'click',
            function () {

                currentIndex++;

                updateCarousel();

            }
        );

    }


    // Previous
    if (prevBtn) {

        prevBtn.addEventListener(
            'click',
            function () {

                currentIndex--;

                updateCarousel();

            }
        );

    }


    // Indicators
    indicators.forEach(
        function (dot, index) {

            dot.addEventListener(
                'click',
                function () {

                    currentIndex =
                        index;

                    updateCarousel();

                }
            );

        }
    );


    window.addEventListener(
        'resize',
        function () {

            currentIndex = 0;

            updateCarousel();

        }
    );


    updateCarousel();


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    var form =
        document.querySelector(
            'form[aria-label="نموذج التواصل"]'
        );


    if (form) {

        var submitBtn =
            form.querySelector(
                'button[type="submit"]'
            );


        if (submitBtn) {

            form.addEventListener(
                'submit',
                function (e) {

                    e.preventDefault();


                    var originalText =
                        submitBtn.innerHTML;


                    submitBtn.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin me-2"></i> جاري الإرسال...';


                    submitBtn.disabled =
                        true;


                    setTimeout(
                        function () {

                            submitBtn.innerHTML =
                                '<i class="fa-solid fa-check me-2"></i> تم الإرسال بنجاح!';


                            submitBtn.classList.remove(
                                'from-primary',
                                'to-secondary'
                            );


                            submitBtn.classList.add(
                                'bg-emerald-500'
                            );


                            form.reset();


                            setTimeout(
                                function () {

                                    submitBtn.innerHTML =
                                        originalText;


                                    submitBtn.classList.add(
                                        'from-primary',
                                        'to-secondary'
                                    );


                                    submitBtn.classList.remove(
                                        'bg-emerald-500'
                                    );


                                    submitBtn.disabled =
                                        false;

                                },
                                3000
                            );

                        },
                        1500
                    );

                }
            );

        }

    }


    /* =====================================================
       CUSTOM SELECT
    ===================================================== */

    var selects =
        document.querySelectorAll(
            '.custom-select-wrapper'
        );


    selects.forEach(
        function (wrapper) {

            var select =
                wrapper.querySelector(
                    '.custom-select'
                );

            var options =
                wrapper.querySelector(
                    '.custom-options'
                );

            var optionItems =
                wrapper.querySelectorAll(
                    '.custom-option'
                );

            var selectedText =
                wrapper.querySelector(
                    '.selected-text'
                );


            // Check required elements
            if (
                !select ||
                !options ||
                !selectedText
            ) {

                return;

            }


            select.addEventListener(
                'click',
                function (e) {

                    e.stopPropagation();

                    options.classList.toggle(
                        'hidden'
                    );

                    select.setAttribute(
                        'aria-expanded',
                        options.classList.contains(
                            'hidden'
                        )
                            ? 'false'
                            : 'true'
                    );

                }
            );


            optionItems.forEach(
                function (item) {

                    item.addEventListener(
                        'click',
                        function () {

                            selectedText.textContent =
                                item.textContent.trim();


                            selectedText.classList.remove(
                                'text-slate-500',
                                'dark:text-slate-400'
                            );


                            selectedText.classList.add(
                                'text-slate-800',
                                'dark:text-white'
                            );


                            options.classList.add(
                                'hidden'
                            );


                            select.setAttribute(
                                'aria-expanded',
                                'false'
                            );

                        }
                    );

                }
            );

        }
    );


    // Close custom selects
    document.addEventListener(
        'click',
        function (e) {

            document
                .querySelectorAll(
                    '.custom-select-wrapper'
                )
                .forEach(
                    function (wrapper) {

                        if (
                            !wrapper.contains(
                                e.target
                            )
                        ) {

                            var options =
                                wrapper.querySelector(
                                    '.custom-options'
                                );

                            var select =
                                wrapper.querySelector(
                                    '.custom-select'
                                );


                            if (options) {

                                options.classList.add(
                                    'hidden'
                                );

                            }


                            if (select) {

                                select.setAttribute(
                                    'aria-expanded',
                                    'false'
                                );

                            }

                        }

                    }
                );

        }
    );


    /* =====================================================
       SETTINGS SIDEBAR
    ===================================================== */

    var toggleBtn =
        document.getElementById(
            'settings-toggle'
        );

    var sidebar =
        document.getElementById(
            'settings-sidebar'
        );

    var closeBtn =
        document.getElementById(
            'close-settings'
        );

    var resetBtn =
        document.getElementById(
            'reset-settings'
        );


    function toggleSidebar() {

        if (
            !sidebar ||
            !toggleBtn
        ) {

            return;

        }


        var isClosed =
            sidebar.classList.contains(
                'translate-x-full'
            );


        var icon =
            toggleBtn.querySelector(
                'i'
            );


        if (isClosed) {

            sidebar.classList.remove(
                'translate-x-full'
            );


            toggleBtn.setAttribute(
                'aria-expanded',
                'true'
            );


            toggleBtn.style.right =
                '20rem';


            if (icon) {

                icon.style.transform =
                    'rotate(180deg)';

            }

        } else {

            sidebar.classList.add(
                'translate-x-full'
            );


            toggleBtn.setAttribute(
                'aria-expanded',
                'false'
            );


            toggleBtn.style.right =
                '0';


            if (icon) {

                icon.style.transform =
                    'rotate(0deg)';

            }

        }

    }


    if (toggleBtn) {

        toggleBtn.addEventListener(
            'click',
            toggleSidebar
        );

    }


    if (closeBtn) {

        closeBtn.addEventListener(
            'click',
            toggleSidebar
        );

    }


    /* =====================================================
       FONT SETTINGS
    ===================================================== */

    var fontBtns =
        document.querySelectorAll(
            '.font-option'
        );


    function applyFont(font) {

        if (!font) {
            return;
        }


        document.body.classList.remove(
            'font-alexandria',
            'font-cairo',
            'font-tajawal'
        );


        document.body.classList.add(
            'font-' + font
        );


        localStorage.setItem(
            'font',
            font
        );


        fontBtns.forEach(
            function (btn) {

                var isActive =
                    btn.getAttribute(
                        'data-font'
                    ) === font;


                btn.setAttribute(
                    'aria-checked',
                    isActive
                        ? 'true'
                        : 'false'
                );


                btn.classList.toggle(
                    'active',
                    isActive
                );

                btn.classList.toggle(
                    'border-primary',
                    isActive
                );

                btn.classList.toggle(
                    'bg-primary/5',
                    isActive
                );

            }
        );

    }


    fontBtns.forEach(
        function (btn) {

            btn.addEventListener(
                'click',
                function () {

                    applyFont(
                        btn.getAttribute(
                            'data-font'
                        )
                    );

                }
            );

        }
    );


    var savedFont =
        localStorage.getItem(
            'font'
        );


    if (savedFont) {

        applyFont(
            savedFont
        );

    }


    /* =====================================================
       THEME COLORS
    ===================================================== */

    var colors = [

        {
            name: 'Cyan',
            primary: '#06b6d4',
            secondary: '#3b82f6',
            accent: '#0ea5e9'
        },

        {
            name: 'Emerald',
            primary: '#10b981',
            secondary: '#3b82f6',
            accent: '#059669'
        },

        {
            name: 'Rose',
            primary: '#f43f5e',
            secondary: '#d946ef',
            accent: '#e11d48'
        },

        {
            name: 'Violet',
            primary: '#8b5cf6',
            secondary: '#d946ef',
            accent: '#7c3aed'
        },

        {
            name: 'Orange',
            primary: '#f97316',
            secondary: '#ef4444',
            accent: '#ea580c'
        },

        {
            name: 'Red',
            primary: '#ef4444',
            secondary: '#b91c1c',
            accent: '#dc2626'
        }

    ];


    var grid =
        document.getElementById(
            'theme-colors-grid'
        );


    function applyColor(color) {

        if (!color) {
            return;
        }


        html.style.setProperty(
            '--color-primary',
            color.primary
        );


        html.style.setProperty(
            '--color-secondary',
            color.secondary
        );


        html.style.setProperty(
            '--color-accent',
            color.accent
        );


        localStorage.setItem(
            'themeColor',
            JSON.stringify(color)
        );

    }


    if (grid) {

        var savedColor;

        try {

            savedColor =
                JSON.parse(
                    localStorage.getItem(
                        'themeColor'
                    ) || 'null'
                );

        } catch (error) {

            savedColor =
                null;

        }


        colors.forEach(
            function (color) {

                var btn =
                    document.createElement(
                        'button'
                    );


                btn.type =
                    'button';


                btn.className =
                    'color-option w-12 h-12 rounded-full transition-all duration-300 relative group flex items-center justify-center';


                btn.setAttribute(
                    'aria-label',
                    'Change theme to ' +
                    color.name
                );


                var innerCircle =
                    document.createElement(
                        'div'
                    );


                innerCircle.className =
                    'w-full h-full rounded-full shadow-sm';


                innerCircle.style.background =
                    'linear-gradient(to bottom right, ' +
                    color.primary +
                    ', ' +
                    color.secondary +
                    ')';


                btn.appendChild(
                    innerCircle
                );


                btn.addEventListener(
                    'click',
                    function () {

                        applyColor(
                            color
                        );


                        grid
                            .querySelectorAll(
                                '.color-option'
                            )
                            .forEach(
                                function (button) {

                                    button.style.transform =
                                        'scale(1)';

                                    button.style.boxShadow =
                                        'none';

                                }
                            );


                        var offsetColor =
                            html.classList.contains(
                                'dark'
                            )
                                ? '#0f172a'
                                : '#ffffff';


                        btn.style.transform =
                            'scale(1.1)';


                        btn.style.boxShadow =
                            '0 0 0 3px ' +
                            offsetColor +
                            ', 0 0 0 6px ' +
                            color.primary;

                    }
                );


                grid.appendChild(
                    btn
                );


                // Restore saved color
                if (
                    savedColor &&
                    savedColor.name ===
                    color.name
                ) {

                    applyColor(
                        savedColor
                    );

                    setTimeout(
                        function () {

                            btn.style.transform =
                                'scale(1.1)';

                        },
                        0
                    );

                }

            }
        );


        // Default color
        if (!savedColor) {

            applyColor(
                colors[0]
            );

        }

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    var mobileMenuBtn =
        document.getElementById(
            'mobile-menu-btn'
        );

    var mobileMenu =
        document.getElementById(
            'mobile-menu'
        );


    if (
        mobileMenuBtn &&
        mobileMenu
    ) {

        mobileMenuBtn.addEventListener(
            'click',
            function () {

                var isHidden =
                    mobileMenu.classList.contains(
                        'hidden'
                    );


                mobileMenu.classList.toggle(
                    'hidden'
                );


                mobileMenuBtn.setAttribute(
                    'aria-expanded',
                    isHidden
                        ? 'true'
                        : 'false'
                );

            }
        );


        var mobileLinks =
            mobileMenu.querySelectorAll(
                'a'
            );


        mobileLinks.forEach(
            function (link) {

                link.addEventListener(
                    'click',
                    function () {

                        mobileMenu.classList.add(
                            'hidden'
                        );


                        mobileMenuBtn.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       RESET SETTINGS
    ===================================================== */

    if (resetBtn) {

        resetBtn.addEventListener(
            'click',
            function () {

                localStorage.removeItem(
                    'theme'
                );

                localStorage.removeItem(
                    'themeColor'
                );

                localStorage.removeItem(
                    'font'
                );


                window.location.reload();

            }
        );

    }

});