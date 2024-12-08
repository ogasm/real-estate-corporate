import '../styles/style.scss'
import { FormValidation } from './form-validation';

// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.header__menu-button');
  const nav = document.querySelector('.header__nav');
  
  menuButton?.addEventListener('click', () => {
    menuButton.classList.toggle('is-active');
    nav?.classList.toggle('is-open');
  });
});

if (document.querySelector('.contact-form')) {
  new FormValidation('.contact-form');
}