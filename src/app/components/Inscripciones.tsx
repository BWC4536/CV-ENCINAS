import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardList, CheckCircle, AlertCircle, ChevronDown, X } from 'lucide-react';

type FormData = {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  categoria: string;
  posicion: string;
  experiencia: string;
  mensaje: string;
  gdpr: boolean;
};

const categorias = [
  'Prebenjamín (sub-8)',
  'Benjamín (sub-10)',
  'Alevín (sub-12)',
  'Infantil (sub-14)',
  'Cadete (sub-16)',
  'Junior (sub-18)',
  'Senior Masculino',
  'Senior Femenino',
  'Veteranos',
];

const posiciones = [
  'No lo sé todavía',
  'Colocador/a',
  'Opuesto/a',
  'Central',
  'Receptor/a – Atacante',
  'Líbero',
];

const niveles = [
  'Ninguna – Quiero empezar desde cero',
  'Iniciación – Conozco las reglas básicas',
  'Amateur – He jugado a nivel recreativo',
  'Federado/a – Tengo experiencia en competición',
  'Avanzado/a – Nivel competitivo alto',
];

const faqs = [
  {
    q: '¿Cuánto cuesta la inscripción?',
    a: 'Las cuotas varían según la categoría. Contacta con nosotros para información detallada sobre precios de la temporada 2025-26.',
  },
  {
    q: '¿Necesito equipo o material propio?',
    a: 'Las primeras sesiones el material es facilitado por el club. Posteriormente se recomiendan zapatillas de deporte interior y ropa cómoda.',
  },
  {
    q: '¿Cuándo empiezan los entrenamientos?',
    a: 'Los entrenamientos se realizan entre semana en el Pabellón Municipal de Valencina. Una vez inscrito te comunicaremos los horarios de tu categoría.',
  },
  {
    q: '¿Puedo inscribir a mi hijo/a sin experiencia previa?',
    a: 'Por supuesto. Las Escuelas Deportivas Municipales están pensadas precisamente para la iniciación. Cualquier edad y nivel es bienvenido.',
  },
];

