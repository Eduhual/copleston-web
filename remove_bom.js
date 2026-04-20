const fs = require('fs');

// Use native fs.readdir to avoid installing glob dependency if missing
fs.readdir('.', (err, files) => {
    if (err) throw err;
    
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    let count = 0;
    
    for (const file of htmlFiles) {
        let buffer = fs.readFileSync(file);
        
        // Remove BOM if present
        if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
            buffer = buffer.slice(3);
        }
        
        // Convert back to string and write as UTF-8 (Node writes without BOM by default)
        const text = buffer.toString('utf8');
        fs.writeFileSync(file, text, 'utf8');
        count++;
        console.log(`[OK] ${file} -> Limpio y sin BOM`);
    }
    
    console.log(`\nFinalizado. ${count} archivos procesados exitosamente.`);
});
