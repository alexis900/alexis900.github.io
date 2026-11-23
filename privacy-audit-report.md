# Informe de auditoría de privacidad y documentación legal

**Aplicación:** Portfolio de Alejandro Martín Pérez (`alexis900.github.io`)
**Fecha:** 2026-11-24
**Documentos auditados:** Ninguno. El usuario confirmó que no existe Política de Privacidad, Aviso Legal, Política de Cookies ni DPA.
**Jurisdicciones evaluadas:** UE (RGPD / Reglamento (UE) 2016/679); España (LOPDGDD 3/2018 y LSSI-CE 34/2002, texto consolidado a 23/01/2025)
**Modo de auditoría:** B — análisis de código
**Archivo de informe:** `./privacy-audit-report.md`

> Este informe es un análisis automatizado. No es una certificación de cumplimiento ni un dictamen jurídico. Para decisiones con relevancia legal, consulta a un profesional cualificado en protección de datos.

---

## 1. Resumen ejecutivo

El sitio es un portfolio estático generado con Astro, sin backend, base de datos, autenticación, formularios, analítica, cookies ni JavaScript en el HTML publicado. Por diseño, **no recoge datos personales de los visitantes**.

Sin embargo, la carga de tipografías desde **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) provoca que el navegador del visitante envíe peticiones a Google, con datos técnicos de conexión (dirección IP, user agent y, previsiblemente, referrer). El alojamiento en **GitHub Pages** también implica procesamiento a nivel de plataforma. Ninguna de estas actuaciones está descrita en el sitio, que carece de Política de Privacidad, Aviso Legal y Política de Cookies.

La prioridad es documentar estas prácticas y clarificar el papel de cada tercero. No se han identificado hallazgos CRITICAL dentro del alcance analizado; los tres hallazgos IMPORTANT se concentran en transparencia e identificación del responsable.

---

## 2. Alcance y limitaciones

### 2.1 Fuentes analizadas

- `package.json` y `package-lock.json` — dependencias (solo `astro@^7.4.13`).
- `astro.config.mjs` — configuración de `site`, i18n y redirección raíz.
- `src/layouts/BaseLayout.astro` — cabecera HTML, metadatos y recursos externos (líneas 10-21).
- `src/data/i18n.js` — textos, enlaces a GitHub y datos del perfil.
- `src/components/*.astro` — Hero, Stack, Projects, About, Contact, Footer, Header.
- `src/styles/global.css` — estilos (sin `url()` remotas; la única fuente remota está en el layout).
- `.github/workflows/deploy.yml` — workflow de build y despliegue.
- `public/favicon.svg`, `README.md`, `LICENSE` (GPL-3.0).
- Salida compilada `dist/es/index.html` y `dist/_astro/*.css` (verificación de scripts y recursos reales).
- API de GitHub Pages del repositorio (`build_type: workflow`, `status: built`).
- Fuentes normativas oficiales: EUR-Lex (Reglamento (UE) 2016/679) y BOE (Ley 34/2002, BOE-A-2002-13758), consultadas el 2026-11-24.

### 2.2 No revisado

- Configuración interna de la cuenta de GitHub, del plan de GitHub Pages y de Google Fonts (no accesible desde el repositorio).
- Paneles, contratos y acuerdos de tratamiento de datos con GitHub/Microsoft y Google (DPA, regiones, mecanismos de transferencia).
- Logs del servidor/CDN de GitHub Pages: no son visibles desde el repositorio.
- Comportamiento real del navegador en producción más allá del HTML/CSS estático servido (peticiones de red efectivas, caché, extensiones del visitante).
- Versiones anteriores del sitio (la anteriores a Astro usaban `localStorage` para el idioma; no forman parte de la versión auditada).

### 2.3 Dependencias externas

- **Google Fonts** — proveedor del CSS y de los archivos de fuentes; entidad y mecanismo de transferencia dependientes de sus condiciones.
- **GitHub Pages / GitHub, Inc. (Microsoft)** — alojamiento y entrega del contenido; región, retención de logs y rol exacto dependientes de la configuración de la cuenta.
- **GitHub** — destino de los enlaces del portfolio; procesa las visitas posteriormente bajo sus propias condiciones.

