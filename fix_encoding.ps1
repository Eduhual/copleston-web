$correct_modal = [IO.File]::ReadAllText(".\fix_modal.txt", [System.Text.Encoding]::UTF8)

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -like "._*") { continue }
    
    $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    $content = $content -replace '(?s)    <!-- Modal de Autenticaci[^<]+Premium -->\s*<div id="auth-modal".*?(?=    <!-- Modal de Mi Perfil Premium -->)', "$correct_modal`n"
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed $($file.Name)"
}
