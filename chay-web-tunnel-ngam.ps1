# ===================================================================
# Script Khoi Chay Ngam (Silent Background) - AuraTech Website & Tunnel
# ===================================================================

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Kiem tra va khoi dong Node.js Server (Port 3000)
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if (-not $conn) {
    Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $scriptDir -WindowStyle Hidden
    Start-Sleep -Seconds 2
}

# 2. Kiem tra va khoi dong Cloudflare Tunnel auratech
$tunnelProc = Get-CimInstance Win32_Process | Where-Object { $_.Name -eq "cloudflared.exe" -and $_.CommandLine -like "*auratech*" }
if (-not $tunnelProc) {
    Start-Process -FilePath "cloudflared" -ArgumentList "tunnel --config C:\Users\ASUS\.cloudflared\config.yml run auratech" -WindowStyle Hidden
    Start-Sleep -Seconds 2
}
