import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin,
  ArrowRight,
  Truck,
  ShieldAlert
} from 'lucide-react';

export default function PortsmouthRecovery() {
  useEffect(() => {
    document.title = "Vehicle Recovery Portsmouth | 24/7 Breakdown Assistance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stranded in Portsmouth? Get rapid 24/7 vehicle recovery and breakdown assistance. Our local network of vetted specialists reaches you fast on the M27, A3(M) and local roads.');
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
              Fast & Reliable <span className="text-brand-orange">Vehicle Recovery in Portsmouth</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              Breaking down in Portsmouth can be incredibly stressful, especially when you're blocking traffic or in an unfamiliar area. Our local network of vetted recovery specialists provides immediate dispatch to get you and your vehicle off the road safely.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="tel:07366302341" 
                className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl"
              >
                <Phone className="mr-3 w-5 h-5 fill-current" />
                Call for Fast Dispatch
              </a>
              <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="flex items-center">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                  Approved Network Partner
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                  24/7 Service
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
                Portsmouth's Trusted <span className="text-brand-orange">Recovery Network</span>
              </h2>
              <p className="text-lg text-brand-dark mb-6 leading-relaxed font-medium">
                Our local recovery agents cover all of Portsmouth, from Southsea to Cosham, including major routes like the M27 and A3(M). Whether you're stuck on the motorway or a local side street, our rapid-response vehicles are never far away.
              </p>
              <p className="text-lg text-brand-dark mb-8 leading-relaxed font-medium">
                We understand the local traffic patterns and the quickest ways to reach you, ensuring that your wait time is kept to an absolute minimum.
              </p>
              <div className="bg-brand-dark p-8 rounded-sm text-white border-l-8 border-brand-orange shadow-xl">
                <h3 className="text-xl font-black mb-4 uppercase tracking-widest">Local Coverage Includes:</h3>
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
              Our Local <span className="text-brand-orange">Services</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
              Our local network handles all types of vehicle emergencies with professional care.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Breakdown Recovery",
                desc: "Fast recovery for all vehicle breakdowns across Portsmouth.",
                icon: AlertTriangle
              },
              {
                title: "Accident Recovery",
                desc: "Immediate dispatch of recovery specialists for vehicles involved in accidents.",
                icon: ShieldAlert
              },
              {
                title: "Jump Starts",
                desc: "Rapid response for flat batteries and starting issues.",
                icon: Clock
              },
              {
                title: "Flat Tyres",
                desc: "Roadside assistance for tyre changes and punctures.",
                icon: Truck
              },
              {
                title: "Vehicle Transport",
                desc: "Secure transport for luxury, classic, and everyday cars.",
                icon: CheckCircle2
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-brand-orange/50 transition-all group"
              >
                <service.icon className="w-12 h-12 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4 uppercase tracking-widest">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
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
        </div>
      </section>
    </div>
  );
}
