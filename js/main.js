// File: js/main.js

// Suaviza rolagem ao clicar nos links do menu
const links = document.querySelectorAll('nav a[href^="#"]');

for (const link of links) {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Alternar ícones de seta nos detalhes do FAQ (opcional)
const faqs = document.querySelectorAll('details');

faqs.forEach((faq) => {
  faq.addEventListener('toggle', () => {
    faqs.forEach((el) => {
      if (el !== faq) el.removeAttribute('open');
    });
  });
});
