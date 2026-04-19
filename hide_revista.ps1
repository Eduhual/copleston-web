$dir = "d:\COPLESTON_INSTITUTE-20260411T141528Z-3-001\COPLESTON_INSTITUTE"
$files = Get-ChildItem -Path $dir -Filter "*.html"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $newContent = $content -replace '<li>\s*<a href="\./revista\.html">REVISTA</a>\s*</li>', '<li style="display: none;"><a href="./revista.html">REVISTA</a></li>'
    if ($content -ne $newContent) {
        [IO.File]::WriteAllText($f.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($f.Name)"
    }
}
