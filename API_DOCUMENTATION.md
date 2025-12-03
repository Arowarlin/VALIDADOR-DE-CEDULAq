# API de Validación de Cédula

## Descripción
Servicio web REST para validar cédulas de identidad y electoral dominicanas usando el algoritmo de módulo 10.

## URL Base
```
http://localhost:3000/api/validacion
```

---

## Endpoints

### 1. Validar Cédula (POST)

**Endpoint:** `/cedula`

**Método:** `POST`

**Descripción:** Valida una cédula enviada en el cuerpo de la petición.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "cedula": "00112345678"
}
```

**Respuesta Exitosa (200):**
```json
{
  "valido": true,
  "cedula": "00112345678",
  "digitoVerificador": 8,
  "digitoCalculado": 8,
  "mensaje": "Cédula válida",
  "informacion": {
    "secuencia": "001",
    "numeroDocumento": "1234567",
    "digitoVerificador": "8",
    "cedulaFormateada": "001-1234567-8"
  }
}
```

**Respuesta Error (400):**
```json
{
  "error": "El campo cedula es requerido"
}
```

---

### 2. Validar Cédula (GET)

**Endpoint:** `/cedula/:cedula`

**Método:** `GET`

**Descripción:** Valida una cédula enviada como parámetro en la URL.

**Ejemplo:**
```
GET /api/validacion/cedula/00112345678
```

**Respuesta:** Misma estructura que el endpoint POST.

---

### 3. Información del Servicio

**Endpoint:** `/info`

**Método:** `GET`

**Descripción:** Obtiene información sobre el servicio y cómo usarlo.

**Respuesta:**
```json
{
  "servicio": "Validación de Cédula Dominicana",
  "algoritmo": "Módulo 10",
  "version": "1.0.0",
  "uso": {
    "post": {
      "endpoint": "/api/validacion/cedula",
      "metodo": "POST",
      "body": {
        "cedula": "00112345678"
      }
    },
    "get": {
      "endpoint": "/api/validacion/cedula/:cedula",
      "metodo": "GET",
      "ejemplo": "/api/validacion/cedula/00112345678"
    }
  }
}
```

---

## Formatos Aceptados

La cédula puede enviarse en los siguientes formatos:
- Con guiones: `001-1234567-8`
- Sin guiones: `00112345678`
- Con espacios: `001 1234567 8`

El sistema limpia automáticamente cualquier carácter no numérico.

---

## Algoritmo Módulo 10

El algoritmo de validación funciona de la siguiente manera:

1. Se extraen los primeros 10 dígitos de la cédula
2. Se multiplica cada dígito alternadamente por 1 y 2:
   - Posición 0: x1
   - Posición 1: x2
   - Posición 2: x1
   - Posición 3: x2
   - Y así sucesivamente...
3. Se suman todos los productos
4. Se calcula el módulo 10 de la suma
5. El dígito verificador es: `10 - módulo` (o 0 si el módulo es 0)

**Ejemplo:**

Cédula: `001-1234567-8`

```
Dígitos: 0 0 1 1 2 3 4 5 6 7
Factor:  1 2 1 2 1 2 1 2 1 2
         -------------------
Producto: 0 0 1 2 2 6 4 10 6 14

Suma: 0 + 0 + 1 + 2 + 2 + 6 + 4 + 10 + 6 + 14 = 45
Módulo: 45 % 10 = 5
Dígito verificador: 10 - 5 = 5

¡Error en ejemplo! El dígito real debería ser 5, no 8
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Petición inválida (falta el campo cédula) |
| 500 | Error interno del servidor |

---

## Ejemplos de Uso

### cURL

```bash
curl -X POST http://localhost:3000/api/validacion/cedula \
  -H "Content-Type: application/json" \
  -d '{"cedula": "00112345678"}'
```

### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/api/validacion/cedula', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ cedula: '00112345678' })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Python (Requests)

```python
import requests

response = requests.post(
    'http://localhost:3000/api/validacion/cedula',
    json={'cedula': '00112345678'}
)

print(response.json())
```

---

## Instalación y Ejecución

### Requisitos
- Node.js 14 o superior
- npm o yarn

### Instalación

```bash
npm install
```

### Ejecutar servidor

```bash
npm start
```

### Modo desarrollo (con auto-reload)

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`