@echo off
chcp 65001 >nul
title Kiem Tra Trang Thai Website quannguyens.id.vn

echo ===================================================================
echo   KIEM TRA TRANG THAI WEBSITE & CLOUDFLARE TUNNEL (quannguyens.id.vn)
echo ===================================================================
echo.

echo [1] Kiem tra may chu web local (Port 3000)...
netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul
if %errorlevel% equ 0 (
    echo    -> [OK] Node.js server dang hoat dong tren port 3000.
) else (
    echo    -> [CHUA CHAY] Khong co tien trinh nao tren port 3000.
)
echo.

echo [2] Kiem tra tien trinh Cloudflared Tunnel tren may...
tasklist /fi "imagename eq cloudflared.exe" | findstr "cloudflared.exe" >nul
if %errorlevel% equ 0 (
    echo    -> [OK] Tien trinh cloudflared.exe dang chay tren he thong.
) else (
    echo    -> [CHUA CHAY] cloudflared.exe chua khoi dong.
)
echo.

echo [3] Kiem tra truy cap domain truc tiep tu Internet (https://quannguyens.id.vn)...
curl.exe -s -o nul -w "%%{http_code}" https://quannguyens.id.vn > "%TEMP%\http_code.tmp"
set /p HTTP_CODE=<"%TEMP%\http_code.tmp"
del "%TEMP%\http_code.tmp" 2>nul

if "%HTTP_CODE%"=="200" (
    echo    -> [THANH CONG] Website dang HOAT DONG TOT (HTTP 200 OK)!
    echo    -> Ban co the truy cap ngay: https://quannguyens.id.vn
) else (
    echo    -> [CANH BAO] Domain tra ve ma HTTP: %HTTP_CODE%
    echo    -> Hay chay file "chay-web-tunnel.bat" hoac "khoi-dong-ngam.vbs" de khoi dong lai.
)

echo.
echo ===================================================================
pause
