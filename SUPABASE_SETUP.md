# 🚀 Guía de Configuración Supabase

## Paso 1: Crear Cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Click en "Start your project"
3. Regístrate con GitHub o email
4. Confirma tu email

---

## Paso 2: Crear Nuevo Proyecto

1. En el dashboard, click "New Project"
2. Llena los datos:
   - **Name**: `validador-cedula-arowarlin`
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: `South America (São Paulo)` (más cercana a RD)
   - **Pricing Plan**: Free
3. Click "Create new project"
4. Espera 2-3 minutos mientras se crea

---

## Paso 3: Obtener Credenciales

1. En tu proyecto, ve a **Settings** (⚙️) en el menú lateral
2. Click en **API**
3. Copia estos valores:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Pégalos en tu archivo `.env`:

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Paso 4: Crear Tabla en Supabase

### Opción A: SQL Editor

1. En el menú lateral, click en **SQL Editor**
2. Click en "New query"
3. Copia y pega el contenido de `schema.sql`
4. Click "Run" o presiona `Ctrl + Enter`
5. Verás el mensaje: "Success. No rows returned"

### Opción B: Table Editor (Visual)

1. En el menú lateral, click en **Table Editor**
2. Click "Create a new table"
3. Configura:
   - **Name**: `validaciones`
   - **Description**: "Historial de validaciones de cédulas"
   - **Enable Row Level Security (RLS)**: ✅ Activado

4. Añade las siguientes columnas:

| Nombre | Tipo | Default | Configuración |
|--------|------|---------|---------------|
| id | int8 | AUTO | Primary Key |
| cedula | varchar | - | Required |
| valido | bool | - | Required |
| digito_verificador | int4 | - | Optional |
| digito_calculado | int4 | - | Optional |
| mensaje | text | - | Optional |
| fecha | timestamptz | now() | - |
| created_at | timestamptz | now() | - |

5. Click "Save"

---

## Paso 5: Configurar Row Level Security (RLS)

1. Ve a **Authentication** > **Policies**
2. Selecciona la tabla `validaciones`
3. Click "New Policy"

### Política 1: Permitir Lectura

```sql
CREATE POLICY "Permitir lectura pública"
ON validaciones FOR SELECT
USING (true);
```

### Política 2: Permitir Inserción

```sql
CREATE POLICY "Permitir inserción pública"
ON validaciones FOR INSERT
WITH CHECK (true);
```

### Política 3: Permitir Eliminación

```sql
CREATE POLICY "Permitir eliminación pública"
ON validaciones FOR DELETE
USING (true);
```

---

## Paso 6: Verificar Tabla

1. Ve a **Table Editor**
2. Selecciona `validaciones`
3. Deberías ver la tabla vacía con todas las columnas

---

## Paso 7: Probar Conexión

Ejecuta esta query en el SQL Editor:

```sql
SELECT * FROM validaciones LIMIT 10;
```

Debería retornar 0 filas (tabla vacía).

---

## 🔧 Configuración Adicional (Opcional)

### Índices para Mejor Performance

```sql
CREATE INDEX idx_validaciones_cedula ON validaciones(cedula);
CREATE INDEX idx_validaciones_fecha ON validaciones(fecha DESC);
CREATE INDEX idx_validaciones_valido ON validaciones(valido);
```

### Función para Limpiar Datos Antiguos

```sql
CREATE OR REPLACE FUNCTION limpiar_validaciones_antiguas()
RETURNS void AS $$
BEGIN
  DELETE FROM validaciones 
  WHERE fecha < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;
```

---

## 📊 Monitoreo

### Ver Estadísticas en Tiempo Real

1. Ve a **Database** > **Tables**
2. Click en `validaciones`
3. Verás:
   - Total de filas
   - Tamaño de la tabla
   - Última actualización

### Ver Logs de Queries

1. Ve a **Logs** en el menú lateral
2. Selecciona "Postgres Logs"
3. Filtra por tabla `validaciones`

---

## 🚨 Solución de Problemas

### Error: "relation 'validaciones' does not exist"

**Solución**: La tabla no se creó correctamente. Ejecuta de nuevo el script SQL.

### Error: "new row violates row-level security policy"

**Solución**: Las políticas RLS no están configuradas. Ejecuta los comandos de políticas.

### Error: "Failed to fetch"

**Solución**: 
1. Verifica que las credenciales en `.env` sean correctas
2. Verifica que el proyecto Supabase esté activo
3. Revisa que no haya firewalls bloqueando la conexión

---

## 📱 Límites del Plan Free

- **Almacenamiento**: 500 MB
- **Bandwidth**: 2 GB
- **Requests**: Ilimitados
- **Database Size**: 500 MB
- **Pausa**: El proyecto se pausa después de 1 semana de inactividad

Para mantener activo:
- Visita el dashboard una vez por semana
- O haz una request al API cada semana

---

## ✅ Checklist de Configuración

- [ ] Cuenta Supabase creada
- [ ] Proyecto creado
- [ ] Credenciales copiadas al `.env`
- [ ] Tabla `validaciones` creada
- [ ] Políticas RLS configuradas
- [ ] Índices creados
- [ ] Conexión probada

---

## 🔗 Links Útiles

- [Documentación Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Reference](https://supabase.com/docs/guides/database/tables)

---

**¡Configuración Completada! 🎉**

Ahora puedes ejecutar tu aplicación con:

```bash
npm install
npm start
```