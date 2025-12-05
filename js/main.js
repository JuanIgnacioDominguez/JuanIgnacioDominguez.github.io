document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const openProject = (link) => {
    if (link && link !== '#') window.open(link, '_blank');
  };
  const projectPreviewModal = document.getElementById('projectPreviewModal');
  const projectPreviewImage = document.getElementById('projectPreviewImage');
  const projectPreviewTitle = document.getElementById('projectPreviewTitle');
  const projectPreviewOpenBtn = document.getElementById('projectPreviewOpenBtn');
  let currentProjectLink = '';
  const showProjectPreview = (img, title, link) => {
    if (projectPreviewImage && projectPreviewTitle && projectPreviewOpenBtn) {
      projectPreviewImage.src = img;
      projectPreviewImage.alt = title;
      projectPreviewTitle.textContent = title;
      currentProjectLink = link;
      const modal = new bootstrap.Modal(projectPreviewModal);
      modal.show();
    }
  };
  if (projectPreviewOpenBtn) {
    projectPreviewOpenBtn.addEventListener('click', () => {
      if (currentProjectLink) {
        const modal = bootstrap.Modal.getInstance(projectPreviewModal);
        if (modal) modal.hide();
        openProject(currentProjectLink);
      }
    });
  }
  const handleFeaturedProjectClick = (e, card) => {
    const img = card.dataset.img;
    const title = card.dataset.title;
    const link = card.dataset.link || card.querySelector('a')?.href;
    if (img && title && link) {
      e.preventDefault();
      e.stopPropagation();
      showProjectPreview(img, title, link);
    }
  };
  document.querySelectorAll('.project-card:not(#allProjectsGrid .project-card)').forEach(card => {
    card.addEventListener('click', (e) => handleFeaturedProjectClick(e, card));
  });
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name')?.value || '';
      const message = contactForm.querySelector('#message')?.value || '';
      alert((name ? name + ', ' : '') + 'mensaje recibido. Gracias!\n\nResumen: ' + (message ? message.substring(0,120) : '(sin mensaje)'));
      contactForm.reset();
    });
  }
  const allProjects = [
    { title: 'Ejercicio 01 - Introducción a HTML', img: 'imgs/Ejercicio01.jpg', link: 'Ejercicios/Ejercicio01/Ejercicios/01.html', tech: 'HTML / CSS', desc: 'Estructura básica en HTML y primeros elementos semánticos.' },
    { title: 'Ejercicio 02 - Estructura semántica HTML5', img: 'imgs/Ejercicio02.jpg', link: 'Ejercicios/Ejercicio02/01.html', tech: 'HTML / CSS', desc: 'Maquetado semántico con secciones, encabezados y navegación.' },
    { title: 'Ejercicio 03 - Comenzando con CSS', img: 'imgs/Ejercicio03.jpg', link: 'Ejercicios/Ejercicio03/index.html', tech: 'HTML / CSS', desc: 'Aplicación de estilos para replicar la maqueta de referencia.' },
    { title: 'Ejercicio 04 - Propiedades de cajas', img: 'imgs/Ejercicio04.jpg', link: 'Ejercicios/Ejercicio04/index.html', tech: 'HTML / CSS', desc: 'Exploración de box model: márgenes, paddings, bordes y layouts.' },
    { title: 'Ejercicio 05 - Maquetado adaptable', img: 'imgs/Ejercicio05.jpg', link: 'Ejercicios/Ejercicio05/index.html', tech: 'HTML / CSS', desc: 'Ajustes responsive con CSS Media para distintos breakpoints.' },
    { title: 'Ejercicio 06 - Primeros pasos con Bootstrap 5', img: 'imgs/Ejercicio06.jpg', link: 'Ejercicios/Ejercicio06/Ejercicio4.html', tech: 'Bootstrap 5', desc: 'Prácticas iniciales con componentes; el último punto suma CSS por breakpoint.' },
    { title: 'Ejercicio 07 - Componentes con Bootstrap 1', img: 'imgs/Ejercicio07.jpg', link: 'Ejercicios/Ejercicio07/index.html', tech: 'Bootstrap 5', desc: 'Maquetado íntegro con Bootstrap 5 complementado por CSS propio.' },
    { title: 'Ejercicio 08 - Componentes Bootstrap 2', img: 'imgs/Ejercicio08.jpg', link: 'Ejercicios/Ejercicio08/index.html', tech: 'Bootstrap 5', desc: 'Landing responsive realizada exclusivamente con Bootstrap 5.' },
    { title: 'Ejercicio 09 - jQuery: Manipulación del DOM', img: 'imgs/Ejercicio09.jpg', link: 'Ejercicios/Ejercicio09/index.html', tech: 'jQuery / DOM', desc: 'Selección y manipulación del DOM para igualar el modelo sobre basketball.' },
    { title: 'Ejercicio 10 - Plugins JavaScript/jQuery', img: 'imgs/Ejercicio10.jpg', link: 'Ejercicios/Ejercicio10/index.html', tech: 'jQuery / Plugins', desc: 'Landing promocional integrando distintos plugins de jQuery.' },
    { title: 'Primer Parcial', img: 'imgs/PrimerParcial.jpg', link: 'Ejercicios/PrimerParcial/index.html', tech: 'Portfolio', desc: 'Mini portfolio como contenedor de los ejercicios realizados.' }
  ];
  const allProjectsGrid = document.getElementById('allProjectsGrid');
  if (allProjectsGrid) {
    allProjects.forEach(project => {
      const li = document.createElement('li');
      li.className = 'col-12 col-md-6 col-lg-4';
      li.innerHTML = `<article class="card h-100 shadow-lg border-0 project-card bg-accent rounded-3 overflow-hidden position-relative" data-title="${project.title}" data-img="${project.img}" data-link="${project.link}"><img src="${project.img}" class="card-img-top object-fit-cover" style="height: 180px;" alt="${project.title}" onerror="this.src='imgs/Ejercicio05.jpg'"><div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"><span class="text-light fw-semibold open-project-overlay">Ver proyecto →</span></div><div class="card-body"><h5 class="card-title text-on-dark font-display">${project.title}</h5><p class="card-text text-dim small">${project.desc}</p></div><div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"><small class="text-dim">${project.tech}</small><a href="${project.link}" class="text-on-dark text-decoration-none open-project">Ver más →</a></div></article>`;
      allProjectsGrid.appendChild(li);
    });
    const closeModalAndOpen = (link) => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('allProjectsModal'));
      if (modal) modal.hide();
      openProject(link);
    };
    allProjectsGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => closeModalAndOpen(card.dataset.link));
    });
  }
  const header = document.querySelector('header');
  const body = document.body;
  const navLinks = document.querySelectorAll('[data-section]');
  const sections = ['hero', 'proyectos', 'habilidades', 'mas-sobre-mi', 'contacto'];
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    const collapseLinks = navbarCollapse.querySelectorAll('.nav-link');
    collapseLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && window.innerWidth < 992) {
          bsCollapse.hide();
        }
      });
    });
  }
  const updateActiveNav = () => {
    const scrollPos = window.pageYOffset + 150;
    sections.forEach(section => {
      const sectionEl = document.getElementById(section);
      if (sectionEl) {
        const { offsetTop, offsetHeight } = sectionEl;
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`[data-section="${section}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      }
    });
  };
  const handleScroll = () => {
    body.classList.toggle('scrolled', window.pageYOffset > 100);
    updateActiveNav();
  };
  if (header) {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }
  const hero = document.getElementById('hero');
  if (hero) {
    const heroImg = hero.querySelector('img');
    const heroH1 = hero.querySelector('h1');
    const heroH2 = hero.querySelector('h2');
    const heroP = hero.querySelector('.lead');
    const heroBtns = hero.querySelector('.d-flex');
    const seq = [heroH1, heroH2, heroP, heroBtns, heroImg].filter(Boolean);
    seq.forEach((el, i) => {
      el.classList.add('hero-animate');
      if (i === 1) el.classList.add('hero-delay-1');
      if (i === 2) el.classList.add('hero-delay-2');
      if (i === 3) el.classList.add('hero-delay-3');
      if (i === 4) el.classList.add('hero-delay-4');
    });
  }
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('section .container > *').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
  const createStars = (container) => {
    if (!container) return;
    const count = 50;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = Math.random() > 0.5 ? 'star small' : 'star medium';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  };
  document.querySelectorAll('.stars-background').forEach(createStars);
  function initAboutCarousel() {
    if (typeof jQuery !== 'undefined' && $.fn.owlCarousel && $('.about-carousel').length) {
      $('.about-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        navText: ['‹', '›'],
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          992: { items: 1 }
        },
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 800
      });
    }
  }
  if (typeof jQuery !== 'undefined' && typeof $.fn !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
    initAboutCarousel();
  } else {
    window.addEventListener('load', function() {
      setTimeout(function() {
        if (typeof jQuery !== 'undefined' && $.fn.owlCarousel) {
          initAboutCarousel();
        }
      }, 500);
    });
  }
});
