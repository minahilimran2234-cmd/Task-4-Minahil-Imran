'use strict';

const AppState = { bookingStatus: 'idle' };

const Patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s-]{10,15}$/,
    company: /^[a-zA-Z0-9\s&.,'-]{2,100}$/,
    jobTitle: /^[a-zA-Z\s]{2,50}$/,
    password: { length: /.{8,}/, uppercase: /[A-Z]/, lowercase: /[a-z]/, number: /[0-9]/, special: /[!@#$%^&*(),.?":{}|<>]/ }
};

const $ = (id) => document.getElementById(id);
const form = $('registrationForm');
const successSection = $('successSection');
const passwordInput = $('password');
const toggleBtn = document.querySelector('.toggle-password');
const ipoSteps = document.querySelectorAll('.ipo-step');

toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

function updateIPOStep(step) {
    ipoSteps.forEach((s, index) => s.classList.toggle('active', index < step));
}

function showError(fieldId, message) {
    const input = $(fieldId);
    const errorEl = $(`${fieldId}-error`);
    if (input) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldId) {
    const input = $(fieldId);
    const errorEl = $(`${fieldId}-error`);
    if (input) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    }
    if (errorEl) errorEl.textContent = '';
}

const Validators = {
    fullName(value) {
        if (!value.trim()) return 'Please enter your full name.';
        if (!Patterns.name.test(value)) return 'Name must contain only letters.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
    },
    email(value) {
        if (!value.trim()) return 'Please enter your email address.';
        if (!Patterns.email.test(value)) return 'Enter a valid email address.';
        return '';
    },
    phone(value) {
        if (!value.trim()) return 'Please enter your phone number.';
        if (!Patterns.phone.test(value)) return 'Please enter a valid phone number.';
        return '';
    },
    company(value) {
        if (!value.trim()) return 'Please enter your company name.';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters.';
        return '';
    },
    jobTitle(value) {
        if (!value.trim()) return 'Please enter your job title.';
        if (!Patterns.jobTitle.test(value)) return 'Job title must contain only letters.';
        if (value.trim().length < 2) return 'Job title must be at least 2 characters.';
        return '';
    },
    experience(value) {
        const num = parseInt(value);
        if (!value) return 'Please enter your years of experience.';
        if (isNaN(num) || num < 0) return 'Please enter a valid number.';
        if (num > 50) return 'Experience cannot exceed 50 years.';
        return '';
    },
    password(value) {
        if (!value) return 'Password is required.';
        if (!Patterns.password.length.test(value)) return 'Minimum 8 characters required.';
        if (!Patterns.password.uppercase.test(value)) return 'Add an uppercase letter.';
        if (!Patterns.password.lowercase.test(value)) return 'Add a lowercase letter.';
        if (!Patterns.password.number.test(value)) return 'Add a number.';
        if (!Patterns.password.special.test(value)) return 'Add a special character.';
        return '';
    },
    confirmPassword(value, password) {
        if (!value) return 'Please confirm your password.';
        if (value !== password) return 'Passwords do not match.';
        return '';
    },
    terms(checked) { if (!checked) return 'Please accept the terms and conditions.'; return ''; }
};

function validateField(fieldId, value, extraValue = null) {
    let error = '';
    switch (fieldId) {
        case 'fullName': error = Validators.fullName(value); break;
        case 'email': error = Validators.email(value); break;
        case 'phone': error = Validators.phone(value); break;
        case 'company': error = Validators.company(value); break;
        case 'jobTitle': error = Validators.jobTitle(value); break;
        case 'experience': error = Validators.experience(value); break;
        case 'password': error = Validators.password(value); break;
        case 'confirmPassword': error = Validators.confirmPassword(value, extraValue); break;
        case 'terms': error = Validators.terms(value); break;
    }
    if (error) { showError(fieldId, error); return false; }
    else { clearFieldError(fieldId); return true; }
}

function checkPasswordStrength(password) {
    const reqs = {
        length: Patterns.password.length.test(password),
        uppercase: Patterns.password.uppercase.test(password),
        lowercase: Patterns.password.lowercase.test(password),
        number: Patterns.password.number.test(password),
        special: Patterns.password.special.test(password)
    };
    Object.keys(reqs).forEach(key => {
        const item = document.querySelector(`[data-req="${key}"]`);
        if (item) {
            item.classList.toggle('met', reqs[key]);
            item.querySelector('.req-icon').textContent = reqs[key] ? '✓' : '○';
        }
    });
    const metCount = Object.values(reqs).filter(Boolean).length;
    const fill = $('strengthFill');
    const label = $('strengthLabel');
    fill.style.width = `${(metCount / 5) * 100}%`;
    if (metCount <= 2) { fill.style.background = 'var(--accent-error)'; label.textContent = 'WEAK'; label.style.color = 'var(--accent-error)'; }
    else if (metCount <= 3) { fill.style.background = 'var(--accent-warning)'; label.textContent = 'MEDIUM'; label.style.color = 'var(--accent-warning)'; }
    else if (metCount <= 4) { fill.style.background = 'var(--accent-primary)'; label.textContent = 'GOOD'; label.style.color = 'var(--accent-primary)'; }
    else { fill.style.background = 'var(--accent-success)'; label.textContent = 'STRONG'; label.style.color = 'var(--accent-success)'; }
}

['fullName', 'email', 'phone', 'company', 'jobTitle', 'experience', 'password', 'confirmPassword'].forEach(id => {
    $(id).addEventListener('blur', (e) => {
        const val = id === 'confirmPassword' ? [e.target.value, passwordInput.value] : [e.target.value];
        validateField(id, ...val);
    });
    $(id).addEventListener('input', () => {
        if ($(id).classList.contains('error')) {
            const val = id === 'confirmPassword' ? [$(id).value, passwordInput.value] : [$(id).value];
            validateField(id, ...val);
        }
        if (id === 'password') checkPasswordStrength($(id).value);
    });
});

$('terms').addEventListener('change', (e) => validateField('terms', e.target.checked));

function generateRefId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'DEVCON-';
    for (let i = 0; i < 6; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateIPOStep(2);

    const formData = {
        fullName: $('fullName').value.trim(),
        email: $('email').value.trim(),
        phone: $('phone').value.trim(),
        company: $('company').value.trim(),
        jobTitle: $('jobTitle').value.trim(),
        experience: $('experience').value,
        password: passwordInput.value,
        confirmPassword: $('confirmPassword').value,
        terms: $('terms').checked
    };

    const validations = [
        validateField('fullName', formData.fullName),
        validateField('email', formData.email),
        validateField('phone', formData.phone),
        validateField('company', formData.company),
        validateField('jobTitle', formData.jobTitle),
        validateField('experience', formData.experience),
        validateField('password', formData.password),
        validateField('confirmPassword', formData.confirmPassword, formData.password),
        validateField('terms', formData.terms)
    ];

    if (validations.every(Boolean)) {
        AppState.bookingStatus = 'success';
        const refId = generateRefId();
        $('successName').textContent = formData.fullName;
        $('successRef').textContent = refId;
        console.log('Registration Payload:', { ...formData, refId });
        $('formSection').hidden = true;
        $('successSection').hidden = false;
        updateIPOStep(3);
        $('successSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        const firstError = document.querySelector('.form-input.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

$('resetBtn').addEventListener('click', () => {
    form.reset();
    $('formSection').hidden = false;
    $('successSection').hidden = true;
    AppState.bookingStatus = 'idle';
    
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
    });
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.req-item').forEach(item => {
        item.classList.remove('met');
        item.querySelector('.req-icon').textContent = '○';
    });
    $('strengthFill').style.width = '0';
    $('strengthLabel').textContent = 'STRENGTH';
    updateIPOStep(1);
    $('formSection').scrollIntoView({ behavior: 'smooth' });
});

updateIPOStep(1);