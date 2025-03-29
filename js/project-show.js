// Then add this JavaScript code:
document
  .querySelector(".btn-outline-black")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevents the link from being followed
    Swal.fire({
      title: "Sorry",
      text: "CV is not added for now",
      icon: "info",
      confirmButtonText: "OK",
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  // Remove Spline Logo
  const interval = setInterval(() => {
    const viewer = document.querySelector("spline-viewer");
    if (viewer && viewer.shadowRoot) {
      const logo = viewer.shadowRoot.querySelector("#logo");
      if (logo) {
        logo.remove();
        console.log("Logo removed!");
        clearInterval(interval);
      }
    }
  }, 500);

  // Theme management function
  function initializeTheme() {
    const themeToggle = document.createElement("a");
    themeToggle.href = "#";
    themeToggle.className = "btn btn-black";

    // Append toggle button to a consistent container
    const buttonContainer =
      document.querySelector(
        ".d-flex.justify-content-between.align-items-center.mb-4 > div:first-child"
      ) || document.body;
    if (buttonContainer) {
      buttonContainer.appendChild(themeToggle);
    }

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme =
      savedTheme || (prefersDarkScheme.matches ? "dark" : "light");

    // Function to apply theme
    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("portfolio-theme", theme);
      themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    }

    // Apply initial theme
    setTheme(initialTheme);

    // Toggle theme on click
    themeToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });

    // Optional: Sync with system preference changes
    prefersDarkScheme.addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light";
      if (!localStorage.getItem("portfolio-theme")) {
        // Only update if user hasn’t manually set a theme
        setTheme(newTheme);
      }
    });
  }

  // Initialize theme
  initializeTheme();

  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 600, once: true });
  }

  // Fade-in animation
  const fadeElements = document.querySelectorAll(".fade-in");
  function checkFade() {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        element.classList.add("active");
      }
    });
  }
  setTimeout(checkFade, 300);
  window.addEventListener("scroll", checkFade);

  // Initialize custom cursor
  initializeCustomCursor();

  // Wait a moment for swimming emojis to be added before adding font weight effect
  setTimeout(addFontWeightWaveEffect, 500);

  // Contact popup functionality
  const getInTouchBtn = document.querySelector(
    ".work-together-section .btn-black"
  );
  const contactPopup = document.getElementById("contact-popup");
  const closeContactBtn = document.getElementById("close-contact");
  const emailOption = document.getElementById("email-option");
  const whatsappOption = document.getElementById("whatsapp-option");
  const emailForm = document.getElementById("email-form");
  const whatsappForm = document.getElementById("whatsapp-form");
  const whatsappContactForm = document.getElementById("whatsapp-contact-form");

  // Show contact popup when "Get in Touch" is clicked
  getInTouchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    contactPopup.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });

  // Close contact popup
  closeContactBtn.addEventListener("click", () => {
    contactPopup.classList.remove("active");
    document.body.style.overflow = ""; // Enable scrolling
  });

  // Close popup when clicking outside the container
  contactPopup.addEventListener("click", (e) => {
    if (e.target === contactPopup) {
      contactPopup.classList.remove("active");
      document.body.style.overflow = ""; // Enable scrolling
    }
  });

  // Toggle between email and WhatsApp forms
  emailOption.addEventListener("click", () => {
    emailOption.classList.add("active");
    whatsappOption.classList.remove("active");
    emailForm.classList.add("active");
    whatsappForm.classList.remove("active");
  });

  whatsappOption.addEventListener("click", () => {
    whatsappOption.classList.add("active");
    emailOption.classList.remove("active");
    whatsappForm.classList.add("active");
    emailForm.classList.remove("active");
  });

  // Handle WhatsApp form submission
  whatsappContactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("whatsapp-name").value;
    const message = document.getElementById("whatsapp-message").value;

    // Create WhatsApp link
    const formattedMessage = `My name is ${name}, ${message}`;
    const whatsappLink = `https://wa.me/919207928793?text=${encodeURIComponent(
      formattedMessage
    )}`;
    window.open(whatsappLink, "_blank");

    // Reset form and close popup after a delay
    setTimeout(() => {
      whatsappContactForm.reset();
      contactPopup.classList.remove("active");
      document.body.style.overflow = "";
    }, 1000);
  });
});

