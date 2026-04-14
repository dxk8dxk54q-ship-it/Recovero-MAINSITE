import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  CheckCircle2, 
  Truck,
  MapPin,
  ArrowRight,
  HelpCircle,
  Info,
  Navigation,
  Clock
} from 'lucide-react';

export default function VehicleTransport() {
  useEffect(() => {
    document.title = "Vehicle Transport Portsmouth | Safe & Reliable Car Moves | Recovero247";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional vehicle transport in Portsmouth and across the UK. Recovero247 offers safe transport for classic, luxury and everyday cars. Call for a quote.');
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/Transport-recovery.jpg.jpg?raw=true"
            alt="Vehicle Transport Service"
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
              Professional Transport
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 uppercase tracking-tighter">
              Professional <span className="text-brand-orange">Vehicle Transport</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              Need to move a vehicle? We provide safe and professional vehicle transport for breakdowns, non-runners and private moves across Portsmouth and the UK. We also arrange <Link to="/portsmouth-recovery" className="text-brand-orange hover:underline">vehicle transport in Portsmouth</Link> and nearby areas.
            </p>
            <a 
              href="tel:07366302341" 
              className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl"
            >
              <Phone className="mr-3 w-5 h-5 fill-current" />
              GET IN TOUCH
            </a>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
              <div className="flex items-center">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                24/7 Service
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-brand-orange" />
                Upfront Quote
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Card A: Ideal for */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-dark p-8 md:p-12 rounded-sm text-white border-l-8 border-brand-orange shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <Info className="w-8 h-8 text-brand-orange mr-4" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Ideal for</h2>
              </div>
              <ul className="space-y-6">
                {[
                  "Vehicles bought or sold privately or at auction",
                  "Non-running cars and vans that need moving",
                  "Garage-to-garage moves",
                  "Light trade / dealer transport jobs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="mt-1 bg-brand-orange/20 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                    </div>
                    <span className="text-lg text-gray-200 font-semibold leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card B: How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-dark p-8 md:p-12 rounded-sm text-white border-l-8 border-brand-orange shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <Navigation className="w-8 h-8 text-brand-orange mr-4" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">How It Works</h2>
              </div>
              <ol className="space-y-6">
                {[
                  "Call with collection & drop-off postcodes.",
                  "We give a guide or fixed quote where possible. No membership or hidden extras.",
                  "We confirm the right transport option. Your vehicle is moved safely and securely on the agreed date and time."
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="mt-1 bg-brand-orange text-black w-7 h-7 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-lg text-gray-200 font-semibold leading-tight">{item}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Vehicle Transport <span className="text-brand-orange">Pricing</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-medium">
              Create two side-by-side white cards with soft shadows and orange price accents.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Price Card 1: Local */}
            <div className="bg-white p-8 md:p-10 rounded-sm relative overflow-hidden group border-b-8 border-brand-orange shadow-lg">
              <div className="absolute top-0 right-0 bg-brand-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Local</div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-brand-dark">Local moves</h3>
              <p className="text-4xl font-black text-brand-orange mb-6">Typical from £60</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">Within Portsmouth and close surrounding areas. Final price is confirmed before transport where possible.</p>
              <a href="tel:07366302341" className="block text-center bg-brand-dark text-white font-black py-4 uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors">Book Now</a>
            </div>

            {/* Price Card 2: Distance */}
            <div className="bg-white p-8 md:p-10 rounded-sm relative overflow-hidden group border-b-8 border-brand-orange shadow-lg">
              <div className="absolute top-0 right-0 bg-brand-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Distance</div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-brand-dark">Longer distance</h3>
              <p className="text-4xl font-black text-brand-orange mb-6">Typical from £1.50 per mile</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">Based on total loaded mileage between addresses. Final total is confirmed before transport where possible.</p>
              <a href="tel:07366302341" className="block text-center bg-brand-dark text-white font-black py-4 uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors">Get Quote</a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-gray-400 font-medium italic mb-4">
              Call for a quick quote – we’ll share guide pricing and confirm final costs before transport where possible.
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">
              Pricing is indicative; final pricing is set by the recovery driver.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex items-start space-x-4 bg-white/5 p-6 rounded-sm border border-white/10">
            <HelpCircle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-400 font-medium italic">
              Need a custom quote for multiple vehicles? Our team can provide bespoke pricing for trade and bulk transport requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">
                Locations <span className="text-brand-orange">we cover</span>
              </h2>
              <p className="text-lg text-brand-dark mb-8 leading-relaxed font-medium">
                We arrange transport across Portsmouth and nearby towns. ETAs vary by availability, and final pricing is confirmed as early as possible.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Vehicle transport in Portsmouth", href: "/portsmouth-recovery" },
                  { name: "Vehicle transport in Havant", href: "/havant-recovery" },
                  { name: "Vehicle transport in Fareham", href: "/fareham-recovery" },
                  { name: "Vehicle transport in Gosport", href: "/gosport-recovery" },
                  { name: "Vehicle transport in Waterlooville", href: "/waterlooville-recovery" }
                ].map((link, index) => (
                  <a 
                    key={index} 
                    href={link.href} 
                    className="flex items-center text-brand-orange hover:text-brand-dark font-black uppercase tracking-widest text-sm transition-all group"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-brand-orange group-hover:scale-110 transition-transform" />
                    {link.name}
                  </a>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                Customers pay the recovery driver directly on completion.
              </p>
            </div>
            <div className="bg-brand-dark p-8 md:p-12 rounded-sm text-white relative overflow-hidden">
              <Truck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 transform -rotate-12" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-widest">Book Your Transport</h3>
              <p className="text-gray-400 mb-8">We are ready to help you move your vehicle safely and efficiently 24/7.</p>
              <a href="tel:07366302341" className="inline-flex items-center text-brand-orange font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                GET IN TOUCH <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <div className="flex flex-wrap items-center gap-3 mt-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <div className="flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-brand-orange" />
                  24/7 Service
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-brand-orange" />
                  Upfront Quote
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
