import os

files_to_update = ["filosofia.html", "psicologia.html"]

filter_html = """                <!-- Filtros Avanzados -->
                <div class="filter-bar dark-glass">
                    <h3 class="filter-bar-title">Directorio de Artículos</h3>
                    <select class="clean-select" id="sort-select">
                        <option value="recent">Más Recientes</option>
                        <option value="popular">Más Populares (Likes)</option>
                        <option value="reads">Más Leídos (Vistas)</option>
                    </select>
                </div>

                <div class="articulos-grid" id="articles-container">"""

for fname in files_to_update:
    if not os.path.exists(fname): continue
    
    # Intenta leer asumiendo UTF-8 primero o fallback a UTF-16
    try:
        with open(fname, "r", encoding="utf-8") as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(fname, "r", encoding="utf-16le") as f:
            content = f.read()

    # The target replacement
    target = '<div class="articulos-grid">'
    
    # We replace it with the new filter bar + the grid container with id
    if target in content:
        content = content.replace(target, filter_html, 1)
        
        # Now we need to add data attributes to the article
        article_target = '<article class="articulo-card">'
        
        if fname == "filosofia.html":
            new_article = '<article class="articulo-card" data-id="art_filosofia_1" data-date="2026-03-23" data-likes="0" data-reads="0">'
            content = content.replace(article_target, new_article)
        else:
            new_article = '<article class="articulo-card" data-id="art_psicologia_1" data-date="2026-04-06" data-likes="0" data-reads="0">'
            content = content.replace(article_target, new_article)

        # Usar encoding UTF-8 guardando los cambios
        with open(fname, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {fname}")
    else:
        print(f"Target not found in {fname}")
