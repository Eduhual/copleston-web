import os
import re

dir_path = r"d:\COPLESTON_INSTITUTE-20260411T141528Z-3-001\COPLESTON_INSTITUTE"

nav_replacement = """        <nav>
            <ul>
                <li><a href="./index.html#vanguardia">Inicio</a></li>
                <li><a href="./manifiesto.html">MANIFIESTO</a></li>
                <li><a href="./nosotros.html">NOSOTROS</a></li>
                <li><a href="#" class="open-modal-link" data-target="article-modal">Artículos</a></li>
                <li><a href="./contacto.html">Contacto</a></li>
                <li><a href="#" id="auth-btn" class="btn-auth-solid">Acceder</a></li>
            </ul>
        </nav>"""

auth_modal_str = """    <!-- Modal de Autenticación Premium -->
    <div id="auth-modal" class="modal-overlay">
        <div class="modal-content light-glass" style="max-width: 420px; padding: 3.5rem 3rem;">
            <button class="modal-close" style="color: #333;" aria-label="Cerrar">&times;</button>
            <div class="auth-header text-center">
                <img src="./IMG/logo/logo.png" alt="Copleston Shield" style="height: 50px; margin-bottom: 1rem; filter: invert(1);">
                <h2 style="font-family: var(--font-sans); color: #111; font-size: 1.4rem; font-weight: 500; margin-bottom: 0.3rem;">Acceso Copleston</h2>
                <p style="color: #777; font-size: 0.85rem; margin-bottom: 2rem;">Autenticación Confidencial</p>
            </div>
            
            <form id="auth-form" class="minimal-form-light" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="email" id="auth-email" placeholder="Correo Electrónico" class="luxury-input-light" required>
                <input type="password" id="auth-password" placeholder="Contraseña" class="luxury-input-light" required>
                <button type="submit" id="auth-submit-btn" class="btn-dark-solid" style="margin-top: 0.5rem;">Iniciar Sesión</button>
            </form>

            <div class="auth-divider"><span>O</span></div>

            <button id="auth-google-btn" class="btn-google-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" style="margin-right: 10px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continuar con Google
            </button>

            <p class="auth-switch text-center" style="margin-top: 2rem; font-size: 0.8rem; color: #666;">
                ¿No tienes acceso? <a href="#" id="auth-toggle-mode" style="color: #111; font-weight: 500; text-decoration: none;">Solicitar Ingreso</a>
            </p>
        </div>
    </div>"""

profile_modal_str = """    <!-- Modal de Mi Perfil Premium -->
    <div id="profile-modal" class="modal-overlay">
        <div class="modal-content light-glass" style="max-width: 380px; padding: 3rem 2rem; border-radius: 20px;">
            <button class="modal-close" style="color: #333; top: 1rem; right: 1.2rem;" aria-label="Cerrar">&times;</button>
            <div class="profile-header text-center" style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <!-- Avatar Circular -->
                <div class="profile-avatar-wrapper" style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden; border: 3px solid rgba(0,0,0,0.05); box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                    <img id="profile-avatar" src="" alt="Avatar de Usuario" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <!-- Información del Usuario -->
                <div style="margin-top: 0.5rem;">
                    <h2 id="profile-name" style="font-family: var(--font-sans); color: #111; font-size: 1.6rem; font-weight: 500; margin-bottom: 0.2rem; line-height: 1.2;">Mi Cuenta</h2>
                    <p id="profile-email" style="color: #666; font-size: 0.9rem; font-weight: 400; margin-bottom: 0;"></p>
                </div>
                <!-- Separador -->
                <div style="width: 40px; height: 1px; background: rgba(0,0,0,0.1); margin: 1.5rem 0;"></div>
                <!-- Botón de Cerrar Sesión -->
                <button id="profile-logout-btn" class="btn-logout-minimal">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </div>"""

firebase_scripts = """
    <!-- Firebase Auth Compat -->
    <script src="https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.11.0/firebase-auth-compat.js"></script>
"""

for filename in os.listdir(dir_path):
    if not filename.endswith(".html") or filename.startswith("._"):
        continue
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update <head>
    if "firebase-auth-compat.js" not in content:
        content = content.replace("</head>", firebase_scripts + "</head>")
        
    # 2. Update Nav completely
    content = re.sub(r'<nav>\s*<ul>(.*?)</ul>\s*</nav>', nav_replacement, content, flags=re.DOTALL)
    
    # 3. Modals
    # Remove existing duplicated auth modals or profile modals securely
    content = re.sub(r'<!-- Modal de Autenticación Premium -->\s*<div id="auth-modal"(.+?)</div>\s*</div>', '', content, flags=re.DOTALL)
    content = re.sub(r'<!-- Modal de Mi Perfil Premium -->\s*<div id="profile-modal"(.+?)</div>\s*</div>', '', content, flags=re.DOTALL)
    
    if "<!-- Modales Flotantes -->" in content:
        # Cleanup previously injected modals that sit directly before article-modal
        content = re.sub(r'<!-- Modales Flotantes -->\s*(.*?)\s*<div id="article-modal"', '<!-- Modales Flotantes -->\n<div id="article-modal"', content, flags=re.DOTALL)
        
        target = "<!-- Modales Flotantes -->"
        replacement = target + "\n" + auth_modal_str + "\n\n" + profile_modal_str + "\n"
        content = content.replace(target, replacement)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Updated {filename}")
