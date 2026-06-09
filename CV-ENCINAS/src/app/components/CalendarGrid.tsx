import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar, Loader2 } from 'lucide-react';
import { useGoogleCalendar, getEventDate, formatEventTime, type CalendarEvent } from '../hooks/useGoogleCalendar';

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Returns 0=Monday ... 6=Sunday */
function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday-first
}

export function CalendarGrid() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const { events, loading, isUsingFallback } = useGoogleCalendar(currentYear, currentMonth);

  // Build a map: day number -> events on that day
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    events.forEach((ev) => {
      const d = getEventDate(ev);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        const day = d.getDate();
        if (!map.has(day)) map.set(day, []);
        map.get(day)!.push(ev);
      }
    });
    return map;
  }, [events, currentMonth, currentYear]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  // Previous month days to fill the first row
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const prevMonth = () => {
    setSelectedDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    setSelectedDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const selectedEvents = selectedDate ? eventsByDay.get(selectedDate) || [] : [];

  // Build grid cells
  const cells: Array<{ day: number; isCurrentMonth: boolean }> = [];

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  // Next month padding to complete grid
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, isCurrentMonth: false });
    }
  }

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar size={22} className="text-red-600" />
          <h2 className="text-black font-black text-xl uppercase tracking-wide">Calendario</h2>
        </div>
        {isUsingFallback && (
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            Datos de ejemplo
          </span>
        )}
      </div>

      {/* Month Navigation */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-black px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div className="text-center">
            <span className="text-white font-black text-lg sm:text-xl tracking-wide">
              {MONTH_NAMES[currentMonth]}
            </span>
            <span className="text-gray-400 font-bold text-lg sm:text-xl ml-2">{currentYear}</span>
          </div>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Mes siguiente"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              className="py-2.5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="text-red-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {cells.map((cell, idx) => {
              const hasEvent = cell.isCurrentMonth && eventsByDay.has(cell.day);
              const isSelected = cell.isCurrentMonth && selectedDate === cell.day;
              const isTodayCell = cell.isCurrentMonth && isToday(cell.day);
              const isWeekend = idx % 7 >= 5;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (cell.isCurrentMonth) {
                      setSelectedDate(isSelected ? null : cell.day);
                    }
                  }}
                  disabled={!cell.isCurrentMonth}
                  className={`
                    relative aspect-square flex flex-col items-center justify-center border-b border-r border-gray-50
                    transition-all duration-150 group
                    ${!cell.isCurrentMonth ? 'text-gray-200 cursor-default' : 'cursor-pointer hover:bg-red-50'}
                    ${isSelected ? 'bg-red-600 text-white hover:bg-red-700' : ''}
                    ${isTodayCell && !isSelected ? 'bg-yellow-50' : ''}
                    ${isWeekend && cell.isCurrentMonth && !isSelected ? 'bg-gray-50/60' : ''}
                  `}
                >
                  <span
                    className={`
                      text-sm font-bold transition-colors
                      ${!cell.isCurrentMonth ? 'text-gray-200' : ''}
                      ${cell.isCurrentMonth && !isSelected ? 'text-gray-700' : ''}
                      ${isTodayCell && !isSelected ? 'text-red-600 font-black' : ''}
                      ${isSelected ? 'text-white' : ''}
                    `}
                  >
                    {cell.day}
                  </span>

                  {/* Today indicator */}
                  {isTodayCell && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-red-500" />
                  )}

                  {/* Event dot */}
                  {hasEvent && !isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  )}
                  {hasEvent && isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Day Events */}
      {selectedDate !== null && selectedEvents.length > 0 && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            {selectedDate} de {MONTH_NAMES[currentMonth]} {currentYear}
          </p>
          {selectedEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-red-600 h-1" />
              <div className="p-4">
                <h4 className="text-black font-black text-sm leading-tight mb-2">
                  {ev.summary}
                </h4>
                {ev.description && (
                  <p className="text-gray-400 text-xs mb-3">{ev.description}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={13} className="text-red-500 shrink-0" />
                    {formatEventTime(ev)} h
                  </div>
                  {ev.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin size={13} className="text-red-500 shrink-0" />
                      {ev.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state when day selected but no events */}
      {selectedDate !== null && selectedEvents.length === 0 && (
        <div className="mt-4 text-center py-6 bg-gray-50 rounded-xl border border-gray-100">
          <Calendar size={24} className="text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">
            Sin partidos el {selectedDate} de {MONTH_NAMES[currentMonth]}
          </p>
        </div>
      )}
    </div>
  );
}
