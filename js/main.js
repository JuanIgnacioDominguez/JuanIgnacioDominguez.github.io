document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const i18n = {
    es: {
      'nav.home': 'Inicio', 'nav.projects': 'Proyectos', 'nav.skills': 'Skills', 'nav.about': 'Sobre mí', 'nav.contact': 'Contactar',
      'hero.badge': 'Disponible para nuevos desafíos',
      'hero.desc': 'Desarrollo soluciones digitales completas que combinan <strong>rendimiento</strong>, <strong>diseño moderno</strong> y <strong>código limpio</strong>. Especializado en ecosistemas <strong>React</strong> y <strong>Spring Boot</strong> con enfoque en experiencias de usuario excepcionales.',
      'hero.cta1': 'Explorar Proyectos', 'hero.cta2': 'Descargar CV',
      'projects.title': 'Proyectos Destacados', 'projects.desc': 'Soluciones reales que demuestran mi stack tecnológico en acción', 'projects.viewAll': 'Ver todos los proyectos', 'projects.all': 'Todos los Proyectos',
      'skills.title': 'Stack Tecnológico', 'skills.desc': 'Herramientas y tecnologías que domino para construir productos de calidad',
      'about.title': 'Más allá del código', 'about.desc': 'La disciplina, creatividad y trabajo en equipo que aplico en cada proyecto',
      'contact.title': 'Trabajemos juntos', 'contact.desc': '¿Tenés una idea o proyecto en mente? Me encantaría escucharte y explorar cómo puedo ayudarte a hacerlo realidad.',
      'contact.name': 'Tu nombre', 'contact.email': 'Tu email', 'contact.subject': 'Asunto', 'contact.message': 'Contame sobre tu proyecto', 'contact.send': 'Enviar Mensaje',
      'footer.rights': 'Todos los derechos reservados.',
      'titles': ['Desarrollador Full-Stack', 'Ingeniero de Software', 'Creador de Experiencias', 'Tech Enthusiast']
    },
    en: {
      'nav.home': 'Home', 'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.about': 'About', 'nav.contact': 'Contact',
      'hero.badge': 'Open to new challenges',
      'hero.desc': 'I build complete digital solutions that combine <strong>performance</strong>, <strong>modern design</strong> and <strong>clean code</strong>. Specialized in <strong>React</strong> and <strong>Spring Boot</strong> ecosystems with a focus on exceptional user experiences.',
      'hero.cta1': 'Explore Projects', 'hero.cta2': 'Download CV',
      'projects.title': 'Featured Projects', 'projects.desc': 'Real solutions showcasing my tech stack in action', 'projects.viewAll': 'View all projects', 'projects.all': 'All Projects',
      'skills.title': 'Tech Stack', 'skills.desc': 'Tools and technologies I master to build quality products',
      'about.title': 'Beyond the code', 'about.desc': 'The discipline, creativity and teamwork I apply to every project',
      'contact.title': "Let's work together", 'contact.desc': 'Have an idea or project in mind? I would love to hear from you and explore how I can help make it happen.',
      'contact.name': 'Your name', 'contact.email': 'Your email', 'contact.subject': 'Subject', 'contact.message': 'Tell me about your project', 'contact.send': 'Send Message',
      'footer.rights': 'All rights reserved.',
      'titles': ['Full-Stack Developer', 'Software Engineer', 'Experience Creator', 'Tech Enthusiast']
    }
  };

  let currentLang = localStorage.getItem('lang') || 'es';
  let currentTheme = localStorage.getItem('theme') || 'dark';

  const projects = [
    { id: 1, title: 'Vitalis', images: ['imgs/Proyectos/Vitalis/Vitalis1.jpeg', 'imgs/Proyectos/Vitalis/Vitalis2.jpeg', 'imgs/Proyectos/Vitalis/Vitalis3.jpeg', 'imgs/Proyectos/Vitalis/Vitalis4.jpeg'], tech: ['React Native', 'Expo', 'Redux', 'Spring Boot', 'MySQL'], desc: { es: 'Aplicación móvil para gestión de turnos médicos hospitalarios con interfaz intuitiva.', en: 'Mobile app for hospital appointment management with intuitive interface.' }, linkFront: 'https://github.com/ThomasGiardina/VitalisFront', linkBack: 'https://github.com/ThomasGiardina/Vitalis-Back', linkedin: '' },
    { id: 2, title: 'Coal', images: ['imgs/Proyectos/Coal/coal1.png', 'imgs/Proyectos/Coal/coal2.png', 'imgs/Proyectos/Coal/coal3.png', 'imgs/Proyectos/Coal/coal4.png'], tech: ['React', 'Vite', 'Redux', 'TailwindCSS', 'Spring Boot', 'JWT'], desc: { es: 'E-commerce de videojuegos inspirado en Steam con diseño moderno y autenticación JWT.', en: 'Video game e-commerce inspired by Steam with modern design and JWT auth.' }, linkFront: 'https://github.com/ThomasGiardina/CoalFrontt', linkBack: 'https://github.com/ThomasGiardina/Coal', linkedin: '' },
    { id: 3, title: 'Proyecto 3', images: ['imgs/Placeholder.png'], tech: ['Próximamente'], desc: { es: 'Nuevo proyecto en desarrollo. Más detalles próximamente.', en: 'New project in development. More details coming soon.' }, link: '#', linkedin: '' },
    { id: 4, title: 'Proyecto 4', images: ['imgs/Placeholder.png'], tech: ['Próximamente'], desc: { es: 'Nuevo proyecto en desarrollo. Más detalles próximamente.', en: 'New project in development. More details coming soon.' }, link: '#', linkedin: '' },
    { id: 5, title: 'Proyecto 5', images: ['imgs/Placeholder.png'], tech: ['Próximamente'], desc: { es: 'Nuevo proyecto en desarrollo. Más detalles próximamente.', en: 'New project in development. More details coming soon.' }, link: '#', linkedin: '' },
    { id: 6, title: 'Proyecto 6', images: ['imgs/Placeholder.png'], tech: ['Próximamente'], desc: { es: 'Nuevo proyecto en desarrollo. Más detalles próximamente.', en: 'New project in development. More details coming soon.' }, link: '#', linkedin: '' }
  ];

  const skills = [
    // Frontend
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'React Native', icon: 'devicon-react-original' },
    { name: 'Redux', icon: 'devicon-redux-original' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'HTML5', icon: 'devicon-html5-plain' },
    { name: 'CSS3', icon: 'devicon-css3-plain' },
    { name: 'TailwindCSS', icon: 'devicon-tailwindcss-original' },
    // Backend
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Spring Boot', icon: 'devicon-spring-original' },
    { name: 'MySQL', icon: 'devicon-mysql-original' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    // Tools & DevOps
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'Vite', icon: 'devicon-vitejs-plain' },
    { name: 'Postman', icon: 'devicon-postman-plain' },
    { name: 'IntelliJ', icon: 'devicon-intellij-plain' },
    { name: 'VS Code', icon: 'devicon-vscode-plain' },
    { name: 'Figma', icon: 'devicon-figma-plain' },
    { name: 'NPM', icon: 'devicon-npm-original-wordmark' }
  ];

  const aboutSlides = [
    { img: 'imgs/Carrousel/Carrousel1.jpg', title: { es: 'Muay Thai', en: 'Muay Thai' }, desc: { es: 'Una de mis grandes pasiones. Me enseña disciplina y perseverancia cada día.', en: 'One of my great passions. It teaches me discipline and perseverance every day.' } },
    { img: 'imgs/Carrousel/Carrousel2.JPG', title: { es: 'Amigos', en: 'Friends' }, desc: { es: 'Valoro profundamente las relaciones y el tiempo que paso con mis amigos.', en: 'I deeply value relationships and the time I spend with my friends.' } },
    { img: 'imgs/Carrousel/Carrousel3.jpg', title: { es: 'Mascotas', en: 'Pets' }, desc: { es: 'Tengo un perro y un gato que me acompañan y alegran cada día.', en: 'I have a dog and a cat that accompany and brighten my day.' } },
    { img: 'imgs/Carrousel/Carrousel4.webp', title: { es: 'Universidad', en: 'University' }, desc: { es: 'Cursando 5° año de Ingeniería en Informática en UADE.', en: '5th year of Computer Engineering at UADE.' } }
  ];

  function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[currentLang][key]) el.innerHTML = i18n[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
    });
    document.getElementById('langIcon').textContent = currentLang === 'es' ? 'EN' : 'ES';
    renderProjects();
    initAboutCarousel();
  }

  function applyTheme() {
    document.documentElement.dataset.theme = currentTheme;
    document.getElementById('themeIcon').className = currentTheme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  }

  document.getElementById('langToggle').onclick = () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', currentLang);
    applyLanguage();
  };

  document.getElementById('themeToggle').onclick = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
  };

  function createProjectCard(p) {
    const card = document.createElement('article');
    card.className = 'project-card';
    const desc = typeof p.desc === 'object' ? p.desc[currentLang] : p.desc;
    const techTags = p.tech.slice(0, 4).map(t => `<span>${t}</span>`).join('');
    card.innerHTML = `
      <div class="project-card-img"><img src="${p.images[0]}" alt="${p.title}" loading="lazy"></div>
      <div class="project-card-body">
        <h3>${p.title}</h3>
        <p>${desc}</p>
        <div class="project-card-tech">${techTags}</div>
      </div>
    `;
    card.onclick = () => openProjectModal(p);
    return card;
  }

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const allGrid = document.getElementById('allProjectsGrid');
    grid.innerHTML = '';
    allGrid.innerHTML = '';
    projects.slice(0, 6).forEach(p => grid.appendChild(createProjectCard(p)));
    projects.forEach(p => allGrid.appendChild(createProjectCard(p)));
  }

  const skillsGrid = document.getElementById('skillsGrid');
  skills.forEach(s => {
    const skill = document.createElement('div');
    skill.className = 'skill';
    skill.innerHTML = `<i class="${s.icon}"></i><span>${s.name}</span>`;
    skillsGrid.appendChild(skill);
  });

  function initAboutCarousel() {
    const $carousel = $('#aboutCarousel');
    if ($carousel.hasClass('owl-loaded')) $carousel.trigger('destroy.owl.carousel').removeClass('owl-loaded');
    $carousel.empty();
    aboutSlides.forEach(s => {
      const title = typeof s.title === 'object' ? s.title[currentLang] : s.title;
      const desc = typeof s.desc === 'object' ? s.desc[currentLang] : s.desc;
      $carousel.append(`<div class="carousel-slide"><img src="${s.img}" alt="${title}"><div class="carousel-caption"><h5>${title}</h5><p>${desc}</p></div></div>`);
    });
    $carousel.owlCarousel({
      items: 1, loop: true, nav: true, dots: true,
      navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
      autoplay: true, autoplayTimeout: 6000, autoplayHoverPause: true,
      smartSpeed: 800, mouseDrag: true, touchDrag: true,
      animateOut: 'fadeOut', animateIn: 'fadeIn'
    });
  }

  let currentProject = null;
  let modalCarouselInit = false;

  function openProjectModal(p) {
    currentProject = p;
    const modal = document.getElementById('projectModal');
    const desc = typeof p.desc === 'object' ? p.desc[currentLang] : p.desc;

    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalName').textContent = p.title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalTech').innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    const $carousel = $('#modalCarousel');
    if ($carousel.hasClass('owl-loaded')) $carousel.trigger('destroy.owl.carousel').removeClass('owl-loaded');
    $carousel.empty();
    p.images.forEach(img => {
      $carousel.append(`<div class="carousel-slide"><img src="${img}" alt="${p.title}"></div>`);
    });

    const links = document.getElementById('modalLinks');
    links.innerHTML = '';
    if (p.linkFront) links.innerHTML += `<a href="${p.linkFront}" target="_blank" rel="noopener" class="btn btn-primary"><i class="bi bi-github"></i><span>Frontend</span></a>`;
    if (p.linkBack) links.innerHTML += `<a href="${p.linkBack}" target="_blank" rel="noopener" class="btn btn-outline"><i class="bi bi-github"></i><span>Backend</span></a>`;
    else if (p.link && p.link !== '#') links.innerHTML += `<a href="${p.link}" target="_blank" rel="noopener" class="btn btn-primary"><i class="bi bi-github"></i><span>GitHub</span></a>`;
    links.innerHTML += `<a href="${p.linkedin || '#'}" class="btn btn-linkedin${!p.linkedin ? ' disabled' : ''}" ${p.linkedin ? 'target="_blank" rel="noopener"' : ''}><i class="bi bi-linkedin"></i><span>LinkedIn</span></a>`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      $carousel.owlCarousel({
        items: 1, loop: p.images.length > 1, nav: p.images.length > 1, dots: p.images.length > 1,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        smartSpeed: 600, mouseDrag: true, touchDrag: true,
        animateOut: 'fadeOut', animateIn: 'fadeIn'
      });
    }, 100);
  }

  function closeModal(m) {
    if (m.id === 'projectModal') {
      const $carousel = $('#modalCarousel');
      if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel').removeClass('owl-loaded owl-hidden');
        $carousel.find('.owl-stage-outer').children().unwrap();
        $carousel.empty();
      }
    }
    m.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modalClose').onclick = () => closeModal(document.getElementById('projectModal'));
  document.getElementById('closeAllProjects').onclick = () => closeModal(document.getElementById('allProjectsModal'));
  document.getElementById('projectModal').onclick = e => { if (e.target.classList.contains('modal')) closeModal(e.target); };
  document.getElementById('allProjectsModal').onclick = e => { if (e.target.classList.contains('modal')) closeModal(e.target); };
  document.getElementById('showAllProjects').onclick = () => {
    document.getElementById('allProjectsModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  document.getElementById('contactForm').onsubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    alert(currentLang === 'es' ? `¡Gracias ${name}! Tu mensaje ha sido enviado.` : `Thank you ${name}! Your message has been sent.`);
    e.target.reset();
  };

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.onclick = () => navLinks.classList.toggle('open');
  navLinks.querySelectorAll('a').forEach(a => a.onclick = () => navLinks.classList.remove('open'));

  window.onscroll = () => document.body.classList.toggle('scrolled', window.scrollY > 60);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('aos-animate'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  let titleIndex = 0, charIndex = 0, isDeleting = false;
  const typingEl = document.getElementById('typingText');

  function typeEffect() {
    const titles = i18n[currentLang].titles;
    const current = titles[titleIndex];
    typingEl.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;
    let delay = isDeleting ? 35 : 70;
    if (!isDeleting && charIndex === current.length) { delay = 2800; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; delay = 500; }
    setTimeout(typeEffect, delay);
  }
  setTimeout(typeEffect, 1200);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
  });

  applyTheme();
  applyLanguage();
});
