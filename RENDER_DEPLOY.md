# 🚀 Guía de Despliegue en Render.com

## Paso 1: Preparar el Proyecto

### 1.1 Crear archivo `.gitignore`

```
node_modules/
.env
npm-debug.log
yarn-error.log
.DS_Store
```

### 1.2 Verificar `package.json`

Asegúrate de tener:

```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## Paso 2: Subir Proyecto a GitHub

### Opción A: GitHub Desktop

1. Abre GitHub Desktop
2. File > New Repository
3. Name: `validador-cedula-arowarlin-uasd`
4. Description: `Validador de cédulas dominicanas - Arowarlin UASD`
5. Local Path: Selecciona tu carpeta del proyecto
6. Click "Create Repository"
7. Añade los archivos (GitHub Desktop detectará cambios)
8. Commit: "Initial commit - Validador con Supabase"
9. Click "Publish repository"
10. Desmarca "Keep this code private"
11. Click "Publish repository"

### Opción B: Línea de Comandos

```bash
cd tu-proyecto
git init
git add .
git commit -m "Initial commit - Validador con Supabase"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/validador-cedula-arowarlin-uasd.git
git push -u origin main
```

---

## Paso 3: Crear Cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Click "Get Started for Free"
3. Regístrate con GitHub
4. Autoriza Render para acceder a tu GitHub

---

## Paso 4: Crear Web Service

1. En el dashboard de Render, click "New +"
2. Selecciona "Web Service"
3. Click "Connect GitHub" (si no lo hiciste)
4. Busca tu repositorio: `validador-cedula-arowarlin-uasd`
5. Click "Connect"

---

## Paso 5: Configurar el Servicio

Llena los siguientes campos:

### Información Básica

- **Name**: `validador-cedula-arowarlin`
- **Region**: `Oregon (US West)` (gratis)
- **Branch**: `main`
- **Root Directory**: (dejar vacío)

### Build & Deploy

- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Instance Type

- **Plan**: `Free` ($0/mes)
  - 750 horas/mes gratis
  - 512 MB RAM
  - Se duerme después de 15 min de inactividad

---

## Paso 6: Configurar Variables de Entorno

1. Baja hasta "Environment Variables"
2. Click "Add Environment Variable"

Añade las siguientes variables:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` |
| `NODE_ENV` | `production` |

3. Click "Add" para cada variable

---

## Paso 7: Desplegar

1. Baja hasta el final
2. Click "Create Web Service"
3. Render comenzará a:
   - Clonar tu repositorio
   - Instalar dependencias
   - Iniciar el servidor
4. Espera 2-5 minutos

---

## Paso 8: Verificar Despliegue

### Verificar Logs

1. En tu servicio, ve a "Logs"
2. Deberías ver:

```
========================================
  Servidor corriendo en puerto 10000
  Arowarlin - UASD
========================================
```

### Verificar URL

1. Copia la URL de tu servicio:
   ```
   https://validador-cedula-arowarlin.onrender.com
   ```

2. Ábrela en el navegador
3. Deberías ver tu aplicación funcionando

---

## Paso 9: Probar Endpoints

### Test 1: Página Principal

```
https://validador-cedula-arowarlin.onrender.com/
```

### Test 2: Info del API

```
https://validador-cedula-arowarlin.onrender.com/api/info
```

### Test 3: Validar Cédula

```bash
curl -X POST https://validador-cedula-arowarlin.onrender.com/api/validar \
  -H "Content-Type: application/json" \
  -d '{"cedula": "00121344577"}'
```

---

## 🔄 Actualizar la Aplicación

### Método Automático (Recomendado)

Cada vez que hagas `git push` a GitHub, Render desplegará automáticamente:

```bash
git add .
git commit -m "Actualización: nueva funcionalidad"
git push origin main
```

Render detectará el cambio y redesplegaráautomáticamente.

### Método Manual

1. Ve a tu servicio en Render
2. Click "Manual Deploy"
3. Selecciona "Clear build cache & deploy"

---

## ⚙️ Configuración Avanzada

### Dominio Personalizado

1. En tu servicio, ve a "Settings"
2. Scroll hasta "Custom Domains"
3. Click "Add Custom Domain"
4. Ingresa tu dominio: `validador.tudominio.com`
5. Configura el DNS en tu proveedor:

```
Type: CNAME
Name: validador
Value: validador-cedula-arowarlin.onrender.com
```

### Health Check

1. Settings > Health & Alerts
2. Configura:
   - **Path**: `/api/info`
   - **Expected Status**: `200`

### Auto-Deploy

1. Settings > Build & Deploy
2. **Auto-Deploy**: Yes (activado por defecto)

---

## 🚨 Solución de Problemas

### Error: "Build failed"

**Solución**:
1. Verifica que `package.json` tenga las dependencias correctas
2. Revisa los logs de build en Render
3. Asegúrate de que `node_modules/` esté en `.gitignore`

### Error: "Application failed to start"

**Solución**:
1. Verifica que las variables de entorno estén correctas
2. Revisa los logs de la aplicación
3. Verifica que el comando start sea `node server.js`

### Error: "Cannot connect to Supabase"

**Solución**:
1. Verifica que las credenciales de Supabase sean correctas
2. Revisa que el proyecto Supabase esté activo
3. Verifica la conexión desde Render Logs

### Servicio "dormido"

El plan gratuito duerme después de 15 minutos de inactividad.

**Solución**:
1. Usa un servicio como [UptimeRobot](https://uptimerobot.com) para hacer ping cada 10 minutos
2. O actualiza al plan de pago ($7/mes)

---

## 📊 Monitoreo

### Ver Métricas

1. En tu servicio, ve a "Metrics"
2. Verás:
   - CPU Usage
   - Memory Usage
   - Bandwidth
   - HTTP Requests

### Ver Logs en Tiempo Real

1. Ve a "Logs"
2. Activa "Live logs"
3. Verás cada request en tiempo real

---

## 💰 Límites del Plan Free

- **Instancias**: 1
- **RAM**: 512 MB
- **CPU**: Compartido
- **Bandwidth**: 100 GB/mes
- **Build Time**: 500 horas/mes
- **Sleep**: Después de 15 min de inactividad
- **Custom Domain**: ✅ Permitido
- **SSL**: ✅ Gratis

---

## 🎯 Optimizaciones

### 1. Reducir Tiempo de Inicio

En `server.js`, añade:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
```

### 2. Caché de Dependencias

Render cachea `node_modules` automáticamente.

### 3. Compresión

Instala y usa compresión:

```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

---

## ✅ Checklist de Despliegue

- [ ] Proyecto en GitHub
- [ ] Cuenta Render creada
- [ ] Web Service configurado
- [ ] Variables de entorno añadidas
- [ ] Despliegue exitoso
- [ ] URL funcionando
- [ ] Endpoints probados
- [ ] Logs verificados

---

## 🔗 Links Útiles

- [Render Documentation](https://render.com/docs)
- [Render Status](https://status.render.com)
- [Render Community](https://community.render.com)

---

## 📝 Ejemplo de URL Final

```
https://validador-cedula-arowarlin.onrender.com
```

### Endpoints Disponibles:

```
GET  /
GET  /api/info
POST /api/validar
GET  /api/historial
GET  /api/estadisticas
```

---

**¡Despliegue Completado! 🎉**

Tu aplicación ahora está en vivo y accesible desde cualquier parte del mundo.

Comparte tu link:
```
🔗 https://validador-cedula-arowarlin.onrender.com
```