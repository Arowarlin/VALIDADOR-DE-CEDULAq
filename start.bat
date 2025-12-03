@echo off
cls

echo ==========================================
echo   INICIANDO SERVICIO DE VALIDACION
echo ==========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado
    echo Por favor instala Node.js desde https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js detectado
node --version
echo.

if not exist "node_modules\" (
    echo [INSTALANDO] Dependencias...
    call npm install
    echo.
)

echo [INICIANDO] Servidor...
echo.
echo El servidor estara disponible en:
echo   http://localhost:3000
echo.
echo Para detener el servidor presiona Ctrl+C
echo.
echo ==========================================
echo.

node server.js