### 2.4 Requiere verificación manual

- Inspeccionar la pestaña Red del navegador para confirmar las peticiones reales a `fonts.googleapis.com` / `fonts.gstatic.com` y sus cabeceras.
- Confirmar si GitHub Pages mantiene logs de acceso con IP y durante cuánto tiempo (no documentado en el repositorio).
- Confirmar la identidad del importador de datos de Google (Google Ireland Ltd. frente a Google LLC) y el mecanismo de transferencia aplicable.

### 2.5 Requiere asesoramiento jurídico

- Si un portfolio personal constituye «prestación de servicios de la sociedad de información» a efectos del art. 10 LSSI-CE.
- Si la carga de fuentes remotas genera un tratamiento de datos personales atribuible al titular del sitio y, en su caso, la base jurídica (art. 6 RGPD) y las obligaciones de información (arts. 13-14 RGPD).
- El mecanismo de transferencia internacional aplicable a Google y si procede evaluar salvaguardas adicionales.

---

## 3. Inventario de datos personales

| Categoría | Ejemplos | Fuente (código) | Evidencia | Certeza |
|---|---|---|---|---|
| Datos de identidad | Nombre público: «Alejandro Martín Pérez» | `src/data/i18n.js:6-9`; `BaseLayout.astro:13` | Texto visible del portfolio; dato publicado voluntariamente | Confirmada |
| Datos de cuenta / autenticación | Ninguno | — | Sin formularios, login, sesiones ni tokens en el código | Confirmada (ausencia) |
| Datos conductuales | Ninguno | — | Sin analítica, eventos ni scripts en `dist/es/index.html` | Confirmada (ausencia) |
| Datos técnicos / de dispositivo | Dirección IP, User-Agent, referrer | `src/layouts/BaseLayout.astro:17-20` | `<link rel="preconnect">` y `<link rel="stylesheet">` a dominios de Google | Confirmada (envío del navegador); el contenido exacto de las cabeceras no es verificable desde el repo |
| Contenido generado por el usuario | Ninguno | — | Sin campos de texto ni formularios | Confirmada (ausencia) |
| Datos transaccionales | Ninguno | — | Sin pasarelas de pago ni СRM | Confirmada (ausencia) |
| Categorías especiales (art. 9) | Ninguna | — | Sin recogida de salud, biometría, ubicación precisa, etc. | Confirmada (ausencia) |
| Datos de menores | No dirigido a menores | — | Contenido profesional; sin verificación de edad ni formularios | Confirmada |

**Nota:** los datos técnicos no son «recogidos» por el código del sitio en el sentido de almacenarlos en una base de datos, pero **sí se transmiten a un tercero** cuando el navegador carga recursos remotos.

---

## 4. Finalidades del tratamiento

| Finalidad | Datos implicados | Base jurídica (si consta) | Evidencia | Certeza |
|---|---|---|---|---|
| Renderizado de tipografías | IP, User-Agent, referrer enviados a Google | No declarada | `BaseLayout.astro:17-20` | Confirmada la carga; la base jurídica no consta |
| Entrega del sitio estático | IP, User-Agent (a nivel de plataforma) | No declarada | `astro.config.mjs:4`; `.github/workflows/deploy.yml`; configuración de Pages vía API | Externa (depende de GitHub Pages) |
| Navegación a repositorios ( enlaces GitHub ) | IP, referrer al pulsar | No aplicable: navegación iniciada por el usuario | `src/data/i18n.js` (enlaces `href`) | Confirmada |

No se observan finalidades de autenticación, pago, comunicaciones, analítica, marketing, prevención de fraude, IA/ML ni cumplimiento legal que impliquen datos de los visitantes.

---

## 5. Categorías de interesados

