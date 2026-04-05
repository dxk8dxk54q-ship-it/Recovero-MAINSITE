import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  CheckCircle2, 
  Clock, 
  MapPin,
  AlertTriangle
} from 'lucide-react';

export default function GosportRecovery() {
  useEffect(() => {
    document.title = "Vehicle Recovery Gosport | 24/7 Breakdown Help | Recovero247";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Need vehicle recovery in Gosport? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Gosport and nearby areas.');
    }
  }, []);

  return (
    <div className="bg-white">
      <section className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovery-truck.jpg?raw=true"
            alt="Vehicle Recovery in Gosport"
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 uppercase tracking-tighter">
              24/7 <span className="text-brand-orange">Vehicle Recovery</span> in Gosport
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              Need vehicle recovery in Gosport? Recovero247 helps with breakdowns, non-runners, accident recovery and vehicle transport across Gosport and nearby areas.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="tel:07366302341" 
                className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl"
              >
                <Phone className="mr-3 w-5 h-5 fill-current" />
                GET IN TOUCH
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-8 uppercase tracking-tight text-brand-dark">
                How to get car recovery in Gosport quickly
              </h2>
              <ul className="space-y-4 mb-12">
                {[
                  "Tell us your exact location, vehicle details, and what has happened.",
                  "We’ll get a recovery driver out to you as quickly as possible.",
                  "We’ll confirm the ETA and recovery details as quickly as possible."
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-brand-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl md:text-4xl font-black mb-8 uppercase tracking-tight text-brand-dark">
                Common Gosport callouts
              </h2>
              <ul className="space-y-4 mb-12">
                {[
                  "A32 approach-route breakdowns entering or leaving the area",
                  "Gosport Ferry Terminal non-starts, including flat battery issues after parking",
                  "Town-centre and Gosport High Street callouts from shopping and multi-storey car parks",
                  "Accident-damaged vehicles needing onward transport once safe to move",
                  "Home-start requests for residential vehicles that won't run",
                  "Vehicle transport to local garages or a home address"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-brand-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-12">
              <div className="bg-brand-dark p-8 md:p-12 rounded-sm text-white shadow-2xl">
                <h3 className="text-xl md:text-2xl font-black mb-6 uppercase tracking-widest text-brand-orange">
                  Key Gosport recovery routes
                </h3>
                <ul className="space-y-4">
                  {[
                    "A32 (Fareham Road / Gosport Road)",
                    "B3333 (South Street / Privett Road)",
                    "B3385 (Newgate Lane)",
                    "Military Road",
                    "Heritage Way"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0" />
                      <span className="text-lg font-bold uppercase tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-black mb-8 uppercase tracking-tight text-brand-dark">
                  What to tell us when you call from Gosport
                </h2>
                <ul className="space-y-4">
                  {[
                    "Your exact location, including postcode, road name, or a clear landmark.",
                    "Your vehicle type and any useful details (for example car, van, motorbike, lowered vehicle).",
                    "What has happened: non-runner, puncture, won't start, accident damage, or another issue.",
                    "Where the vehicle needs to go if transport is required, such as a garage or home address."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="mt-1.5 w-2 h-2 bg-brand-orange rounded-full flex-shrink-0" />
                      <span className="text-lg text-brand-dark font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            Need Help in Gosport? <span className="text-white">Call Us Now.</span>
          </h2>
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
