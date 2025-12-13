document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const openProject = (link) => {
    if (link && link !== '#') window.open(link, '_blank');
  };
  const projectPreviewModal = document.getElementById('projectPreviewModal');
  const projectPreviewImage = document.getElementById('projectPreviewImage');
  const projectPreviewTitle = document.getElementById('projectPreviewTitle');
  const projectPreviewFooter = document.getElementById('projectPreviewFooter');
  const showProjectPreview = (img, title, link, linkFront = '', linkBack = '') => {
    if (projectPreviewImage && projectPreviewTitle && projectPreviewFooter) {
      projectPreviewImage.src = img;
      projectPreviewImage.alt = title;
      projectPreviewTitle.textContent = title;
      
      projectPreviewFooter.innerHTML = '';
      
      if (linkFront && linkBack) {
        const btnFront = document.createElement('button');
        btnFront.className = 'btn btn-light rounded-1';
        btnFront.textContent = 'Ver Front';
        btnFront.addEventListener('click', () => {
          const modal = bootstrap.Modal.getInstance(projectPreviewModal);
          if (modal) modal.hide();
          openProject(linkFront);
        });
        
        const btnBack = document.createElement('button');
        btnBack.className = 'btn btn-light rounded-1';
        btnBack.textContent = 'Ver Back';
        btnBack.addEventListener('click', () => {
          const modal = bootstrap.Modal.getInstance(projectPreviewModal);
          if (modal) modal.hide();
          openProject(linkBack);
        });
        
        projectPreviewFooter.appendChild(btnFront);
        projectPreviewFooter.appendChild(btnBack);
      } else {
        const btnSingle = document.createElement('button');
        btnSingle.className = 'btn btn-light rounded-1';
        btnSingle.textContent = 'Ver Repositorio';
        btnSingle.addEventListener('click', () => {
          const modal = bootstrap.Modal.getInstance(projectPreviewModal);
          if (modal) modal.hide();
          openProject(link);
        });
        projectPreviewFooter.appendChild(btnSingle);
      }
      
      const modal = new bootstrap.Modal(projectPreviewModal);
      modal.show();
    }
  };
  const handleFeaturedProjectClick = (e, card) => {
    const img = card.dataset.img;
    const title = card.dataset.title;
    const link = card.dataset.link;
    const linkFront = card.dataset.linkFront;
    const linkBack = card.dataset.linkBack;
    const hasMultipleRepos = card.dataset.hasMultipleRepos === 'true';
    
    if (img && title) {
      e.preventDefault();
      e.stopPropagation();
      if (hasMultipleRepos && linkFront && linkBack) {
        showProjectPreview(img, title, '', linkFront, linkBack);
      } else if (link) {
        showProjectPreview(img, title, link);
      }
    }
  };
  
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
    { pos: 1, title: 'Vitalis', img: 'imgs/Vitalis.jpg', linkFront: 'https://github.com/ThomasGiardina/VitalisFront', linkBack: 'https://github.com/ThomasGiardina/Vitalis-Back', tech: 'React Native / Java Spring Boot', desc: 'App móvil para gestión de turnos médicos hospitalarios. Desarrollada con React Native, Expo, Redux y Android Studio para el frontend, con backend en Java Spring Boot.', hasMultipleRepos: true },
    { pos: 2, title: 'Proyecto 2', img: 'imgs/Ejercicio06.jpg', link: '#', tech: 'Próximamente', desc: 'Proyecto en desarrollo.' },
    { pos: 3, title: 'Proyecto 3', img: 'imgs/Ejercicio07.jpg', link: '#', tech: 'Próximamente', desc: 'Proyecto en desarrollo.' },
    { pos: 4, title: 'Proyecto 4', img: 'imgs/Ejercicio08.jpg', link: '#', tech: 'Próximamente', desc: 'Proyecto en desarrollo.' },
    { pos: 5, title: 'Proyecto 5', img: 'imgs/Ejercicio09.jpg', link: '#', tech: 'Próximamente', desc: 'Proyecto en desarrollo.' },
    { pos: 6, title: 'Proyecto 6', img: 'imgs/Ejercicio10.jpg', link: '#', tech: 'Próximamente', desc: 'Proyecto en desarrollo.' }
  ];
  
  const featuredProjectsGrid = document.getElementById('featuredProjectsGrid');
  if (featuredProjectsGrid) {
    const featuredProjects = allProjects.filter(p => p.pos >= 1 && p.pos <= 6).sort((a, b) => a.pos - b.pos);
    featuredProjects.forEach(project => {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4';
      
      if (project.hasMultipleRepos) {
        col.innerHTML = `<article class="card h-100 shadow-lg border-0 project-card bg-accent rounded-3 overflow-hidden position-relative" data-title="${project.title}" data-img="${project.img}" data-link-front="${project.linkFront}" data-link-back="${project.linkBack}" data-has-multiple-repos="true"><img src="${project.img}" class="card-img-top object-fit-cover" style="height: 180px;" alt="${project.title}"><div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"><span class="text-light fw-semibold">Ver proyecto</span></div><div class="card-body"><h5 class="card-title text-light font-display">${project.title}</h5><p class="card-text text-secondary small">${project.desc}</p></div><div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"><small class="text-secondary">${project.tech}</small></div></article>`;
      } else {
        col.innerHTML = `<article class="card h-100 shadow-lg border-0 project-card bg-accent rounded-3 overflow-hidden position-relative" data-title="${project.title}" data-img="${project.img}" data-link="${project.link}"><img src="${project.img}" class="card-img-top object-fit-cover" style="height: 180px;" alt="${project.title}"><div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"><span class="text-light fw-semibold">Ver proyecto</span></div><div class="card-body"><h5 class="card-title text-light font-display">${project.title}</h5><p class="card-text text-secondary small">${project.desc}</p></div><div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"><small class="text-secondary">${project.tech}</small></div></article>`;
      }
      
      featuredProjectsGrid.appendChild(col);
    });
    
    featuredProjectsGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => handleFeaturedProjectClick(e, card));
    });
  }
  
  const allProjectsGrid = document.getElementById('allProjectsGrid');
  if (allProjectsGrid) {
    const sortedProjects = [...allProjects].sort((a, b) => a.pos - b.pos);
    sortedProjects.forEach(project => {
      const li = document.createElement('li');
      li.className = 'col-12 col-md-6 col-lg-4';
      if (project.hasMultipleRepos) {
        li.innerHTML = `<article class="card h-100 shadow-lg border-0 project-card bg-accent rounded-3 overflow-hidden position-relative" data-title="${project.title}" data-img="${project.img}" data-link-front="${project.linkFront}" data-link-back="${project.linkBack}" data-has-multiple-repos="true"><img src="${project.img}" class="card-img-top object-fit-cover" style="height: 180px;" alt="${project.title}"><div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"><span class="text-light fw-semibold">Ver proyecto</span></div><div class="card-body"><h5 class="card-title text-on-dark font-display">${project.title}</h5><p class="card-text text-dim small">${project.desc}</p></div><div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"><small class="text-dim">${project.tech}</small></div></article>`;
      } else {
        li.innerHTML = `<article class="card h-100 shadow-lg border-0 project-card bg-accent rounded-3 overflow-hidden position-relative" data-title="${project.title}" data-img="${project.img}" data-link="${project.link}"><img src="${project.img}" class="card-img-top object-fit-cover" style="height: 180px;" alt="${project.title}"><div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"><span class="text-light fw-semibold">Ver proyecto</span></div><div class="card-body"><h5 class="card-title text-on-dark font-display">${project.title}</h5><p class="card-text text-dim small">${project.desc}</p></div><div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"><small class="text-dim">${project.tech}</small></div></article>`;
      }
      allProjectsGrid.appendChild(li);
    });
    
    allProjectsGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => handleFeaturedProjectClick(e, card));
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
    if (typeof jQuery !== typeof undefined && $.fn.owlCarousel && $('.about-carousel').length) {
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
  if (typeof jQuery !== typeof undefined && typeof $.fn !== typeof undefined && typeof $.fn.owlCarousel !== typeof undefined) {
    initAboutCarousel();
  } else {
    window.addEventListener('load', function() {
      setTimeout(function() {
        if (typeof jQuery !== typeof undefined && $.fn.owlCarousel) {
          initAboutCarousel();
        }
      }, 500);
    });
  }
});