- Visitantes del portfolio (destinatarios del servicio de información).
- No se identifican clientes, empleados, suscriptores, menores ni terceros mencionados por los usuarios, porque no existe ningún mecanismo de entrada de datos.

---

## 6. Servicios y terceros

| Servicio | Rol | Datos implicados | Evidencia de uso | Ubicación / transferencia | Certeza |
|---|---|---|---|---|---|
| Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) | Receptor; la calificación exacta (encargado/responsable) depende de las condiciones del servicio | IP, User-Agent, referrer de la petición | `src/layouts/BaseLayout.astro:17-20`; presente en `dist/es/index.html` | Posible EE. UU.; país no declarado; mecanismo (adecuación/DPF/SCC) no verificable | Confirmada la carga; externa la transferencia |
| GitHub Pages | Proveedor de alojamiento; rol contractual no inspeccionable | Datos técnicos de la petición HTTP a nivel de plataforma | `astro.config.mjs:4`; workflow de deploy; API de Pages | Región y retención no verificables desde el repositorio | Externa |
| GitHub (`github.com`) | Destino de enlaces; responsable de su propio sitio | IP y referrer al hacer clic (navegación del usuario) | Enlaces en `src/data/i18n.js` y componentes | No aplicable al alcance de este sitio | Confirmada |

**No se han encontrado** proveedores de analítica, monitorización, errores, email, pagos, almacenamiento, autenticación ni IA. `package.json` declara únicamente `astro`.

---

## 7. Infraestructura y almacenamiento

| Componente | Proveedor | Región | Datos almacenados | Evidencia | Certeza |
|---|---|---|---|---|---|
| Base de datos | Ninguno | — | — | Sin dependencias ni esquemas | Confirmada |
| Almacenamiento de objetos | Ninguno | — | — | No hay SDK de almacenamiento | Confirmada |
| Hosting | GitHub Pages (`alexis900.github.io`) | No verificable | Archivos estáticos `dist/` | `build_type: workflow`, `status: built` | Externa |
| Backups | No gestionados por la aplicación | — | — | — | Confirmada (no aplicable) |
| Retención | No definida en código | — | — | Sin configuración de retención | No disponible |

---

## 8. Análisis de cookies y seguimiento

| Cookie / rastreador | Proveedor | Finalidad | Categoría | ¿Requiere consentimiento? | Duración | ¿Divulgado? | Evidencia |
|---|---|---|---|---|---|---|---|
| Ninguna | — | — | — | No aplicable | — | No aplicable | Sin `document.cookie`, `localStorage`, `sessionStorage`, `<script>` ni etiquetas de analítica en `dist/es/index.html` |

**Notas**

- No existe banner de consentimiento; tampoco es necesario para las prácticas observadas, siempre que no se instalen cookies o tecnologías similares.
- La carga de fuentes remotas **no es una cookie**, pero sí una comunicación con un tercero que debería mencionarse en la documentación de privacidad.
- No se puede afirmar que no existan cookies a nivel de plataforma (GitHub Pages) sin acceso a la configuración externa: marcado como **no verificable**.

---

## 9. Análisis de documentación legal

### 9.1 Documentos revisados

Ninguno. El usuario confirmó expresamente que no hay documentos legales en el proyecto (`find` sobre `*.md`, `*privacy*`, `*legal*`, `*terms*`, `*cookie*` solo devolvió `README.md` y `LICENSE`).

### 9.2 Manifestaciones clave

No hay manifestaciones sobre datos, finalidades, bases jurídicas, destinatarios, transferencias, plazos de conservación ni derechos. La única información de identidad es el nombre del titular en el hero y el footer, y un enlace a GitHub.

### 9.3 Coherencia interna

No aplicable: no existen documentos que comparar entre sí. La ausencia total es en sí misma la brecha documental principal.

---

## 10. Matriz código vs. documentación

