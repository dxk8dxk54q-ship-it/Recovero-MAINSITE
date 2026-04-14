import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-brand-dark font-brand selection:bg-brand-orange selection:text-white">
      {/* Terms Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsTermsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-brand-dark text-white p-8 rounded-sm max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-black mb-1 uppercase tracking-tight text-white">LEGAL INFORMATION</h2>
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-orange-500">TERMS & CONDITIONS</h3>
              <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
                <p>Please read these terms carefully before using our vehicle recovery and transport services.</p>
                
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">SERVICE AGREEMENT</h4>
                  <p>These terms explain how Recovero operates as a vehicle recovery service, and how jobs are carried out. By contacting Recovero for assistance, you agree to these terms.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">WHO WE ARE</h4>
                  <p>Recovero is a vehicle recovery service. We take your request and arrange for a recovery or transport operator to help you. You can contact us by phone or WhatsApp on 07366 302341.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">WHAT WE DO / WHAT WE DON'T DO</h4>
                  <p>Recovero provides vehicle recovery services. We handle your request and ensure a driver is sent to your location. When a driver accepts a job, the service is provided directly to you.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">QUOTES & PRICING</h4>
                  <p>Website prices and phone estimates are guide prices only unless confirmed before we start. We confirm the final price based on factors such as distance, vehicle type, vehicle condition, access, timing, and job complexity. Where possible, we confirm pricing before we arrive. In some situations, final pricing may only be confirmed once full details are known.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">PAYMENT</h4>
                  <p>To secure your booking, Recovero takes a secure booking deposit via a payment link. The remaining balance for the recovery or transport job is then arranged and paid directly to the recovery driver upon their arrival.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">AVAILABILITY & ETAS</h4>
                  <p>Availability varies by area and demand. Estimated arrival times are not guaranteed and may change due to traffic, weather, road incidents, access restrictions, or changing availability.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">CANCELLATIONS / ABORTIVE CALL-OUTS</h4>
                  <p>If you need to cancel, tell us as soon as possible. If a driver has already set off or arrived, we may apply an abortive call-out or attendance charge for time and travel. If a booking is cancelled after the deposit has been paid and the driver sent, the deposit may be non-refundable.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">LIABILITY LIMITS</h4>
                  <p>We are responsible for the service provided, including attendance, recovery method, transport, and on-site conduct. Recovero is not liable for acts, omissions, delays, loss, or damage arising from the service. If there is a service issue, please raise it with us immediately.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">COMPLAINTS HANDLING</h4>
                  <p>For complaints, contact Recovero by phone or WhatsApp with your name, vehicle registration, date/time of job, and a summary of the issue. We will review the details and help route the complaint to the recovery driver, then support follow-up where possible.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">CHANGES TO THESE TERMS AND GOVERNING LAW</h4>
                  <p>We may update these terms from time to time by publishing a revised version on this page. These terms are governed by the laws of England & Wales.</p>
                </div>

                <p className="text-xs text-gray-500 italic">Last updated: March 27, 2026</p>
              </div>
              <button
                onClick={() => setIsTermsOpen(false)}
                className="mt-8 bg-brand-orange text-black font-black py-2 px-6 uppercase tracking-widest hover:bg-brand-orange/90"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-brand-dark text-white p-8 rounded-sm max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-black mb-1 uppercase tracking-tight text-white">LEGAL INFORMATION</h2>
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-orange-500">PRIVACY POLICY</h3>
              <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
                <p>How we collect, use, and protect your personal data.</p>
                
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">INTRODUCTION</h4>
                  <p>Recovero 24/7 is committed to protecting your privacy. This policy explains how we collect and process your personal information when you use our website, contact us, or use our vehicle recovery services.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">DATA WE COLLECT</h4>
                  <p>To provide our rapid recovery service, we collect the following information:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Contact Details: Your phone number (including WhatsApp) and name.</li>
                    <li>Vehicle Details: Your vehicle registration, make, model, and the nature of the breakdown or accident.</li>
                    <li>Location Data: Your exact GPS coordinates (if you use our 'Share Exact Location' feature) or your provided address so we can send a driver to you.</li>
                    <li>Payment Records: Transaction references from secure payment links used for booking deposits.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">HOW WE USE YOUR DATA</h4>
                  <p>We use your information strictly to facilitate your vehicle recovery. This includes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Arranging your vehicle recovery.</li>
                    <li>Sending your location and vehicle details to the recovery driver.</li>
                    <li>Communicating with you via phone or WhatsApp regarding ETAs and service updates.</li>
                    <li>Processing your booking deposit.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">SHARING YOUR INFORMATION</h4>
                  <p>We provide recovery services. To get you help, we MUST share your name, vehicle details, phone number, and location with the recovery driver assigned to your job. We do not sell your personal data to any third parties for marketing purposes.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">PAYMENT SECURITY</h4>
                  <p>We use secure, third-party payment links to collect booking deposits. Recovero 24/7 does not view, store, or process your actual credit or debit card details on our systems.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">DATA RETENTION</h4>
                  <p>We retain your personal data only for as long as necessary to fulfill the service, resolve any disputes, handle complaints, and satisfy legal or accounting requirements.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">YOUR RIGHTS (UK GDPR)</h4>
                  <p>Under UK data protection law, you have the right to request access to the personal data we hold about you, ask for corrections, or request deletion of your data. To exercise these rights, please contact us at 07366 302341.</p>
                </div>

                <p className="text-xs text-gray-500 italic">Last updated: April 4, 2026</p>
              </div>
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="mt-8 bg-brand-orange text-black font-black py-2 px-6 uppercase tracking-widest hover:bg-brand-orange/90"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Modal */}
      <AnimatePresence>
        {isCookiesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsCookiesOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-brand-dark text-white p-8 rounded-sm max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-black mb-1 uppercase tracking-tight text-white">LEGAL INFORMATION</h2>
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-orange-500">COOKIE POLICY</h3>
              <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
                <p>How we use cookies to improve your experience.</p>
                
                <div>
                  <h4 className="font-bold text-orange-500 mb-1">WHAT ARE COOKIES?</h4>
                  <p>Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">HOW WE USE COOKIES</h4>
                  <p>Recovero 24/7 uses cookies for the following purposes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Essential Cookies: These are strictly necessary to provide you with services available through our website and to use some of its features, such as secure routing and basic site functionality.</li>
                    <li>Performance & Analytics: We may use tracking pixels and analytics tools (such as Google Analytics) to understand how visitors interact with our site, which pages are visited most, and to measure the effectiveness of our advertising campaigns.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">THIRD-PARTY COOKIES</h4>
                  <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements. For example, our secure payment gateway providers and website hosting platforms may set their own essential cookies to ensure transactions and site stability.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">MANAGING YOUR COOKIES</h4>
                  <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted. To learn more about how to manage cookies, visit the help section of your specific web browser.</p>
                </div>

                <div>
                  <h4 className="font-bold text-orange-500 mb-1">CONTACT US</h4>
                  <p>If you have any questions about our use of cookies or other technologies, please contact us at 07366302341.</p>
                </div>

                <p className="text-xs text-gray-500 italic">Last updated: April 4, 2026</p>
              </div>
              <button
                onClick={() => setIsCookiesOpen(false)}
                className="mt-8 bg-brand-orange text-black font-black py-2 px-6 uppercase tracking-widest hover:bg-brand-orange/90"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 max-w-[70%] md:max-w-[25%] lg:max-w-[30%]">
              <img 
                src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovero-logo.png?raw=true" 
                alt="RECOVERO Logo" 
                className="h-8 md:h-10 w-auto object-contain flex-shrink-0 rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg lg:text-xl font-black tracking-tighter text-brand-dark whitespace-nowrap">
                RECOVERO<span className="text-brand-orange">24/7</span>
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
                  className="h-8 md:h-10 w-auto object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xl md:text-2xl font-black tracking-tighter text-brand-dark">
                  RECOVERO<span className="text-brand-orange">24/7</span>
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
                <li><button onClick={() => setIsTermsOpen(true)} className="hover:text-brand-orange transition-colors">Terms & Conditions</button></li>
                <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-brand-orange transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setIsCookiesOpen(true)} className="hover:text-brand-orange transition-colors">Cookie Policy</button></li>
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
                    <p className="text-xs md:text-sm text-brand-dark font-medium">Call for Fast Help</p>
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
