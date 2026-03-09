/**
 * Instituto Copleston - Interacciones y Animaciones del Frontend
 */
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       0. Preloader Institucional (Fade Out)
    ========================================= */
    const preloader = document.getElementById('copleston-preloader');
    if (preloader) {
        // Asegurarnos de que la página se vea después de 1.8 segundos o cuando cargue por completo
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Iniciar animaciones de reveal un poco después de que se quite el preloader
            setTimeout(() => document.body.classList.add('loaded'), 500);
        }, 1800);
    }

    /* =========================================
       0.5. Custom Cursor (Elite PC UX)
    ========================================= */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    // Solo activamos cursor custom si no estamos en dispositivo táctil (basado en hover)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    
    if (cursor && follower && !isTouchDevice) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        // Animar el follower con un ligero retraso (easing)
        setInterval(function() {
            posX += (mouseX - posX) / 6;
            posY += (mouseY - posY) / 6;
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
        }, 16);

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // El punto central se mueve instantáneamente
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Efecto Hover en elementos interactivos
        const interactives = document.querySelectorAll('a, button, input, textarea, select, .premium-card, .articulo-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }
    
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

        // Lógica para Botón Volver Arriba
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // Acción de Clic para Volver Arriba
    const backToTopBtn = document.getElementById('back-to-top');
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =========================================
       2. Revelación Dinámica (Fade-Up / Reveal)
    ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos textos y elementos para animarlos suavemente
    const revealElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .section-title, .premium-card, .articulo-card, .expansion-card, .expansion-banner, .manifiesto-standalone p, .contact-info, .contact-form-container'
    );
    
    revealElements.forEach((el, index) => {
        // Inicializamos estilos para la animación css (fade-up sofisticado)
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        
        // Retrasos escalonados basados en si están en grillas (para que no salgan todos a la vez)
        let delay = 0;
        if(el.classList.contains('premium-card') || el.classList.contains('articulo-card')) {
             // Pequeño hack para retrasar hermanos
             let siblingIndex = Array.from(el.parentNode.children).indexOf(el);
             delay = siblingIndex * 0.15;
        }
        
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        
        scrollObserver.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    /* =========================================
       2.5. Tilt 3D Magnético (Interacción Elite)
    ========================================= */
    const tiltCards = document.querySelectorAll('.premium-card, .articulo-card');
    
    if(!isTouchDevice) {
        tiltCards.forEach(card => {
            // Establecer perspectiva en el padre físico
            card.style.perspective = '1000px';
            card.style.transformStyle = 'preserve-3d';
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element

                // Calcular rotación basada en el centro (-1 al 1 rango, multiplicado por magnitud)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Rotación máxima (10 grados)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                // Aplicar brillo sutil en los bordes segun movimiento
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Efecto de brillo metálico dinámico
                if(!card.querySelector('.glare-vr')) {
                     const glare = document.createElement('div');
                     glare.className = 'glare-vr';
                     glare.style.position = 'absolute';
                     glare.style.top = '0'; glare.style.left = '0';
                     glare.style.width = '100%'; glare.style.height = '100%';
                     glare.style.pointerEvents = 'none';
                     glare.style.transition = 'opacity 0.2s';
                     glare.style.opacity = '0';
                     glare.style.zIndex = '5';
                     card.appendChild(glare);
                }
                
                const glareEl = card.querySelector('.glare-vr');
                if(glareEl) {
                    glareEl.style.opacity = '1';
                    glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(197, 160, 89, 0.15) 0%, transparent 60%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s ease-out';
                const glareEl = card.querySelector('.glare-vr');
                if(glareEl) {
                    glareEl.style.opacity = '0';
                }
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; // Quitar transición suave durante el hover para sensación magnética directa
            });
        });
    }

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
       4. Menú de Móvil Interactivo
    ========================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Bloquear scroll de fondo cuando menú abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al presionar un link interno
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
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
