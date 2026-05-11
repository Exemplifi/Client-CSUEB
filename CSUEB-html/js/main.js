// import "../scss/styles.scss";
// import Swiper and styles if needed
// import Swiper from "swiper";
// import "swiper/css";


// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTestimonialSlider();
  initHeader();
  initGallerySlider();
  initInnerHeroSlider();
  initTextIconSlider();
  initBrightFutureSlider();
  initHeroSlider();
  initMainImgSlider();
  initGalleryLightbox();
  initAccessibilityFeatures();
  initFlatpickrDateInputs();

  const submenuItems = document.querySelectorAll('.leftnav .sidenav .drop:not(.active) .sidenav-sub');
  submenuItems.forEach(submenuItem => {
    if (submenuItem && submenuItem.style.display === '') {
      submenuItem.style.display = 'none';
    }
  });

  const expanderButtons = document.querySelectorAll('.btn-expander');

  expanderButtons.forEach(button => {
    button.addEventListener('click', function () {
      const submenu = this.closest('li').querySelector('.sidenav-sub');
      const icon = this.querySelector('.glyphicon');

      // Toggle submenu visibility
      if (submenu) {
        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
      }

      // Toggle plus/minus icon
      if (icon) {
        icon.classList.toggle('glyphicon-plus');
        icon.classList.toggle('glyphicon-minus');
      }
    });
  });


  //script for left sidebar toggle by default active if have a tag active
  (function () {
    const findMenu = (btn) => {
      // primary: sibling after the btn's parent (your original structure)
      let menu = btn.parentElement.nextElementSibling;
      // fallback: search inside closest main-dropdown
      if (!menu || !menu.classList.contains('sidenav-sub-menu')) {
        const main = btn.closest('.main-dropdown');
        menu = main ? main.querySelector('.sidenav-sub-menu') : null;
      }
      return menu;
    };

    const isVisible = (el) => !!el && getComputedStyle(el).display !== 'none';

    function openMenu(menu, btn) {
      // If your CSS uses a class for transitions, you may prefer toggling 'open' instead of style.display
      menu.style.display = 'block';
      menu.classList.add('open'); // harmless if not used
      if (btn) {
        const pm = btn.querySelector('.plus-minus-btn');
        if (pm) pm.classList.add('minus-btn');
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    function closeMenu(menu, btn) {
      menu.style.display = 'none';
      menu.classList.remove('open');
      if (btn) {
        const pm = btn.querySelector('.plus-minus-btn');
        if (pm) pm.classList.remove('minus-btn');
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    const expanders = document.querySelectorAll('.main-dropdown > .btn-expander');

    // Optional: close all submenus first (clean start)
    document.querySelectorAll('.sidenav-sub-menu').forEach(m => {
      // don't override if your CSS expects them open by default — remove this if not desired
      m.style.display = 'none';
      m.classList.remove('open');
    });

    expanders.forEach(btn => {
      const menu = findMenu(btn);
      if (!menu) return;

      // ARIA link
      if (!menu.id) menu.id = 'sidenav-sub-menu-' + Math.random().toString(36).slice(2, 9);
      btn.setAttribute('aria-controls', menu.id);
      btn.setAttribute('aria-expanded', isVisible(menu) ? 'true' : 'false');

      // Initial state: open if it contains an active link
      if (menu.querySelector('a.active')) {
        // close others, then open this one
        document.querySelectorAll('.sidenav-sub-menu').forEach(m => {
          if (m !== menu) closeMenu(m, document.querySelector(`.btn-expander[aria-controls="${m.id}"]`));
        });
        openMenu(menu, btn);
      } else {
        closeMenu(menu, btn);
      }

      // Click toggles this menu and closes others
      btn.addEventListener('click', function () {
        const currentlyOpen = isVisible(menu);
        if (currentlyOpen) {
          closeMenu(menu, btn);
        } else {
          // close all other menus
          document.querySelectorAll('.sidenav-sub-menu').forEach(m => {
            if (m !== menu) {
              const otherBtn = document.querySelector(`.btn-expander[aria-controls="${m.id}"]`);
              closeMenu(m, otherBtn);
            }
          });
          openMenu(menu, btn);
        }
      });
    });
  })();
  //script for left sidebar toggle by default active if have a tag active ends

  // Header search dropdown toggle
  const searchBtn = document.querySelector('.search__btn');
  const langBtn = document.querySelector('.language-dropdown .dropdown-toggle');
  const langDropdown = document.querySelector('.language-dropdown .dropdown-menu');
  const searchDropdown = document.querySelector('.header-search-dropdown');
  const infoDropdown = document.querySelector('.info-dropdown ul.dropdown-menu');
  const infoDropdownBtn = document.querySelector('.info-dropdown button.dropdown-toggle');
  if (searchBtn && searchDropdown) {
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      searchDropdown.classList.toggle('d-none');
      infoDropdown.classList.remove('show');
      langDropdown.classList.remove('show');
      langBtn.classList.remove('show');
      langBtn.setAttribute('aria-expanded', 'false');
      infoDropdownBtn.setAttribute('aria-expanded', 'false');
      if (!searchDropdown.classList.contains('d-none')) {
        const input = searchDropdown.querySelector('.search-input');
        if (input) input.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!searchDropdown.classList.contains('d-none') && !searchDropdown.contains(e.target) && e.target !== searchBtn) {
        searchDropdown.classList.add('d-none');
      }
    });
  }

  // Faculty Profile Read More Button
  var buttons = document.querySelectorAll('.read-more-btn');

  buttons.forEach(function (btn) {
    var showMoreText = 'Read More';
    var showLessText = 'Read Less';

    btn.addEventListener('click', function () {
      var descWrap = btn.closest('.faculty-more-info');
      var details = descWrap.querySelector('.faculty-desc-wrap');
      var isExpanded = details.classList.contains('expand');

      // Find the text node after the icon span
      var textNode = null;
      for (var i = 0; i < btn.childNodes.length; i++) {
        var node = btn.childNodes[i];
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
          textNode = node;
          break;
        }
      }

      // Find the icon wrapper
      var iconWrap = btn.querySelector('.icon-wrap');

      if (!textNode || !iconWrap) return;

      if (!isExpanded) {
        details.classList.add('expand');
        btn.setAttribute('aria-expanded', 'true');
        textNode.textContent = ' ' + showLessText;
        iconWrap.classList.add('rotate');
      } else {
        details.classList.remove('expand');
        btn.setAttribute('aria-expanded', 'false');
        textNode.textContent = ' ' + showMoreText;
        iconWrap.classList.remove('rotate');
      }
    });
  });

  // More Menu Hide
  const collapseMenu = document.getElementById("more-collapse");
  const toggleBtn = document.querySelector('[data-bs-target="#more-collapse"]');

  // 1. Close on click outside
  document.addEventListener("click", function (event) {
    if (
      collapseMenu &&
      toggleBtn &&
      !collapseMenu.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      closeCollapse();
    }
  });

  // 2. Close on focus out
  if (collapseMenu) {
    collapseMenu.addEventListener("focusout", function (event) {
      // Check if focus moved outside the collapse completely
      if (!collapseMenu.contains(event.relatedTarget)) {
        closeCollapse();
      }
    });
  }

  function closeCollapse() {
    let bsCollapse = bootstrap.Collapse.getInstance(collapseMenu);

    if (bsCollapse) {
      bsCollapse.hide();
    } else {
      bsCollapse = new bootstrap.Collapse(collapseMenu, { toggle: false });
      bsCollapse.hide();
    }
  }


});

