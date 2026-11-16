Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "powershell.exe -ExecutionPolicy Bypass -File ""d:\AuraTech_Website\chay-web-tunnel-ngam.ps1""", 0, False
Set WshShell = Nothing
