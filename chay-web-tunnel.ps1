# ===================================================================
# Script Dieu Khien Khoi Chay Website va Cloudflare Tunnel
# Domain: quannguyens.id.vn
# ===================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ">>> Kiem tra may chu Website tai localhost:3000..." -ForegroundColor Cyan

$serverRunning = $false
try {
    $conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
    if ($conn) { $serverRunning = $true }
} catch {
    $serverRunning = $false
}

if (-not $serverRunning) {
    Write-Host "-> May chu local chua chay. Dang khoi dong Node server.js..." -ForegroundColor Yellow
    Start-Process node -ArgumentList "server.js" -WorkingDirectory $PSScriptRoot -WindowStyle Minimized
    Start-Sleep -Seconds 2
    Write-Host "[OK] May chu Website da khoi chay tai http://localhost:3000" -ForegroundColor Green
} else {
    Write-Host "[OK] May chu Website da san sang tai http://localhost:3000" -ForegroundColor Green
}

$certPath = "$env:USERPROFILE\.cloudflared\cert.pem"
$hasCert = Test-Path $certPath

Write-Host ""
Write-Host "================ CHON PHUONG THUC CHAY CLOUDFLARE TUNNEL ================" -ForegroundColor White
Write-Host "  [1] Chay Tunnel chinh thuc cho domain: https://quannguyens.id.vn" -ForegroundColor Cyan
Write-Host "  [2] Chay Quick Tunnel (Tao link HTTPS cong khai ngay lap tuc de test)" -ForegroundColor Yellow
Write-Host "  [3] Dang nhap Cloudflare (`cloudflared tunnel login`) va khoi tao Tunnel" -ForegroundColor Magenta
Write-Host "  [4] Thoat" -ForegroundColor Gray
Write-Host "==========================================================================" -ForegroundColor White

$choice = Read-Host "Nhap lua chon cua ban (1-4)"

switch ($choice) {
    "1" {
        if (-not $hasCert) {
            Write-Host "`n[CHUYEN HUONG] Ban chua dang nhap Cloudflare de tao chung thu cert.pem." -ForegroundColor Red
            Write-Host "-> He thong se tu dong mo trinh duyet de ban dang nhap Cloudflare va chon domain quannguyens.id.vn..." -ForegroundColor Yellow
            cloudflared tunnel login
            if (Test-Path $certPath) {
                Write-Host "`n[THANH CONG] Da dang nhap Cloudflare! Dang tao Tunnel 'auratech'..." -ForegroundColor Green
                cloudflared tunnel create auratech
                cloudflared tunnel route dns auratech quannguyens.id.vn
                cloudflared tunnel route dns auratech www.quannguyens.id.vn
            } else {
                Write-Host "`n[CHU Y] Chua hoan tat dang nhap. Vui long thu lai." -ForegroundColor Yellow
                return
            }
        }
        
        Write-Host "`n>>> Dang khoi chay Cloudflare Tunnel cho quannguyens.id.vn..." -ForegroundColor Cyan
        $configFile = Join-Path $PSScriptRoot "cloudflared-config.yml"
        if (Test-Path $configFile) {
            cloudflared tunnel --config $configFile run
        } else {
            cloudflared tunnel run auratech
        }
    }
    "2" {
        Write-Host "`n>>> Dang tao Quick Tunnel ket noi ra Internet..." -ForegroundColor Yellow
        Write-Host "-> He thong se tao mot duong dan HTTPS ngau nhien co the truy cap tu moi thiet bi/dien thoai." -ForegroundColor Gray
        cloudflared tunnel --url http://localhost:3000
    }
    "3" {
        Write-Host "`n>>> Dang mo trang xac thuc Cloudflare..." -ForegroundColor Cyan
        cloudflared tunnel login
        if (Test-Path $certPath) {
            Write-Host "`n[THANH CONG] Da luu cert.pem vao $certPath" -ForegroundColor Green
            Write-Host "-> Dang tao Named Tunnel 'auratech'..." -ForegroundColor Cyan
            cloudflared tunnel create auratech
            Write-Host "-> Dang tao DNS Route ve quannguyens.id.vn..." -ForegroundColor Cyan
            cloudflared tunnel route dns auratech quannguyens.id.vn
            cloudflared tunnel route dns auratech www.quannguyens.id.vn
            Write-Host "`n[HOAN TAT] Ban co the chon muc [1] de chay tunnel bat cu luc nao!" -ForegroundColor Green
        }
    }
    Default {
        Write-Host "Da thoat chuong trinh." -ForegroundColor Gray
    }
}
