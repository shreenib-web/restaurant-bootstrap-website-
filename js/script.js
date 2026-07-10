// Set current year in footer sections
const currentYear = new Date().getFullYear();
document.querySelectorAll('#currentYear, #currentYearMenu, #currentYearAbout, #currentYearReservation, #currentYearContact').forEach(el => {
  if (el) el.textContent = currentYear;
});

// Smooth scrolling for internal links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal sections on scroll
const revealElements = document.querySelectorAll('.reveal, .food-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

// Animate skill bars when visible
const skillBars = document.querySelectorAll('.skill-meter span');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Reservation form validation and submit
const reservationForm = document.getElementById('reservationForm');
const reservationAlert = document.getElementById('reservationAlert');
if (reservationForm) {
  reservationForm.addEventListener('submit', event => {
    const inputs = reservationForm.querySelectorAll('input, select');
    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('is-invalid');
        valid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!valid) {
      event.preventDefault();
    }
  });
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('is-invalid');
        valid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!valid) {
      event.preventDefault();
    }
  });
}

// Show success message after form submission redirect
const successMessage = document.getElementById('formSuccessMessage');
const urlParams = new URLSearchParams(window.location.search);
if (successMessage && urlParams.get('success') === '1') {
  successMessage.classList.remove('d-none');
}

// Food card interactions
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = 'Added';
    button.classList.remove('btn-outline-warning');
    button.classList.add('btn-warning', 'text-dark');
    setTimeout(() => {
      button.textContent = 'Order';
      button.classList.add('btn-outline-warning');
      button.classList.remove('btn-warning', 'text-dark');
    }, 1600);
  });
});

// Mobile menu close on link click
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  });
});
