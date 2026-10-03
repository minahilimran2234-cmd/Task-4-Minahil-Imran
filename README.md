# DevCon 2026 — Developer Conference Registration

A production-grade, highly interactive registration platform built for the **DecodeLabs Frontend Development Internship (Project 4: Form Design & Validation)**. 

This project demonstrates advanced form handling, custom JavaScript validation, and a unique dark technical aesthetic without relying on any external frameworks.

## 🚀 Project Overview

DevCon 2026 is a fictional developer conference registration website. The primary focus of this project is to engineer a robust, accessible, and visually stunning form validation system. It strictly follows the **Input → Process → Output (IPO)** architectural model to ensure data integrity and a seamless user experience.

## ✨ Key Features

###  Design & UX
- **Dark Technical Aesthetic:** Deep navy background with cyan/purple glowing accents, animated grid background, and floating orbs.
- **Interactive UI Elements:** Custom focus states, animated underlines, and a glowing submit button.
- **Dynamic Success State:** Smooth transition to a confirmation panel without page reload.
- **Fully Responsive:** Fluid layout using CSS Grid and Flexbox, optimized for mobile, tablet, and desktop.

### ⚙️ Technical Implementation
- **Custom JavaScript Validation:** Regex-based validation for email, phone, name, and strict password policies.
- **Real-time Feedback:** Password strength meter (Weak/Medium/Good/Strong) and visual requirements checklist.
- **Password Visibility Toggle:** Accessible show/hide interaction.
- **IPO Flow:** Clear separation of Input (User data), Process (Validation logic), and Output (Dynamic UI updates).
- **State Management:** Simple application state object to track form progress.

###  Accessibility (a11y)
- **Semantic HTML5:** Proper use of `<form>`, `<label>`, `<input>`, and `<button>`.
- **ARIA Attributes:** `aria-invalid`, `aria-describedby`, and `aria-live="polite"` for screen readers.
- **Keyboard Navigation:** Fully accessible via keyboard with visible focus states.

## ️ Technologies Used

- **HTML5** (Semantic markup, ARIA accessibility)
- **CSS3** (Custom properties, Grid, Flexbox, Animations, Gradients)
- **Vanilla JavaScript** (ES6+, DOM manipulation, Event Listeners, Regex)

## 🔄 The IPO (Input-Process-Output) Model

This project strictly implements the DecodeLabs IPO architecture:

1. **INPUT:** User interacts with the registration form and enters data.
2. **PROCESS:** On submission, `event.preventDefault()` stops the default refresh. JavaScript captures the state, runs regex-based validation on every field, and checks password strength.
3. **OUTPUT:** If invalid, dynamic error messages appear inline. If valid, the DOM dynamically replaces the form with a personalized confirmation panel containing a unique reference ID.

## 📋 Validation Rules

- **Full Name:** Required, 2-50 chars, letters only.
- **Email:** Required, valid format (user@domain.com).
- **Phone:** Required, 10-15 digits with optional country code.
- **Company & Job Title:** Required, minimum 2 characters.
- **Experience:** Required, numeric value between 0 and 50.
- **Password:** Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.
- **Confirm Password:** Must exactly match the password field.
- **Terms:** Checkbox must be checked.

##  Project Structure

├── index.html # Semantic HTML structure
├── style.css # Custom CSS with variables and animations
── script.js # Vanilla JS validation and DOM manipulation
└── README.md # Project documentation