import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router';
import { Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
import logo from '../../imports/image-768x768-removebg-preview.png';

const navLinks = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/equipos', label: 'Equipos' },
  { to: '/calendario', label: 'Calendario' },
  { to: '/el-club', label: 'El Club' },
  { to: '/inscripciones', label: 'Inscripciones' },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black shadow-lg' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src={logo} alt="Encinas Volley C.D." className="h-10 w-10 object-contain" />
              <div className="hidden sm:block">
                <span className="text-white font-bold text-sm leading-tight block">ENCINAS VOLLEY</span>
                <span className="text-red-500 text-xs font-medium tracking-widest">C.D.</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                      isActive
                        ? 'text-red-500 border-b-2 border-red-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/inscripciones"
                className="hidden sm:inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2 rounded transition-colors duration-200"
              >
                Únete al Club
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
                aria-label="Menú"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-black border-t border-white/10">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium rounded transition-colors ${
                      isActive ? 'text-red-400 bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/inscripciones"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded mt-2 transition-colors"
              >
                Únete al Club
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
                <div>
                  <div className="font-bold text-lg text-white">ENCINAS VOLLEY C.D.</div>
                  <div className="text-xs text-gray-400 tracking-widest">VALENCINA DE LA CONCEPCIÓN</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Club de Voleibol de referencia en la comarca del Aljarafe, comprometido con el deporte base y la excelencia deportiva.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-3">
                Navegación
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-3">
                Contacto
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone size={15} className="text-red-500 shrink-0" />
                  <a href="tel:+34654515782" className="hover:text-white transition-colors">+34 654 515 782</a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail size={15} className="text-red-500 shrink-0" />
                  <a href="mailto:lasencinas.clubdeportivo@gmail.com" className="hover:text-white transition-colors break-all">
                    lasencinas.clubdeportivo@gmail.com
                  </a>
                </li>
                <li className="text-gray-400 text-sm mt-2">
                  Calle Ramón y Cajal 37,<br />41907 Valencina de la Concepción, Sevilla
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-xs">
              © 2026 Encinas Volley C.D. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span className="text-gray-500 text-xs">Valencina de la Concepción, Sevilla</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {contactOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Contáctanos</p>
            <a
              href="https://wa.me/34654515782"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 transition-colors"
            >
              <MessageCircle size={20} />
              <div>
                <div className="text-xs font-bold">WhatsApp</div>
                <div className="text-xs opacity-90">+34 654 515 782</div>
              </div>
            </a>
            <a
              href="tel:+34654515782"
              className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white rounded-xl px-4 py-3 transition-colors"
            >
              <Phone size={20} />
              <div>
                <div className="text-xs font-bold">Llamar</div>
                <div className="text-xs opacity-90">+34 654 515 782</div>
              </div>
            </a>
            <a
              href="mailto:lasencinas.clubdeportivo@gmail.com"
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-3 transition-colors"
            >
              <Mail size={20} />
              <div>
                <div className="text-xs font-bold">Email</div>
                <div className="text-xs opacity-90">Escríbenos</div>
              </div>
            </a>
          </div>
        )}
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            contactOpen ? 'bg-gray-800 rotate-45' : 'bg-red-600 hover:bg-red-700 hover:scale-110'
          }`}
          aria-label="Contacto"
        >
          {contactOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <MessageCircle size={22} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
