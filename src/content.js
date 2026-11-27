// import.meta.env solo existe al compilar con Vite; en las pruebas de Node queda vacío.
const env = import.meta.env ?? {};
export const HERO_SRC = `${env.BASE_URL ?? '/'}assets/tournament-hero.png`;
export const HERO_ALT = 'Amigos reunidos compiten desde sus teléfonos durante un torneo.';
export const CONTACT_EMAIL = 'equipopatogg@gmail.com';
// Ficha pública de la app (applicationId com.pactogg.app). Una variable del repositorio puede sobrescribirla.
export const PLAY_STORE_URL = env.VITE_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.pactogg.app';
// Mientras la app está en prueba cerrada, la ficha pública da 404: los testers se unen por esta liga.
export const PLAY_TESTING_URL = 'https://play.google.com/apps/testing/com.pactogg.app';
// Measurement ID de Google Analytics 4 de la cuenta del equipo; se carga solo con consentimiento.
export const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID || '';
// Ruta del aviso: la app la abre desde BuildConfig.PRIVACY_URL.
export const PRIVACY_PATH = '/privacidad';
