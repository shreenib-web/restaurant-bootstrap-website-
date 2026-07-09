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

// Reservation form validation and success alert
const reservationForm = document.getElementById('reservationForm');
const reservationAlert = document.getElementById('reservationAlert');
if (reservationForm) {
  reservationForm.addEventListener('submit', event => {
    event.preventDefault();
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

    if (valid) {
      reservationAlert.classList.remove('d-none');
      reservationForm.reset();
      setTimeout(() => reservationAlert.classList.add('d-none'), 5000);
    }
  });
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
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

    if (valid) {
      const button = contactForm.querySelector('button[type="submit"]');
      button.textContent = 'Message Sent';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Submit Message';
        button.disabled = false;
      }, 4000);
      contactForm.reset();
    }
  });
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