| Práctica detectada en el código | Política de privacidad | Política de cookies | Aviso Legal / ToS / DPA | Estado | Evidencia |
|---|---|---|---|---|---|
| Carga de Google Fonts (IP/UA a Google) | No existe | No existe | No existe | Brecha | `BaseLayout.astro:17-20` |
| Alojamiento en GitHub Pages (logs de plataforma) | No existe | No existe | No existe | Brecha | `astro.config.mjs:4`; API de Pages |
| Identidad y contacto del responsable | No existe | — | No existe | Brecha | `i18n.js:6-9`; solo nombre visible |
| Ausencia de cookies y analítica | No se declara | No se declara | — | Parcial (no verificado externamente) | `dist/es/index.html` sin scripts |
| Enlaces a repositorios de GitHub | No existe | — | — | Brecha menor | `i18n.js` (enlaces `href`) |

Estados: Alineado / Parcial / Brecha / No verificable.

---

## 11. Hallazgos CRITICAL

No se han identificado hallazgos de severidad CRITICAL dentro del alcance analizado. El sitio no recoge datos personales mediante formularios, no dispone de analítica y no usa cookies; las brechas se limitan a transparencia y documentación.

---

## 12. Hallazgos IMPORTANT

### F-001 — Ausencia total de Política de Privacidad y Aviso Legal

- **Severidad:** IMPORTANT
- **Descripción:** El sitio no publica ninguna política de privacidad ni aviso legal, a pesar de existir comunicaciones con terceros (Google Fonts, GitHub Pages) y de mostrarse un nombre como identidad del titular sin datos de contacto.
- **Evidencia:** `find` sobre el repositorio solo devuelve `README.md` y `LICENSE` (GPL-3.0); no hay documento con datos de contacto, responsable, finalidades ni derechos.
- **Ubicación:** raíz del repositorio; `src/layouts/BaseLayout.astro` (sin enlaces a documentos legales).
- **Documento afectado:** Política de Privacidad, Aviso Legal.
- **Referencia legal:** RGPD arts. 12-14 (transparencia); LSSI-CE art. 10.1 (información general: nombre, domicilio, correo electrónico y medio de contacto). La aplicabilidad del art. 10 LSSI-CE a un portfolio personal requiere valoración jurídica.
- **Impacto potencial:** Falta de información al visitante sobre el tratamiento derivado de recursos remotos y sobre cómo contactar al responsable. No se afirma incumplimiento: se documenta la ausencia.
- **Recomendación:** Publicar un Aviso Legal con identidad, domicilio a efectos de contacto y correo electrónico, y una Política de Privacidad breve que describa las dos comunicaciones con terceros detectadas, sin inventar prácticas inexistentes.
- **Certeza:** Confirmada.

### F-002 — Carga de Google Fonts sin divulgación de la comunicación con un tercero

- **Severidad:** IMPORTANT
- **Descripción:** La cabecera incluye `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` y una hoja de estilo remota. El navegador transmite datos técnicos de conexión a Google sin que el sitio lo mencione.
- **Evidencia:** `src/layouts/BaseLayout.astro:17-20`; la URL aparece también en `dist/es/index.html`.
- **Ubicación:** `src/layouts/BaseLayout.astro:17-20`.
- **Documento afectado:** Política de Privacidad.
- **Referencia legal:** RGPD arts. 6 (base jurídica), 13 (información) y 44-49 (transferencias internacionales, si procede); LSSI-CE art. 22.2 para tecnologías de almacenamiento/acceso — no aplicable a las fuentes por sí mismas, pero relevante para el conjunto de recursos remotos.
- **Impacto potencial:** El visitante desconoce que su IP se comunica a Google al cargar la página. La transferencia internacional y su mecanismo no pueden verificarse desde el repositorio.
- **Recomendación:** (a) Divulgar el proveedor, la finalidad (renderizado tipográfico), los datos de conexión implicados y el mecanismo de transferencia que corresponda; o (b) eliminar la dependencia sirviendo las fuentes desde `public/` con `@font-face` local, lo que evita la comunicación con Google. La opción (b) reduce superficie y es coherente con el perfil técnico del sitio.
- **Certeza:** Confirmada la carga; externa la transferencia y el mecanismo.

