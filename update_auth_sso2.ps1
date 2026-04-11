$new_modal = [IO.File]::ReadAllText(".\new_auth_modal.txt", [System.Text.Encoding]::UTF8)

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -like "._*") { continue }
    
    $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    $content = $content -replace '(?s)[ `t]*<!-- Modal de Autenticaci.n Premium -->\s*<div id="auth-modal".*?(?=[ `t]*<!-- Modal de Mi Perfil Premium -->)', "$new_modal`n"
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated $($file.Name)"
}
