// Navegação Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    const toggleMobileMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    hamburger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMobileMenu();
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Animação do hamburger
    hamburger.addEventListener('click', function() {
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
});

// Filtro da Galeria
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Scroll suave para navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Animação de números nas estatísticas
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 30);
        });
    };

    // Intersection Observer para animar quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

// Efeito parallax suave no hero
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const mascot = document.querySelector('.mascot');
    
    if (hero && mascot) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                mascot.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});

// Highlight da navegação baseado na seção atual
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNavigation = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavigation);

    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        const toggleBackToTop = () => {
            if (window.scrollY > window.innerHeight / 1.5) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Exibir botão quando a página carregar e já estiver scrolled
        toggleBackToTop();
    }
});

// Animação de entrada para elementos
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards e elementos que devem animar
    const animatedElements = document.querySelectorAll('.card, .gallery-item, .stat-item, .supporter-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Preloader simples (opcional)
document.addEventListener('DOMContentLoaded', function() {
    // Simular carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Adicionar classe CSS para elementos carregados
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body.loaded {
        overflow: auto;
    }
`;
document.head.appendChild(style);


// Carregar cursos do JSON
const CURSOS_JSON_URL = 'https://comunidadejavaribeiraopreto.github.io/site/dados.json';

async function carregarCursos() {
    try {
        const response = await fetch(CURSOS_JSON_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar cursos');
        }
        const data = await response.json();
        return data.cursos || [];
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        return [];
    }
}

function renderizarCursos(cursos, containerId, limite = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cursosParaExibir = limite ? cursos.slice(0, limite) : cursos;
    
    if (cursosParaExibir.length === 0) {
        container.innerHTML = '<p class="loading-text">Nenhum curso disponível no momento.</p>';
        return;
    }

    container.innerHTML = cursosParaExibir.map(curso => `
        <div class="course-card">
            <img src="${curso.imagem}" alt="${curso.titulo}" class="course-image" onerror="this.src='https://via.placeholder.com/280x200/007bff/ffffff?text=Curso+Java'">
            <div class="course-content">
                <h3 class="course-title">${curso.titulo}</h3>
                <p class="course-description">${curso.descricao}</p>
                <a href="${curso.link}" target="_blank" rel="noopener" class="course-link">Acessar Curso</a>
            </div>
        </div>
    `).join('');
}

// Carregar cursos na página principal
document.addEventListener('DOMContentLoaded', async function() {
    const previewContainer = document.getElementById('courses-preview');
    if (previewContainer) {
        const cursos = await carregarCursos();
        renderizarCursos(cursos, 'courses-preview', 3);
    }
});

// Lógica do Dark Mode
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        // Obter estado inicial a partir do body que já recebeu a classe no head (ou localstorage diretamente)
        const isDark = document.body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isNowDark = document.body.classList.contains('dark-mode');
            
            // Atualizar o ícone de forma suave
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.textContent = isNowDark ? '☀️' : '🌙';
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Salvar no localStorage
            localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
        });
    }
});
