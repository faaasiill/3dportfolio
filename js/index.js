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

document.addEventListener("DOMContentLoaded", () => {
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

  // Initialize custom cursor
  initializeCustomCursor();

  // Profile picture popup functionality
  const profilePic = document.querySelector(".profile-pic");
  let modal = document.querySelector(".profile-pic-modal");
  const colors = [
    "rgba(255, 182, 193, 0.8)", // Light Pink
    "rgba(173, 216, 230, 0.8)", // Light Blue
    "rgba(240, 230, 140, 0.8)", // Khaki
    "rgba(144, 238, 144, 0.8)", // Light Green
    "rgba(221, 160, 221, 0.8)", // Plum
  ];

  if (!modal) {
    modal = document.createElement("div");
    modal.className = "profile-pic-modal";

    const modalImg = document.createElement("img");
    modalImg.src = profilePic.src;
    modalImg.alt = profilePic.alt;

    const particleContainer = document.createElement("div");
    particleContainer.className = "particles";

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const angle = Math.random() * 360;
      const distance = 120 + Math.random() * 180;
      particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      particleContainer.appendChild(particle);
    }

    modal.appendChild(particleContainer);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
  }

  profilePic.addEventListener("click", (e) => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    const particles = modal.querySelectorAll(".particle");
    particles.forEach((p) => {
      p.style.animation = "none";
      void p.offsetWidth;
    });

    const trailCount = 10;
    const rect = profilePic.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement("div");
      trail.className = "trail";
      trail.style.left = `${centerX}px`;
      trail.style.top = `${centerY}px`;
      trail.style.animationDelay = `${i * 0.05}s`;
      modal.appendChild(trail);
      setTimeout(() => trail.remove(), 800);
    }

    setTimeout(() => {
      modal.classList.add("active");
      particles.forEach((p, i) => {
        p.style.animationDelay = `${i * 0.06}s`;
        p.style.animation = "particleBurst 1.8s ease-out forwards";
      });
    }, 10);
  });

  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 600);
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // AOS initialization
  AOS.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
  });

  // Fade-in animation
  const fadeElements = document.querySelectorAll(".fade-in");
  function checkFade() {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (
        elementTop < windowHeight - 100 ||
        element.classList.contains("footer")
      ) {
        element.classList.add("active");
      }
    });
  }
  setTimeout(checkFade, 300);
  window.addEventListener("scroll", checkFade);

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth",
        });
      }
    });
  });

  // Name-tag dragging and animation
  const nameTag = document.querySelector(".name-tag");
  if (nameTag) {
    function setInitialPosition() {
      nameTag.style.position = "absolute";
      nameTag.style.cursor = "grab";
      nameTag.style.userSelect = "none";
      nameTag.style.zIndex = "1000";
      nameTag.style.margin = "0";
      nameTag.style.animation =
        "3s ease-in-out 0s infinite normal none running float";

      if (window.innerWidth >= 768) {
        nameTag.style.top = "100.525px";
        nameTag.style.left = "321.387px";
      } else {
        nameTag.style.top = "105.579px";
        nameTag.style.left = "120.196px";
      }
    }

    setInitialPosition();
    window.addEventListener("resize", setInitialPosition);

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    nameTag.addEventListener("dragstart", (e) => e.preventDefault());
    nameTag.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    nameTag.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", stopDrag, { passive: false });

    function startDrag(e) {
      e.preventDefault();
      nameTag.style.animationPlayState = "paused";
      nameTag.classList.add("dragging");

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (clientX && clientY) {
        const rect = nameTag.getBoundingClientRect();
        startX = clientX;
        startY = clientY;
        initialLeft = parseFloat(nameTag.style.left) || rect.left;
        initialTop = parseFloat(nameTag.style.top) || rect.top;
        isDragging = true;
      }
    }

    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (clientX && clientY) {
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        nameTag.style.left = `${initialLeft + deltaX}px`;
        nameTag.style.top = `${initialTop + deltaY}px`;
      }
    }

    function stopDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      nameTag.classList.remove("dragging");
      nameTag.style.animationPlayState = "running";
      isDragging = false;
    }
  }

  // Emoji interaction with scroll animation
  const emojis = ["🚀", "✨", "🌈", "🎨", "💡", "🌟", "🍀", "🎉"];
  function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  function enhanceEmojiInteraction() {
    const emojiContainers = document.querySelectorAll(".emoji-container");
    emojiContainers.forEach((container) => {
      if (container.querySelector(".emoji-hover-container")) return;

      const wrapper = document.createElement("span");
      wrapper.className = "emoji-hover-container";

      const emojiSpan = document.createElement("span");
      emojiSpan.className = "emoji-hover";
      emojiSpan.textContent = getRandomEmoji();

      const sparkle = document.createElement("span");
      sparkle.className = "emoji-sparkle";
      sparkle.textContent = "✨";

      wrapper.appendChild(emojiSpan);
      wrapper.appendChild(sparkle);
      container.innerHTML = "";
      container.appendChild(wrapper);
    });
  }

  function addEmojiContainers() {
    const sectionsToAddEmojis = [
      { selector: ".name-tag", position: "beforeend" },
      { selector: ".heading-text", position: "beforeend" },
      { selector: ".contact-section h2", position: "afterbegin" },
    ];

    sectionsToAddEmojis.forEach(({ selector, position }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const emojiContainer = document.createElement("span");
        emojiContainer.className = "emoji-container";
        el.insertAdjacentElement(position, emojiContainer);
      });
    });
  }

  function triggerEmojiScrollAnimation() {
    const emojiContainers = document.querySelectorAll(".emoji-hover-container");
    emojiContainers.forEach((container) => {
      const emoji = container.querySelector(".emoji-hover");
      const sparkle = container.querySelector(".emoji-sparkle");

      emoji.classList.add("scroll-animated");
      sparkle.style.opacity = "0.7";
      sparkle.style.animation = "sparkle 0.5s infinite alternate";

      setTimeout(() => {
        emoji.classList.remove("scroll-animated");
        sparkle.style.opacity = "0";
        sparkle.style.animation = "none";
      }, 2500);
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedScroll = debounce(triggerEmojiScrollAnimation, 200);
  window.addEventListener("scroll", debouncedScroll);

  addEmojiContainers();
  enhanceEmojiInteraction();
  setTimeout(() => {
    const emojiContainers = document.querySelectorAll(".emoji-hover-container");
    emojiContainers.forEach((container) => container.classList.add("active"));
  }, 300);

  // Randomize heading text
  const phrases = [
    "Crafting robust web<br> apps with the MERN<br> stack technology.",
    "Building dynamic web<br> solutions with MERN<br> stack expertise.",
    "Developing scalable<br> apps with MongoDB,<br> Express, React, Node.",
    "Creating modern web<br> apps with the power<br> of MERN technology.",
    "Engineering full-stack<br> apps with the MERN<br> ecosystem tools.",
    "Designing web apps<br> with MERN stack for<br> top functionality.",
    "Crafting seamless UIs<br> with MERN stack for<br> robust backends.",
    "Innovating web dev<br> with MERN stack at<br> its core technology.",
    "Transforming ideas to<br> apps with MongoDB,<br> Express, React, Node.",
    "Empowering firms with<br> MERN-based web app<br> solutions quickly.",
    "Delivering high-speed<br> web apps with MERN<br> stack performance.",
    "Shaping web future<br> with MERN stack and<br> expert development.",
    "Building responsive<br> web apps with MERN<br> stack technology.",
    "Creating user-friendly<br> apps with React,<br> Node.js, MongoDB.",
    "Designing cutting-edge<br> web apps with MERN<br> stack framework.",
    "Developing next-gen<br> web apps with MERN<br> stack technology.",
    "Crafting full-stack<br> systems with MongoDB<br> and React tools.",
    "Building powerful web<br> tools with Express<br> and Node.js tech.",
    "Turning concepts into<br> MERN-based web app<br> functionality.",
    "Enhancing digital UI<br> with the MERN stack<br> for top experience.",
    "Creating scalable web<br> apps with MongoDB<br> and React frontends.",
    "Developing robust APIs<br> with MERN stack for<br> seamless UIs.",
    "Building seamless web<br> apps with MERN stack<br> components.",
    "Crafting innovative<br> web apps with MERN<br> stack toolkit.",
    "Designing intuitive<br> UIs with MERN stack<br> technology.",
    "Delivering fast web<br> apps with MERN stack<br> reliability.",
    "Engineering modern<br> web apps with MongoDB<br> and Node.js tech.",
    "Creating impactful<br> web apps with MERN<br> stack technology.",
    "Building end-to-end<br> web apps with React<br> and Express tech.",
    "Developing rich apps<br> with MERN ecosystem<br> functionality.",
    "Crafting quality web<br> apps with MERN stack<br> proficiency.",
    "Designing responsive<br> UIs with MERN stack<br> backend tools.",
    "Building secure web<br> apps with MERN stack<br> technology.",
    "Creating interactive<br> web apps with React<br> and Node.js tech.",
    "Developing efficient<br> apps with MongoDB,<br> Express, and React.",
    "Crafting bespoke web<br> apps with MERN stack<br> capabilities.",
    "Building modern apps<br> with MERN stack for<br> full-stack dev.",
    "Designing scalable<br> web apps with MERN<br> stack technology.",
    "Delivering top web<br> apps with MERN stack<br> functionality.",
    "Creating dynamic UIs<br> with MERN stack for<br> seamless APIs.",
    "Developing innovative<br> web tools with MongoDB<br> and React.",
    "Building reliable web<br> apps with Express<br> and Node.js tech.",
    "Crafting engaging web<br> apps with MERN stack<br> technology.",
    "Designing powerful<br> web apps with MERN<br> stack foundations.",
    "Delivering seamless<br> web apps with MERN<br> stack toolkit.",
    "Creating robust web<br> apps with React,<br> Node.js, MongoDB.",
    "Developing cutting-edge<br> web apps with MERN<br> stack skills.",
    "Building intuitive<br> web apps with MERN<br> stack technology.",
    "Crafting versatile<br> web apps with MongoDB<br> and React tech.",
    "Designing high-impact<br> web apps with MERN<br> stack technology.",
  ];

  const heading = document.querySelector(".heading-text");
  if (heading) {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    heading.innerHTML = phrases[randomIndex];
  }

  // Add swimming emojis after setting the random phrase
  addSwimmingEmojisInline();
});

// Define the swimming emojis function
function addSwimmingEmojisInline() {
  const swimEmojis = ["🐙", "🐠", "🐡", "🐳", "🪼", "🐬", "🦀"];
  const heading = document.querySelector(".heading-text");
  if (!heading) return;

  let textContent = heading.innerHTML.replace(/<br>/g, "\n");
  let chars = textContent.split("");

  const emojiCount =
    window.innerWidth <= 767
      ? Math.min(3, Math.floor(chars.length / 10))
      : Math.min(5, Math.floor(chars.length / 10));

  const insertionPoints = [];

  for (let i = 0; i < emojiCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * chars.length);
    } while (
      insertionPoints.includes(randomIndex) ||
      chars[randomIndex] === "\n" ||
      randomIndex === 0 ||
      randomIndex === chars.length - 1
    );
    insertionPoints.push(randomIndex);
  }

  insertionPoints.sort((a, b) => b - a);

  insertionPoints.forEach((index) => {
    const emoji = swimEmojis[Math.floor(Math.random() * swimEmojis.length)];
    const emojiSpan = `<span class="swimming-emoji-inline" style="animation-duration: ${
      3 + Math.random() * 3
    }s; animation-delay: ${Math.random() * 2}s;">${emoji}</span>`;
    chars.splice(index, 0, emojiSpan);
  });

  heading.innerHTML = chars.join("").replace(/\n/g, "<br>");
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


// Counter animation for stats
function animateCounter() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the faster
  
  counters.forEach(counter => {
      const updateCount = () => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText;
          
          // Lower inc value = slower animation
          const inc = target / speed;
          
          if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 20);
          } else {
              counter.innerText = target;
          }
      };
      
      updateCount();
  });
}

// Initialize counter animation when section is visible
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateCounter();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });
  
  // Get the stats section
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
      observer.observe(statsSection);
  }
});