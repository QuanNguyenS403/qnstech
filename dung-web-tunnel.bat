@echo off
chcp 65001 >nul
title Dung He Thong Website & Tunnel AuraTech

echo ===================================================================
echo   DANG DUNG WEBSITE & CLOUDFLARE TUNNEL (quannguyens.id.vn)
echo ===================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "Get-CimInstance Win32_Process | Where-Object { ($_.CommandLine -like '*d:\AuraTech_Website\server.js*') -or ($_.Name -eq 'cloudflared.exe' -and $_.CommandLine -like '*auratech*') } | ForEach-Object { Write-Host 'Dang dung tien trinh PID:' $_.ProcessId ($_.Name); Stop-Process -Id $_.ProcessId -Force }"

echo.
echo [DA DUNG] Toan bo tien trinh AuraTech Website va Tunnel auratech da duoc dong an toan.
echo.
pause
