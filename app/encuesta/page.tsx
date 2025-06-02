"use client";

import { useState } from "react";

export default function Encuesta() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    servicio: "",
    redes: "",
    representacion: "",
    importancia: "5",
    asesoria: false,
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Formatear los datos del formulario para el mensaje de WhatsApp
      const message = `*Nuevo contacto desde el formulario*

*Nombre y apellido:* ${formData.nombre}
*Email:* ${formData.email}
*Teléfono:* ${formData.telefono || 'No proporcionado'}
*Ciudad:* ${formData.ciudad}
*Servicio de interés:* ${formData.servicio}
*Uso de redes sociales:* ${formData.redes}
*Representación en línea:* ${formData.representacion}
*Importancia del contenido visual (1-10):* ${formData.importancia}
*Quiere asesoría gratuita:* ${formData.asesoria ? 'Sí' : 'No'}`;

      // Codificar el mensaje para URL
      const encodedMessage = encodeURIComponent(message);
      
      // Número de teléfono de destino (código de país + número sin espacios ni caracteres especiales)
      const phoneNumber = '+5491128836821'; 
      
      // Crear el enlace de WhatsApp con el mensaje
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      console.log('URL de WhatsApp:', whatsappUrl); // Para debug
      
      // Abrir WhatsApp en una nueva pestaña
      const newWindow = window.open(whatsappUrl, '_blank');
      
      if (newWindow) {
        // Solo marcar como enviado si la ventana se abrió correctamente
        setEnviado(true);
      } else {
        // Si no se pudo abrir la ventana (bloqueador de pop-ups)
        setError("No se pudo abrir WhatsApp. Verifica que los pop-ups estén habilitados o intenta de nuevo.");
      }
      
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      setError("Hubo un error al preparar el mensaje. Por favor, inténtalo de nuevo o escríbenos directamente a optimaagenciadigital@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#14213D] flex items-start justify-center pt-16 md:pt-24 pb-8 px-2 font-inter">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#14213D] rounded-2xl p-6 md:p-10 max-w-2xl w-full shadow-2xl space-y-6 border-2 border-[#2056b3] mt-4 md:mt-0"
      >
        <h1 className="text-3xl font-extrabold text-[#2056b3] font-poppins text-center mb-1">Óptima Digital</h1>
        <h2 className="text-lg font-semibold text-[#2056b3] text-center mb-4">Agencia de Marketing y Medios Digitales</h2>

        {enviado ? (
          <div className="text-center text-[#2056b3] font-semibold py-8">
            ¡Gracias por completar la encuesta!<br />
            Pronto nos pondremos en contacto contigo.<br />
            <span className="block mt-2">Si llegaste hasta acá te ganaste una asesoría gratuita de 40min para tu negocio y un 10% OFF en todos nuestros servicios de hoy a 30 días.</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-[#2056b3]">Nombre y apellido</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white placeholder:text-[#b3c6e0]"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-[#2056b3]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white placeholder:text-[#b3c6e0]"
                  placeholder="tucorreo@email.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-[#2056b3]">Teléfono (opcional)</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white placeholder:text-[#b3c6e0]"
                  placeholder="Ej: +54 9 11 2803 6821"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-[#2056b3]">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white placeholder:text-[#b3c6e0]"
                  placeholder="Ej: Mar del Plata"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#2056b3]">¿Qué servicio te interesa?</label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white text-[#14213D]"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="SEO">SEO</option>
                <option value="Branding">Branding</option>
                <option value="Redes Sociales">Redes Sociales</option>
                <option value="Desarrollo Web">Desarrollo Web</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#2056b3]">¿Cómo usás tus redes sociales?</label>
              <input
                type="text"
                name="redes"
                value={formData.redes}
                onChange={handleChange}
                className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white placeholder:text-[#b3c6e0]"
                placeholder="Ej: Para atraer nuevos clientes"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#2056b3]">
                ¿Lo que ve un usuario en Google o Instagram te representa?
              </label>
              <input
                type="text"
                name="representacion"
                value={formData.representacion}
                onChange={handleChange}
                className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white placeholder:text-[#b3c6e0]"
                placeholder="Ej: Más o menos, podría mejorar"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#2056b3]">
                ¿Qué tan importante es el contenido visual de calidad?
              </label>
              <select
                name="importancia"
                value={formData.importancia}
                onChange={handleChange}
                className="w-full p-2 border border-[#2056b3] rounded focus:outline-none focus:ring-2 focus:ring-[#2056b3] bg-white text-[#14213D]"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="asesoria"
                checked={formData.asesoria}
                onChange={handleChange}
                className="accent-[#2056b3]"
              />
              <label className="text-sm text-[#2056b3]">Quiero recibir una asesoría gratuita y el 10% OFF</label>
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="bg-[#2056b3] text-white px-6 py-2 rounded font-bold hover:bg-[#183e7a] transition w-full mt-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar respuestas"}
            </button>
          </>
        )}

        <div className="border-t pt-4 mt-4 text-center text-xs text-[#2056b3]">
          <div className="flex flex-col items-center gap-1">
            <span>optimaagenciadigital@gmail.com</span>
            <span>+54 9 11 2803 6821</span>
            <span className="font-bold text-[#2056b3]">óptima digital</span>
          </div>
        </div>
      </form>
    </div>
  );
}