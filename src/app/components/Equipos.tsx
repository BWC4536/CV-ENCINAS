import { useState } from 'react';
import { Users, Search } from 'lucide-react';
type Player = {
  id: number;
  number: number;
  name: string;
  position: string;
  category: string;
  image?: string;
};

const players: Player[] = [
  { id: 1, number: 1, name: 'Alejandro García', position: 'Colocador', category: 'Senior Masculino' },
  { id: 2, number: 4, name: 'Martín Rodríguez', position: 'Opuesto', category: 'Senior Masculino' },
  { id: 3, number: 7, name: 'David Torres', position: 'Central', category: 'Senior Masculino' },
  { id: 4, number: 9, name: 'Pablo Moreno', position: 'Receptor', category: 'Senior Masculino' },
  { id: 5, number: 11, name: 'Sergio López', position: 'Líbero', category: 'Senior Masculino' },
  { id: 6, number: 14, name: 'Carlos Jiménez', position: 'Central', category: 'Senior Masculino' },
  { id: 7, number: 2, name: 'Ana Martínez', position: 'Colocadora', category: 'Senior Femenino' },
  { id: 8, number: 5, name: 'Laura Sánchez', position: 'Opuesta', category: 'Senior Femenino' },
  { id: 9, number: 8, name: 'Sofía Hernández', position: 'Central', category: 'Senior Femenino' },
  { id: 10, number: 10, name: 'Elena Gómez', position: 'Receptora', category: 'Senior Femenino' },
  { id: 11, number: 12, name: 'Lucía Díaz', position: 'Líbero', category: 'Senior Femenino' },
  { id: 12, number: 15, name: 'Natalia Pérez', position: 'Central', category: 'Senior Femenino' },
  { id: 13, number: 3, name: 'Javier Ruiz', position: 'Colocador', category: 'Junior Masculino' },
  { id: 14, number: 6, name: 'Adrián Castro', position: 'Receptor', category: 'Junior Masculino' },
  { id: 15, number: 16, name: 'Carmen Flores', position: 'Opuesta', category: 'Junior Femenino' },
  { id: 16, number: 18, name: 'Marta Vega', position: 'Colocadora', category: 'Junior Femenino' },
];


const categories = ['Todos', 'Senior Masculino', 'Senior Femenino', 'Junior Masculino', 'Junior Femenino'];

const positionColors: Record<string, string> = {
  'Colocador': 'bg-blue-100 text-blue-700',
  'Colocadora': 'bg-blue-100 text-blue-700',
  'Opuesto': 'bg-purple-100 text-purple-700',
  'Opuesta': 'bg-purple-100 text-purple-700',
  'Central': 'bg-green-100 text-green-700',
  'Receptor': 'bg-yellow-100 text-yellow-700',
  'Receptora': 'bg-yellow-100 text-yellow-700',
  'Líbero': 'bg-orange-100 text-orange-700',
};

export function Equipos() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [search, setSearch] = useState('');

  const filtered = players.filter((p) => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.position.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Users size={32} className="text-red-500" />
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Club Deportivo</p>
              <h1 className="text-4xl sm:text-5xl font-black">Nuestros Equipos</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mt-4">
            Deportistas comprometidos con la excelencia. Conoce a los jugadores que representan a Encinas Volley C.D. en cada categoría.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${activeCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar jugador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 w-48 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Player Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No se encontraron jugadores</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((player) => (
              <div
                key={player.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Photo */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="w-20 h-20 rounded-full bg-black/10 flex items-center justify-center">
                        <span className="text-black/30 font-black text-3xl">
                          {player.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Red accent top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
                  {/* Number Badge */}
                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-sm">#{player.number}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-black font-black text-sm leading-tight mb-2">{player.name}</h3>
                  <span
                    className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${positionColors[player.position] ?? 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {player.position}
                  </span>
                  <p className="text-gray-400 text-xs mt-2">{player.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Count */}
      <div className="bg-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Senior Masculino', count: players.filter((p) => p.category === 'Senior Masculino').length },
              { label: 'Senior Femenino', count: players.filter((p) => p.category === 'Senior Femenino').length },
              { label: 'Junior Masculino', count: players.filter((p) => p.category === 'Junior Masculino').length },
              { label: 'Junior Femenino', count: players.filter((p) => p.category === 'Junior Femenino').length },
            ].map((cat) => (
              <div key={cat.label} className="text-center p-6 border border-white/10 rounded-xl">
                <div className="text-red-500 font-black text-4xl mb-2">{cat.count}</div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
