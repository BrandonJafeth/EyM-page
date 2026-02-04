import React, { useState, useEffect } from 'react';

// Location Types
interface LocationOption {
  id: string;
  name: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    provincia: '',
    canton: '',
    distrito: '',
    areaLegal: '',
    comoConocio: '',
    medioContacto: 'Correo Electrónico'
  });

  // Location State
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [cantons, setCantons] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);

  // Fetch Provinces on load
  useEffect(() => {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
      .then(res => res.json())
      .then(data => {
        const list = Object.entries(data).map(([id, name]) => ({ id, name: name as string }));
        setProvinces(list);
      })
      .catch(err => console.error("Error fetching provinces:", err));
  }, []);

  // Fetch Cantons when Province changes
  useEffect(() => {
    if (!formData.provincia) {
      setCantons([]);
      setDistricts([]);
      return;
    }
    const provinceId = provinces.find(p => p.name === formData.provincia)?.id;
    if (provinceId) {
      fetch(`https://ubicaciones.paginasweb.cr/provincia/${provinceId}/cantones.json`)
        .then(res => res.json())
        .then(data => {
          const list = Object.entries(data).map(([id, name]) => ({ id, name: name as string }));
          setCantons(list);
          // Reset child selections
          setFormData(prev => ({ ...prev, canton: '', distrito: '' }));
        })
        .catch(err => console.error("Error fetching cantons:", err));
    }
  }, [formData.provincia, provinces]);

  // Fetch Districts when Canton changes
  useEffect(() => {
    if (!formData.canton || !formData.provincia) {
      setDistricts([]);
      return;
    }
    const provinceId = provinces.find(p => p.name === formData.provincia)?.id;
    const cantonId = cantons.find(c => c.name === formData.canton)?.id;

    if (provinceId && cantonId) {
      fetch(`https://ubicaciones.paginasweb.cr/provincia/${provinceId}/canton/${cantonId}/distritos.json`)
        .then(res => res.json())
        .then(data => {
          const list = Object.entries(data).map(([id, name]) => ({ id, name: name as string }));
          setDistricts(list);
          // Reset child selections
          setFormData(prev => ({ ...prev, distrito: '' }));
        })
        .catch(err => console.error("Error fetching districts:", err));
    }
  }, [formData.canton, formData.provincia, provinces, cantons]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send via API)
    console.log('Form Submitted', formData);
    alert('Gracias por contactarnos. Nos pondremos en contacto pronto.');
  };

  const inputClasses = "w-full bg-[#FAFAFA] border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#AF9232] transition-colors font-body text-gray-700";
  const labelClasses = "block font-heading text-xs uppercase tracking-[0.1em] text-gray-400 mb-2";

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[#AF9232] font-heading text-xs uppercase tracking-[0.2em] mb-4">Contáctanos</p>
          <h2 className="font-heading text-4xl md:text-5xl text-[#091723] mb-4">Inicia la Conversación</h2>
          <p className="text-gray-500 font-body font-light text-lg">Completa el formulario y nos pondremos en contacto contigo a la brevedad</p>
          <div className="w-16 h-[1px] bg-[#AF9232] mx-auto mt-8"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 max-w-4xl mx-auto rounded-md">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-10">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className={labelClasses}>Nombre Completo *</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Tu nombre"
                className={inputClasses}
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClasses}>Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="ejemplo@correo.com"
                className={inputClasses}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className={labelClasses}>Teléfono *</label>
              <input 
                type="tel" 
                id="telefono" 
                name="telefono" 
                placeholder="+506 0000-0000"
                className={inputClasses}
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            {/* Provincia */}
            <div>
              <label htmlFor="provincia" className={labelClasses}>Provincia *</label>
              <div className="relative">
                <select 
                  id="provincia" 
                  name="provincia" 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.provincia}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Seleccionar Provincia...</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AF9232]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* LOCATION DETAILS - Shown conditionally */}
            { formData.provincia && (
                <>
                {/* Cantón */}
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="canton" className={labelClasses}>Cantón *</label>
                <div className="relative">
                    <select 
                    id="canton" 
                    name="canton" 
                    className={`${inputClasses} appearance-none cursor-pointer ${!formData.provincia ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={formData.canton}
                    onChange={handleChange}
                    required
                    disabled={!formData.provincia}
                    >
                    <option value="" disabled>Seleccionar Cantón...</option>
                    {cantons.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AF9232]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>
                </div>

                {/* Distrito */}
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="distrito" className={labelClasses}>Distrito *</label>
                <div className="relative">
                    <select 
                    id="distrito" 
                    name="distrito" 
                    className={`${inputClasses} appearance-none cursor-pointer ${!formData.canton ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={formData.distrito}
                    onChange={handleChange}
                    required
                    disabled={!formData.canton}
                    >
                    <option value="" disabled>Seleccionar Distrito...</option>
                    {districts.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AF9232]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>
                </div>
                </>
            )}

            {/* Area Legal */}
            <div>
              <label htmlFor="areaLegal" className={labelClasses}>Área Legal *</label>
              <div className="relative">
                <select 
                  id="areaLegal" 
                  name="areaLegal" 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.areaLegal}
                  onChange={handleChange}
                >
                  <option value="" disabled>Seleccionar...</option>
                  <option value="civil">Derecho Civil</option>
                  <option value="corporativo">Derecho Corporativo</option>
                  <option value="notarial">Derecho Notarial</option>
                  <option value="penal">Derecho Penal</option>
                  <option value="familia">Derecho de Familia</option>
                  <option value="otro">Otro</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AF9232]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Como nos conoció */}
            <div>
              <label htmlFor="comoConocio" className={labelClasses}>¿Cómo nos conoció? *</label>
              <div className="relative">
                <select 
                  id="comoConocio" 
                  name="comoConocio" 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.comoConocio}
                  onChange={handleChange}
                >
                  <option value="" disabled>Seleccionar...</option>
                  <option value="google">Búsqueda en Google</option>
                  <option value="redes">Redes Sociales</option>
                  <option value="recomendacion">Recomendación</option>
                  <option value="otro">Otro</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AF9232]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Preferencia de Contacto */}
          <div className="mb-10 pt-2">
            <label className={labelClasses}>Preferencia de Contacto</label>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-5">
              {['Correo Electrónico', 'Llamada Telefónica', 'WhatsApp'].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group select-none">
                  {/* Custom Radio Circle */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    formData.medioContacto === option 
                      ? 'border-2 border-[#AF9232]' 
                      : 'border border-gray-200 group-hover:border-gray-300'
                  }`}>
                    {formData.medioContacto === option && (
                      <div className="w-3 h-3 rounded-full bg-[#AF9232]"></div>
                    )}
                  </div>
                  
                  <input 
                    type="radio" 
                    name="medioContacto" 
                    value={option}
                    checked={formData.medioContacto === option}
                    onChange={handleChange}
                    className="hidden"
                  />
                  
                  <span className={`font-heading text-lg font-normal tracking-wide transition-colors ${
                    formData.medioContacto === option 
                      ? 'text-[#091723]' 
                      : 'text-[#d1d5db] group-hover:text-gray-400' /* text-gray-300 to match faint gray in image */
                  }`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center mt-12">
            <button 
              type="submit" 
              className="w-full bg-[#AF9232] text-white font-heading uppercase tracking-[0.2em] text-sm py-5 hover:bg-[#967d29] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Enviar Mensaje
            </button>
            <p className="mt-6 text-xs text-gray-400 font-heading tracking-widest font-light">Respuesta en 24 horas hábiles</p>
          </div>

        </form>
      </div>
    </section>
  );
}
