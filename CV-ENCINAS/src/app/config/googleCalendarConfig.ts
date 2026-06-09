/**
 * Configuración de Google Calendar API.
 *
 * Para configurar:
 * 1. Ve a https://console.cloud.google.com/
 * 2. Crea un proyecto nuevo (o usa uno existente)
 * 3. Habilita la "Google Calendar API"
 * 4. Ve a Credenciales > Crear credenciales > Clave de API
 * 5. Restringe la clave a "Google Calendar API" y a tu dominio
 * 6. Crea un Google Calendar y hazlo público:
 *    - En Google Calendar, ve a Configuración del calendario
 *    - En "Permisos de acceso", marca "Hacer disponible para el público"
 *    - En "Integrar calendario", copia el "ID del calendario"
 * 7. Sustituye los valores aquí abajo
 */

export const GOOGLE_CALENDAR_CONFIG = {
  apiKey: '',
  calendarId: '',
};

/** Datos de ejemplo para cuando no hay API key configurada */
export const SAMPLE_EVENTS = [
  {
    id: 'sample-1',
    summary: 'Encinas Volley vs Mairena Voley Club',
    description: '2ª Andaluza Masculina · Jornada 13',
    location: 'Pabellón Hernandez Albarracin, Valencina',
    start: { dateTime: '2026-06-14T18:00:00+02:00' },
    end: { dateTime: '2026-06-14T20:00:00+02:00' },
  },
  {
    id: 'sample-2',
    summary: 'C.D. Sevilla Voley vs Encinas Volley',
    description: '2ª Andaluza Masculina · Jornada 14',
    location: 'Pabellón Municipal de Sevilla',
    start: { dateTime: '2026-06-21T19:30:00+02:00' },
    end: { dateTime: '2026-06-21T21:30:00+02:00' },
  },
  {
    id: 'sample-3',
    summary: 'Encinas Volley vs Utrera Voleibol',
    description: 'Copa Andalucía · Cuartos de Final',
    location: 'Pabellón Hernandez Albarracin, Valencina',
    start: { dateTime: '2026-06-28T17:00:00+02:00' },
    end: { dateTime: '2026-06-28T19:00:00+02:00' },
  },
  {
    id: 'sample-4',
    summary: 'Encinas Volley vs Bormujos Voleibol',
    description: '2ª Andaluza Masculina · Jornada 15',
    location: 'Pabellón Hernandez Albarracin, Valencina',
    start: { dateTime: '2026-07-05T18:00:00+02:00' },
    end: { dateTime: '2026-07-05T20:00:00+02:00' },
  },
  {
    id: 'sample-5',
    summary: 'Alcalá Voley vs Encinas Volley',
    description: '2ª Andaluza Masculina · Jornada 16',
    location: 'Polideportivo Municipal de Alcalá',
    start: { dateTime: '2026-07-12T19:00:00+02:00' },
    end: { dateTime: '2026-07-12T21:00:00+02:00' },
  },
];
