import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, Trophy, Users, Star } from 'lucide-react';
import heroImg from '../../imports/image.png';
import teamImg1 from '../../imports/image__4_.png';
import teamImg2 from '../../imports/image-1.png';
import teamImg3 from '../../imports/image__3_.png';

const sponsors = [
  { name: 'Ayuntamiento de Valencina', abbr: 'AYT' },
  { name: 'FAVB', abbr: 'FAVB' },
  { name: 'SeviVoley', abbr: 'SV' },
  { name: 'Junta de Andalucía', abbr: 'JDA' },
  { name: 'Diputación de Sevilla', abbr: 'DPT' },
  { name: 'Pabellón Municipal', abbr: 'PM' },
];

const newsItems = [
  {
    id: 1,
    tag: 'Resultados',
    title: 'Junior Femenino brilla en Espartinas',
    excerpt: 'El equipo junior femenino logró una contundente victoria en el torneo celebrado en Espartinas, consolidando su posición en la clasificación.',
    date: '12 Ene 2026',
    image: teamImg1,
  },
  {
    id: 2,
    tag: 'Actividades',
    title: 'Escuelas Deportivas Municipales',
    excerpt: 'Arranca la nueva temporada de las Escuelas Deportivas Municipales con un récord de inscripciones en las categorías de iniciación al voleibol.',
    date: '08 Ene 2026',
    image: teamImg2,
  },
  {
    id: 3,
    tag: 'Próximo Partido',
    title: 'Duelo decisivo en el Pabellón',
    excerpt: 'El primer equipo masculino se prepara para el partido de la temporada ante el rival directo en la lucha por el ascenso a categoría superior.',
    date: '05 Ene 2026',
    image: teamImg3,
  },
];

const stats = [
  { icon: Trophy, value: '12+', label: 'Años de Historia' },
  { icon: Users, value: '150+', label: 'Deportistas' },
  { icon: Star, value: '8', label: 'Equipos Activos' },
];

export function Home() {
  const [currentSponsor, setCurrentSponsor] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Pabellón Municipal de Valencina"
            className="w-full h-full object-cover object-center"
          />
          {/* 40% Black Overlay */}
          <div className="absolute inset-0 bg-black/70" />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Temporada 2025–2026
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
            Siente la pasión del<br />
            <span className="text-red-500">Voleibol</span> en Valencina
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Club Deportivo referente en el Aljarafe. Deporte, esfuerzo y comunidad desde el Pabellón Municipal de Valencina de la Concepción.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/inscripciones"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Únete al Club
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/calendario"
              className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200"
            >
              Próximo Partido
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 divide-x divide-white/10">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4">
                <Icon size={20} className="text-red-500 shrink-0" />
                <div className="text-center sm:text-left">
                  <div className="text-white font-black text-xl leading-none">{value}</div>
                  <div className="text-gray-400 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS GRID ─── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1 h-8 bg-red-600 block rounded-full"></span>
              <h2 className="text-black font-black text-3xl uppercase tracking-wider">Últimas Noticias</h2>
            </div>
            <Link
              to="/el-club"
              className="text-red-600 hover:text-red-700 font-bold text-sm flex items-center gap-1 transition-colors"
            >
              Ver todo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-xs mb-2">{item.date}</p>
                  <h3 className="text-black font-black text-lg leading-tight mb-3 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-red-600 text-sm font-bold group-hover:gap-2 transition-all">
                    Leer más <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS CAROUSEL ─── */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Nuestros Colaboradores</p>
          </div>

          {/* Marquee-style carousel */}
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-8 animate-[marquee_20s_linear_infinite]"
              style={{
                animation: 'marquee 20s linear infinite',
              }}
            >
              {[...sponsors, ...sponsors].map((sponsor, i) => (
                <div
                  key={`${sponsor.abbr}-${i}`}
                  className="shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-xl px-8 py-5 min-w-[180px] grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-black font-black text-2xl mb-1">{sponsor.abbr}</div>
                    <div className="text-gray-400 text-xs leading-tight">{sponsor.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-red-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4">
            ¿Listo para unirte a Encinas Volley?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Jugadores de todas las edades y niveles. Apúntate ahora y forma parte de nuestra gran familia.
          </p>
          <Link
            to="/inscripciones"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-yellow-400 hover:text-black font-black text-lg px-10 py-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Inscríbete Ahora <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
