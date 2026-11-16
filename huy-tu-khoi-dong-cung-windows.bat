@echo off
chcp 65001 >nul
title Huy Tu Khoi Dong Cung Windows

echo ===================================================================
echo   HUY TU KHOI DONG CUNG WINDOWS (quannguyens.id.vn)
echo ===================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "Remove-Item \"$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\AuraTech_Tunnel.lnk\" -ErrorAction SilentlyContinue; Write-Host '[THANH CONG] Da xoa shortcut tu dong khoi dong!' -ForegroundColor Green"

echo.
pause