### F-003 — Sin canal identificado para el ejercicio de derechos

- **Severidad:** IMPORTANT
- **Descripción:** No hay correo electrónico ni otro medio de contacto publicado, por lo que un visitante no tiene una vía clara para solicitar información, ejercer derechos o plantear una consulta de privacidad.
- **Evidencia:** `src/data/i18n.js:6-9` (solo nombre y URL de GitHub); la sección «Contacto» redirige exclusivamente a GitHub.
- **Ubicación:** `src/components/Contact.astro`; `src/data/i18n.js`.
- **Documento afectado:** Política de Privacidad / Aviso Legal.
- **Referencia legal:** RGPD arts. 12(3) y 15-22; LSSI-CE art. 10.1.a.
- **Impacto potencial:** Aun cuando no se recojan datos en formularios, la falta de contacto impide canalizar cualquier solicitud relativa a los tratamientos indicados en F-001 y F-002.
- **Recomendación:** Añadir una dirección de correo de contacto en el Aviso Legal y en la sección «Contacto», indicando el plazo de respuesta de un mes del art. 12(3) RGPD y el derecho a reclamar ante la autoridad de control.
- **Certeza:** Confirmada.

---

## 13. Hallazgos MINOR

### F-004 — No se declara expresamente la ausencia de cookies

- **Severidad:** MINOR
- **Descripción:** No se observan cookies ni almacenamiento local, pero el sitio tampoco lo declara.
- **Evidencia:** `dist/es/index.html` sin `<script>`; sin `localStorage`, `sessionStorage` ni `document.cookie` en `src/`.
- **Documento afectado:** Política de Cookies / Política de Privacidad.
- **Referencia legal:** LSSI-CE art. 22.2 y buenas prácticas de transparencia.
- **Impacto potencial:** Confusión del visitante; no implica obligación de consentimiento si no hay cookies no esenciales.
- **Recomendación:** Incluir una frase: «Este sitio no instala cookies propias ni de terceros y no utiliza herramientas de analítica».
- **Certeza:** Confirmada en el código; no verificable a nivel de plataforma.

### F-005 — Enlaces externos sin identificación ni política de referrer

- **Severidad:** MINOR
- **Descripción:** Varios enlaces apuntan a `github.com` y se abren en otra pestaña; no se indican como destinos de terceros y no se define `referrerpolicy`.
- **Evidencia:** `src/data/i18n.js` (enlaces `href`); `src/components/Projects.astro` y `Contact.astro` con `target="_blank" rel="noreferrer"`.
- **Documento afectado:** Política de Privacidad (sección de terceros).
- **Referencia legal:** RGPD art. 13.1.e) (destinatarios) si se considera relevante; buena práctica.
- **Impacto potencial:** `rel="noreferrer"` ya evita enviar el referrer desde los enlaces del portfolio; el destino GitHub aplica sus propias condiciones tras el clic, por lo que el riesgo es bajo.
- **Recomendación:** Mencionar GitHub como destino de los enlaces y mantener `rel="noreferrer"`. Valorar `referrerpolicy="no-referrer"` global si se quiere homogeneidad.
- **Certeza:** Confirmada.

### F-006 — Infraestructura y región sin documentar

- **Severidad:** MINOR
- **Descripción:** No consta documentación sobre la región de alojamiento ni sobre los logs de GitHub Pages.
- **Evidencia:** `astro.config.mjs:4`; `.github/workflows/deploy.yml`; API de Pages (sin `public_config` visible).
- **Documento afectado:** Política de Privacidad / documentación operativa.
- **Referencia legal:** RGPD art. 13.1.f) y capítulo V, solo si se confirma tratamiento y transferencia.
- **Impacto potencial:** No es verificable; la afirmación de ubicación o garantías sin evidencia sería especulativa.
- **Recomendación:** Si se publica la política, limitarse a «el alojamiento lo provides GitHub Pages» y remitir a la documentación oficial del proveedor para detalles de región y logs.
- **Certeza:** Externa.

---

