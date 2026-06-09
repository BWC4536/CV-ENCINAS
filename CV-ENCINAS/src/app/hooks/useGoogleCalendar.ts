import { useState, useEffect, useCallback } from 'react';
import { GOOGLE_CALENDAR_CONFIG, SAMPLE_EVENTS } from '../config/googleCalendarConfig';

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

interface UseGoogleCalendarResult {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  isUsingFallback: boolean;
}

/**
 * Hook para obtener eventos de Google Calendar.
 * Si no hay API key configurada, usa datos de ejemplo.
 */
export function useGoogleCalendar(year: number, month: number): UseGoogleCalendarResult {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { apiKey, calendarId } = GOOGLE_CALENDAR_CONFIG;

    // Si no hay API key, usar datos de ejemplo
    if (!apiKey || !calendarId) {
      const timeMin = new Date(year, month, 1);
      const timeMax = new Date(year, month + 1, 0, 23, 59, 59);

      const filtered = SAMPLE_EVENTS.filter((ev) => {
        const evDate = new Date(ev.start.dateTime);
        return evDate >= timeMin && evDate <= timeMax;
      });

      setEvents(filtered);
      setIsUsingFallback(true);
      setLoading(false);
      return;
    }

    try {
      const timeMin = new Date(year, month, 1).toISOString();
      const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

      const params = new URLSearchParams({
        key: apiKey,
        timeMin,
        timeMax,
        singleEvents: 'true',
        orderBy: 'startTime',
        maxResults: '50',
      });

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setEvents(data.items || []);
      setIsUsingFallback(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar eventos');
      // Fallback a datos de ejemplo en caso de error
      const timeMin = new Date(year, month, 1);
      const timeMax = new Date(year, month + 1, 0, 23, 59, 59);
      const filtered = SAMPLE_EVENTS.filter((ev) => {
        const evDate = new Date(ev.start.dateTime);
        return evDate >= timeMin && evDate <= timeMax;
      });
      setEvents(filtered);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, isUsingFallback };
}

/** Obtiene la fecha de inicio de un evento como Date */
export function getEventDate(event: CalendarEvent): Date {
  const dateStr = event.start.dateTime || event.start.date || '';
  return new Date(dateStr);
}

/** Formatea la hora de un evento */
export function formatEventTime(event: CalendarEvent): string {
  const date = getEventDate(event);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
