$new_modal = [IO.File]::ReadAllText(".\new_auth_modal.txt", [System.Text.Encoding]::UTF8)

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -like "._*") { continue }
    
    $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    $startToken = "    <!-- Modal de Autenticación Premium -->"
    $endToken = "<!-- Modal de Mi Perfil Premium -->"
    
    $startIndex = $content.IndexOf($startToken)
    $endIndex = $content.IndexOf($endToken)
    
    if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
        $prefix = $content.Substring(0, $startIndex)
        $suffix = $content.Substring($endIndex)
        $content = $prefix + $new_modal + "`n    " + $suffix
        [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Patched $($file.Name)"
    } else {
        Write-Host "WARNING: Markers not found in $($file.Name)"
    }
}
