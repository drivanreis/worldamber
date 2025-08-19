// Import company data
import { empresasAmber } from '../src/data/dados.ts';

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const empresasGrid = document.getElementById('empresasGrid');

// Form fields
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const companyField = document.getElementById('company');
const phoneField = document.getElementById('phone');
const subjectField = document.getElementById('subject');
const messageField = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const companyError = document.getElementById('companyError');
const messageError = document.getElementById('messageError');

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypnKhyDkfviyOfaFabXh8FEhgeff3FpvFZ7LfJh4L7NsUYhc8U85MCxQnwrqOX5UJPMQ/exec';

// Validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeCompanyCards();
    initializeAnimations();
    initializeSmoothScroll();
    initializeNavigation();
});

// Company Cards Generation
function initializeCompanyCards() {
    if (!empresasGrid) return;
    
    empresasGrid.innerHTML = '';
    
    empresasAmber.forEach((empresa, index) => {
        const card = createCompanyCard(empresa, index);
        empresasGrid.appendChild(card);
    });
}

function createCompanyCard(empresa, index) {
    const card = document.createElement('div');
    card.className = 'empresa-card';
    card.style.setProperty('--card-color', empresa.cor);
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Define icon based on segment
    const getIconBySegment = (segmento) => {
        const icons = {
            'Vidraçaria': 'fas fa-eye',
            'Marmoraria': 'fas fa-cube',
            'Design de interiores': 'fas fa-palette',
            'Alimentação saudável': 'fas fa-leaf'
        };
        return icons[segmento] || 'fas fa-building';
    };
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-icon" style="background-color: ${empresa.cor}">
                <i class="${getIconBySegment(empresa.segmento)}"></i>
            </div>
            <div class="card-info">
                <h3>${empresa.nome}</h3>
                <span class="segmento">${empresa.segmento}</span>
            </div>
        </div>
        <p class="card-description">${empresa.resumo}</p>
        <a href="${empresa.link}" class="card-link" target="_blank" rel="noopener noreferrer">
            Visitar site <i class="fas fa-external-link-alt"></i>
        </a>
    `;
    
    return card;
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationFillMode = 'forwards';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.empresa-card, .pagamento-card, .feature-item, .info-card');
    animatedElements.forEach(el => observer.observe(el));
}

function initializeSmoothScroll() {
    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function validateField(field, errorElement, validationFn, errorMessage) {
    const value = field.value.trim();
    const isValid = validationFn(value);
    
    if (!isValid) {
        showFieldError(field, errorElement, errorMessage);
        return false;
    } else {
        hideFieldError(field, errorElement);
        return true;
    }
}

function validateName(name) {
    return name.length >= 2 && name.length <= 100;
}

function validateEmail(email) {
    return emailPattern.test(email);
}

function validateCompany(company) {
    return company.length >= 2 && company.length <= 100;
}

function validatePhone(phone) {
    return phone === '' || phonePattern.test(phone.replace(/\s+/g, ''));
}

function validateMessage(message) {
    return message.length >= 10 && message.length <= 1000;
}

function showFieldError(field, errorElement, message) {
    field.parentElement.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideFieldError(field, errorElement) {
    field.parentElement.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    const errorElements = [nameError, emailError, companyError, messageError];
    const fields = [nameField, emailField, companyField, messageField];
    
    fields.forEach((field, index) => {
        if (field && errorElements[index]) {
            hideFieldError(field, errorElements[index]);
        }
    });
}

function validateForm() {
    const validations = [
        validateField(nameField, nameError, validateName, 'Nome deve ter entre 2 e 100 caracteres'),
        validateField(emailField, emailError, validateEmail, 'Por favor, insira um e-mail válido'),
        validateField(companyField, companyError, validateCompany, 'Nome da empresa deve ter entre 2 e 100 caracteres'),
        validateField(messageField, messageError, validateMessage, 'Mensagem deve ter entre 10 e 1000 caracteres')
    ];
    
    // Validate phone if provided
    if (phoneField && phoneField.value.trim()) {
        const phoneValid = validatePhone(phoneField.value.trim());
        if (!phoneValid) {
            showFieldError(phoneField, null, 'Formato de telefone inválido');
            validations.push(false);
        }
    }
    
    return validations.every(isValid => isValid);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
    }
}

function showSuccessMessage() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    contactForm.style.display = 'none';
    
    // Auto-hide after 8 seconds and show form again
    setTimeout(() => {
        successMessage.style.display = 'none';
        contactForm.style.display = 'flex';
        contactForm.reset();
        clearAllErrors();
    }, 8000);
}

function showErrorMessage() {
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

async function submitForm(formData) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            const result = await response.text();
            console.log('Formulário enviado com sucesso:', result);
            showSuccessMessage();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showErrorMessage();
    }
}

// Real-time validation
if (nameField) {
    nameField.addEventListener('input', () => {
        if (nameField.value.trim() && nameError) {
            validateField(nameField, nameError, validateName, 'Nome deve ter entre 2 e 100 caracteres');
        }
    });
}

if (emailField) {
    emailField.addEventListener('input', () => {
        if (emailField.value.trim() && emailError) {
            validateField(emailField, emailError, validateEmail, 'Por favor, insira um e-mail válido');
        }
    });
}

if (companyField) {
    companyField.addEventListener('input', () => {
        if (companyField.value.trim() && companyError) {
            validateField(companyField, companyError, validateCompany, 'Nome da empresa deve ter entre 2 e 100 caracteres');
        }
    });
}

if (messageField) {
    messageField.addEventListener('input', () => {
        if (messageField.value.trim() && messageError) {
            validateField(messageField, messageError, validateMessage, 'Mensagem deve ter entre 10 e 1000 caracteres');
        }
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Prepare form data
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            company: companyField.value.trim(),
            phone: phoneField ? phoneField.value.trim() : '',
            subject: subjectField ? subjectField.value : '',
            message: messageField.value.trim(),
            timestamp: new Date().toLocaleString('pt-BR')
        };
        
        // Set loading state
        setLoadingState(true);
        
        try {
            await submitForm(formData);
        } finally {
            setLoadingState(false);
        }
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const form = e.target.closest('form');
        if (form && e.target.tagName === 'INPUT') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Performance optimization: Debounce validation
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

// Connection diagram animation
function animateConnectionDiagram() {
    const lines = document.querySelectorAll('.connection-line');
    const nodes = document.querySelectorAll('.satellite-node');
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = `rotate(${index * 90}deg) scaleX(1)`;
        }, index * 200);
    });
    
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.transform = 'scale(1)';
            node.style.opacity = '1';
        }, 800 + index * 100);
    });
}

// Initialize connection diagram animation when in view
const diagramObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateConnectionDiagram();
            diagramObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const connectionDiagram = document.querySelector('.connection-diagram');
if (connectionDiagram) {
    diagramObserver.observe(connectionDiagram);
}

// Export for use in other scripts if needed
window.WorldAmberApp = {
    empresasAmber,
    initializeCompanyCards,
    validateForm,
    submitForm
};