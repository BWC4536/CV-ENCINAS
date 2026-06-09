import { Trophy } from 'lucide-react';
import { CalendarGrid } from './CalendarGrid';

const standings = [
  { pos: 1, team: 'Encinas Volley C.D.', pts: 28, pj: 12, pg: 9, pp: 3, highlight: true },
  { pos: 2, team: 'Mairena Voley Club', pts: 25, pj: 12, pg: 8, pp: 4, highlight: false },
  { pos: 3, team: 'C.D. Sevilla Voley', pts: 22, pj: 12, pg: 7, pp: 5, highlight: false },
  { pos: 4, team: 'Utrera Voleibol', pts: 19, pj: 12, pg: 6, pp: 6, highlight: false },
  { pos: 5, team: 'Coria del Río V.C.', pts: 16, pj: 12, pg: 5, pp: 7, highlight: false },
  { pos: 6, team: 'Alcalá Voley', pts: 13, pj: 12, pg: 4, pp: 8, highlight: false },
  { pos: 7, team: 'Bormujos Voleibol', pts: 10, pj: 12, pg: 3, pp: 9, highlight: false },
  { pos: 8, team: 'Los Palacios V.C.', pts: 7, pj: 12, pg: 2, pp: 10, highlight: false },
];

export function Calendario() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">
              Temporada 2025–2026
            </p>
            <h1 className="text-4xl sm:text-5xl font-black">Calendario</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mt-4">
            Consulta los partidos de Encinas Volley C.D. y sigue la clasificación de la temporada.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ─── Calendar Grid ─── */}
        <div className="lg:col-span-3">
          <CalendarGrid />
        </div>

        {/* ─── Sidebar: Clasificación + Temporada ─── */}
        <div className="lg:col-span-2">
          {/* Standings Table */}
          <div className="flex items-center gap-3 mb-6">
            <Trophy size={22} className="text-red-600" />
            <h2 className="text-black font-black text-xl uppercase tracking-wide">Clasificación</h2>
            <span className="ml-2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">2ª Andaluza Masc.</span>
          </div>

          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {/* Table Header */}
            <div className="bg-black grid grid-cols-[40px_1fr_50px_40px_40px_40px] items-center px-4 py-3">
              <span className="text-gray-400 text-xs font-bold text-center">POS</span>
              <span className="text-gray-400 text-xs font-bold pl-2">EQUIPO</span>
              <span className="text-white text-xs font-bold text-center">PTS</span>
              <span className="text-gray-400 text-xs font-bold text-center">PJ</span>
              <span className="text-gray-400 text-xs font-bold text-center">PG</span>
              <span className="text-gray-400 text-xs font-bold text-center">PP</span>
            </div>

            {standings.map((row, i) => (
              <div
                key={row.pos}
                className={`grid grid-cols-[40px_1fr_50px_40px_40px_40px] items-center px-4 py-3.5 border-b border-gray-50 transition-colors ${
                  row.highlight
                    ? 'bg-red-50 border-l-4 border-l-red-600'
                    : i % 2 === 0
                    ? 'bg-white hover:bg-gray-50'
                    : 'bg-gray-50/50 hover:bg-gray-100/50'
                }`}
              >
                <div className="flex items-center justify-center">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      row.pos === 1
                        ? 'bg-yellow-400 text-black'
                        : row.pos === 2
                        ? 'bg-gray-300 text-black'
                        : row.pos === 3
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {row.pos}
                  </span>
                </div>
                <span
                  className={`pl-2 text-sm font-bold truncate ${
                    row.highlight ? 'text-red-700' : 'text-black'
                  }`}
                >
                  {row.team}
                  {row.highlight && (
                    <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">Nosotros</span>
                  )}
                </span>
                <span
                  className={`text-center text-sm font-black ${
                    row.highlight ? 'text-red-600' : 'text-black'
                  }`}
                >
                  {row.pts}
                </span>
                <span className="text-center text-sm text-gray-500">{row.pj}</span>
                <span className="text-center text-sm text-green-600 font-bold">{row.pg}</span>
                <span className="text-center text-sm text-red-500 font-bold">{row.pp}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>PTS = Puntos</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>PJ = Jugados</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>PG = Ganados · PP = Perdidos</div>
          </div>

          {/* Season Info */}
          <div className="mt-8 bg-black rounded-2xl p-6 text-white">
            <h3 className="font-black text-sm uppercase tracking-widest text-red-400 mb-4">Temporada 2025–26</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-black text-white">9</div>
                <div className="text-xs text-gray-400">Victorias</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">3</div>
                <div className="text-xs text-gray-400">Derrotas</div>
              </div>
              <div>
                <div className="text-3xl font-black text-yellow-400">28</div>
                <div className="text-xs text-gray-400">Puntos</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">1º</div>
                <div className="text-xs text-gray-400">Posición</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