// Swiper Sliders
function initTestimonialSlider() {
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (!testimonialSlider) return;

  const announcementEl = document.getElementById("testimonial-announcements");
  const wrapper = testimonialSlider.querySelector(".swiper-wrapper");
  const slides = wrapper ? wrapper.querySelectorAll(".swiper-slide") : [];
  const totalSlides = slides.length;

  // Track last announced slide index to prevent duplicates
  let lastAnnouncedIndex = -1;
  // Track if user initiated the interaction
  let userInteracted = false;

  const testimonialSwiper = new Swiper(".testimonial-slider", {
    spaceBetween: 30,
    effect: "fade",
    loop: false,
    // autoplay: { delay: 12000, disableOnInteraction: false, pauseOnMouseEnter: true },

    // Swiper built-in accessibility module (simplifies ARIA attributes, keyboard navigation)


    pagination: {
      el: ".testimonial-sec .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        const slideNumber = index + 1;
        const ariaLabel = `Go to testimonial ${slideNumber}`;
        // Add descriptive aria-label for screen readers
        return `<button type="button" class="${className}" aria-label="${ariaLabel}"></button>`;
      },
    },
    navigation: {
      nextEl: ".testimonial-sec .swiper-button-next",
      prevEl: ".testimonial-sec .swiper-button-prev",
    },
    on: {
      init: function () {
        // Track user interactions on navigation buttons and pagination
        setupUserInteractionTracking(testimonialSlider, function () {
          userInteracted = true;
        });
        // Remove aria-labels that Swiper adds so sr-only text is used instead
        setTimeout(function () {
          const prevBtn = document.getElementById("testimonial-prev-btn");
          const nextBtn = document.getElementById("testimonial-next-btn");

          if (prevBtn) {
            prevBtn.removeAttribute("aria-label");
          }
          if (nextBtn) {
            nextBtn.removeAttribute("aria-label");
          }
        }, 300);
      },
      slideChangeTransitionEnd: function () {
        // Remove aria-labels again in case Swiper re-adds them on slide change
        const prevBtn = document.getElementById("testimonial-prev-btn");
        const nextBtn = document.getElementById("testimonial-next-btn");

        if (prevBtn && prevBtn.hasAttribute("aria-label")) {
          prevBtn.removeAttribute("aria-label");
        }
        if (nextBtn && nextBtn.hasAttribute("aria-label")) {
          nextBtn.removeAttribute("aria-label");
        }

        // Only announce custom testimonial content (quote + author) if user interacted
        if (userInteracted) {
          const realIndex = this.realIndex !== undefined ? this.realIndex : this.activeIndex;
          const currentSlideIndex = realIndex % totalSlides;

          // Prevent duplicate announcements
          if (currentSlideIndex !== lastAnnouncedIndex && announcementEl) {
            announceTestimonialContent(currentSlideIndex, announcementEl, slides, totalSlides);
            lastAnnouncedIndex = currentSlideIndex;
          }

          userInteracted = false;
        }
      },
    },
  });

  return testimonialSwiper;
}

// Simplified function to track user interactions
function setupUserInteractionTracking(slider, callback) {
  // Track clicks on navigation buttons
  const prevBtn = document.getElementById("testimonial-prev-btn");
  const nextBtn = document.getElementById("testimonial-next-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", callback, true);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", callback, true);
  }

  // Track clicks on pagination bullets
  const paginationEl = slider.querySelector(".swiper-pagination");
  if (paginationEl) {
    paginationEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("swiper-pagination-bullet")) {
        callback();
      }
    }, true);
  }
}

// Simplified function to announce testimonial content (quote + author)
function announceTestimonialContent(currentSlideIndex, announcementEl, slides, totalSlides) {
  if (!announcementEl || !slides) return;

  const currentSlide = slides[currentSlideIndex];
  if (!currentSlide) return;

  const quoteEl = currentSlide.querySelector(".section-title");
  const authorEl = currentSlide.querySelector(".heading-name");
  const quote = quoteEl ? quoteEl.textContent.trim() : "";
  const author = authorEl ? authorEl.textContent.replace(/^[–-]\s*/, "").trim() : "";

  if (quote) {
    const currentSlideNumber = currentSlideIndex + 1;
    const announcement = `Testimonial ${currentSlideNumber} of ${totalSlides}: ${quote}${author ? ` by ${author}` : ""}`;

    // Clear and update announcement
    announcementEl.textContent = "";
    setTimeout(function () {
      if (announcementEl) {
        announcementEl.textContent = announcement;
      }
    }, 10);
  }
}

function initGallerySlider() {
  // Check if slider is inside .right-content
  const rightContentSliders = document.querySelectorAll('.right-content .image-gallery-slider');
  const otherSliders = document.querySelectorAll('.image-gallery-slider:not(.right-content .image-gallery-slider)');

  // Initialize sliders inside .right-content with 3 slides at 1280px
  rightContentSliders.forEach(slider => {
    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 4,
      watchOverflow: true,
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 3 },
      },
      // Show pagination only if slides count is 20 or fewer
      ...(slider.querySelectorAll('.swiper-slide').length > 20
        ? {}
        : {
            pagination: {
              el: slider.querySelector('.image-gallery-slider .swiper-pagination'),
              clickable: true,
            }
          }),
      navigation: {
        nextEl: slider.querySelector('.image-gallery-slider .swiper-button-next.swiper-button-next-new'),
        prevEl: slider.querySelector('.image-gallery-slider .swiper-button-prev.swiper-button-prev-new'),
      },
    });
  });

  // Initialize other sliders with 5 slides at 1280px
  otherSliders.forEach(slider => {
    new Swiper(slider, {
      slidesPerView: 1.2,
      spaceBetween: 4,
      watchOverflow: true,
      breakpoints: {
        640: { slidesPerView: 2.1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      },
      pagination: {
        el: slider.querySelector('.image-gallery-slider .swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: slider.querySelector('.image-gallery-slider .swiper-button-next.swiper-button-next-new'),
        prevEl: slider.querySelector('.image-gallery-slider .swiper-button-prev.swiper-button-prev-new'),
      },
    });
  });
}

function initInnerHeroSlider() {
  new Swiper(".hero-full-swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    pagination: { el: ".hero-full-swiper .swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".hero-full-swiper .swiper-button-next.swiper-btn",
      prevEl: ".hero-full-swiper .swiper-button-prev.swiper-btn",
    },
    on: {
      init: function () {
        // Hide navigation if only one slide
        if (this.slides.length <= 1) {
          const nextBtn = document.querySelector('.hero-full-swiper .swiper-button-next.swiper-btn');
          const prevBtn = document.querySelector('.hero-full-swiper .swiper-button-prev.swiper-btn');
          if (nextBtn) nextBtn.classList.add('d-none');
          if (prevBtn) prevBtn.classList.add('d-none');
        }
      }
    }
  });
}

function initTextIconSlider() {

  const container = document.querySelector('.text-icon-slider .swiper-wrapper');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.swiper-slide.random'));
  while (slides.length) {
    const randomIndex = Math.floor(Math.random() * slides.length);
    container.appendChild(slides.splice(randomIndex, 1)[0]);
  }


  // Responsive Swiper initialization with re-init on window resize
  let textIconSwiper;
  let lastIsMobile = window.innerWidth < 640;

  function initOrUpdateTextIconSwiper() {
    // Destroy previous instance if exists
    if (textIconSwiper && typeof textIconSwiper.destroy === "function") {
      textIconSwiper.destroy(true, true);
    }
    const isMobile = window.innerWidth < 640;
    textIconSwiper = new Swiper(".text-icon-slider", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      loop: false,
      breakpoints: {
        640: { slidesPerView: 2.1 },
        768: { slidesPerView: 3 },
      },
      ...(isMobile || window.innerWidth < 768
        ? {
          pagination: { el: ".text-icon-slider .swiper-pagination", clickable: true },
          navigation: {
            nextEl: ".text-icon-slider .swiper-button-next.swiper-button-next-new",
            prevEl: ".text-icon-slider .swiper-button-prev.swiper-button-prev-new",
          },
          on: {
            init: function () {
              // Update prev/next button aria-labels after initialization
              setTimeout(function () {
                const prevBtn = document.querySelector('.text-icon-slider .swiper-button-prev.swiper-button-prev-new');
                const nextBtn = document.querySelector('.text-icon-slider .swiper-button-next.swiper-button-next-new');

                if (prevBtn) {
                  prevBtn.setAttribute("aria-label", "Go to previous slide");
                }
                if (nextBtn) {
                  nextBtn.setAttribute("aria-label", "Go to next slide");
                }
              }, 300);
            },
          },
        }
        : {}),
    });
    lastIsMobile = isMobile;
  }

  // Initialize on load
  initOrUpdateTextIconSwiper();

  // Re-initialize on resize if breakpoint crosses 640px
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth < 640;
    if (isMobile !== lastIsMobile) {
      initOrUpdateTextIconSwiper();
    }
  });
}

function initBrightFutureSlider() {
  // Ensure all slides have the same height
  const brightFutureSwiper = new Swiper(".bright-future-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      100: { slidesPerView: 1.2 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3 },
    },
    pagination: {
      el: ".bright-future-section .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".bright-future-section .swiper-button-next-new",
      prevEl: ".bright-future-section .swiper-button-prev-new",
    },
    on: {
      init: function () {
        setUniformSlideHeights('.bright-future-swiper .swiper-slide');
      },
      resize: function () {
        setUniformSlideHeights('.bright-future-swiper .swiper-slide');
      }
    }
  });

  // Helper function to set all slides to the same (max) height
  function setUniformSlideHeights(slideSelector) {
    const slides = document.querySelectorAll(slideSelector);
    let maxHeight = 0;

    // Reset heights first
    slides.forEach(slide => {
      slide.style.height = 'auto';
    });

    // Calculate max height
    slides.forEach(slide => {
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
    });

    // Set all slides to max height
    slides.forEach(slide => {
      slide.style.height = maxHeight + 'px';
    });
  }
}