export function Inscripciones() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate async submission
    await new Promise((res) => setTimeout(res, 1500));
    console.log('Form submitted:', data);
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList size={32} className="text-red-500" />
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Temporada 2025–2026</p>
              <h1 className="text-4xl sm:text-5xl font-black">Inscripciones</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mt-4">
            Únete a la familia de Encinas Volley C.D. Rellena el formulario y nos pondremos en contacto contigo en menos de 48 horas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ─── Form ─── */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-8 bg-green-50 rounded-2xl border border-green-200">
              <CheckCircle size={56} className="text-green-500 mb-5" />
              <h2 className="text-black font-black text-2xl mb-3">¡Solicitud Enviada!</h2>
              <p className="text-gray-600 text-base max-w-md leading-relaxed mb-6">
                Hemos recibido tu solicitud de inscripción. Nos pondremos en contacto contigo en un plazo máximo de 48 horas para confirmar los detalles.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Nueva Inscripción
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div>
                <h2 className="text-black font-black text-xl mb-1">Formulario de Inscripción</h2>
                <p className="text-gray-400 text-sm">Todos los campos marcados con * son obligatorios</p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">
                    Nombre <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    {...register('nombre', { required: 'El nombre es obligatorio' })}
                    className={`w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                      errors.nombre ? 'border-red-400' : 'border-gray-200 focus:border-red-400'
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.nombre.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">
                    Apellidos <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tus apellidos"
                    {...register('apellidos', { required: 'Los apellidos son obligatorios' })}
                    className={`w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                      errors.apellidos ? 'border-red-400' : 'border-gray-200 focus:border-red-400'
                    }`}
                  />
                  {errors.apellidos && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.apellidos.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email no válido' },
                    })}
                    className={`w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                      errors.email ? 'border-red-400' : 'border-gray-200 focus:border-red-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">
                    Teléfono <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+34 600 000 000"
                    {...register('telefono', { required: 'El teléfono es obligatorio' })}
                    className={`w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                      errors.telefono ? 'border-red-400' : 'border-gray-200 focus:border-red-400'
                    }`}
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.telefono.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">
                  Fecha de Nacimiento <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register('fechaNacimiento', { required: 'La fecha de nacimiento es obligatoria' })}
                  className={`w-full sm:w-1/2 px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    errors.fechaNacimiento ? 'border-red-400' : 'border-gray-200 focus:border-red-400'
                  }`}
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>

              {/* Volleyball Info */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-black font-bold text-base mb-4">Información Deportiva</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-1.5">
                      Categoría <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('categoria', { required: 'Selecciona una categoría' })}
                        className={`w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none transition-all ${
                          errors.categoria ? 'border-red-400' : 'border-gray-200 focus:border-red-400'
                        }`}
                      >
                        <option value="">Seleccionar...</option>
                        {categorias.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.categoria && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.categoria.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-1.5">Posición</label>
                    <div className="relative">
                      <select
                        {...register('posicion')}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 appearance-none transition-all"
                      >
                        <option value="">Seleccionar...</option>
                        {posiciones.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-1.5">Nivel de Experiencia</label>
                    <div className="relative">
                      <select
                        {...register('experiencia')}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 appearance-none transition-all"
                      >
                        <option value="">Seleccionar...</option>
                        {niveles.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Mensaje adicional</label>
                <textarea
                  rows={3}
                  placeholder="Dudas, lesiones previas, disponibilidad horaria..."
                  {...register('mensaje')}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-all resize-none"
                />
              </div>

              {/* GDPR */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('gdpr', { required: 'Debes aceptar la política de privacidad' })}
                    className="mt-1 w-4 h-4 accent-red-600 shrink-0"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    He leído y acepto la{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-red-600 font-semibold underline cursor-pointer hover:text-red-700 bg-transparent border-0 p-0 align-baseline text-left inline"
                    >
                      Política de Privacidad
                    </button>
                    {' '}y el tratamiento de mis datos personales por parte de Encinas Volley C.D. conforme al Reglamento General de Protección de Datos (RGPD). Los datos serán utilizados exclusivamente para gestionar la inscripción al club. <span className="text-red-600">*</span>
                  </span>
                </label>
                {errors.gdpr && (
                  <p className="text-red-500 text-xs mt-2 ml-7 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.gdpr.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-black text-base py-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-200 hover:scale-[1.01] active:scale-[0.99] ${
                  loading ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    <ClipboardList size={20} />
                    Enviar Solicitud de Inscripción
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ─── Sidebar ─── */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-black text-white rounded-2xl p-6">
            <h3 className="font-black text-base uppercase tracking-widest text-red-400 mb-4">¿Por qué elegirnos?</h3>
            <ul className="space-y-3">
              {[
                'Entrenadores cualificados y federados',
                'Equipos en todas las categorías de edad',
                'Instalación municipal de calidad',
                'Ambiente familiar y motivador',
                'Participación en competiciones oficiales FAVB',
                'Programa de Escuelas Deportivas Municipales',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Quick */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h3 className="font-black text-base text-black mb-1">¿Prefieres llamarnos?</h3>
            <p className="text-gray-500 text-sm mb-4">Estamos disponibles para resolver cualquier duda</p>
            <a
              href="tel:+34654515782"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl text-sm transition-colors w-full"
            >
              +34 654 515 782
            </a>
          </div>

          {/* FAQ */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-base text-black mb-4">Preguntas Frecuentes</h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-black leading-tight">{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-red-500 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-black font-black text-lg uppercase tracking-wide">Política de Privacidad</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-400 hover:text-black hover:bg-gray-100 p-1.5 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-gray-600 text-sm leading-relaxed">
              <div>
                <h4 className="text-black font-bold mb-2">1. Responsable del Tratamiento de Datos</h4>
                <p>
                  El responsable del tratamiento de los datos recabados a través de este formulario es <strong>Encinas Volley Club Deportivo</strong> (en adelante, "Encinas Volley C.D."), con domicilio social en Valencina de la Concepción, Sevilla, y dirección de correo electrónico de contacto: <a href="mailto:lasencinas.clubdeportivo@gmail.com" className="text-red-600 underline">lasencinas.clubdeportivo@gmail.com</a>.
                </p>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">2. Finalidad del Tratamiento</h4>
                <p>
                  Los datos personales de los solicitantes (o de sus tutores legales en caso de menores de edad) serán tratados con las siguientes finalidades:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Gestionar la solicitud de inscripción del jugador/a en las categorías deportivas correspondientes del club.</li>
                  <li>Coordinar la logística de los entrenamientos, partidos y competiciones federadas.</li>
                  <li>Mantener la comunicación con los deportistas y sus familias sobre eventos, cuotas, horarios y noticias del club.</li>
                  <li>Garantizar la seguridad e integridad de los deportistas durante la práctica deportiva (atendiendo a alergias o lesiones declaradas).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">3. Legitimación del Tratamiento</h4>
                <p>
                  La base legal para el tratamiento de sus datos es el <strong>consentimiento explícito</strong> facilitado al marcar la casilla de aceptación obligatoria del formulario de inscripción. En el caso de menores de 14 años, este consentimiento deberá ser otorgado por sus padres o tutores legales.
                </p>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">4. Destinatarios de los Datos</h4>
                <p>
                  Los datos recopilados son estrictamente para uso interno de Encinas Volley C.D. No se cederán datos a terceros salvo por las siguientes excepciones necesarias:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Federación Andaluza de Voleibol (FAVB)</strong> u otros organismos deportivos oficiales únicamente para la tramitación de licencias y seguros deportivos obligatorios.</li>
                  <li>Entidades médicas o aseguradoras en caso de accidente durante la actividad deportiva.</li>
                  <li>Obligación legal ante autoridades competentes.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">5. Conservación de los Datos</h4>
                <p>
                  Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad de la inscripción (normalmente la temporada deportiva en curso) o mientras persista el interés legítimo del deportista en formar parte del club, y en todo caso durante los plazos previstos por la ley aplicable para atender posibles responsabilidades.
                </p>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">6. Derechos del Usuario</h4>
                <p>
                  De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la LOPDGDD, usted tiene derecho a:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Acceder</strong> a sus datos personales almacenados en nuestros ficheros.</li>
                  <li>Solicitar la <strong>rectificación</strong> de datos inexactos o incompletos.</li>
                  <li>Solicitar la <strong>supresión</strong> de sus datos cuando ya no sean necesarios para los fines que fueron recogidos.</li>
                  <li>Solicitar la <strong>limitación del tratamiento</strong> o la <strong>oposición</strong> al mismo.</li>
                  <li>Ejercer la portabilidad de sus datos.</li>
                </ul>
                <p className="mt-3">
                  Para ejercer estos derechos, puede enviar una solicitud por escrito acompañada de una copia de su documento de identidad a la dirección de correo electrónico: <a href="mailto:lasencinas.clubdeportivo@gmail.com" className="text-red-600 underline">lasencinas.clubdeportivo@gmail.com</a>.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
