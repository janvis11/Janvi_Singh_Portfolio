// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.getElementById("navbar")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })

  // Update active navigation link on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })

    // Add background to navbar on scroll
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(15, 15, 15, 0.98)"
    } else {
      navbar.style.background = "rgba(15, 15, 15, 0.95)"
    }
  })

  // Contact form handling
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const message = formData.get("message")

    if (!firstName || !lastName || !email || !message) {
      alert("Please fill in all fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      alert(`Thank you, ${firstName}! Your message has been sent successfully. I'll get back to you soon.`)
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  })

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe timeline items and other elements
  const timelineItems = document.querySelectorAll(".timeline-item")
  const skillCategories = document.querySelectorAll(".skill-category")
  const projectCards = document.querySelectorAll(".project-card")
  ;[...timelineItems, ...skillCategories, ...projectCards].forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(item)
  })

  // Enhanced profile image hover effect
  const profileImg = document.getElementById("profile-img")
  if (profileImg) {
    profileImg.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)"
      this.style.filter = "brightness(1.1)"
    })

    profileImg.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.filter = "brightness(1)"
    })
  }

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title .gradient-text")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  // Projects filtering functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards2 = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      const filterValue = button.getAttribute("data-filter")

      projectCards2.forEach((card) => {
        const cardCategory = card.getAttribute("data-category")

        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hidden")
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "scale(1)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "scale(0.8)"
          setTimeout(() => {
            card.classList.add("hidden")
          }, 300)
        }
      })
    })
  })

  // Resume functionality with Janvi's information
  

  // Close modal when clicking outside
  document.getElementById("resume-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      window.closeResume()
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("resume-modal")
      if (modal.classList.contains("active")) {
        window.closeResume()
      }
    }
  })
})

function openResume() {
  window.location.href = 'resume/Janvi_Singh_Resume.pdf';
}



// Utility function for smooth scrolling
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 70
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.style.cssText = `
    position: fixed;
    top: 70px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ffffff, #9ca3af);
    z-index: 1000;
    transition: width 0.1s ease;
`
document.body.appendChild(scrollProgress)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})

// Add particle effect to hero section
function createParticles() {
  const hero = document.querySelector(".hero")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `
    hero.appendChild(particle)
  }
}

// Initialize particles after DOM load
setTimeout(createParticles, 1000)
// Contact form handling
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!firstName || !lastName || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(`Thank you, ${firstName}! Your message has been sent successfully.`);
        contactForm.reset();
      } else {
        alert("An error occurred. Please try again later.");
      }
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    })
    .catch((err) => {
      console.error(err);
      alert("An error occurred. Please try again.");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});
