/**
 * Instituto Copleston - Interacciones y Animaciones del Frontend
 */
document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. Efecto Scroll en la Barra de Navegación 
    ========================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. Animaciones de Entrada (Intersection Observer)
    ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos las nuevas tarjetas y elementos para animarlos (opcional para el futuro)
    const animatableElements = document.querySelectorAll('.premium-card, .articulo-card, .expansion-card, .expansion-banner');
    
    animatableElements.forEach((el, index) => {
        // Inicializamos estilos para la animación css (opcional)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        scrollObserver.observe(el);
    });

    // Pequeño hack para manejar la clase 'visible' añadida por el JS
    // Debemos agregar una regla CSS general rápido u observar el evento
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    /* =========================================
       3. Navegación Suave (Smooth Scrolling)
    ========================================= */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* =========================================
       4. Menú de Móvil Básico (Placeholder)
    ========================================= */
    // Para futura extensibilidad si deciden habilitar menú lateral en móviles
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Lógica para toggle class 'active' a la botonera y menú
            mobileBtn.classList.toggle('active');
            // document.querySelector('nav ul').classList.toggle('show');
            // Aquí puedes añadir más si es necesario.
        });
    }

    /* =========================================
       5. Lógica de Modales (Múltiples)
    ========================================= */
    const openModalBtns = document.querySelectorAll('.open-modal-link, #btn-open-modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    if (openModalBtns.length > 0) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target') || 'article-modal';
                const targetModal = document.getElementById(targetId);
                
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
                }
            });
        });

        // Cerrar con la X
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                overlays.forEach(m => m.classList.remove('active'));
                document.body.style.overflow = '';
            });
        });

        // Cerrar al hacer click fuera del contenido
        overlays.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
});
