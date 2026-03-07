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
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Al añadir la clase, dejamos de observar para mejorar rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos las tarjetas de pilares para la animación en cascada
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    pillarCards.forEach((card, index) => {
        // En lugar de añadir la clase inmediatamente cuando es visible,
        // interceptamos con observer y el CSS se encarga del retraso sutil
        // aplicando un pequeño delay inline según su índice.
        card.style.transitionDelay = `${index * 0.15}s`;
        scrollObserver.observe(card);
    });

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

});
