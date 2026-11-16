@echo off
chcp 65001 >nul
title Khởi chạy AuraTech Website + Cloudflare Tunnel (quannguyens.id.vn)

echo ===================================================================
echo   AuraTech / QNSTech Website - He Thong Cloudflare Tunnel
echo   Domain dich: https://quannguyens.id.vn
echo   Local Port:  http://localhost:3000
echo ===================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0chay-web-tunnel.ps1"

pause
