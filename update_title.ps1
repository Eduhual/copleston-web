$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -like "._*") { continue }
    
    $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("Acceso a Instituto Copleston", "Acceso al Instituto Copleston")
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated $($file.Name)"
}
