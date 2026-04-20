import glob
import os

html_files = glob.glob('*.html')
count = 0

for file_path in html_files:
    try:
        # Leer como bytes para detectar el BOM
        with open(file_path, 'rb') as f:
            raw_content = f.read()

        # Si inicia con BOM UTF-8 (\xef\xbb\xbf), quitarlo
        if raw_content.startswith(b'\xef\xbb\xbf'):
            raw_content = raw_content[3:]
            
        # Decodificar y escribir explícitamente en UTF-8 puro
        text = raw_content.decode('utf-8')
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(text)
        count += 1
        print(f"[OK] {file_path} -> Limpio y sin BOM")
    except Exception as e:
        print(f"[ERROR] {file_path}: {e}")

print(f"\nFinalizado. {count} archivos procesados exitosamente.")
