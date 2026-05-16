'use strict';

function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const linkMap = {};
  navLinks.forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (id) linkMap[id] = link;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = linkMap[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(sec => observer.observe(sec));
}

function initHamburger() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Toggle navigation');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';

  nav.insertBefore(btn, navLinks);

  btn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollTopButton() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top-btn';
  btn.title = 'Back to top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);

  const THRESHOLD = 300;

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initSmoothScroll() {
  const NAV_HEIGHT = 70;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const navLinks = document.querySelector('.nav-links');
    const btn = document.querySelector('.nav-hamburger');
    if (navLinks?.classList.contains('open')) {
      navLinks.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
      btn?.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
  initHamburger();
  initScrollTopButton();
  initSmoothScroll();
  initKeyboard();
  console.log('%c HTML & CSS Fundamentals loaded ✓', 'color:#000000; font-family:monospace; font-size:12px;');
});