// Bright-future-swiper update aria-live based on viewport
function setSwiperAriaLiveBasedOnViewport() {
  const swiperWrappers = document.querySelectorAll('.bright-future-swiper .swiper-wrapper');
  const isDesktop = window.innerWidth >= 1024;

  swiperWrappers.forEach(wrapper => {
    wrapper.setAttribute('aria-live', isDesktop ? 'off' : 'polite');
  });
}

window.addEventListener('load', setSwiperAriaLiveBasedOnViewport);

window.addEventListener('resize', () => {
  clearTimeout(window.ariaLiveResizeTimeout);
  window.ariaLiveResizeTimeout = setTimeout(setSwiperAriaLiveBasedOnViewport, 100);
});
// Bright-future-swiper update aria-live based on viewport ends

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slider .swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  if (!hasMultipleSlides) {
    const group = document.querySelector(".home-hero-sec .swiper-button-group");
    if (group) group.style.display = "none";
  }

  new Swiper(".hero-slider", {
    navigation: hasMultipleSlides
      ? {
        nextEl: ".home-hero-sec .swiper-button-next",
        prevEl: ".home-hero-sec .swiper-button-prev",
      }
      : false,
  });
}

function initMainImgSlider() {
  new Swiper(".main-img-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    allowTouchMove: true,
    navigation: {
      nextEl: ".main-img-slider .swiper-button-next.swiper-btn",
      prevEl: ".main-img-slider .swiper-button-prev.swiper-btn",
      disabledClass: 'swiper-button-disabled',
    },
    pagination: {
      el: ".main-img-slider .swiper-pagination",
      clickable: true
    }
  });
}



// Tabbing loops inside sidebar

// ✅ Shift+Tab loops backward

// ✅ Escape closes sidebar and returns focus to trigger button

// ✅ Focus doesn’t leak outside
// Header Menu & Scroll Effects
function trapFocus(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  let focusableElements = Array.from(container.querySelectorAll(focusableSelectors.join(', ')))
    .filter(el => el.offsetParent !== null); // filter visible elements

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      if (focusableElements.length === 0) return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      closeSidebar();
    }
  }

  container.addEventListener('keydown', handleKeyDown);

  // Save a cleanup function to remove this trap when closing
  container._removeFocusTrap = () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}



function initHeader() {
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnMobile = document.getElementById("menuToggleMobile");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay-header");
  const closeBtn = document.querySelector(".close-btn");
  const closeBtnMobile = document.querySelector(".close-btn-mobile");
  const body = document.body;
  const header = document.querySelector(".main-header");
  let lastScrollTop = 0;

  function trapFocus(container) {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    let focusableElements = Array.from(container.querySelectorAll(focusableSelectors.join(', ')))
      .filter(el => el.offsetParent !== null); // only visible ones

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e) {
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    container._removeFocusTrap = () => container.removeEventListener('keydown', handleKeyDown);
  }

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("show");
    body.classList.add("sidebar-open", "no-scroll");

    menuBtn?.setAttribute("aria-expanded", "true");
    menuBtnMobile?.setAttribute("aria-expanded", "true");

    trapFocus(sidebar);

    const firstFocusable = sidebar.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
    body.classList.remove("sidebar-open", "no-scroll");

    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtnMobile?.setAttribute("aria-expanded", "false");

    sidebar._removeFocusTrap?.();

    menuBtn?.focus();
  }

  [menuBtn, menuBtnMobile].forEach(btn => btn?.addEventListener("click", openSidebar));
  [overlay, closeBtn, closeBtnMobile].forEach(el => el?.addEventListener("click", closeSidebar));

  // Global ESC listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });


  let lastScrollTopHeader = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (document.body.querySelector('.home-hero-sec')) {
      header.classList.toggle("header-color", scrollTop > 10);
    }
    if (scrollTop > lastScrollTopHeader && scrollTop >= 200) {
      // Scrolling down
      header.classList.add("upwards");
    } else {
      // Scrolling up
      header.classList.remove("upwards");
    }

    lastScrollTopHeader = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative scroll
  });
}



const dropdownBtn = document.querySelector('#dropdownMenuButton1');
if (dropdownBtn) {
  const dropdown = dropdownBtn.closest('.custom-dropdown');
  if (dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('show');
    });
  }
}

document.querySelectorAll(".lightbox-modal").forEach((modal, index) => {
  // Assign unique id if not already present
  if (!modal.id) {
    modal.id = `lightbox-modal-${index + 1}`;
  }
});


