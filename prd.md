# PRD (MVP) — Página de Identificación de Mascota con QR

## 1. Problema

Las mascotas, especialmente los perros, pueden perderse fácilmente.
Cuando alguien encuentra una mascota, normalmente **no existe una forma rápida de identificar al dueño**.

Los métodos actuales como:

* Publicaciones en redes sociales
* Letreros en la calle

son **lentos, poco efectivos y dependen de que el dueño vea el mensaje**.

---

# 2. Solución

Crear una **página web de identificación para mascotas**, accesible mediante un **código QR en el collar**.

Cuando una persona encuentre la mascota:

1. Escanea el **QR del collar**.
2. Se abre automáticamente una **landing page con la información de la mascota**.
3. La página muestra **datos de contacto del dueño**.
4. La página envía **la ubicación del escaneo al dueño** para ayudar a localizar la mascota.

---

# 3. Objetivo del MVP

Validar que una **página de identificación con QR puede facilitar el regreso de mascotas perdidas**.

El MVP se enfocará únicamente en:

* Una **landing page pública de la mascota**
* Información de contacto del dueño
* Envío de **ubicación del escaneo**
* Interacciones rápidas para contactar al dueño

---

# 4. Funcionalidades del MVP

## 4.1 Landing Page de la Mascota

Página accesible mediante QR con:

* Muchas **fotos de la mascota**
* Nombre de la mascota
* Mensaje empático
* Información de contacto del dueño

La página debe ser **muy visual y amigable** para generar empatía.

Ejemplo de mensaje:

> Hola 🐶
> Mi nombre es Rocky y probablemente estoy perdido.
> Si me encontraste, por favor contacta a mi familia.
> Ellos están preocupados por mí y me quieren de vuelta en casa.

---

# 4.2 Envío automático de ubicación

Cuando alguien abre la página mediante el QR:

1. El navegador solicita permiso de **geolocalización**.
2. Si el usuario acepta:

   * Se captura la ubicación (latitud / longitud).
   * Se envía al backend.
3. El dueño puede recibir esa información para saber **dónde fue encontrada la mascota**.

---

# 4.3 Contacto interactivo

Los botones de contacto deben abrir automáticamente las aplicaciones del dispositivo.

### Teléfono

Botón **Llamar**

Ejecuta:

```
tel:+573148554726
```

---

### WhatsApp

Abre conversación directa:

```
https://wa.me/573148554726
```

---

### Email

Abre el proveedor de correo del dispositivo:

```
mailto:cristian.c.romero.p@gmail.com
```

---

# 5. Datos de contacto para el MVP

Nombre del dueño:
**Cristian Camilo Romero Piñeros**

Teléfono / WhatsApp:
**+57 314 8554726**

Correo:
**[cristian.c.romero.p@gmail.com](mailto:cristian.c.romero.p@gmail.com)**

---

# 6. Diseño de la Landing Page

La página debe ser:

* Muy visual
* Optimizada para móvil
* Con muchas fotos de la mascota
* Con un tono emocional y empático

Secciones sugeridas:

1. **Hero**

   * Foto grande de la mascota
   * Nombre
   * Mensaje de "Estoy perdido"

2. **Galería de fotos**

   * Varias fotos adorables de la mascota

3. **Información de la mascota**

   * Nombre
   * Raza
   * Características

4. **Contacto rápido**

   * Botón llamar
   * Botón WhatsApp
   * Botón email

---

# 7. Alcance del MVP

El MVP **solo incluirá la landing page de la mascota**.

No incluye:

* registro de usuarios
* panel administrativo
* creación de perfiles
* generación de QR

Estos se desarrollarán en una **segunda versión**.

---

# 8. Versión futura (V2)

Flujo completo del producto:

1. Usuario entra al portal
2. Usuario se registra
3. Usuario crea el perfil de su mascota
4. Publica la biografía de la mascota
5. Genera el QR único
6. Descarga el QR
7. Imprime el QR
8. Lo coloca en el collar de la mascota

---

💡 **Sugerencia importante para tu POC**

Agrega también un pequeño mensaje emocional en la página como:

> 💛 Gracias por ayudarme a volver a casa.
> Mi familia me está buscando.

Esto **aumenta muchísimo la probabilidad de que la persona devuelva la mascota**.
