// File: js/app.js

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Form fields
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const companyField = document.getElementById('company');
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

// Validation functions
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

function validateMessage(message) {
    return message.length >= 10 && message.length <= 1000;
}

function showFieldError(field, errorElement, message) {
    field.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideFieldError(field, errorElement) {
    field.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function clearAllErrors() {
    const errorElements = [nameError, emailError, companyError, messageError];
    const fields = [nameField, emailField, companyField, messageField];
    
    fields.forEach((field, index) => {
        hideFieldError(field, errorElements[index]);
    });
}

function validateForm() {
    const validations = [
        validateField(nameField, nameError, validateName, 'Nome deve ter entre 2 e 100 caracteres'),
        validateField(emailField, emailError, validateEmail, 'Por favor, insira um e-mail válido'),
        validateField(companyField, companyError, validateCompany, 'Nome da empresa deve ter entre 2 e 100 caracteres'),
        validateField(messageField, messageError, validateMessage, 'Mensagem deve ter entre 10 e 1000 caracteres')
    ];
    
    return validations.every(isValid => isValid);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function showSuccessMessage() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    contactForm.style.display = 'none';
    
    // Auto-hide after 5 seconds and show form again
    setTimeout(() => {
        successMessage.style.display = 'none';
        contactForm.style.display = 'flex';
        contactForm.reset();
        clearAllErrors();
    }, 5000);
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
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
nameField.addEventListener('input', () => {
    if (nameField.value.trim()) {
        validateField(nameField, nameError, validateName, 'Nome deve ter entre 2 e 100 caracteres');
    }
});

emailField.addEventListener('input', () => {
    if (emailField.value.trim()) {
        validateField(emailField, emailError, validateEmail, 'Por favor, insira um e-mail válido');
    }
});

companyField.addEventListener('input', () => {
    if (companyField.value.trim()) {
        validateField(companyField, companyError, validateCompany, 'Nome da empresa deve ter entre 2 e 100 caracteres');
    }
});

messageField.addEventListener('input', () => {
    if (messageField.value.trim()) {
        validateField(messageField, messageError, validateMessage, 'Mensagem deve ter entre 10 e 1000 caracteres');
    }
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Prepare form data
    const formData = {
        nome: nameField.value.trim(),
        email: emailField.value.trim(),
        empresa: companyField.value.trim(),
        mensagem: messageField.value.trim(),
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

// Smooth scroll and animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationFillMode = 'forwards';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.hero, .contact-section');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Form focus enhancement
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
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

// Apply debounce to input validation
const debouncedValidation = debounce((field, errorElement, validationFn, errorMessage) => {
    if (field.value.trim()) {
        validateField(field, errorElement, validationFn, errorMessage);
    }
}, 300);