// Lightbox Gallery
function initGalleryLightbox() {
  const html = document.documentElement;
  html.setAttribute("data-bs-theme", "dark");

  const galleryGrids = document.querySelectorAll(".gallery-grid");
  if (!galleryGrids.length) return; // Exit if no gallery grids found

  const lightboxModalEl = document.querySelector(".lightbox-modal");
  const lightboxModal = lightboxModalEl ? document.getElementById(lightboxModalEl.id) : null;
  const modalBody = lightboxModal?.querySelector(".lightbox-content");
  const bsModal = lightboxModal ? new bootstrap.Modal(lightboxModal) : null;

  let currentIframes = [];
  let youtubePlayers = [];

  function createCaption(caption) {
    return caption ? `<div class="carousel-caption d-none d-md-block"><h5 class="m-0">${caption}</h5></div>` : '';
  }

  function createIndicators(links, activeIndex) {
    return [...links].map((_, i) =>
      `<button type="button" data-bs-target="#lightboxCarousel" data-bs-slide-to="${i}" 
        ${i === activeIndex ? 'class="active" aria-current="true"' : ''} 
        aria-label="Slide ${i + 1}"></button>`
    ).join("");
  }

  function createSlides(links, activeIndex) {
    return [...links].map((link, i) => {
      const videoUrl = link.getAttribute('data-video-url');
      const img = link.querySelector('img');
      const imgAlt = img ? img.getAttribute('alt') || "" : "";
      const isActive = i === activeIndex ? " active" : "";
      const title = link.getAttribute('rel');

      if (videoUrl) {
        const autoplayParam = i === activeIndex ? "&autoplay=1" : "";
        return `
          <div class="carousel-item${isActive}">
            <div class="ratio ratio-16x9">
              <iframe id="youtube-player-${i}" src="${videoUrl}?enablejsapi=1${autoplayParam}" 
                frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
            </div>
          </div>
        `;
      } else if (img) {
        const imgSrc = link.getAttribute("href");
        return `
          <div class="carousel-item${isActive}">
            <div class="modal-img-container">
              <img class="d-block img-fluid w-100" src="${imgSrc}" alt="${imgAlt}">
              ${createCaption(title)}
            </div>
          </div>
        `;
      }
      return '';
    }).join("");
  }

  function pauseAllVideos() {
    youtubePlayers.forEach(player => {
      try { player.pauseVideo?.(); } catch { }
    });
    currentIframes.forEach(iframe => {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } catch { }
    });
  }

  function playVideoAtIndex(index) {
    const iframes = modalBody.querySelectorAll('iframe');
    if (iframes[index]) {
      const iframe = iframes[index];
      if (!iframe.src.includes('autoplay=1')) {
        iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'autoplay=1';
      }
      youtubePlayers[index]?.playVideo?.();
    }
  }

  function initializeYouTubePlayers() {
    youtubePlayers = [];
    currentIframes.forEach((iframe, index) => {
      if (iframe.src.includes('youtube.com')) {
        youtubePlayers[index] = {
          pauseVideo: () => iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'),
          playVideo: () => iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
        };
      }
    });
  }

  function createCarousel(links, clickedLink) {
    if (!modalBody || !clickedLink) return;

    const activeIndex = [...links].indexOf(clickedLink);

    modalBody.innerHTML = `
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="false">
        <div class="carousel-indicators">${createIndicators(links, activeIndex)}</div>
        <div class="carousel-inner justify-content-center mx-auto">${createSlides(links, activeIndex)}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;

    currentIframes = modalBody.querySelectorAll('iframe');
    initializeYouTubePlayers();

    const carousel = modalBody.querySelector('#lightboxCarousel');
    carousel?.addEventListener('slide.bs.carousel', function (event) {
      pauseAllVideos();
      setTimeout(() => playVideoAtIndex(event.to), 300);
    });
  }

  // Loop through each gallery grid
  galleryGrids.forEach(galleryGrid => {
    const links = galleryGrid.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        if (!lightboxModal) return;
        createCarousel(links, link);
        bsModal?.show();
      });
    });
  });

  // Fullscreen
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");
  fsEnlarge?.addEventListener("click", e => {
    e.preventDefault();
    lightboxModal?.requestFullscreen().then(() => {
      fsEnlarge.classList.toggle("d-none");
      fsExit.classList.toggle("d-none");
    });
  });
  fsExit?.addEventListener("click", e => {
    e.preventDefault();
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  });

  lightboxModal?.addEventListener('hidden.bs.modal', function () {
    pauseAllVideos();
    if (modalBody) modalBody.innerHTML = '';
    currentIframes = [];
    youtubePlayers = [];
  });
}



// Accessibility Features
function initAccessibilityFeatures() {
  // Skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Enhanced keyboard navigation for custom components
  const customButtons = document.querySelectorAll('[role="button"]');
  customButtons.forEach(button => {
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Announce dynamic content changes
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Enhanced form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const requiredFields = form.querySelectorAll('[required]');
      let hasErrors = false;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          hasErrors = true;
          field.classList.add('is-invalid');

          // Create error message if it doesn't exist
          let errorMessage = field.parentNode.querySelector('.invalid-feedback');
          if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'invalid-feedback';
            errorMessage.textContent = 'This field is required.';
            field.parentNode.appendChild(errorMessage);
          }
        } else {
          field.classList.remove('is-invalid');
          const errorMessage = field.parentNode.querySelector('.invalid-feedback');
          if (errorMessage) {
            errorMessage.remove();
          }
        }
      });

      if (hasErrors) {
        e.preventDefault();
        announceToScreenReader('Please correct the errors before submitting the form.');
      }
    });
  });

  // Enhanced focus management for modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    const focusableElements = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    });
  });

  // Enhanced image loading
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.addEventListener('load', function () {
      announceToScreenReader('Image loaded: ' + (this.alt || 'Image'));
    });
  });

  // Enhanced link descriptions
  // const links = document.querySelectorAll('a[href]');
  // links.forEach(link => {
  //   if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
  //     const href = link.getAttribute('href');
  //     if (href) {
  //       link.setAttribute('aria-label', 'Link to ' + href);
  //     }
  //   }
  // });



  // Enhanced table accessibility
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    if (!table.querySelector('caption') && !table.getAttribute('aria-label')) {
      table.setAttribute('aria-label', 'Table data');
    }

    // Add Bootstrap table class if not present
    if (!table.classList.contains('table')) {
      table.classList.add('table');
    }

    // Wrap table in responsive div if not already wrapped
    if (!table.parentElement.classList.contains('table-responsive')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';
      wrapper.setAttribute('tabindex', '0');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  //If Table th  empty added role presentaion
  document.querySelectorAll('table th').forEach(th => {
    if (!th.textContent.trim() && th.children.length === 0) {
      th.setAttribute('role', 'presentation');
    }
  });





  // Select all links inside the menu list
  const menuLinks = document.querySelectorAll('.menu-list-link a');

  // Loop through each link and add the screen-reader comma span
  menuLinks.forEach(link => {
    const srSpan = document.createElement('span');
    srSpan.className = 'sr-only';
    srSpan.textContent = ', ';
    link.appendChild(srSpan);
  });


  // // Enhanced heading structure
  // const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  // headings.forEach((heading, index) => {
  //   if (!heading.getAttribute('id')) {
  //     heading.setAttribute('id', 'heading-' + index);
  //   }
  // });

  // Enhanced ARIA live regions
  const liveRegions = document.querySelectorAll('[aria-live]');
  liveRegions.forEach(region => {
    if (!region.getAttribute('aria-atomic')) {
      region.setAttribute('aria-atomic', 'true');
    }
  });



  // Enhanced loading states
  const loadingElements = document.querySelectorAll('.loading');
  loadingElements.forEach(element => {
    element.setAttribute('aria-busy', 'true');
    element.setAttribute('aria-live', 'polite');
  });

  // Enhanced focus indicators
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
  });

  // Enhanced color scheme detection
  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleMediaQueryChange() {
      if (darkModeQuery.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }

      if (highContrastQuery.matches) {
        document.documentElement.setAttribute('data-contrast', 'high');
      } else {
        document.documentElement.setAttribute('data-contrast', 'normal');
      }

      if (reducedMotionQuery.matches) {
        document.documentElement.setAttribute('data-motion', 'reduced');
      } else {
        document.documentElement.setAttribute('data-motion', 'normal');
      }
    }

    darkModeQuery.addListener(handleMediaQueryChange);
    highContrastQuery.addListener(handleMediaQueryChange);
    reducedMotionQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();
  }
}


//For table tbody first td convert into th with scope row
// document.addEventListener("DOMContentLoaded", function () {
//   // Select all table rows inside tbody
//   const rows = document.querySelectorAll("table tbody tr");

//   rows.forEach((row) => {
//     const firstCell = row.querySelector("td:first-child");
//     if (firstCell) {
//       // Create a new <th> element
//       const th = document.createElement("th");
//       th.scope = "row";
//       th.className = firstCell.className; // keep same classes
//       th.innerHTML = firstCell.innerHTML; // copy content

//       // Replace <td> with <th>
//       row.replaceChild(th, firstCell);
//     }
//   });
// });

// Removed duplicate event listener - functionality is already handled in the DOMContentLoaded event above

document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(function (link) {
    if (!link.querySelector('.sr-only')) {
      var srSpan = document.createElement('span');
      srSpan.className = 'sr-only';
      srSpan.textContent = '(opens in a new tab)';
      link.appendChild(document.createTextNode(' '));
      link.appendChild(srSpan);
    }
  });
});





// Accessibility for iframe
document.querySelectorAll(".message-content-sec iframe")
  .forEach((iframe, index) => {
    if (!iframe.hasAttribute("aria-label")) {
      iframe.setAttribute("aria-label", "Embedded YouTube video " + (index + 1));
    }
    if (!iframe.hasAttribute("title")) {
      iframe.setAttribute("title", "Embedded YouTube video " + (index + 1));
    }
  });


//Script for smalll hero  image
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".inner-hero-section .img-wrapper img").forEach(img => {
    img.addEventListener("load", function () {
      if (img.naturalHeight < 300) {
        img.classList.add("small-height");
      }
    });

    // in case image is cached and already loaded
    if (img.complete) {
      if (img.naturalHeight < 300) {
        img.classList.add("small-height");
      }
    }
  });
});

document.querySelectorAll("h1, h2, h3, h4, h5, h6, p").forEach(el => {
  // Remove whitespace and &nbsp; in case of empty headings
  const textOnly = el.textContent.replace(/\u00A0/g, "").trim();
  // Check if there's *any* non-whitespace text
  if (textOnly === "") {
    // But only hidden if there are no child elements
    if (el.children.length === 0) {
      el.setAttribute("aria-hidden", "true");
    }
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   // Select all td and th elements
//   const cells = document.querySelectorAll("td, th");
//   // Remove inline style attribute from each
//   cells.forEach(cell => {
//     cell.removeAttribute("style");
//   });
// });

// script for add aria-hidden true for star icon svg
const stars = document.querySelectorAll('svg.star-icon');
if (stars.length > 0) {
  stars.forEach(svg => {
    if (!svg.hasAttribute('aria-hidden')) {
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
    }
  });
}


// sidebar accordion script
function handleAccordionBehavior() {
  const accordion = document.querySelector('#thissection');
  const button = document.querySelector('[data-bs-target="#thissection"]');

  if (!accordion || !button) return; // stop if not found

  if (window.innerWidth >= 1200) {
    accordion.classList.add('show');       // keep open
    button.setAttribute('aria-expanded', 'true');
  }
  else {
    accordion.classList.remove('show');       // keep open
    button.setAttribute('aria-expanded', 'false');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  handleAccordionBehavior();
  window.addEventListener('resize', handleAccordionBehavior);
});

// remove table summary tag
document.querySelectorAll("table[summary]").forEach(function (table) {
  if (table.querySelector("caption")) {
    table.removeAttribute("summary");
  }
});

//script for google translate to add label dynamicalyy
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const labels = [
      { for: "goog-gt-votingInputSrcLang", text: "Source Language" },
      { for: "goog-gt-votingInputTrgLang", text: "Target Language" },
      { for: "goog-gt-votingInputSrcText", text: "Source Text" },
      { for: "goog-gt-votingInputTrgText", text: "Translated Text" },
      { for: "goog-gt-votingInputVote", text: "Vote" }
    ];

    labels.forEach(item => {
      const input = document.getElementById(item.for);
      if (input && !document.querySelector(`label[for="${item.for}"]`)) {
        const label = document.createElement("label");
        label.setAttribute("for", item.for);
        label.textContent = item.text;
        input.parentNode.insertBefore(label, input); // Insert before the input
      }
    });
  }, 3000);
});


// Initialize hero padding on page load
document.addEventListener('DOMContentLoaded', adjustHeroPadding);

// Only add dynamic padding for Hero section if .main-header has .alert
function adjustHeroPadding() {
  const header = document.querySelector('.main-header');
  const alert = header?.querySelector('.alert');
  const hero = document.querySelector('.inner-hero-section, .home-hero-sec');

  // Only add alert-present class if alert actually exists
  if (alert) {
    header.classList.add('alert-present');
  } else {
    header.classList.remove('alert-present');
  }

  if (!hero) return;
  setTimeout(() => {
    let headerHeight = 0;

    if ((hero.classList.contains('no-image') || hero.classList.contains('home-hero-sec')) && alert) {

      if (window.innerWidth <= 575 && hero.classList.contains('home-hero-sec')) {
        headerHeight = header ? header.offsetHeight + 40 : 0;
      }
      else {
        headerHeight = header ? header.offsetHeight + 4 : 0;
      }

      hero.style.paddingTop = headerHeight + 'px';
    }
    else if (window.innerWidth <= 991.98 && header && alert) {
      if (hero.classList.contains('home-hero-sec')) {
        headerHeight = header.offsetHeight + 64;
      } else {
        headerHeight = header.offsetHeight - 100;
      }
      hero.style.paddingTop = headerHeight + 'px';
    } else {
      // Remove padding if above max-width or if no alert present
      hero.style.paddingTop = '';
    }
  }, 400); // 100ms delay
}

// Debounced resize handler to prevent performance issues
let resizeTimeout;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(adjustHeroPadding, 100);
});



// When alert is closed → remove padding and class
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-close')) {
    const header = document.querySelector('.main-header');
    const hero = document.querySelector('.inner-hero-section, .home-hero-sec');

    // Remove alert-present class
    header.classList.remove('alert-present');

    // Reset hero padding - no need to recalculate since alert is gone
    if (hero) {
      hero.style.paddingTop = '';
    }
  }
});


//Added aria hidden true for <br> tag
document.querySelectorAll('br').forEach(br => {
  br.setAttribute('aria-hidden', 'true'); // hide from screen readers
});

setTimeout(() => {
  // Select all news sections
  const newsSections = document.querySelectorAll('section');

  // Add a class to each section if needed
  newsSections.forEach(section => {
    // Count only cards inside this section
    const newsCards = section.querySelectorAll('.text-img-main-card');

    // Find the live region inside this section
    const newsCountEl = section.querySelector('.news-count');

    // Update the count
    if (newsCountEl) {
      newsCountEl.textContent = `Showing ${newsCards.length} news article${newsCards.length > 1 ? 's' : ''}.`;
    }
  });
}, 1000); // delay of 1 second (1000 milliseconds)


// Select the dropdown and the live region

const expertiseSelect = document.getElementById('filter-expertise');
const liveRegion = document.getElementById('live-region');

if (expertiseSelect && liveRegion) {
  expertiseSelect.addEventListener('change', () => {
    const selected = expertiseSelect.value;
    if (selected) {
      liveRegion.textContent = `Selected expertise is ${selected}.`;
    } else {
      liveRegion.textContent = '';
    }
  });
}


//Added aria label to email links
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  const email = link.getAttribute('href').replace('mailto:', '');
  link.setAttribute('aria-label', `Email to ${email}`);
});



// Flip Tiles Gallery

function initFlipTilesGallery() {
  document.querySelectorAll('.flip-tiles-gallery-grid').forEach(function (grid) {
    // Assumes Packery is available as a global constructor
    new Packery(grid, {
      itemSelector: '.gallery-item',
      percentPosition: true,
      gutter: '.gutter-sizer'
    });
  });
}

//Screen reader accessibility Tab component
document.addEventListener('DOMContentLoaded', function () {
  const tabElements = document.querySelectorAll('.tabbed-section .nav-tabs button[data-bs-toggle="tab"]');
  const announcementElement = document.getElementById('sr-announcement');

  // Function to announce ALL tab content to screen readers
  function announceTabContent(tabId) {
    const tabPanel = document.getElementById(tabId);
    if (tabPanel) {
      // Get ALL text content from the tab panel
      const tabContent = tabPanel.textContent || tabPanel.innerText;

      // Use setTimeout to ensure screen readers detect the change
      setTimeout(() => {
        // First clear the content
        announcementElement.textContent = '';

        setTimeout(() => {
          // Then set the new content with ALL text
          announcementElement.textContent = 'Tab content: ' + tabContent.trim() + ' Use left and right arrow keys to navigate between tabs.';
          console.log('Announcing:', tabContent.trim().substring(0, 100) + '...'); // Debug
        }, 100);
      }, 100);
    }
  }

  // Add event listeners to all tab buttons
  tabElements.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function (event) {
      const targetId = event.target.getAttribute('data-bs-target').substring(1);

      // Wait for Bootstrap's fade animation to complete, then use setTimeout for announcement
      setTimeout(() => {
        setTimeout(() => {
          announceTabContent(targetId);
        }, 100);
      }, 350);
    });

    // Handle keyboard navigation
    tab.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const bsTab = new bootstrap.Tab(this);
        bsTab.show();
      }
    });
  });

  // Announce the first tab's ALL content on page load, with setTimeout
  setTimeout(() => {
    setTimeout(() => {
      announceTabContent('tab1');
    }, 100);
  }, 1000);
});

document.querySelectorAll('.tabbed-section .nav-link[role="tab"]').forEach(tab => {
  tab.addEventListener('focus', function () {
    this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  });
});

// Get all breadcrumb items
var breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
breadcrumbItems.forEach(function (item) {
  // Check if the breadcrumb item contains a link
  if (item.querySelector('a')) {
    // If it has a link, remove aria-current
    item.removeAttribute('aria-current');
  } else {
    // If it does not have a link, add aria-current="page"
    item.setAttribute('aria-current', 'page');
  }
});



//Testimonial slider screen reader accessibility

// window.addEventListener('scroll', function () {
//   const scrollPosition = window.scrollY + window.innerHeight;
//   const pageHeight = document.documentElement.scrollHeight;

//   if (pageHeight - scrollPosition >= 200) {
//     document.body.classList.add('scroll');
//   } else {
//     document.body.classList.remove('scroll');
//   }
// });
document.querySelectorAll('.bright-future-swiper .gallery-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const dialogId = item.getAttribute('aria-controls');
    item.setAttribute('aria-expanded', 'true');

    // Set aria-expanded to false when dialog closes
    const dialog = document.getElementById(dialogId);
    const closeBtn = document.querySelector('.lightbox-modal .btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        item.setAttribute('aria-expanded', 'false');
      });
    }
  });
});


// Run after all Swipers are initialized
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit in case Swipers are initialized later
  setTimeout(() => {
    // Get all Swiper instances from window.Swiper
    if (window.Swiper) {
      const swipers = Array.isArray(window.swipers)
        ? window.swipers
        : document.querySelectorAll('.swiper');

      swipers.forEach(container => {
        const swiperInstance = container.swiper;
        if (swiperInstance) {
          makeSwiperAccessible(swiperInstance);
        }
      });
    }
  }, 300);
});

function makeSwiperAccessible(swiper) {
  // Initial aria-hidden setup
  updateAriaHidden(swiper);

  // Re-apply whenever slide changes
  swiper.on('slideChange', () => {
    updateAriaHidden(swiper);
  });
}

function updateAriaHidden(swiper) {
  swiper.slides.forEach((slide, index) => {
    if (index === swiper.activeIndex) {
      slide.removeAttribute('aria-hidden');
    } else {
      slide.setAttribute('aria-hidden', 'true');
    }
  });
}





// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  initFlipTilesGallery();
});



// Also call on visibility change (e.g., when switching tabs or browsers)
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    initFlipTilesGallery();
  }
});

!function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) { e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function (t, e) { "use strict"; function i(i, s, a) { function h(t, e, n) { var o, s = "$()." + i + '("' + e + '")'; return t.each(function (t, h) { var u = a.data(h, i); if (!u) return void r(i + " not initialized. Cannot call methods, i.e. " + s); var c = u[e]; if (!c || "_" == e.charAt(0)) return void r(s + " is not a valid method"); var d = c.apply(u, n); o = void 0 === o ? d : o }), void 0 !== o ? o : t } function u(t, e) { t.each(function (t, n) { var o = a.data(n, i); o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o)) }) } a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function (t) { if ("string" == typeof t) { var e = o.call(arguments, 1); return h(this, t, e) } return u(this, t), this }, n(a)) } function n(t) { !t || t && t.bridget || (t.bridget = i) } var o = Array.prototype.slice, s = t.console, r = "undefined" == typeof s ? function () { } : function (t) { s.error(t) }; return n(e || t.jQuery), i }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("get-size/get-size", [], function () { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function () { "use strict"; function t(t) { var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e); return i && e } function e() { } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; u > e; e++) { var i = h[e]; t[i] = 0 } return t } function n(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e } function o() { if (!c) { c = !0; var e = document.createElement("div"); e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box"; var i = document.body || document.documentElement; i.appendChild(e); var o = n(e); s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e) } } function s(e) { if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) { var s = n(e); if ("none" == s.display) return i(); var a = {}; a.width = e.offsetWidth, a.height = e.offsetHeight; for (var c = a.isBorderBox = "border-box" == s.boxSizing, d = 0; u > d; d++) { var f = h[d], l = s[f], p = parseFloat(l); a[f] = isNaN(p) ? 0 : p } var g = a.paddingLeft + a.paddingRight, m = a.paddingTop + a.paddingBottom, y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, x = a.borderTopWidth + a.borderBottomWidth, b = c && r, E = t(s.width); E !== !1 && (a.width = E + (b ? 0 : g + _)); var T = t(s.height); return T !== !1 && (a.height = T + (b ? 0 : m + x)), a.innerWidth = a.width - (g + _), a.innerHeight = a.height - (m + x), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a } } var r, a = "undefined" == typeof console ? e : function (t) { console.error(t) }, h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], u = h.length, c = !1; return s }), function (t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }(this, function () { function t() { } var e = t.prototype; return e.on = function (t, e) { if (t && e) { var i = this._events = this._events || {}, n = i[t] = i[t] || []; return -1 == n.indexOf(e) && n.push(e), this } }, e.once = function (t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {}; return n[e] = !0, this } }, e.off = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = i.indexOf(e); return -1 != n && i.splice(n, 1), this } }, e.emitEvent = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = 0, o = i[n]; e = e || []; for (var s = this._onceEvents && this._onceEvents[t]; o;) { var r = s && s[o]; r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n] } return this } }, t }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function () { "use strict"; var t = function () { var t = Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var n = e[i], o = n + "MatchesSelector"; if (t[o]) return o } }(); return function (e, i) { return e[t](i) } }), function (t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function (t, e) { var i = {}; i.extend = function (t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function (t, e) { return (t % e + e) % e }, i.makeArray = function (t) { var e = []; if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t); return e }, i.removeFrom = function (t, e) { var i = t.indexOf(e); -1 != i && t.splice(i, 1) }, i.getParent = function (t, i) { for (; t != document.body;)if (t = t.parentNode, e(t, i)) return t }, i.getQueryElement = function (t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, i.filterFindElements = function (t, n) { t = i.makeArray(t); var o = []; return t.forEach(function (t) { if (t instanceof HTMLElement) { if (!n) return void o.push(t); e(t, n) && o.push(t); for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++)o.push(i[s]) } }), o }, i.debounceMethod = function (t, e, i) { var n = t.prototype[e], o = e + "Timeout"; t.prototype[e] = function () { var t = this[o]; t && clearTimeout(t); var e = arguments, s = this; this[o] = setTimeout(function () { n.apply(s, e), delete s[o] }, i || 100) } }, i.docReady = function (t) { "complete" == document.readyState ? t() : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function (t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() }; var n = t.console; return i.htmlInit = function (e, o) { i.docReady(function () { var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"), h = document.querySelectorAll(".js-" + s), u = i.makeArray(a).concat(i.makeArray(h)), c = r + "-options", d = t.jQuery; u.forEach(function (t) { var i, s = t.getAttribute(r) || t.getAttribute(c); try { i = s && JSON.parse(s) } catch (a) { return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a)) } var h = new e(t, i); d && d.data(t, o, h) }) }) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function (t, e) { "use strict"; function i(t) { for (var e in t) return !1; return e = null, !0 } function n(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } function o(t) { return t.replace(/([A-Z])/g, function (t) { return "-" + t.toLowerCase() }) } var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition", a = "string" == typeof s.transform ? "transform" : "WebkitTransform", h = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[r], u = { transform: a, transition: r, transitionDuration: r + "Duration", transitionProperty: r + "Property", transitionDelay: r + "Delay" }, c = n.prototype = Object.create(t.prototype); c.constructor = n, c._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, c.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, c.getSize = function () { this.size = e(this.element) }, c.css = function (t) { var e = this.element.style; for (var i in t) { var n = u[i] || i; e[n] = t[i] } }, c.getPosition = function () { var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], s = this.layout.size, r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10), a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10); r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a }, c.layoutPosition = function () { var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right", r = i ? "right" : "left", a = this.position.x + t[o]; e[s] = this.getXValue(a), e[r] = ""; var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", c = n ? "bottom" : "top", d = this.position.y + t[h]; e[u] = this.getYValue(d), e[c] = "", this.css(e), this.emitEvent("layout", [this]) }, c.getXValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, c.getYValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, c._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, n = this.position.y, o = parseInt(t, 10), s = parseInt(e, 10), r = o === this.position.x && s === this.position.y; if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition(); var a = t - i, h = e - n, u = {}; u.transform = this.getTranslate(a, h), this.transition({ to: u, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, c.getTranslate = function (t, e) { var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"); return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)" }, c.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, c.moveTo = c._transitionTo, c.setPosition = function (t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, c._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, c.transition = function (t) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t); var e = this._transn; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var n = this.element.offsetHeight; n = null } this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var d = "opacity," + o(a); c.enableTransition = function () { if (!this.isTransitioning) { var t = this.layout.options.transitionDuration; t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: d, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(h, this, !1) } }, c.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, c.onotransitionend = function (t) { this.ontransitionend(t) }; var f = { "-webkit-transform": "transform" }; c.ontransitionend = function (t) { if (t.target === this.element) { var e = this._transn, n = f[t.propertyName] || t.propertyName; if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) { var o = e.onEnd[n]; o.call(this), delete e.onEnd[n] } this.emitEvent("transitionEnd", [this]) } }, c.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1 }, c._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var l = { transitionProperty: "", transitionDuration: "", transitionDelay: "" }; return c.removeTransitionStyles = function () { this.css(l) }, c.stagger = function (t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, c.removeElem = function () { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, c.remove = function () { return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () { this.removeElem() }), void this.hide()) : void this.removeElem() }, c.reveal = function () { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle"); e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e }) }, c.onRevealTransitionEnd = function () { this.isHidden || this.emitEvent("reveal") }, c.getHideRevealTransitionEndProperty = function (t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, c.hide = function () { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle"); e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e }) }, c.onHideTransitionEnd = function () { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, c.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, n }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, s) { return e(t, i, n, o, s) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function (t, e, i, n, o) { "use strict"; function s(t, e) { var i = n.getQueryElement(t); if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t))); this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e); var o = ++d; this.element.outlayerGUID = o, f[o] = this, this._create(); var s = this._getOption("initLayout"); s && this.layout() } function r(t) { function e() { t.apply(this, arguments) } return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e } function a(t) { if ("number" == typeof t) return t; var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2]; if (!i.length) return 0; i = parseFloat(i); var o = p[n] || 1; return i * o } var h = t.console, u = t.jQuery, c = function () { }, d = 0, f = {}; s.namespace = "outlayer", s.Item = o, s.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }; var l = s.prototype; n.extend(l, e.prototype), l.option = function (t) { n.extend(this.options, t) }, l._getOption = function (t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, s.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, l._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle); var t = this._getOption("resize"); t && this.bindResize() }, l.reloadItems = function () { this.items = this._itemize(this.element.children) }, l._itemize = function (t) { for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) { var s = e[o], r = new i(s, this); n.push(r) } return n }, l._filterFindItemElements = function (t) { return n.filterFindElements(t, this.options.itemSelector) }, l.getItemElements = function () { return this.items.map(function (t) { return t.element }) }, l.layout = function () { this._resetLayout(), this._manageStamps(); var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; this.layoutItems(this.items, e), this._isLayoutInited = !0 }, l._init = l.layout, l._resetLayout = function () { this.getSize() }, l.getSize = function () { this.size = i(this.element) }, l._getMeasurement = function (t, e) { var n, o = this.options[t]; o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0 }, l.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, l._getItemsForLayout = function (t) { return t.filter(function (t) { return !t.isIgnored }) }, l._layoutItems = function (t, e) { if (this._emitCompleteOnItems("layout", t), t && t.length) { var i = []; t.forEach(function (t) { var n = this._getItemLayoutPosition(t); n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n) }, this), this._processLayoutQueue(i) } }, l._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, l._processLayoutQueue = function (t) { this.updateStagger(), t.forEach(function (t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, l.updateStagger = function () { var t = this.options.stagger; return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger) }, l._positionItem = function (t, e, i, n, o) { n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i)) }, l._postLayout = function () { this.resizeContainer() }, l.resizeContainer = function () { var t = this._getOption("resizeContainer"); if (t) { var e = this._getContainerSize(); e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1)) } }, l._getContainerSize = c, l._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, l._emitCompleteOnItems = function (t, e) { function i() { o.dispatchEvent(t + "Complete", null, [e]) } function n() { r++, r == s && i() } var o = this, s = e.length; if (!e || !s) return void i(); var r = 0; e.forEach(function (e) { e.once(t, n) }) }, l.dispatchEvent = function (t, e, i) { var n = e ? [e].concat(i) : i; if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) { var o = u.Event(e); o.type = t, this.$element.trigger(o, i) } else this.$element.trigger(t, i) }, l.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, l.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, l.stamp = function (t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, l.unstamp = function (t) { t = this._find(t), t && t.forEach(function (t) { n.removeFrom(this.stamps, t), this.unignore(t) }, this) }, l._find = function (t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0 }, l._manageStamps = function () { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, l._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, l._manageStamp = c, l._getElementOffset = function (t) { var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), s = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom }; return s }, l.handleEvent = n.handleEvent, l.bindResize = function () { t.addEventListener("resize", this), this.isResizeBound = !0 }, l.unbindResize = function () { t.removeEventListener("resize", this), this.isResizeBound = !1 }, l.onresize = function () { this.resize() }, n.debounceMethod(s, "onresize", 100), l.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, l.needsResizeLayout = function () { var t = i(this.element), e = this.size && t; return e && t.innerWidth !== this.size.innerWidth }, l.addItems = function (t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, l.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, l.prepended = function (t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, l.reveal = function (t) { if (this._emitCompleteOnItems("reveal", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.reveal() }) } }, l.hide = function (t) { if (this._emitCompleteOnItems("hide", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.hide() }) } }, l.revealItemElements = function (t) { var e = this.getItems(t); this.reveal(e) }, l.hideItemElements = function (t) { var e = this.getItems(t); this.hide(e) }, l.getItem = function (t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, l.getItems = function (t) { t = n.makeArray(t); var e = []; return t.forEach(function (t) { var i = this.getItem(t); i && e.push(i) }, this), e }, l.remove = function (t) { var e = this.getItems(t); this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) { t.remove(), n.removeFrom(this.items, t) }, this) }, l.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) { t.destroy() }), this.unbindResize(); var e = this.element.outlayerGUID; delete f[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace) }, s.data = function (t) { t = n.getQueryElement(t); var e = t && t.outlayerGUID; return e && f[e] }, s.create = function (t, e) { var i = r(s); return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i }; var p = { ms: 1, s: 1e3 }; return s.Item = o, s }), function (t, e) { "function" == typeof define && define.amd ? define("packery/js/rect", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Packery = t.Packery || {}, t.Packery.Rect = e()) }(window, function () { "use strict"; function t(e) { for (var i in t.defaults) this[i] = t.defaults[i]; for (i in e) this[i] = e[i] } t.defaults = { x: 0, y: 0, width: 0, height: 0 }; var e = t.prototype; return e.contains = function (t) { var e = t.width || 0, i = t.height || 0; return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i }, e.overlaps = function (t) { var e = this.x + this.width, i = this.y + this.height, n = t.x + t.width, o = t.y + t.height; return this.x < n && e > t.x && this.y < o && i > t.y }, e.getMaximalFreeRects = function (e) { if (!this.overlaps(e)) return !1; var i, n = [], o = this.x + this.width, s = this.y + this.height, r = e.x + e.width, a = e.y + e.height; return this.y < e.y && (i = new t({ x: this.x, y: this.y, width: this.width, height: e.y - this.y }), n.push(i)), o > r && (i = new t({ x: r, y: this.y, width: o - r, height: this.height }), n.push(i)), s > a && (i = new t({ x: this.x, y: a, width: this.width, height: s - a }), n.push(i)), this.x < e.x && (i = new t({ x: this.x, y: this.y, width: e.x - this.x, height: this.height }), n.push(i)), n }, e.canFit = function (t) { return this.width >= t.width && this.height >= t.height }, t }), function (t, e) { if ("function" == typeof define && define.amd) define("packery/js/packer", ["./rect"], e); else if ("object" == typeof module && module.exports) module.exports = e(require("./rect")); else { var i = t.Packery = t.Packery || {}; i.Packer = e(i.Rect) } }(window, function (t) { "use strict"; function e(t, e, i) { this.width = t || 0, this.height = e || 0, this.sortDirection = i || "downwardLeftToRight", this.reset() } var i = e.prototype; i.reset = function () { this.spaces = []; var e = new t({ x: 0, y: 0, width: this.width, height: this.height }); this.spaces.push(e), this.sorter = n[this.sortDirection] || n.downwardLeftToRight }, i.pack = function (t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e]; if (i.canFit(t)) { this.placeInSpace(t, i); break } } }, i.columnPack = function (t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e], n = i.x <= t.x && i.x + i.width >= t.x + t.width && i.height >= t.height - .01; if (n) { t.y = i.y, this.placed(t); break } } }, i.rowPack = function (t) { for (var e = 0; e < this.spaces.length; e++) { var i = this.spaces[e], n = i.y <= t.y && i.y + i.height >= t.y + t.height && i.width >= t.width - .01; if (n) { t.x = i.x, this.placed(t); break } } }, i.placeInSpace = function (t, e) { t.x = e.x, t.y = e.y, this.placed(t) }, i.placed = function (t) { for (var e = [], i = 0; i < this.spaces.length; i++) { var n = this.spaces[i], o = n.getMaximalFreeRects(t); o ? e.push.apply(e, o) : e.push(n) } this.spaces = e, this.mergeSortSpaces() }, i.mergeSortSpaces = function () { e.mergeRects(this.spaces), this.spaces.sort(this.sorter) }, i.addSpace = function (t) { this.spaces.push(t), this.mergeSortSpaces() }, e.mergeRects = function (t) { var e = 0, i = t[e]; t: for (; i;) { for (var n = 0, o = t[e + n]; o;) { if (o == i) n++; else { if (o.contains(i)) { t.splice(e, 1), i = t[e]; continue t } i.contains(o) ? t.splice(e + n, 1) : n++ } o = t[e + n] } e++, i = t[e] } return t }; var n = { downwardLeftToRight: function (t, e) { return t.y - e.y || t.x - e.x }, rightwardTopToBottom: function (t, e) { return t.x - e.x || t.y - e.y } }; return e }), function (t, e) { "function" == typeof define && define.amd ? define("packery/js/item", ["outlayer/outlayer", "./rect"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("./rect")) : t.Packery.Item = e(t.Outlayer, t.Packery.Rect) }(window, function (t, e) { "use strict"; var i = document.documentElement.style, n = "string" == typeof i.transform ? "transform" : "WebkitTransform", o = function () { t.Item.apply(this, arguments) }, s = o.prototype = Object.create(t.Item.prototype), r = s._create; s._create = function () { r.call(this), this.rect = new e }; var a = s.moveTo; return s.moveTo = function (t, e) { var i = Math.abs(this.position.x - t), n = Math.abs(this.position.y - e), o = this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && 1 > i && 1 > n; return o ? void this.goTo(t, e) : void a.apply(this, arguments) }, s.enablePlacing = function () { this.removeTransitionStyles(), this.isTransitioning && n && (this.element.style[n] = "none"), this.isTransitioning = !1, this.getSize(), this.layout._setRectSize(this.element, this.rect), this.isPlacing = !0 }, s.disablePlacing = function () { this.isPlacing = !1 }, s.removeElem = function () { this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this]) }, s.showDropPlaceholder = function () { var t = this.dropPlaceholder; t || (t = this.dropPlaceholder = document.createElement("div"), t.className = "packery-drop-placeholder", t.style.position = "absolute"), t.style.width = this.size.width + "px", t.style.height = this.size.height + "px", this.positionDropPlaceholder(), this.layout.element.appendChild(t) }, s.positionDropPlaceholder = function () { this.dropPlaceholder.style[n] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)" }, s.hideDropPlaceholder = function () { var t = this.dropPlaceholder.parentNode; t && t.removeChild(this.dropPlaceholder) }, o }), function (t, e) { "function" == typeof define && define.amd ? define(["get-size/get-size", "outlayer/outlayer", "packery/js/rect", "packery/js/packer", "packery/js/item"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = e(t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item) }(window, function (t, e, i, n, o) {
  "use strict"; function s(t, e) { return t.position.y - e.position.y || t.position.x - e.position.x } function r(t, e) { return t.position.x - e.position.x || t.position.y - e.position.y } function a(t, e) { var i = e.x - t.x, n = e.y - t.y; return Math.sqrt(i * i + n * n) } i.prototype.canFit = function (t) { return this.width >= t.width - 1 && this.height >= t.height - 1 }; var h = e.create("packery"); h.Item = o; var u = h.prototype; u._create = function () { e.prototype._create.call(this), this.packer = new n, this.shiftPacker = new n, this.isEnabled = !0, this.dragItemCount = 0; var t = this; this.handleDraggabilly = { dragStart: function () { t.itemDragStart(this.element) }, dragMove: function () { t.itemDragMove(this.element, this.position.x, this.position.y) }, dragEnd: function () { t.itemDragEnd(this.element) } }, this.handleUIDraggable = { start: function (e, i) { i && t.itemDragStart(e.currentTarget) }, drag: function (e, i) { i && t.itemDragMove(e.currentTarget, i.position.left, i.position.top) }, stop: function (e, i) { i && t.itemDragEnd(e.currentTarget) } } }, u._resetLayout = function () { this.getSize(), this._getMeasurements(); var t, e, i; this._getOption("horizontal") ? (t = 1 / 0, e = this.size.innerHeight + this.gutter, i = "rightwardTopToBottom") : (t = this.size.innerWidth + this.gutter, e = 1 / 0, i = "downwardLeftToRight"), this.packer.width = this.shiftPacker.width = t, this.packer.height = this.shiftPacker.height = e, this.packer.sortDirection = this.shiftPacker.sortDirection = i, this.packer.reset(), this.maxY = 0, this.maxX = 0 }, u._getMeasurements = function () { this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width") }, u._getItemLayoutPosition = function (t) { if (this._setRectSize(t.element, t.rect), this.isShifting || this.dragItemCount > 0) { var e = this._getPackMethod(); this.packer[e](t.rect) } else this.packer.pack(t.rect); return this._setMaxXY(t.rect), t.rect }, u.shiftLayout = function () { this.isShifting = !0, this.layout(), delete this.isShifting }, u._getPackMethod = function () { return this._getOption("horizontal") ? "rowPack" : "columnPack" }, u._setMaxXY = function (t) { this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY) }, u._setRectSize = function (e, i) { var n = t(e), o = n.outerWidth, s = n.outerHeight; (o || s) && (o = this._applyGridGutter(o, this.columnWidth), s = this._applyGridGutter(s, this.rowHeight)), i.width = Math.min(o, this.packer.width), i.height = Math.min(s, this.packer.height) }, u._applyGridGutter = function (t, e) { if (!e) return t + this.gutter; e += this.gutter; var i = t % e, n = i && 1 > i ? "round" : "ceil"; return t = Math[n](t / e) * e }, u._getContainerSize = function () { return this._getOption("horizontal") ? { width: this.maxX - this.gutter } : { height: this.maxY - this.gutter } }, u._manageStamp = function (t) { var e, n = this.getItem(t); if (n && n.isPlacing) e = n.rect; else { var o = this._getElementOffset(t); e = new i({ x: this._getOption("originLeft") ? o.left : o.right, y: this._getOption("originTop") ? o.top : o.bottom }) } this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e) }, u.sortItemsByPosition = function () { var t = this._getOption("horizontal") ? r : s; this.items.sort(t) }, u.fit = function (t, e, i) { var n = this.getItem(t); n && (this.stamp(n.element), n.enablePlacing(), this.updateShiftTargets(n), e = void 0 === e ? n.rect.x : e, i = void 0 === i ? n.rect.y : i, this.shift(n, e, i), this._bindFitEvents(n), n.moveTo(n.rect.x, n.rect.y), this.shiftLayout(), this.unstamp(n.element), this.sortItemsByPosition(), n.disablePlacing()) }, u._bindFitEvents = function (t) { function e() { n++, 2 == n && i.dispatchEvent("fitComplete", null, [t]) } var i = this, n = 0; t.once("layout", e), this.once("layoutComplete", e) }, u.resize = function () { this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout()) }, u.needsResizeLayout = function () { var e = t(this.element), i = this._getOption("horizontal") ? "innerHeight" : "innerWidth"; return e[i] != this.size[i] }, u.resizeShiftPercentLayout = function () { var e = this._getItemsForLayout(this.items), i = this._getOption("horizontal"), n = i ? "y" : "x", o = i ? "height" : "width", s = i ? "rowHeight" : "columnWidth", r = i ? "innerHeight" : "innerWidth", a = this[s]; if (a = a && a + this.gutter) { this._getMeasurements(); var h = this[s] + this.gutter; e.forEach(function (t) { var e = Math.round(t.rect[n] / a); t.rect[n] = e * h }) } else { var u = t(this.element)[r] + this.gutter, c = this.packer[o]; e.forEach(function (t) { t.rect[n] = t.rect[n] / c * u }) } this.shiftLayout() }, u.itemDragStart = function (t) { if (this.isEnabled) { this.stamp(t); var e = this.getItem(t); e && (e.enablePlacing(), e.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(e)) } }, u.updateShiftTargets = function (t) { this.shiftPacker.reset(), this._getBoundingRect(); var e = this._getOption("originLeft"), n = this._getOption("originTop"); this.stamps.forEach(function (t) { var o = this.getItem(t); if (!o || !o.isPlacing) { var s = this._getElementOffset(t), r = new i({ x: e ? s.left : s.right, y: n ? s.top : s.bottom }); this._setRectSize(t, r), this.shiftPacker.placed(r) } }, this); var o = this._getOption("horizontal"), s = o ? "rowHeight" : "columnWidth", r = o ? "height" : "width"; this.shiftTargetKeys = [], this.shiftTargets = []; var a, h = this[s]; if (h = h && h + this.gutter) { var u = Math.ceil(t.rect[r] / h), c = Math.floor((this.shiftPacker[r] + this.gutter) / h); a = (c - u) * h; for (var d = 0; c > d; d++) { var f = o ? 0 : d * h, l = o ? d * h : 0; this._addShiftTarget(f, l, a) } } else a = this.shiftPacker[r] + this.gutter - t.rect[r], this._addShiftTarget(0, 0, a); var p = this._getItemsForLayout(this.items), g = this._getPackMethod(); p.forEach(function (t) { var e = t.rect; this._setRectSize(t.element, e), this.shiftPacker[g](e), this._addShiftTarget(e.x, e.y, a); var i = o ? e.x + e.width : e.x, n = o ? e.y : e.y + e.height; if (this._addShiftTarget(i, n, a), h) for (var s = Math.round(e[r] / h), u = 1; s > u; u++) { var c = o ? i : e.x + h * u, d = o ? e.y + h * u : n; this._addShiftTarget(c, d, a) } }, this) }, u._addShiftTarget = function (t, e, i) { var n = this._getOption("horizontal") ? e : t; if (!(0 !== n && n > i)) { var o = t + "," + e, s = -1 != this.shiftTargetKeys.indexOf(o); s || (this.shiftTargetKeys.push(o), this.shiftTargets.push({ x: t, y: e })) } }, u.shift = function (t, e, i) { var n, o = 1 / 0, s = { x: e, y: i }; this.shiftTargets.forEach(function (t) { var e = a(t, s); o > e && (n = t, o = e) }), t.rect.x = n.x, t.rect.y = n.y }; var c = 120; u.itemDragMove = function (t, e, i) {
    function n() { s.shift(o, e, i), o.positionDropPlaceholder(), s.layout() } var o = this.isEnabled && this.getItem(t); if (o) { e -= this.size.paddingLeft, i -= this.size.paddingTop; var s = this, r = new Date; this._itemDragTime && r - this._itemDragTime < c ? (clearTimeout(this.dragTimeout), this.dragTimeout = setTimeout(n, c)) : (n(), this._itemDragTime = r) }
  }, u.itemDragEnd = function (t) { function e() { n++, 2 == n && (i.element.classList.remove("is-positioning-post-drag"), i.hideDropPlaceholder(), o.dispatchEvent("dragItemPositioned", null, [i])) } var i = this.isEnabled && this.getItem(t); if (i) { clearTimeout(this.dragTimeout), i.element.classList.add("is-positioning-post-drag"); var n = 0, o = this; i.once("layout", e), this.once("layoutComplete", e), i.moveTo(i.rect.x, i.rect.y), this.layout(), this.dragItemCount = Math.max(0, this.dragItemCount - 1), this.sortItemsByPosition(), i.disablePlacing(), this.unstamp(i.element) } }, u.bindDraggabillyEvents = function (t) { this._bindDraggabillyEvents(t, "on") }, u.unbindDraggabillyEvents = function (t) { this._bindDraggabillyEvents(t, "off") }, u._bindDraggabillyEvents = function (t, e) { var i = this.handleDraggabilly; t[e]("dragStart", i.dragStart), t[e]("dragMove", i.dragMove), t[e]("dragEnd", i.dragEnd) }, u.bindUIDraggableEvents = function (t) { this._bindUIDraggableEvents(t, "on") }, u.unbindUIDraggableEvents = function (t) { this._bindUIDraggableEvents(t, "off") }, u._bindUIDraggableEvents = function (t, e) { var i = this.handleUIDraggable; t[e]("dragstart", i.start)[e]("drag", i.drag)[e]("dragstop", i.stop) }; var d = u.destroy; return u.destroy = function () { d.apply(this, arguments), this.isEnabled = !1 }, h.Rect = i, h.Packer = n, h
});







