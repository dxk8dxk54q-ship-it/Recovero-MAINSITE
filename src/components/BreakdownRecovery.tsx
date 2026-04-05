import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin,
  ArrowRight,
  Truck
} from 'lucide-react';

export default function BreakdownRecovery() {
  useEffect(() => {
    document.title = "Breakdown Recovery Portsmouth | 24/7 Roadside Help | Recovero247";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Need breakdown recovery in Portsmouth? Recovero247 provides 24/7 roadside and non-runner recovery across Portsmouth and nearby areas.');
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/breakdown3-recovery.jpg?raw=true"
            alt="Breakdown Recovery"
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
              24/7 <span className="text-brand-orange">Breakdown Recovery</span> in Portsmouth
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              Stranded with a breakdown? We provide 24/7 roadside help and vehicle recovery for cars, vans and motorcycles across Portsmouth and Hampshire.
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

      {/* Common Problems Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight">
                Common Problems <span className="text-brand-orange">We Deal With</span>
              </h2>
              <ul className="space-y-6">
                {[
                  "Car won't start on the drive or in a car park",
                  "Breakdowns on local roads, roundabouts or junctions",
                  "Warning lights on – not safe to drive",
                  "Flat batteries, overheating and fluid leaks"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-4 group cursor-default">
                    <motion.div 
                      whileHover={{ y: [0, -5, 0] }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                      }}
                      className="mt-1 bg-brand-orange/10 p-1 rounded-full"
                    >
                      <AlertTriangle className="w-5 h-5 text-brand-orange" />
                    </motion.div>
                    <span className="text-lg text-brand-dark font-semibold group-hover:text-brand-orange transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="relative">
              <img 
                src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/roadside-issues.jpg?raw=true" 
                alt="Car Breakdown" 
                className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-orange -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              How We Help <span className="text-brand-orange">You Fast</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Call Us",
                desc: "Call with your location and vehicle details. We prioritise urgent breakdown jobs and share the next step quickly.",
                icon: Phone
              },
              {
                title: "Get ETA",
                desc: "Get an ETA and pricing guidance. Timing depends on traffic and live availability.",
                icon: Clock
              },
              {
                title: "Recovered Safely",
                desc: "Get recovered safely. We can support recovery to your home, a trusted garage, or another destination.",
                icon: CheckCircle2
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-brand-orange/50 transition-all group"
              >
                <step.icon className="w-12 h-12 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4 uppercase tracking-widest">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Breakdown Recovery <span className="text-brand-orange">Prices</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-brand-dark p-8 md:p-10 rounded-sm relative overflow-hidden group hover:border-brand-orange transition-colors">
              <div className="absolute top-0 right-0 bg-brand-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Local</div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Option 1: Local recovery</h3>
              <p className="text-4xl font-black text-brand-orange mb-6">From £60</p>
              <p className="text-brand-dark mb-8 leading-relaxed font-medium">Within local coverage areas and close surrounding towns. Final price is confirmed before recovery where possible.</p>
              <a href="tel:07366302341" className="block text-center bg-brand-dark text-white font-black py-4 uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors">Book Now</a>
            </div>
            <div className="bg-white border-2 border-brand-dark p-8 md:p-10 rounded-sm relative overflow-hidden group hover:border-brand-orange transition-colors">
              <div className="absolute top-0 right-0 bg-brand-dark text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Long Distance</div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Option 2: Outside the area</h3>
              <p className="text-4xl font-black text-brand-orange mb-6">From £1.50/mile</p>
              <p className="text-brand-dark mb-8 leading-relaxed font-medium">For recovery between towns or longer distances. Final total is confirmed before recovery where possible.</p>
              <a href="tel:07366302341" className="block text-center bg-brand-dark text-white font-black py-4 uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-colors">Get Quote</a>
            </div>
          </div>
          <p className="text-center mt-8 text-xs text-gray-500 font-medium italic">
            Guide prices only – final pricing is confirmed before recovery where possible. ETAs vary with traffic and local availability. Pricing remains indicative.
          </p>
        </div>
      </section>

      {/* Areas Served Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">
                Areas Served for <span className="text-brand-orange">Breakdown Recovery</span>
              </h2>
              <p className="text-lg text-brand-dark mb-8 leading-relaxed font-medium">
                We provide breakdown recovery across our Hampshire coverage area including Portsmouth, Havant, Fareham, Gosport, and Waterlooville.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Vehicle recovery in Portsmouth", href: "/portsmouth-recovery" },
                  { name: "Vehicle recovery in Havant", href: "/havant-recovery" },
                  { name: "Vehicle recovery in Fareham", href: "/fareham-recovery" },
                  { name: "Vehicle recovery in Gosport", href: "/gosport-recovery" },
                  { name: "Vehicle recovery in Waterlooville", href: "/waterlooville-recovery" }
                ].map((link, index) => (
                  <a 
                    key={index} 
                    href={link.href} 
                    className="flex items-center text-brand-dark hover:text-brand-orange font-bold transition-colors group"
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
              <p className="text-gray-400 mb-8">We are standing by to assist you with any breakdown emergency 24/7.</p>
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
          <p className="mt-12 text-center text-xs text-gray-400">
            Service and payment terms are explained in our Terms & Conditions.
          </p>
        </div>
      </section>
    </div>
  );
}
