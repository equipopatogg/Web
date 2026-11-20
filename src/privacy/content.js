// Aviso de privacidad (requisito 16-17): misma fuente que el aviso de la app y el documento Word.
// Versión que acepta el usuario en la app: PRIVACY_VERSION.
export const PRIVACY = {
  "version": "2026-10-01",
  "updated": "18 de noviembre de 2026",
  "sections": [
    [
      "1. Quién es responsable",
      [
        "PactoGG es una app de retos y torneos entre amigos desarrollada como proyecto académico por el equipo PactoGG (David Montoya Rodríguez, Kevin Hernández Trejo, Diego Salinas Laguna y José Gamaliel Potenciano Méndez), estudiantes de la Universidad Tecnológica de Tula-Tepeji, Hidalgo.",
        "Contacto para cualquier tema de datos personales: **equipopatogg@gmail.com**."
      ]
    ],
    [
      "2. Qué datos tratamos",
      [
        "**Cuenta:** correo electrónico, apodo y contraseña. La contraseña se guarda protegida con Argon2id; nunca la guardamos en texto.",
        "**Acceso con Google (opcional):** el identificador de tu cuenta de Google y tu correo verificado. No recibimos tu contraseña de Google.",
        "**Perfil:** color de avatar o la foto de perfil que decidas subir, y tus estadísticas en la app (retos cumplidos, Índice de Palabra, trofeos).",
        "**Lo que publicas en tus grupos:** nombre del grupo, retos (juego, condición, recompensa, fecha y fianza en puntos virtuales), evidencias en foto o enlace, votos y comentarios del jurado, compromisos, torneos y resultados, reportes y bloqueos.",
        "**Reto por voz (opcional):** el texto de la frase que dictas y los apodos de tu grupo, para convertirlos en un borrador de reto. La app no graba ni envía audio: el dictado lo hace el reconocedor de voz de tu teléfono.",
        "**Notificaciones (opcional):** el identificador de notificaciones de tu teléfono y tus preferencias de avisos.",
        "**Datos técnicos y de seguridad:** registros de errores y de acciones importantes (con identificadores, sin contraseñas ni fotos), intentos de inicio de sesión y límites de uso, versión del aviso que aceptaste y su fecha.",
        "No pedimos ubicación, contactos, cámara ni datos financieros. Los puntos de PactoGG son virtuales y no tienen valor monetario."
      ]
    ],
    [
      "3. Para qué los usamos",
      [
        "Crear tu cuenta, verificar tu correo e iniciar y cerrar sesión de forma segura.",
        "Que funcionen los grupos, retos, jurado, puntos, compromisos, torneos, Muro de la Fama y Los Tramposos.",
        "Revisar con servicios automáticos que fotos y textos no sean inapropiados antes de guardarlos; si lo son, no se guardan.",
        "Mandarte avisos dentro de la app y notificaciones push si las permites.",
        "Proteger la plataforma: prevenir abusos, atender reportes y cumplir obligaciones legales.",
        "No vendemos tus datos, no los usamos para publicidad y no hacemos perfiles comerciales."
      ]
    ],
    [
      "4. Con quién se procesan",
      [
        "Usamos proveedores que procesan los datos por nuestra cuenta y solo para operar la app:",
        "**Amazon Web Services (EE. UU., región us-east-1):** servidores, almacenamiento de fotos (S3 y CloudFront), moderación de imágenes (Rekognition) y de texto (Comprehend), registros (CloudWatch) y parámetros cifrados.",
        "**MongoDB Atlas:** base de datos de la app.",
        "**Google:** Firebase Cloud Messaging para notificaciones, acceso con Google y envío de correos (verificación y recuperación de contraseña).",
        "**Groq:** convierte el texto de la frase dictada en un borrador de reto. Solo recibe ese texto y los apodos del grupo.",
        "**Microsoft Azure Static Web Apps:** aloja las páginas web de PactoGG (verificación de correo y este aviso).",
        "Algunos de estos proveedores están fuera de México; al usar la app aceptas esa transferencia para las finalidades descritas. No compartimos tus datos con nadie más, salvo que una autoridad lo requiera conforme a la ley."
      ]
    ],
    [
      "5. Cuánto tiempo los conservamos",
      [
        "Las fotos de evidencia se borran a los **30 días**, salvo las que el grupo guarda en el Muro de la Fama.",
        "Los avisos dentro de la app se borran a los **30 días** y las sesiones vencen a los **30 días** sin uso.",
        "La frase dictada no se guarda; solo se conserva unos minutos en memoria para no procesarla dos veces.",
        "Tu cuenta y tus datos se conservan mientras la uses. Al eliminarla se borran tus datos personales y tus fotos de inmediato, y los retos ya cerrados quedan en el historial del grupo sin tu nombre."
      ]
    ],
    [
      "6. Tus derechos",
      [
        "Puedes ver y corregir tu apodo y avatar desde **Perfil** en la app.",
        "Puedes eliminar tu cuenta desde **Perfil > Eliminar mi cuenta**.",
        "Para acceder, rectificar, cancelar u oponerte al tratamiento de tus datos (derechos ARCO), o para retirar tu consentimiento, escribe a equipopatogg@gmail.com desde el correo de tu cuenta. Te respondemos en un plazo máximo de **20 días hábiles**."
      ]
    ],
    [
      "7. Seguridad",
      [
        "Toda la comunicación usa HTTPS. Las contraseñas se guardan con Argon2id, las sesiones de la app se guardan cifradas en tu teléfono y las claves de los servicios viven en un almacén cifrado, no en el código.",
        "Los grupos son privados: solo sus miembros ven sus retos y evidencias."
      ]
    ],
    [
      "8. Permisos de la app",
      [
        "**Internet:** para comunicarse con el servidor.",
        "**Notificaciones (opcional):** para avisarte de retos, votos y torneos. Puedes quitarlo en los ajustes del teléfono.",
        "Las fotos se eligen con el selector del sistema; la app solo recibe la imagen que eliges."
      ]
    ],
    [
      "9. Menores de edad",
      [
        "PactoGG está pensada para personas de 13 años o más. Si eres menor de 18 años, úsala con autorización de tu madre, padre o tutor."
      ]
    ],
    [
      "10. Cookies y analítica",
      [
        "La app no usa cookies ni analítica de terceros. La página web de PactoGG usa Google Analytics 4 solo si aceptas el aviso de analítica de la página: cuenta visitas de forma agregada, con la IP anonimizada y sin nombres, correos ni identificadores de cuenta. Si lo rechazas, no se carga."
      ]
    ],
    [
      "11. Cambios a este aviso",
      [
        "Si el aviso cambia, publicaremos la nueva versión en esta página y te pediremos aceptarla de nuevo en la app."
      ]
    ]
  ]
};