## 14. Checklist RGPD

| # | Requisito | Estado | Notas |
|---|---|---|---|
| 1 | Identidad y contacto del responsable | ❌ | Solo el nombre en el hero/footer; sin correo ni domicilio a efectos de contacto |
| 2 | Datos del DPO, solo si se ha designado | N/A | No se identifica designación; no se aprecian condiciones del art. 37 |
| 3 | Finalidades del tratamiento | ❌ | No declaradas; se observan renderizado tipográfico y entrega del sitio |
| 4 | Base jurídica por finalidad | ❌ | No declarada |
| 5 | Intereses legítimos, si se invocan | ❌ | No se invocan ni se describen |
| 6 | Destinatarios (responsable/encargado/receptor) | ❌ | Google y GitHub no aparecen como destinatarios |
| 7 | Transferencias a terceros países y salvaguardas | ❌ | No declaradas; mecanismo no verificable |
| 8 | Plazos de conservación o criterios | ❌ | No declarados |
| 9 | Origen de datos no obtenidos directamente | N/A | No se recogen datos de terceras fuentes |
| 10 | Derecho de acceso | ❌ | No se describe el procedimiento |
| 11 | Derecho de rectificación | ❌ | No se describe |
| 12 | Derecho de supresión | ❌ | No se describe |
| 13 | Derecho de limitación | ❌ | No se describe |
| 14 | Derecho a la portabilidad | ❌ | No se describe |
| 15 | Derecho de oposición | ❌ | No se describe |
| 16 | Decisiones automatizadas y perfilado | N/A | No se observa perfilado ni toma de decisiones automatizada |
| 17 | Cómo ejercer los derechos | ❌ | Sin correo ni canal de contacto |
| 18 | Plazo de respuesta: un mes, con prórrogas legales | ❌ | No se informa del plazo del art. 12(3) |
| 19 | Derecho a reclamar ante una autoridad de control | ❌ | No se menciona |
| 20 | Consentimiento válido | N/A | No se solicita consentimiento para ninguna finalidad |
| 21 | Retirada tan fácil como el otorgamiento | N/A | No hay consentimiento que retirar |
| 22 | Consentimiento separado por finalidad | N/A | No hay múltiples finalidades con consentimiento |
| 23 | Verificación de edad / consentimiento parental | N/A | Sitio no dirigido a menores; sin recogida de datos |
| 24 | Categorías especiales identificadas | N/A | No se tratan |
| 25 | Condición del art. 9(2) | N/A | No aplica |
| 26 | Protección de datos por diseño y por defecto | ✅ | Sitio estático, sin recogida de datos, una sola dependencia, sin JS en producción |
| 27 | Registro de actividades (art. 30, obligación interna) | ⚠️ | No verificable desde el repositorio; obligación interna donde proceda |
| 28 | Notificación de brechas (art. 33/34) | N/A | El procedimiento interno no debe publicarse en la política de privacidad |
| 29 | DPA con encargados | ⚠️ | Depende de acuerdos con GitHub/Google; no inspeccionables |
| 30 | Medidas técnicas y organizativas (art. 32) | ⚠️ | No descritas; el diseño estático minimiza superficie, pero no hay declaración |
| 31 | Categorías de cookies listadas | ❌ | No hay política de cookies; no se observan cookies |
| 32 | Consentimiento para cookies no esenciales | N/A | No se observan cookies no esenciales |
| 33 | Retirada del consentimiento de cookies | N/A | No hay consentimiento de cookies |
| 34 | Cookies y rastreadores de terceros divulgados | ❌ | No hay rastreadores observados; tampoco declaración al respecto |
| 35 | Duración de las cookies | N/A | No hay cookies |
| 36 | Países de transferencia identificados | ❌ | No declarados |
| 37 | Mecanismo de transferencia indicado | ❌ | No declarado |
| 38 | Salvaguardas adicionales evaluadas cuando procede | ⚠️ | No verificable; depende del importador real y del mecanismo |

---

## 15. Recomendaciones priorizadas

