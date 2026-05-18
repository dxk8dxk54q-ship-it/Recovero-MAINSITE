import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin,
  ArrowRight,
  Truck,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const PORTSMOUTH_FAQS = [
  {
    question: 'How fast can you reach me in Portsmouth?',
    answer: 'We aim to reach most Portsmouth locations within 30 minutes, depending on traffic on the M27 or A3. Our drivers are local to the area and know the quickest routes.',
  },
  {
    question: 'Do you cover Southsea and the seafront?',
    answer: 'Yes, we provide full recovery services across Southsea, the seafront, and all surrounding residential areas in Portsmouth.',
  },
  {
    question: 'Can you recover my vehicle from the Portsmouth International Port?',
    answer: 'Yes, we can assist with vehicle recovery and transport to and from the Portsmouth ferry terminal and port areas for all types of vehicles.',
  },
  {
    question: 'Are you available for breakdowns on the M27 near Portsmouth?',
    answer: 'Absolutely. We provide 24/7 emergency roadside recovery on the M27, A27, and all major routes leading into Portsmouth.',
  },
  {
    question: 'What types of vehicles do you recover in Portsmouth?',
    answer: 'We recover cars, vans, and motorcycles. Whether it\'s a breakdown, accident, or a non-runner that needs transport, we have the equipment to help.',
  }
];

export default function PortsmouthRecovery() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  useEffect(() => {
    document.title = "Vehicle Recovery Portsmouth | 24/7 Breakdown Help | Recovero247";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Need vehicle recovery in Portsmouth? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Portsmouth and nearby areas.');
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovery-truck.jpg?raw=true"
            alt="Vehicle Recovery in Portsmouth"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-brand-orange text-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-6">
              Local Portsmouth Specialists
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 uppercase tracking-tighter">
              24/7 <span className="text-brand-orange">Vehicle Recovery</span> in Portsmouth
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              Need vehicle recovery in Portsmouth? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Portsmouth and nearby areas.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="tel:07366302341" 
                className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl"
              >
                <Phone className="mr-3 w-5 h-5 fill-current" />
                GET IN TOUCH
              </a>
              <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="flex items-center">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                  24/7 Service
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                  Upfront Quote
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local Relevance Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight">
                Portsmouth's Trusted <span className="text-brand-orange">Recovery Service</span>
              </h2>
              <p className="text-lg text-brand-dark mb-6 leading-relaxed font-medium">
                We cover all of Portsmouth, from Southsea to Cosham, including major routes like the M27 and A3(M). Whether you're stuck on the motorway or a local side street, we are never far away.
              </p>
              <p className="text-lg text-brand-dark mb-8 leading-relaxed font-medium">
                We understand the local traffic patterns and the quickest ways to reach you, ensuring that your wait time is kept to an absolute minimum.
              </p>
              <div className="bg-brand-dark p-8 rounded-sm text-white border-l-8 border-brand-orange shadow-xl">
              <h3 className="text-xl font-black mb-4 uppercase tracking-widest">Our Services Include:</h3>
                <ul className="grid grid-cols-2 gap-4">
                  {[
                    "Southsea",
                    "Cosham",
                    "Fratton",
                    "Hilsea",
                    "Drayton",
                    "Portsea",
                    "M27 Motorway",
                    "A3(M) Route"
                  ].map((area, index) => (
                    <li key={index} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-brand-orange" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <div className="relative">
              <img 
                src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/breakdown3-recovery.jpg?raw=true" 
                alt="Recovery in Portsmouth" 
                className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-orange -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Our <span className="text-brand-orange">Services</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
              We handle all types of vehicle emergencies with professional care.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Breakdown Recovery",
                desc: "For non-starters, roadside issues and breakdowns in Portsmouth.",
                icon: AlertTriangle,
                link: "/breakdown-recovery",
                linkText: "View breakdown recovery"
              },
              {
                title: "Accident Recovery",
                desc: "For damaged vehicles that need safe transport after a crash.",
                icon: ShieldAlert,
                link: "/accident-recovery",
                linkText: "View accident recovery"
              },
              {
                title: "Vehicle Transport",
                desc: "For moving vehicles to a garage, home or another location.",
                icon: Truck,
                link: "/vehicle-transport",
                linkText: "View vehicle transport"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-brand-orange/50 transition-all group flex flex-col h-full"
              >
                <service.icon className="w-12 h-12 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4 uppercase tracking-widest">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{service.desc}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center text-brand-orange font-bold uppercase tracking-widest text-sm hover:underline group/link"
                >
                  [{service.linkText}]
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-10 md:gap-16 items-start max-w-3xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 uppercase tracking-tight">
                Portsmouth <span className="text-brand-orange">FAQs</span>
              </h2>
              
              <div className="space-y-3 md:space-y-4">
                {PORTSMOUTH_FAQS.map((faq, index) => (
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
                <p className="text-brand-dark font-bold mb-4">Have more questions about our Portsmouth services? Call us for immediate help.</p>
                <a href="tel:07366302341" className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 uppercase tracking-widest transition-all text-sm md:text-base rounded-full">
                  <Phone className="mr-2 w-5 h-5" />
                  GET IN TOUCH
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black mb-4 md:mb-8 leading-tight uppercase">
            Need Help Now? <span className="text-white">Call Us Right Now.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-black/80 mb-8 md:mb-12 font-bold uppercase tracking-wide">
            Call us right now for a fast ETA and a free, no-obligation quote.
          </p>
          <div className="flex flex-col items-center">
            <a href="tel:07366302341" className="w-full sm:w-auto bg-black hover:bg-black/90 text-brand-orange font-black py-4 md:py-5 px-10 md:px-12 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl inline-block">
              GET IN TOUCH
            </a>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/60">
              <div className="flex items-center">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-black" />
                24/7 Service
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-black" />
                Upfront Quote
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
