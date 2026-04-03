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
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export default function AccidentRecovery() {
  useEffect(() => {
    document.title = "Accident Recovery Portsmouth | 24/7 Emergency Assistance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fast accident recovery in Portsmouth and Hampshire. We provide 24/7 emergency vehicle recovery for cars, vans, and motorcycles. Call for immediate help.');
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/accident-recovery.jpg?raw=true"
            alt="Accident Recovery"
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
              Available 24/7
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 uppercase tracking-tighter">
              Rapid <span className="text-brand-orange">Accident Recovery</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              Stranded after an accident? Our network of recovery specialists provides immediate dispatch for safe vehicle recovery.
            </p>
            <a 
              href="tel:07366302341" 
              className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl"
            >
              <Phone className="mr-3 w-5 h-5 fill-current" />
              Call for Fast Dispatch
            </a>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
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
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Card A: After an Accident */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-dark p-8 md:p-12 rounded-sm text-white border-l-8 border-brand-orange shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <ShieldAlert className="w-8 h-8 text-brand-orange mr-4" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">After an Accident</h2>
              </div>
              <ul className="space-y-6">
                {[
                  "Stay safe – move away from live traffic where possible.",
                  "If anyone is injured, call 999 first.",
                  "When it’s safe, call us with your location and vehicle details."
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

            {/* Card B: What Happens Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-dark p-8 md:p-12 rounded-sm text-white border-l-8 border-brand-orange shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <Truck className="w-8 h-8 text-brand-orange mr-4" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">What Happens Next</h2>
              </div>
              <ul className="space-y-6">
                {[
                  "Tell us your exact location and what condition the vehicle is in.",
                  "We’ll get a recovery driver out to you as quickly as possible once it’s safe to do so.",
                  "We’ll recover the vehicle to your chosen garage, storage site, or home address."
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
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Accident Recovery <span className="text-brand-orange">Pricing</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-medium">
              Accident recovery jobs vary depending on damage, access, and distance, but we keep pricing as clear as possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Price Box 1: Local */}
            <div className="bg-white p-8 md:p-10 rounded-sm relative overflow-hidden group border-b-8 border-brand-orange">
              <div className="absolute top-0 right-0 bg-brand-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Local</div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-brand-dark">Local recovery</h3>
              <p className="text-4xl font-black text-brand-orange mb-6">Typically from £80</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">For minor accidents in the Portsmouth area.</p>
              <a href="tel:07366302341" className="block text-center bg-brand-dark text-white font-black py-4 uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors">Book Now</a>
            </div>

            {/* Price Box 2: Complex */}
            <div className="bg-white p-8 md:p-10 rounded-sm relative overflow-hidden group border-b-8 border-brand-orange">
              <div className="absolute top-0 right-0 bg-brand-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Complex</div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-brand-dark">Longer distance / complex</h3>
              <p className="text-4xl font-black text-brand-orange mb-6">Quoted individually</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">For more severe damage, difficult access, or longer-distance recovery.</p>
              <a href="tel:07366302341" className="block text-center bg-brand-dark text-white font-black py-4 uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors">Get Quote</a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto flex items-start space-x-4 bg-white/5 p-6 rounded-sm border border-white/10">
            <HelpCircle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-400 font-medium italic">
              If you’re unsure whether it’s safe to drive after an accident, call us and we’ll advise. If conditions at the scene change, we’ll update you straight away.
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
                We provide accident recovery across Portsmouth and nearby towns. Choose your area below.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Accident recovery in Portsmouth", href: "/portsmouth-recovery" },
                  { name: "Accident recovery in Havant", href: "/havant-recovery" },
                  { name: "Accident recovery in Fareham", href: "/fareham-recovery" },
                  { name: "Accident recovery in Gosport", href: "/gosport-recovery" },
                  { name: "Accident recovery in Waterlooville", href: "/waterlooville-recovery" }
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
            </div>
            <div className="bg-brand-dark p-8 md:p-12 rounded-sm text-white relative overflow-hidden">
              <Truck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 transform -rotate-12" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-widest">Need Immediate Help?</h3>
              <p className="text-gray-400 mb-8">Our network of recovery specialists is standing by to assist you with any accident recovery emergency.</p>
              <a href="tel:07366302341" className="inline-flex items-center text-brand-orange font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                Call for Fast Dispatch <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <div className="flex flex-wrap items-center gap-3 mt-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <div className="flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-brand-orange" />
                  Approved Network Partner
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-brand-orange" />
                  24/7 Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
