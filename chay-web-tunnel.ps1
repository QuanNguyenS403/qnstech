# ===================================================================
# Script Dieu Khien Khoi Chay Website va Cloudflare Tunnel
# Domain: quannguyens.id.vn
# ===================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Clear-Host
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "   AuraTech / QNSTech Website - He Thong Cloudflare Tunnel" -ForegroundColor White
Write-Host "   Domain dich: https://quannguyens.id.vn" -ForegroundColor Green
Write-Host "   Local Port:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Kiem tra va khoi dong Node.js Server
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if (-not $conn) {
    Write-Host "-> Dang khoi dong Node.js server.js tren cong 3000..." -ForegroundColor Yellow
    Start-Process node -ArgumentList "server.js" -WorkingDirectory $PSScriptRoot -WindowStyle Minimized
    Start-Sleep -Seconds 2
    Write-Host "[OK] May chu Website da khoi chay thanh cong tai http://localhost:3000" -ForegroundColor Green
} else {
    Write-Host "[OK] May chu Website dang hoat dong tren cong 3000" -ForegroundColor Green
}

# 2. Tu dong mo trinh duyet sau 3 giay
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "https://quannguyens.id.vn"
} | Out-Null

# 3. Khoi chay Tunnel
Write-Host "`n>>> Dang ket noi Cloudflare Tunnel cho domain: https://quannguyens.id.vn..." -ForegroundColor Cyan
Write-Host "-> Trinh duyet se tu dong mo https://quannguyens.id.vn sau 3 giay." -ForegroundColor Gray
Write-Host "-> Nhan Ctrl+C bat cu luc nao de dong ket noi.`n" -ForegroundColor DarkGray

cloudflared tunnel run auratech