1. **[IMPORTANT] Publicar un Aviso Legal** con identidad del titular, domicilio o dirección de contacto, correo electrónico y licencia del contenido. Base: F-001 y LSSI-CE art. 10.1. Requiere valoración jurídica sobre su aplicabilidad a un portfolio personal.
2. **[IMPORTANT] Decidir el enfoque de Google Fonts**: servir las fuentes localmente desde `public/` (recomendado, elimina la comunicación con Google) o documentar el proveedor, los datos de conexión, la finalidad y el mecanismo de transferencia. Base: F-002.
3. **[IMPORTANT] Añadir un canal de contacto de privacidad** (correo) y mencionar el plazo de un mes y el derecho a reclamar. Base: F-003.
4. **[MINOR] Declarar expresamente que no se usan cookies ni analítica**. Base: F-004.
5. **[MINOR] Identificar GitHub como destino de enlaces** y conservar `rel="noreferrer"`. Base: F-005.
6. **[MINOR] Documentar el alojamiento** sin inventar región ni garantías no verificables. Base: F-006.

Nota: este informe es de solo lectura. No se ha modificado el código, las políticas, la configuración ni se han realizado despliegues.

---

## 16. Fuentes y referencias legales

| Fuente | URL | Fecha de consulta |
|---|---|---|
| Reglamento (UE) 2016/679 (RGPD), texto consolidado — arts. 6, 12-14, 15-22, 28, 32, 37, 44-49 | https://eur-lex.europa.eu/eli/reg/2016/679/oj | 2026-11-24 |
| Ley 34/2002 (LSSI-CE), texto consolidado — arts. 10 y 22.2 | https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758 | 2026-11-24 |
| Ley Orgánica 3/2018 (LOPDGDD) | Referencia normativa general; texto no consultado en esta sesión | 2026-11-24 (citada) |
| Metodología `privacy-audit` (skill local): `audit-methodology.md`, `gdpr-checklist.md`, `code-analysis.md` | Archivos locales en `~/.config/opencode/skills/privacy-audit/` | 2026-11-24 |

---

## 17. Estado de remediación (2026-11-24)

Tras la auditoría, el usuario autorizó aplicar las recomendaciones y aclaró que el sitio es un **portfolio personal sin ánimo de lucro**. Cambios realizados:

| Hallazgo | Acción aplicada | Estado |
|---|---|---|
| F-001 | Añadida página `/[lang]/legal/` con aviso legal y privacidad, enlazada desde el pie de página en los tres idiomas. Redactada sin atribuir obligaciones de la LSSI-CE a una actividad no comercial. | Parcial: hay identidad y contacto vía GitHub, pero no se dispone de correo electrónico propio. |
| F-002 | Fuentes auto-hospedadas en `public/fonts/` con `@font-face`; eliminados `preconnect` y la hoja de estilo remota de Google. Ya no queda ninguna URL de `fonts.googleapis.com` ni `fonts.gstatic.com` en el código ni en `dist`. | Resuelto |
| F-003 | La página legal indica el canal de contacto (perfil de GitHub), el plazo de respuesta de un mes y el derecho a reclamar ante la autoridad de control. | Parcial: el canal es GitHub, no un correo. |
| F-004 | Declaración expresa de que no se instalan cookies propias ni de terceros. | Resuelto |
| F-005 | La página legal identifica GitHub como destino de terceros; se conserva `rel="noreferrer"` y se añade `<meta name="referrer" content="no-referrer">`. | Resuelto |
| F-006 | La página legal menciona GitHub Pages como alojamiento sin inventar región, retención ni garantías. | Resuelto en documentación; la configuración externa sigue sin ser verificable. |

Nota: la condición de «sin ánimo de lucro» se registra como hecho declarado por el usuario, no como algo verificable desde el código. El contenido de la página legal es informativo y no constituye asesoramiento jurídico.

---

*Fin del informe. Este documento es un análisis automatizado y no constituye asesoramiento jurídico ni una certificación de cumplimiento.*
