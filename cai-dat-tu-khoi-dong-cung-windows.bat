@echo off
chcp 65001 >nul
title Cai Dat Tu Khoi Dong Cung Windows Cho quannguyens.id.vn

echo ===================================================================
echo   CAI DAT TU KHOI DONG CUNG WINDOWS (quannguyens.id.vn)
echo ===================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut(\"$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\AuraTech_Tunnel.lnk\"); $Shortcut.TargetPath = 'wscript.exe'; $Shortcut.Arguments = '\"d:\AuraTech_Website\khoi-dong-ngam.vbs\"'; $Shortcut.WorkingDirectory = 'd:\AuraTech_Website'; $Shortcut.Save(); Write-Host '[THANH CONG] Da tao shortcut khoi dong cung Windows trong thu muc Startup!' -ForegroundColor Green"

echo.
echo He thong da duoc cau hinh tu dong chay ngam moi khi ban mo may tinh.
echo Website quannguyens.id.vn se luon online ma khong can thao tac thu cong nua.
echo.
pause
