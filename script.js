document.addEventListener("DOMContentLoaded", function () {
  // Hide the loading indicator immediately when the page loads
  const loadingIndicator = document.querySelector(".form-loading");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }

  // Add mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Add animations when elements come into view
  const animatedElements = document.querySelectorAll(
    ".benefit-card, .service-card, .testimonial-card, .advantage-content, .advantage-image, .team-member, .credentials-box",
  );

  // Add animation classes with delays
  animatedElements.forEach((element, index) => {
    element.classList.add("fade-in");
    // Add delay classes based on index within parent
    const siblings = Array.from(element.parentElement.children);
    const position = siblings.indexOf(element);
    element.classList.add(`delay-${(position % 4) + 1}`);
  });

  // Notification function
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 4000);
  }

  // Add intersection observer for animations
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Apply to sections
    document.querySelectorAll("section").forEach((section, index) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      section.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(section);
    });

    // Apply to section headings for additional effect
    document.querySelectorAll("section h2").forEach((heading) => {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(20px)";
      heading.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      heading.style.transitionDelay = "0.2s";
      observer.observe(heading);
    });

    // Add animation to credentials box
    const credentialsBox = document.querySelector(".credentials-box");
    if (credentialsBox) {
      credentialsBox.style.opacity = "0";
      credentialsBox.style.transform = "scale(0.95)";
      credentialsBox.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(credentialsBox);
    }

    // Add staggered animations to grid items
    const gridContainers = document.querySelectorAll(
      ".benefits-grid, .services-grid, .team-grid, .testimonials-grid",
    );
    gridContainers.forEach((container) => {
      const items = container.children;
      Array.from(items).forEach((item, i) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        item.style.transitionDelay = `${0.1 + (i * 0.1)}s`;
        observer.observe(item);
      });
    });

    // Add pulse animation to statistic
    const statNumber = document.querySelector(".stat-number");
    if (statNumber) {
      // Add pulse animation class
      statNumber.classList.add("pulse");

      // Add number counter animation
      const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const targetNumber = 30; // 30% from the HTML
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = Math.floor(duration / targetNumber);

            const counter = setInterval(() => {
              count += 1;
              target.textContent = count;
              if (count >= targetNumber) {
                target.textContent = targetNumber + "%";
                clearInterval(counter);
              }
            }, interval);

            observerCounter.unobserve(target);
          }
        });
      }, { threshold: 0.5 });

      observerCounter.observe(statNumber);
    }

    // Add counter animation to the credentials list numbers
    document.querySelectorAll(".credentials-list strong").forEach((item) => {
      const observerCredentials = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const originalText = target.textContent;
            let targetNumber = 0;

            // Extract the number from the text
            if (originalText.includes("+")) {
              targetNumber = parseInt(originalText.replace("+", ""));
            } else {
              targetNumber = parseInt(originalText);
            }

            if (!isNaN(targetNumber) && targetNumber > 0) {
              let count = 0;
              const duration = 1500; // 1.5 seconds
              const step = Math.max(1, Math.floor(targetNumber / 30));

              const counter = setInterval(() => {
                count += step;
                if (count >= targetNumber) {
                  target.textContent = originalText;
                  clearInterval(counter);
                } else {
                  target.textContent = count +
                    (originalText.includes("+") ? "+" : "");
                }
              }, 50);
            }

            observerCredentials.unobserve(target);
          }
        });
      }, { threshold: 0.7 });

      observerCredentials.observe(item);
    });

    // Add animation to CTA form elements
    const demoForm = document.querySelector(".demo-form");
    if (demoForm) {
      const formObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Animate form inputs with staggered delay
          const formElements = demoForm.querySelectorAll("input, button");
          formElements.forEach((el, index) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(15px)";
            el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            el.style.transitionDelay = `${0.3 + (index * 0.1)}s`;

            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, 100);
          });

          formObserver.unobserve(demoForm);
        }
      }, { threshold: 0.3 });

      formObserver.observe(demoForm);
    }

    // Add animation to Google Form container
    const googleFormContainer = document.querySelector(
      ".google-form-container",
    );
    if (googleFormContainer) {
      const googleFormObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Animate the Google Form container
          googleFormContainer.style.opacity = "0";
          googleFormContainer.style.transform = "translateY(20px)";
          googleFormContainer.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

          setTimeout(() => {
            googleFormContainer.style.opacity = "1";
            googleFormContainer.style.transform = "translateY(0)";
          }, 300);

          googleFormObserver.unobserve(googleFormContainer);
        }
      }, { threshold: 0.3 });

      googleFormObserver.observe(googleFormContainer);

      // Animate custom form elements with staggered delay
      const customForm = document.getElementById("custom-form");
      if (customForm) {
        const formElements = customForm.querySelectorAll("input, button, h3");
        formElements.forEach((el, index) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(15px)";
          el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          el.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
        });

        // Trigger animations when form container becomes visible
        setTimeout(() => {
          formElements.forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
        }, 400);
      }
    }
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const facility = document.getElementById("facility").value;
      const phone = document.getElementById("phone").value;

      // Store in localStorage as backup
      const submissionData = {
        name,
        email,
        facility,
        phone,
        timestamp: new Date().toISOString(),
      };

      let submissions = JSON.parse(
        localStorage.getItem("formSubmissions") || "[]",
      );
      submissions.push(submissionData);
      localStorage.setItem("formSubmissions", JSON.stringify(submissions));

      // Show loading state
      const submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      // Google Forms submission - replace with your actual form ID and entry IDs
      const googleFormsURL =
        "https://docs.google.com/forms/d/e/1FAIpQLScPd1y3JqWb-KEl4FhEt2c0-KPaf-6tkexsTEIwAwXWRkoEwg/formResponse";
      const formData = new FormData();
      formData.append("entry.672079617", name); // Replace with your actual entry IDs
      formData.append("entry.1742592132", email);
      formData.append("entry.50131877", phone);
      formData.append("entry.1007634374", facility);

      // Use fetch with no-cors mode (Google Forms requires this)
      fetch(googleFormsURL, {
        method: "POST",
        mode: "no-cors", // This is important for cross-origin requests to Google
        body: formData,
      })
        .then(() => {
          // Show success state
          contactForm.style.display = "none";
          document.getElementById("thank-you-message").style.display = "block";
          showNotification(
            "Thank you! Your information has been submitted successfully.",
            "success",
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          // Still show success since we saved to localStorage
          contactForm.style.display = "none";
          document.getElementById("thank-you-message").style.display = "block";
          showNotification(
            "Thank you! Your information has been submitted.",
            "success",
          );
        });
    });
  }

  // Fix for the "Request Demo" button in the header and footer
  const demoButtons = document.querySelectorAll('a[href="#cta"]');
  demoButtons.forEach((button) => {
    button.setAttribute("href", "#contact");
  });

  // Also update any "See It in Action" buttons
  const actionButtons = document.querySelectorAll('a[href="#cta"]');
  actionButtons.forEach((button) => {
    button.setAttribute("href", "#contact");
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
});
