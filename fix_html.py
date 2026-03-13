import os
import glob
import re

html_files = glob.glob('*.html')

social_block = """            <div class="footer-social">
                <h3 class="social-title">Conexión Estratégica</h3>
                <div class="social-icons">
                    <a href="https://www.instagram.com/coplestoninstitute/" target="_blank" class="social-icon" aria-label="Instagram">
                        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/coplestoninstitute" target="_blank" class="social-icon" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@coplestoninstitute" target="_blank" class="social-icon" aria-label="YouTube">
                        <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.501 6.186C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@coplestoninstitute" target="_blank" class="social-icon" aria-label="TikTok">
                        <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.26c.04 2.37-1.18 4.69-3.23 5.85-2.02 1.12-4.57 1.09-6.52-.16-1.92-1.22-3.04-3.41-2.91-5.64.13-2.15 1.51-4 3.52-4.9 1.87-.84 4.09-.64 5.75.52V6.67c0-.02-.01-.03-.02-.04-2.12-.55-4.28-.48-6.32.25-2.14.75-4.04 2.32-5.06 4.37-1.02 2.05-1.17 4.54-.37 6.69.8 2.13 2.5 3.93 4.5 4.86 2.07.95 4.51 1.05 6.66.19 2.06-.83 3.75-2.45 4.65-4.43.91-1.99 1.04-4.3 0-6.38V.02z"/></svg>
                    </a>
                </div>
            </div>"""

for f in html_files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Remove all instances of the generated social block (from both the bad spaces and the good one)
    # The regex removes `<div class="footer-social">...</div>`
    cleaned_content = re.sub(r'(\s*<div class="footer-social">.*?</div>\s*</div>)', r'\n            </div>', content, flags=re.DOTALL)
    
    # We also might have left over duplicate `<div class="footer-social">` if it failed previously in replacement. Let's be rigorous.
    pattern = re.compile(r'\s*<div class="footer-social">[\s\S]*?</div>\s*</div>\s*', re.MULTILINE)
    # Using a simpler string replace since we know the exact block string that matched
    content_without_block = content.replace(social_block, "")
    
    with open(f, 'w') as file:
        file.write(content_without_block)

print("Removed bad blocks")
