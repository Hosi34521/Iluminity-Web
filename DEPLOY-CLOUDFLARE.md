# Publicar Iluminity gratis en Cloudflare Pages

## Archivo que debes subir

Usa `iluminity-cloudflare-upload.zip`. Es el paquete público preparado para Cloudflare.

No subas por separado:

- `admin.html`
- `google-apps-script.gs`
- `SERVICE-AGREEMENT-TEMPLATE.md`
- documentos con datos, claves o notas de clientes

El panel y Google Sheets son herramientas privadas. No deben formar parte del sitio público.

## Primera publicación

1. Crea una cuenta gratuita en Cloudflare.
2. En el panel entra en **Workers & Pages**.
3. Selecciona **Create application**.
4. Elige **Pages** y después **Drag and drop your files**.
5. Usa un nombre como `iluminity-studio`.
6. Arrastra `iluminity-cloudflare-upload.zip`.
7. Selecciona **Deploy site**.
8. Cloudflare entregará una dirección parecida a:
   `https://iluminity-studio.pages.dev`
9. Abre esa dirección desde el teléfono y la computadora.

No hace falta comprar un dominio para comenzar. La dirección `pages.dev` funciona como sitio público.

## Comprobaciones después de publicar

- Abrir la página principal.
- Abrir las diez categorías.
- Abrir los tres modelos de al menos tres categorías.
- Cambiar la vista de una demo entre desktop, tablet y móvil.
- Probar el botón de Gmail sin enviar el mensaje.
- Probar el enlace de Instagram.
- Revisar `pricing.html`, `servicios.html`, `contacto.html` y `terms.html`.
- Confirmar que no aparece `admin.html` en el paquete público.

## Cómo actualizarla

1. Modifica los archivos del proyecto original.
2. Genera nuevamente el paquete público.
3. En Cloudflare Pages abre el proyecto.
4. Selecciona **Create a new deployment**.
5. Sube el nuevo ZIP.

Cloudflare conserva despliegues anteriores para poder regresar a una versión previa.

## Dominio futuro

Cuando exista dinero para un dominio, se conecta desde **Custom domains** dentro del proyecto. No es necesario reconstruir la web.

Documentación oficial: https://developers.cloudflare.com/pages/get-started/direct-upload/
