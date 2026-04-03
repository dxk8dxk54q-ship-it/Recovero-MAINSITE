import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronUp, 
  ChevronDown,
  Facebook, 
  Instagram, 
  ArrowRight,
  MapPin
} from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-brand-dark font-brand selection:bg-brand-orange selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 max-w-[70%] md:max-w-[25%] lg:max-w-[30%]">
              <img 
                src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovero-logo.png?raw=true" 
                alt="RECOVERO Logo" 
                className="h-8 md:h-10 w-auto object-contain flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg lg:text-xl font-black tracking-tighter text-brand-dark whitespace-nowrap">
                Recovero <span className="hidden xl:inline text-[10px] font-bold normal-case tracking-normal text-gray-500 ml-1">(The Vehicle Recovery Network)</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 px-4">
              <div className="flex items-center gap-5 whitespace-nowrap">
                {NAV_LINKS.map((link) => (
                  <div 
                    key={link.name} 
                    className="relative group"
                    onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center text-[14px] font-bold uppercase tracking-widest hover:text-brand-orange transition-colors py-4"
                    >
                      {link.name}
                      {link.subLinks && <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                    </Link>

                    {link.subLinks && (
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 bg-white border border-black/10 shadow-xl py-2 min-w-[200px] rounded-sm"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="block px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-dark p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-black/10 overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)] scrollbar-hide"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.name}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.href}
                        className="flex-grow px-3 py-4 text-base font-bold uppercase tracking-widest hover:text-brand-orange"
                        onClick={() => !link.subLinks && setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {link.subLinks && (
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                          className="p-4 text-brand-dark"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    {link.subLinks && (
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-gray-50 overflow-hidden"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className="block px-8 py-3 text-sm font-bold uppercase tracking-widest hover:text-brand-orange border-l-4 border-brand-orange ml-3"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer id="terms" className="bg-white pt-20 pb-10 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="mb-4 md:mb-6 flex justify-center md:justify-start items-center space-x-2">
                <img 
                  src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovero-logo.png?raw=true" 
                  alt="RECOVERO Logo" 
                  className="h-8 md:h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xl md:text-2xl font-black tracking-tighter text-brand-dark">
                  Recovero <span className="text-[10px] md:text-xs font-bold normal-case tracking-normal text-gray-500 block md:inline md:ml-2">(The Vehicle Recovery Network)</span>
                </span>
              </div>
              <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Professional vehicle recovery and transport services across Hampshire. Available day and night for all your automotive needs.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="w-10 h-10 bg-brand-orange flex items-center justify-center text-black hover:bg-brand-orange/90 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-brand-orange flex items-center justify-center text-black hover:bg-brand-orange/90 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-sm md:text-lg font-black uppercase tracking-widest mb-4 md:mb-8 text-brand-orange">Quick Links</h4>
              <ul className="space-y-2 md:space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-brand-dark hover:text-brand-orange transition-colors flex items-center justify-center md:justify-start text-sm md:text-base font-medium">
                      <ArrowRight className="w-3 h-3 mr-2 text-brand-orange hidden md:block" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div className="text-center md:text-left">
              <h4 className="text-sm md:text-lg font-black uppercase tracking-widest mb-4 md:mb-8 text-brand-orange">Useful Links</h4>
              <ul className="space-y-2 md:space-y-4 text-brand-dark text-sm md:text-base font-medium">
                <li><a href="#" className="hover:text-brand-orange transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Emergency Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="text-sm md:text-lg font-black uppercase tracking-widest mb-4 md:mb-8 text-brand-orange">Contact Info</h4>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex flex-col md:flex-row items-center md:items-start">
                  <Phone className="w-5 h-5 text-brand-orange md:mr-4 mb-2 md:mb-0 md:mt-1" />
                  <div>
                    <p className="font-bold text-brand-dark text-sm md:text-base">07366302341</p>
                    <p className="text-xs md:text-sm text-brand-dark font-medium">Call for Fast Dispatch</p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-start">
                  <MapPin className="w-5 h-5 text-brand-orange md:mr-4 mb-2 md:mb-0 md:mt-1" />
                  <div>
                    <p className="text-brand-dark text-xs md:text-sm max-w-[200px] md:max-w-none font-medium">Portsmouth, Hampshire</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800 font-medium">
            <p>© {new Date().getFullYear()} RECOVERO. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Website by <span className="text-brand-orange font-bold">RECOVERO Team</span></p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 bg-brand-orange text-black p-2 md:p-3 rounded-sm shadow-xl hover:bg-brand-orange/90 transition-all transform hover:scale-110"
      >
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
}
