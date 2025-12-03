#!/bin/bash

echo "=========================================="
echo "  INICIANDO SERVICIO DE VALIDACIÓN"
echo "=========================================="
echo ""

if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo ""

if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

echo "🚀 Iniciando servidor..."
echo ""
echo "El servidor estará disponible en:"
echo "  → http://localhost:3000"
echo ""
echo "Para detener el servidor presiona Ctrl+C"
echo ""
echo "=========================================="
echo ""

node server.js