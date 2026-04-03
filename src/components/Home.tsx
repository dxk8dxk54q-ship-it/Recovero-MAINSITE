import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Truck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, FAQS, LOCATIONS } from '../constants';

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Recovero | 24/7 Fast Vehicle Recovery & Breakdown Assistance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stranded? Recovero provides rapid 24/7 vehicle recovery and breakdown assistance across Portsmouth, Havant, and Hampshire. Call for immediate dispatch and fixed quotes.');
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-[90vh] flex items-center overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovery-truck.jpg?raw=true"
            alt="Recovery Truck"
            className="w-full h-full object-cover opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/90 via-white/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-6 md:mb-8 uppercase tracking-tighter text-brand-dark">
              Fast, Reliable<br />
              Vehicle Recovery<br />
              <span className="text-brand-orange">& Breakdown</span><br />
              Assistance
            </h1>
            <p className="text-base md:text-lg text-brand-dark mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed font-semibold">
              Stranded? Our network of vetted recovery specialists is ready to get you moving again.
            </p>
            <ul className="text-sm md:text-base text-brand-dark mb-8 md:mb-12 max-w-xl mx-auto md:mx-0 space-y-2 list-disc list-inside text-left font-medium">
              <li>Rapid-response vehicles available across Portsmouth and nearby areas.</li>
              <li>We reach you faster by dispatching the nearest specialist in our network.</li>
              <li>Call now for an immediate ETA and a fixed price quote.</li>
            </ul>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
              <a href="tel:07366302341" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 md:py-5 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 flex items-center justify-center group rounded-full">
                <Phone className="mr-2 w-5 h-5 fill-current" />
                Call for Fast Dispatch
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-dark/60">
              <div className="flex items-center">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                Approved Network Partner
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                24/7 Service
              </div>
            </div>

          </motion.div>

          {/* Centered Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-12 md:mt-20">
            {[
              '24/7',
              'UPFRONT QUOTE',
              'NO MEMBERSHIP'
            ].map((badge) => (
              <div 
                key={badge} 
                className="bg-white text-black px-4 md:px-6 py-2 rounded-full font-black text-[10px] md:text-sm uppercase tracking-widest border border-gray-200 shadow-sm animate-pulse-slow whitespace-nowrap"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Location Banner / Ticker */}
        <div id="locations" className="absolute bottom-0 left-0 right-0 bg-brand-orange py-2 md:py-4 overflow-hidden flex items-center">
          {/* Infinite Marquee */}
          <div className="flex whitespace-nowrap animate-marquee flex-grow">
            {[...LOCATIONS, ...LOCATIONS, ...LOCATIONS].map((location, i) => (
              <div key={i} className="flex items-center mx-4 md:mx-8">
                <span className="text-black font-black text-[10px] md:text-sm tracking-widest uppercase flex items-center">
                  <span className="mr-2 text-xs md:text-base">➢</span>
                  {location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-24 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 md:mb-8 leading-tight">
                Rapid <span className="text-brand-orange">Roadside Recovery</span>
              </h2>
              <div className="space-y-4 md:space-y-6 text-brand-dark text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                <p>
                  Recovero connects you to a vast network of vetted recovery specialists across Hampshire, ensuring we reach you faster than anyone else.
                </p>
                <p>
                  Whether you're in <span className="text-brand-orange font-bold">Portsmouth</span>, Havant, or Winchester, our rapid-response vehicles are standing by to assist you immediately.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 md:order-2"
            >
              <div className="aspect-video md:aspect-[4/3] overflow-hidden rounded-sm border border-brand-orange/30">
                <img
                  src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/breakdown2-recovery.jpg?raw=true"
                  alt="Vehicle Recovery Service"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-6 md:-left-6 bg-brand-orange p-2 md:p-8 shadow-xl">
                <p className="text-black font-black text-lg md:text-4xl">10+</p>
                <p className="text-black font-bold text-[6px] md:text-xs uppercase tracking-widest leading-none">Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 md:mb-4">
              Our <span className="text-brand-orange">Recovery Network</span>
            </h2>
            <p className="text-brand-dark max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium">
              We dispatch the nearest vetted specialist to your location for the fastest possible response.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {SERVICES.map((service, index) => {
              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white border border-black/5 hover:border-brand-orange/50 transition-all overflow-hidden flex flex-col h-full"
                >
                  <div className="aspect-[16/9] sm:aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 md:p-8 flex-grow">
                    <h3 className="text-base md:text-2xl font-black mb-2 md:mb-4 uppercase tracking-tight">{service.title}</h3>
                    <p className="text-brand-dark mb-4 text-[11px] sm:text-sm md:text-base leading-relaxed font-medium">{service.description}</p>
                    <div className="w-8 h-1 bg-brand-orange group-hover:w-full transition-all duration-300"></div>
                  </div>
                </motion.div>
              );

              return service.href ? (
                <Link key={service.title} to={service.href}>
                  {CardContent}
                </Link>
              ) : (
                <div key={service.title}>
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-10 md:gap-16 items-start max-w-3xl mx-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 md:mb-12">
                Got <span className="text-brand-orange">Questions?</span>
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                {FAQS.map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-black/10 rounded-sm overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-black/5 transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base md:text-lg pr-4 text-brand-dark">{faq.question}</span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-brand-orange flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-brand-orange flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 md:p-6 pt-0 text-brand-dark text-xs sm:text-sm md:text-base leading-relaxed border-t border-black/5 font-medium">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 md:mt-12 p-6 bg-gray-50 border border-black/5 rounded-sm">
                <p className="text-brand-dark font-bold mb-4">Still unsure? Just give us a quick call. We'll give you a price and ETA in seconds.</p>
                <a href="tel:07366302341" className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 uppercase tracking-widest transition-all text-sm md:text-base rounded-full">
                  <Phone className="mr-2 w-5 h-5" />
                  Call 07366 302341
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-32 bg-brand-orange text-black overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black mb-4 md:mb-8 leading-tight">
            Stranded? <span className="text-white">We'll Get You Moving.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-black/80 mb-8 md:mb-12 font-medium">
            Call our dispatch center now for an immediate ETA and a free, no-obligation quote.
          </p>
          <a href="tel:07366302341" className="w-full sm:w-auto bg-black hover:bg-black/90 text-brand-orange font-black py-4 md:py-5 px-10 md:px-12 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl inline-block">
            Call for Fast Dispatch
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/60">
            <div className="flex items-center">
              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-black" />
              Approved Network Partner
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-black" />
              24/7 Service
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
