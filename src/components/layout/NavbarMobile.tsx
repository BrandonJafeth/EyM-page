import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface NavLink {
  href: string;
  text: string;
}

interface NavbarMobileProps {
  navLinks: NavLink[];
  currentPath: string;
}

export default function NavbarMobile({ navLinks, currentPath }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const menuContent = (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ease-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación móvil"
    >
        
      {/* Background - Dark Navy Corporate */}
      <div 
        className="absolute inset-0 bg-primary"
        aria-hidden="true"
      />

       {/* Subtle Pattern Overlay */}
       <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Close Button Header */}
      <div className="absolute top-0 right-0 px-6 py-6 z-50 flex justify-end h-20 items-center">
        <button
          onClick={closeMenu}
          className="w-12 h-12 flex items-center justify-center text-white hover:text-accent transition-colors duration-300 group"
          aria-label="Cerrar menú"
          type="button"
        >
          <div className="relative w-8 h-8">
            <span 
              className="absolute top-1/2 left-0 w-full h-0.5 bg-current 
                         transform -translate-y-1/2 rotate-45 
                         transition-transform duration-300" 
            />
            <span 
              className="absolute top-1/2 left-0 w-full h-0.5 bg-current 
                         transform -translate-y-1/2 -rotate-45 
                         transition-transform duration-300" 
            />
          </div>
        </button>
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
        
        {/* Main Navigation */}
        <nav className="flex flex-col items-center space-y-8 mb-16">
          {navLinks.map((link, index) => {
            const isActive = link.href === '/' ? currentPath === '/' : currentPath.startsWith(link.href);
            
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`font-heading text-3xl sm:text-5xl font-normal
                          hover:scale-105 origin-center relative group
                          transition-all duration-500
                          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                          ${isActive 
                            ? 'text-accent'
                            : 'text-white hover:text-accent'
                          }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.text}
              </a>
            );
          })}

          {/* Mobile CTA */}
          <div 
             className={`mt-12 transition-all duration-700 delay-300
                        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <a 
              href="/contacto" 
              onClick={closeMenu}
              className="inline-block border border-accent text-accent font-heading text-sm uppercase tracking-[0.2em] py-4 px-10 hover:bg-accent hover:text-primary transition-colors duration-300"
            >
              Contactar
            </a>
          </div>

        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger Button (Visible only on mobile) */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative w-10 h-10 flex items-center justify-center 
                   text-white focus:outline-none"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen ? true : false}
        type="button"
      >
        <div className="w-6 flex flex-col items-center justify-center gap-1.5">
          <span 
            className={`w-full h-0.5 bg-current transition-all duration-300 ease-out ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`} 
          />
          <span 
            className={`w-full h-0.5 bg-current transition-all duration-200 ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`} 
          />
          <span 
            className={`w-full h-0.5 bg-current transition-all duration-300 ease-out ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`} 
          />
        </div>
      </button>

      {/* Portal del menú */}
      {mounted && typeof document !== 'undefined' && createPortal(menuContent, document.body)}
    </>
  );
}
