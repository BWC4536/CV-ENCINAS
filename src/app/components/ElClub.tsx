import { MapPin, Phone, Mail, Heart, Shield, Target, Users } from 'lucide-react';
import logo from '../../imports/image-768x768-removebg-preview.png';
import facilityImg from '../../imports/image__4_.png';
import teamGroupImg from '../../imports/image.png';

const boardMembers = [
  {
    id: 1,
    name: 'D. Luis Moncayo Martínez',
    role: 'Presidente',
    bio: 'Fundador y máximo representante del club, con más de 15 años de dedicación al voleibol en Valencina de la Concepción.',
    isPresident: true,
  },
  {
    id: 2,
    name: 'Dña. Carmen Ruiz Vega',
    role: 'Vicepresidenta',
    bio: 'Responsable de la gestión deportiva y coordinación de los equipos base y categorías de formación.',
    isPresident: false,
  },
  {
    id: 3,
    name: 'D. Antonio García Mora',
    role: 'Secretario',
    bio: 'Encargado de la administración interna, gestión de licencias federativas y comunicaciones oficiales del club.',
    isPresident: false,
  },
  {
    id: 4,
    name: 'Dña. Isabel Torres López',
    role: 'Tesorera',
    bio: 'Gestión económica del club, presupuestos anuales y relación con patrocinadores y entidades colaboradoras.',
    isPresident: false,
  },
];

const values = [
  { icon: Heart, title: 'Pasión', desc: 'El amor por el voleibol impulsa todo lo que hacemos dentro y fuera de la pista.' },
  { icon: Shield, title: 'Respeto', desc: 'Fomentamos el juego limpio, la deportividad y el respeto entre compañeros y rivales.' },
  { icon: Target, title: 'Excelencia', desc: 'Buscamos la mejora continua en todos nuestros equipos y categorías.' },
  { icon: Users, title: 'Comunidad', desc: 'Somos un punto de encuentro para la comunidad de Valencina de la Concepción.' },
];

export function ElClub() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Conoce nuestra historia</p>
              <h1 className="text-4xl sm:text-5xl font-black">El Club</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mt-4">
            Encinas Volley C.D., un proyecto deportivo nacido del corazón de Valencina de la Concepción que une a familias, deportistas y vecinos.
          </p>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-red-600 block rounded-full"></span>
              <h2 className="text-black font-black text-3xl uppercase tracking-wide">Nuestra Historia</h2>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Encinas Volley C.D. nació como respuesta a la creciente demanda de voleibol en Valencina de la Concepción. Desde sus humildes comienzos, el club ha crecido hasta convertirse en un referente deportivo en toda la comarca del Aljarafe sevillano.
              </p>
              <p>
                Con equipos en categorías desde iniciación hasta senior, el club apuesta por la formación integral de sus deportistas, combinando la competición de alto nivel con los valores del deporte base: compañerismo, esfuerzo y superación.
              </p>
              <p>
                Gracias al apoyo del <strong>Ayuntamiento de Valencina de la Concepción</strong>, la <strong>Federación Andaluza de Voleibol (FAVB)</strong> y nuestros patrocinadores, seguimos creciendo temporada tras temporada.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 lg:h-96">
            <img src={teamGroupImg} alt="Historia del club" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-black text-2xl">+ 12 años</span>
              <p className="text-white/80 text-sm">de voleibol en Valencina</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black font-black text-3xl uppercase tracking-wide mb-2">Nuestros Valores</h2>
            <p className="text-gray-500 text-sm">Los pilares que guían todo lo que hacemos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Icon size={22} className="text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-black font-black text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-1 h-8 bg-red-600 block rounded-full"></span>
            <h2 className="text-black font-black text-3xl uppercase tracking-wide">Junta Directiva</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boardMembers.map((member) => (
              <div
                key={member.id}
                className={`rounded-2xl overflow-hidden border transition-shadow hover:shadow-xl ${
                  member.isPresident
                    ? 'border-red-200 shadow-md shadow-red-100'
                    : 'border-gray-100 shadow-sm'
                }`}
              >
                <div
                  className={`h-2 ${member.isPresident ? 'bg-red-600' : 'bg-gray-200'}`}
                />
                <div className="p-6 flex gap-5 items-start bg-white">
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 font-black text-2xl ${
                      member.isPresident
                        ? 'bg-red-600 text-white'
                        : 'bg-black text-white'
                    }`}
                  >
                    {member.name.split(' ').find((n) => n.length > 1)?.charAt(0) ?? 'D'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                      <h3 className="text-black font-black text-base leading-tight">{member.name}</h3>
                      {member.isPresident && (
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
                          Presidente
                        </span>
                      )}
                    </div>
                    {!member.isPresident && (
                      <p className={`text-sm font-bold mb-2 ${member.isPresident ? 'text-red-600' : 'text-gray-500'}`}>
                        {member.role}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities — Split Screen */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-1 h-8 bg-red-600 block rounded-full"></span>
            <h2 className="text-white font-black text-3xl uppercase tracking-wide">Nuestras Instalaciones</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-white font-black text-2xl mb-2">Pabellón Municipal Hernandez Albarracin</h3>
                <p className="text-gray-400 leading-relaxed">
                  Nuestro hogar es el Pabellón Municipal de Valencina de la Concepción, una instalación deportiva moderna con todas las comodidades para la práctica del voleibol de competición y formación.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <MapPin size={22} className="text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-sm">Dirección</p>
                    <p className="text-gray-400 text-sm">Calle Ramón y Cajal 37,<br />41907 Valencina de la Concepción, Sevilla</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <Phone size={22} className="text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-sm">Teléfono de Contacto</p>
                    <a href="tel:+34654515782" className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                      +34 654 515 782
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <Mail size={22} className="text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-sm">Email</p>
                    <a href="mailto:lasencinas.clubdeportivo@gmail.com" className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors break-all">
                      lasencinas.clubdeportivo@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map + Photo */}
            <div className="space-y-4">
              {/* Facility Photo */}
              <div className="relative rounded-2xl overflow-hidden h-52">
                <img
                  src={facilityImg}
                  alt="Instalaciones del club"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-bold bg-red-600 px-3 py-1 rounded-full">
                    Pabellón Municipal
                  </span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative rounded-2xl overflow-hidden h-56 bg-gray-800 border border-white/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                {/* Decorative grid for map feel */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-600/50">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-sm">Valencina de la Concepción</p>
                  <p className="text-gray-400 text-xs mt-1">C/ Ramón y Cajal 37 · Sevilla</p>
                  <a
                    href="https://maps.google.com/?q=Calle+Ramón+y+Cajal+37,+Valencina+de+la+Concepción"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    <MapPin size={12} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
