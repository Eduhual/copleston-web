/**
 * Instituto Copleston - Interacciones y Animaciones del Frontend
 */
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       0. Preloader Institucional (Fade Out)
    ========================================= */
    const preloader = document.getElementById('copleston-preloader');
    if (preloader) {
        // Reducir a 0ms para carga instantánea
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => document.body.classList.add('loaded'), 50);
        }, 50);
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
        
        // Barra de Progreso Áurea
        const progressBar = document.getElementById('reading-progress-bar');
        if (progressBar) {
            const scrollTotal = document.documentElement.scrollTop || document.body.scrollTop;
            const heightTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = heightTotal ? (scrollTotal / heightTotal) * 100 : 0;
            progressBar.style.width = scrollPercent + '%';
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
        
        el.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        
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
    
    // Validar dispositivo tactil para deshabilitar animaciones pesadas en movil
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    
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

    /* =========================================
       8. Firebase Authentication Integración
    ========================================= */
    const firebaseConfig = {
        apiKey: "AIzaSyBdyyUcHbzm3fkRckVf_P6d2VD1ZdptzOI",
        authDomain: "instituto-copleston.firebaseapp.com",
        projectId: "instituto-copleston",
        storageBucket: "instituto-copleston.firebasestorage.app",
        messagingSenderId: "311746651830",
        appId: "1:311746651830:web:90327d0db03cecb55ae817"
    };

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    // Solo continuar si Firebase cargó correctamente
    if (typeof firebase !== 'undefined') {
        const auth = firebase.auth();

        const authGoogleBtn = document.getElementById('auth-google-btn');
        const authNavBtn = document.getElementById('auth-btn');
        const authModal = document.getElementById('auth-modal');

        if (authGoogleBtn) {
            authGoogleBtn.addEventListener('click', () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                auth.signInWithPopup(provider)
                    .then((result) => {
                        closeAllModals();
                    })
                    .catch(error => alert("Error Google Auth: " + error.message));
            });
        }
        
        function closeAllModals() {
            const allOverlays = document.querySelectorAll('.modal-overlay');
            allOverlays.forEach(m => m.classList.remove('active'));
            document.body.style.overflow = '';
        }

        const profileModal = document.getElementById('profile-modal');
        const profileLogoutBtn = document.getElementById('profile-logout-btn');
        const profileAvatar = document.getElementById('profile-avatar');
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');

        if (authNavBtn) {
            authNavBtn.addEventListener('click', (e) => {
                if (!auth.currentUser) {
                    e.preventDefault();
                    if(authModal) {
                        authModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        }

        if (profileLogoutBtn) {
            profileLogoutBtn.addEventListener('click', () => {
                auth.signOut().then(() => closeAllModals());
            });
        }

        const triggerWallBtn = document.getElementById('trigger-auth-wall');
        if (triggerWallBtn) { 
            triggerWallBtn.addEventListener('click', () => { 
                if (authModal) { 
                    authModal.classList.add('active'); 
                    document.body.style.overflow = 'hidden'; 
                } 
            }); 
        }

        // Estado Dinámico de Autenticación
        auth.onAuthStateChanged(user => {
            const premiumText = document.getElementById('premium-text');
            const paywallBannerTrack = document.getElementById('paywall-banner-track');
            const paywallBanner = document.getElementById('paywall-banner'); // Fallback para artículos antiguos

            if (user) {
                if (authNavBtn) {
                    let displayName = user.displayName || "Mi Cuenta";
                    let firstName = displayName.split(' ')[0];
                    
                    if (profileName) profileName.textContent = displayName;
                    if (profileEmail) profileEmail.textContent = user.email || "";

                    if (profileAvatar) {
                        if (user.photoURL) {
                            profileAvatar.src = user.photoURL;
                        } else {
                            profileAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=111111&color=C5A059&size=128`;
                        }
                    }

                    authNavBtn.textContent = firstName;
                    authNavBtn.href = './crear_perfil.html';
                    authNavBtn.style.color = 'var(--bg-main)'; 
                }

                // Desbloqueo del Muro de Cristal
                if (premiumText) {
                    premiumText.style.filter = 'blur(0px)';
                    premiumText.style.opacity = '1';
                    setTimeout(() => {
                        premiumText.classList.remove('content-locked');
                        premiumText.style = ''; // Limpiar inline styles
                    }, 800);
                }
                if (paywallBannerTrack) {
                    paywallBannerTrack.style.opacity = '0';
                    setTimeout(() => paywallBannerTrack.style.display = 'none', 800);
                } else if (paywallBanner) {
                    paywallBanner.style.opacity = '0';
                    setTimeout(() => paywallBanner.style.display = 'none', 800);
                }

            } else {
                if (authNavBtn) {
                    authNavBtn.textContent = 'Acceder';
                    authNavBtn.href = '#';
                    authNavBtn.style.color = 'var(--bg-main)';
                }

                // Activación del Muro de Cristal
                if (premiumText) premiumText.classList.add('content-locked');
                if (paywallBannerTrack) {
                    paywallBannerTrack.style.display = 'block';
                    paywallBannerTrack.style.opacity = '1';
                } else if (paywallBanner) {
                    paywallBanner.style.display = 'flex';
                    paywallBanner.style.opacity = '1';
                }
            }
        });
    }

    /* =========================================
       9. Diccionario y Motores de Interacción Social
    ========================================= */

    // Registro de Artículos del Ecosistema
    const ARTICLES_DICTIONARY = {
        "art_filosofia_1": {
            title: "El determinismo radical de Baruch Spinoza",
            date: "23 de Marzo de 2026",
            url: "./art_filosofia_1.html",
            category: "Filosofía"
        },
        "art_psicologia_1": {
            title: "Terapia Racional Emotiva Conductual (TREC)",
            date: "06 de Abril de 2026",
            url: "./art_psicologia_1.html",
            category: "Psicología"
        },
        "filosofia": {
            title: "Cámara de Filosofía",
            date: "Continuo",
            url: "./filosofia.html",
            category: "Investigación"
        },
        "psicologia": {
            title: "Cámara de Psicología",
            date: "Continuo",
            url: "./psicologia.html",
            category: "Investigación"
        },
        "academia": {
            title: "Programas de Especialización Académica",
            date: "Inscripciones Abiertas",
            url: "./academia.html",
            category: "Academia"
        },
        "revista": {
            title: "Revista Copleston - Edición Alpha",
            date: "Abril 2026",
            url: "./revista.html",
            category: "Publicación"
        }
    };

    if (typeof firebase !== 'undefined' && typeof firebase.firestore !== 'undefined') {
        const db = firebase.firestore();
        const auth = firebase.auth();

        // 1. Lógica del Botón Like en el Artículo Abierto
        const likeBtn = document.getElementById('like-btn');
        const bookmarkBtn = document.getElementById('bookmark-btn');
        const notesArea = document.getElementById('research-notes-area');
        
        // Función para sincronizar estado visual (Likes/Marcadores) al cargar
        function syncInteractionState(user, articleId) {
            if (!user || !articleId) return;

            // Sincronizar Like
            if (likeBtn) {
                db.collection('interacciones').doc(`${user.uid}_${articleId}`).get().then(doc => {
                    if (doc.exists) {
                        likeBtn.classList.add('liked');
                    } else {
                        likeBtn.classList.remove('liked');
                    }
                });
            }

            // Sincronizar Marcador
            if (bookmarkBtn) {
                db.collection('marcadores').doc(`${user.uid}_${articleId}`).get().then(doc => {
                    if (doc.exists) {
                        bookmarkBtn.classList.add('bookmarked');
                    } else {
                        bookmarkBtn.classList.remove('bookmarked');
                    }
                });
            }

            // Sincronizar Notas Privadas
            if (notesArea) {
                db.collection('notas').doc(`${user.uid}_${articleId}`).get().then(doc => {
                    if (doc.exists) {
                        notesArea.value = doc.data().text || "";
                    }
                });
            }
        }

        if (likeBtn || bookmarkBtn || notesArea) {
            const articleId = (likeBtn || bookmarkBtn || notesArea).getAttribute('data-article-id');
            
            // Escuchar cambios de autenticación para sincronizar
            auth.onAuthStateChanged(user => {
                if (user) {
                    syncInteractionState(user, articleId);
                } else {
                    if(likeBtn) likeBtn.classList.remove('liked');
                    if(bookmarkBtn) bookmarkBtn.classList.remove('bookmarked');
                    if(notesArea) notesArea.value = "";
                }
            });

            // Acción de Like
            if (likeBtn) {
                const likeCountSpan = likeBtn.querySelector('.like-count');
                db.collection('interacciones').where('articleId', '==', articleId).onSnapshot((snapshot) => {
                    if(likeCountSpan) likeCountSpan.textContent = snapshot.size;
                });

                likeBtn.addEventListener('click', () => {
                    const user = auth.currentUser;
                    if (!user) {
                        const modal = document.getElementById('auth-modal');
                        if (modal) modal.classList.add('active');
                        return;
                    }

                    const interactionRef = db.collection('interacciones').doc(`${user.uid}_${articleId}`);
                    interactionRef.get().then(doc => {
                        if (doc.exists) {
                            interactionRef.delete().then(() => likeBtn.classList.remove('liked'));
                        } else {
                            interactionRef.set({ 
                                uid: user.uid, 
                                articleId: articleId, 
                                timestamp: firebase.firestore.FieldValue.serverTimestamp() 
                            }).then(() => likeBtn.classList.add('liked'));
                        }
                    });
                });
            }

            // Acción de Bookmark
            if (bookmarkBtn) {
                bookmarkBtn.addEventListener('click', () => {
                    const user = auth.currentUser;
                    if (!user) {
                        const modal = document.getElementById('auth-modal');
                        if (modal) modal.classList.add('active');
                        return;
                    }

                    const bookmarkRef = db.collection('marcadores').doc(`${user.uid}_${articleId}`);
                    bookmarkRef.get().then(doc => {
                        if (doc.exists) {
                            bookmarkRef.delete().then(() => bookmarkBtn.classList.remove('bookmarked'));
                        } else {
                            bookmarkRef.set({ 
                                uid: user.uid, 
                                articleId: articleId, 
                                timestamp: firebase.firestore.FieldValue.serverTimestamp() 
                            }).then(() => bookmarkBtn.classList.add('bookmarked'));
                        }
                    });
                });
            }

            // Acción de Notas Privadas (Autosave)
            if (notesArea) {
                let timeout = null;
                const statusIndicator = document.getElementById('notes-status');

                notesArea.addEventListener('input', () => {
                    const user = auth.currentUser;
                    if (!user) return;

                    if (statusIndicator) statusIndicator.textContent = 'Escribiendo...';
                    
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        const text = notesArea.value;
                        db.collection('notas').doc(`${user.uid}_${articleId}`).set({
                            uid: user.uid,
                            articleId: articleId,
                            text: text,
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        }, { merge: true }).then(() => {
                            if (statusIndicator) statusIndicator.textContent = 'Guardado';
                        }).catch(() => {
                            if (statusIndicator) statusIndicator.textContent = 'Error al guardar';
                        });
                    }, 1000); // Debounce de 1 segundo
                });
            }

            // Contador de Visualizaciones
            if (articleId) {
                const articleRef = db.collection('articulos').doc(articleId);
                articleRef.set({ visitas: firebase.firestore.FieldValue.increment(1) }, { merge: true });
            }
        }

        // 3. Renderizar Dashboard (perfil.html)
        const favoritesGrid = document.getElementById('favorites-grid');
        const bookmarksGrid = document.getElementById('bookmarks-grid');
        const notesGrid = document.getElementById('notes-grid');

        if (favoritesGrid || bookmarksGrid || notesGrid) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    // Cargar Favoritos (Likes)
                    if (favoritesGrid) {
                        db.collection('interacciones').where('uid', '==', user.uid).get().then(snapshot => {
                            const emptyMsg = document.getElementById('favorites-empty-msg');
                            if (snapshot.empty) {
                                if(emptyMsg) emptyMsg.style.display = 'block';
                                return;
                            }
                            if(emptyMsg) emptyMsg.style.display = 'none';
                            
                            favoritesGrid.innerHTML = '';
                            snapshot.forEach(doc => {
                                const data = doc.data();
                                const meta = ARTICLES_DICTIONARY[data.articleId] || { title: data.articleId, url: "#", category: "Archivo" };
                                favoritesGrid.innerHTML += `
                                    <article class="articulo-card dark-glass" style="opacity:1; transform:none;">
                                        <span class="articulo-date">${meta.category}</span>
                                        <h4 class="articulo-title">${meta.title}</h4>
                                        <a href="${meta.url}" class="btn-link-gold">Revisar <span>&#8594;</span></a>
                                    </article>
                                `;
                            });
                        });
                    }

                    // Cargar Marcadores (Biblioteca)
                    if (bookmarksGrid) {
                        db.collection('marcadores').where('uid', '==', user.uid).get().then(snapshot => {
                            const emptyMsg = document.getElementById('bookmarks-empty-msg');
                            if (snapshot.empty) {
                                if(emptyMsg) emptyMsg.style.display = 'block';
                                return;
                            }
                            if(emptyMsg) emptyMsg.style.display = 'none';

                            bookmarksGrid.innerHTML = '';
                            snapshot.forEach(doc => {
                                const data = doc.data();
                                const meta = ARTICLES_DICTIONARY[data.articleId] || { title: data.articleId, url: "#", category: "Archivo" };
                                bookmarksGrid.innerHTML += `
                                    <div class="bookmark-item dark-glass" style="padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(197, 160, 89, 0.1);">
                                        <span style="font-size: 0.7rem; color: var(--gold); text-transform: uppercase;">${meta.category}</span>
                                        <h4 style="font-family: var(--font-serif); margin: 0.5rem 0; color: #fff;">${meta.title}</h4>
                                        <a href="${meta.url}" class="btn-link-gold" style="font-size: 0.8rem;">Continuar lectura <span>&#8594;</span></a>
                                    </div>
                                `;
                            });
                        });
                    }

                    // Cargar Cuaderno de Notas
                    if (notesGrid) {
                        db.collection('notas').where('uid', '==', user.uid).get().then(snapshot => {
                            const emptyMsg = document.getElementById('notes-empty-msg');
                            if (snapshot.empty) {
                                if(emptyMsg) emptyMsg.style.display = 'block';
                                return;
                            }
                            if(emptyMsg) emptyMsg.style.display = 'none';

                            notesGrid.innerHTML = '';
                            snapshot.forEach(doc => {
                                const data = doc.data();
                                const meta = ARTICLES_DICTIONARY[data.articleId] || { title: data.articleId, url: "#" };
                                notesGrid.innerHTML += `
                                    <div class="note-card dark-glass" style="padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--gold);">
                                        <h4 style="font-family: var(--font-serif); color: var(--gold); margin-bottom: 0.8rem;">Investigación: ${meta.title}</h4>
                                        <p style="font-size: 0.9rem; color: #ccc; line-height: 1.6; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${data.text}</p>
                                        <div style="margin-top: 1rem; text-align: right;">
                                            <a href="${meta.url}" class="btn-link-gold" style="font-size: 0.75rem;">Ir a la fuente <span>&#8594;</span></a>
                                        </div>
                                    </div>
                                `;
                            });
                        });
                    }
                }
            });
        }
    }
});