// Font weight wave effect function
function addFontWeightWaveEffect() {
  const subtextElement = document.querySelector(".portfolio-subtext");
  if (!subtextElement) return;

  const desktopSpan = subtextElement.querySelector(".desktop-text");
  const mobileSpan = subtextElement.querySelector(".mobile-text");

  function processSpan(span) {
    if (!span) return;

    const text = span.textContent;
    let newHTML = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        newHTML += " ";
      } else {
        newHTML += `<span class="hover-letter">${text[i]}</span>`;
      }
    }

    span.innerHTML = newHTML;
  }

  processSpan(desktopSpan);
  processSpan(mobileSpan);

  const styleId = "font-weight-wave-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
                    .hover-letter {
                        font-weight: 400;
                        transition: font-weight 0.15s ease, font-size 0.15s ease;
                        display: inline-block;
                    }
                    .portfolio-subtext:hover {
                        cursor: default;
                    }
                `;
    document.head.appendChild(style);
  }

  subtextElement.addEventListener("mousemove", (e) => {
    const letters = subtextElement.querySelectorAll(".hover-letter");
    const rect = subtextElement.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX = letterRect.left + letterRect.width / 2 - rect.left;
      const letterCenterY = letterRect.top + letterRect.height / 2 - rect.top;

      const distance = Math.sqrt(
        Math.pow(mouseX - letterCenterX, 2) +
          Math.pow(mouseY - letterCenterY, 2)
      );

      const maxDistance = 100;
      const minWeight = 200;
      const maxWeight = 900;

      let weight =
        maxWeight - (distance / maxDistance) * (maxWeight - minWeight);
      weight = Math.max(
        minWeight,
        Math.min(maxWeight, Math.round(weight / 100) * 100)
      );

      const baseFontSize = 1;
      const maxFontSizeIncrease = 0.3;
      const fontSizeIncrease =
        maxFontSizeIncrease * (1 - Math.min(1, distance / maxDistance));
      const fontSize = baseFontSize + fontSizeIncrease;

      letter.style.fontWeight = weight;
      letter.style.fontSize = `${fontSize}rem`;
    });
  });

  subtextElement.addEventListener("mouseleave", () => {
    const letters = subtextElement.querySelectorAll(".hover-letter");
    letters.forEach((letter) => {
      letter.style.fontWeight = 400;
      letter.style.fontSize = "1rem";
    });
  });
}

// Custom Cursor Follower with Enhanced Sparks
function initializeCustomCursor() {
  const cursorOuter = document.createElement("div");
  cursorOuter.className = "custom-cursor";
  document.body.appendChild(cursorOuter);

  const cursorInner = document.createElement("div");
  cursorInner.className = "custom-cursor inner";
  document.body.appendChild(cursorInner);

  let mouseX = 0;
  let mouseY = 0;
  let outerX = 0;
  let outerY = 0;
  let innerX = 0;
  let innerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    outerX += (mouseX - outerX) * 0.15;
    outerY += (mouseY - outerY) * 0.15;
    innerX += (mouseX - innerX) * 0.25;
    innerY += (mouseY - innerY) * 0.25;

    cursorOuter.style.left = `${outerX}px`;
    cursorOuter.style.top = `${outerY}px`;
    cursorInner.style.left = `${innerX}px`;
    cursorInner.style.top = `${innerY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverElements = document.querySelectorAll(
    "a, button, .profile-pic, .pill-button, .project-card"
  );
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOuter.classList.add("hover");
      cursorInner.style.transform = "translate(-50%, -50%) scale(0)";
    });
    el.addEventListener("mouseleave", () => {
      cursorOuter.classList.remove("hover");
      cursorInner.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });

  document.addEventListener("click", (e) => {
    cursorOuter.classList.add("click");
    setTimeout(() => cursorOuter.classList.remove("click"), 150);

    const particleCount = 12;
    const colors = [
      "rgba(255, 182, 193, 0.8)",
      "rgba(173, 216, 230, 0.8)",
      "rgba(240, 230, 140, 0.8)",
      "rgba(144, 238, 144, 0.8)",
      "rgba(221, 160, 221, 0.8)",
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "cursor-particle";

      const angle = Math.random() * 360;
      const distance = 30 + Math.random() * 40;
      const size = 6 + Math.random() * 6;
      const duration = 0.6 + Math.random() * 0.2;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${mouseX}px`;
      particle.style.top = `${mouseY}px`;
      particle.style.setProperty("--px", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--py", `${Math.sin(angle) * distance}px`);
      particle.style.animationDuration = `${duration}s`;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = `radial-gradient(circle, ${randomColor} 30%, transparent 70%)`;
      particle.style.boxShadow = `0 0 12px ${randomColor}`;

      document.body.appendChild(particle);

      particle.addEventListener("animationend", () => {
        particle.remove();
      });
    }
  });

  if (window.innerWidth <= 767) {
    cursorOuter.style.display = "none";
    cursorInner.style.display = "none";
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 767) {
      cursorOuter.style.display = "none";
      cursorInner.style.display = "none";
    } else {
      cursorOuter.style.display = "block";
      cursorInner.style.display = "block";
    }
  });
}

function initializeSlider() {
  const sliders = document.querySelectorAll(".project-slider");

  sliders.forEach((slider) => {
    const slideImages = slider.querySelector(".slide-images");
    const dots = slider.querySelectorAll(".slider-dot");
    const prevBtn = slider.querySelector(".slider-prev");
    const nextBtn = slider.querySelector(".slider-next");
    let currentSlide = 0;
    let autoSlideInterval;

    function updateSlider() {
      slideImages.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % dots.length;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + dots.length) % dots.length;
      updateSlider();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Event listeners
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlider();
        stopAutoSlide();
      });
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
    });

    // Start auto-sliding
    startAutoSlide();

    // Pause auto-sliding when hovering
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
  });
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSlider);
