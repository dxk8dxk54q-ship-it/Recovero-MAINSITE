import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Truck, 
  Shield, 
  UserCheck, 
  Briefcase, 
  Check,
  CheckSquare,
  Square,
  DollarSign
} from 'lucide-react';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase lazily so it doesn't crash on startup if credentials are missing
let supabaseClient: any = null;
const getSupabaseClient = () => {
  if (!supabaseClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase credentials");
    }
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
};

export default function BecomePartner() {
  useEffect(() => {
    document.title = "Join Recovero Recovery Network | Extra Recovery Jobs";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Join Recovero’s recovery partner network and receive suitable vehicle recovery, non-runner, transport and garage movement jobs in your area. Free to join.");
    }

    const isProductionSite = !window.location.hostname.includes('localhost') && 
                             !window.location.hostname.includes('127.0.0.1') &&
                             !window.location.hostname.includes('.run.app') &&
                             !window.location.hostname.includes('ais-dev') &&
                             !window.location.hostname.includes('ais-pre');
                             
    if (isProductionSite && (!supabaseUrl || !supabaseAnonKey)) {
      console.error("Missing Supabase environment variables on production site");
    }
  }, []);

  // Form State initialized to match the Recovero CRM driver profile fields
  const [formData, setFormData] = useState({
    // Section 1: Business Details
    companyName: '',
    contactName: '',
    dispatchPhone: '',
    whatsappPhone: '',
    email: '',
    businessPostcode: '',
    websiteOrFacebook: '',

    // Section 2: Coverage
    postcodeAreas: '',
    townsCovered: '',
    hoursCovered: '',
    eta: '',

    // Section 3: Job Capabilities (Booleans for toggle cards)
    capabilityRoadside: false,
    capabilityHome: false,
    capabilityNonRunner: false,
    capabilityWinch: false,
    capabilityMotorway: false,
    capabilityAccident: false,
    capabilitySpecialist: false,
    capabilityTransport: false,

    // Section 4: Transport Details
    servicePreference: 'Recovery & Transport', // default option
    transportLeadTime: '',
    transportPricingNotes: '',
    vehicleLimits: '',

    // Section 5: Pricing Profile
    priceLocalRecovery: '',
    priceNonRunner: '',
    priceWinchAddon: '',
    milesIncluded: '',
    priceExtraMile: '',
    mileageType: 'Loaded', // default option
    priceOutOfHoursUplift: '',
    priceMotorwayMinimum: '',
    priceAwkwardAccessUplift: '',
    priceAccidentUplift: '',
    priceSevereManualQuote: false,
    pricingNotes: '',

    // Section 6: Extra Notes
    extraNotes: '',

    // Section 7: Confirmation
    confirmAccurate: false,

    // Anti-spam Honeypot
    honeypot: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckboxChange = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (
      !formData.companyName.trim() ||
      !formData.contactName.trim() ||
      !formData.dispatchPhone.trim() ||
      !formData.email.trim() ||
      !formData.postcodeAreas.trim() ||
      !formData.hoursCovered.trim() ||
      !formData.eta.trim() ||
      !formData.priceLocalRecovery.trim() ||
      !formData.priceNonRunner.trim() ||
      !formData.servicePreference ||
      !formData.confirmAccurate
    ) {
      setErrorMessage("Please fill out all required fields and accept the confirmation checkbox.");
      return;
    }

    setIsSending(true);

    const isProductionSite = !window.location.hostname.includes('localhost') && 
                             !window.location.hostname.includes('127.0.0.1') &&
                             !window.location.hostname.includes('.run.app') &&
                             !window.location.hostname.includes('ais-dev') &&
                             !window.location.hostname.includes('ais-pre');

    const useSupabase = !!(supabaseUrl && supabaseAnonKey);

    if (isProductionSite && !useSupabase) {
      console.error("Missing Supabase environment variables on production site");
    }

    if (useSupabase) {
      try {
        const client = getSupabaseClient();
        
        // Map payload to standard snake_case column names matching direct table inserts
        const payload = {
          company_name: formData.companyName,
          contact_name: formData.contactName,
          dispatch_phone: formData.dispatchPhone,
          whatsapp_phone: formData.whatsappPhone,
          email: formData.email,
          business_postcode: formData.businessPostcode,
          website_or_facebook: formData.websiteOrFacebook,
          postcode_areas: formData.postcodeAreas,
          towns_areas: formData.townsCovered,
          hours_covered: formData.hoursCovered,
          eta_minutes: formData.eta,
          service_preference: formData.servicePreference,
          standard_local_recovery_price: formData.priceLocalRecovery,
          non_runner_price: formData.priceNonRunner,
          winch_add_on: formData.priceWinchAddon,
          miles_included: formData.milesIncluded,
          extra_mile_price: formData.priceExtraMile,
          mileage_type: formData.mileageType,
          out_of_hours_uplift: formData.priceOutOfHoursUplift,
          motorway_minimum_price: formData.priceMotorwayMinimum,
          awkward_access_uplift: formData.priceAwkwardAccessUplift,
          accident_damaged_uplift: formData.priceAccidentUplift,
          pricing_notes: formData.pricingNotes,
          extra_notes: formData.extraNotes,
          confirm_accurate: formData.confirmAccurate,
          status: "new",
          raw_payload: formData,
          capability_roadside: formData.capabilityRoadside,
          capability_home: formData.capabilityHome,
          capability_non_runner: formData.capabilityNonRunner,
          capability_winch: formData.capabilityWinch,
          capability_motorway: formData.capabilityMotorway,
          capability_accident: formData.capabilityAccident,
          capability_specialist: formData.capabilitySpecialist,
          capability_transport: formData.capabilityTransport
        };

        console.log("Partner application insert payload", payload);
        console.log("Partner application insert keys", Object.keys(payload));

        const { error } = await client
          .from('partner_applications')
          .insert([payload]);

        if (error) {
          console.error("Partner application submit failed", {
            message: error?.message,
            details: error?.details,
            hint: error?.hint,
            code: error?.code,
            error
          });
          setErrorMessage(error.message || "Something went wrong. Please try again or email support@recovero247.co.uk.");
          setIsSending(false);
          return;
        }

        try {
          const { error: fnError } = await client.functions.invoke('send-partner-application-email', {
            body: { application: payload }
          });
          if (fnError) {
             console.error("Failed to send email notification via Edge Function", fnError);
          }
        } catch (fnCatchError) {
          console.error("Failed to send email notification via Edge Function", fnCatchError);
        }

        setSubmitted(true);
      } catch (error: any) {
        console.error("Partner application submit failed", {
          message: error?.message,
          details: error?.details || "",
          hint: error?.hint || "",
          code: error?.code || "",
          error
        });
        setErrorMessage(error?.message || "Something went wrong. Please try again or email support@recovero247.co.uk.");
      } finally {
        setIsSending(false);
      }
      return;
    }

    // Fallback to local /api/partner-apply endpoint for local preview/development
    try {
      const response = await fetch('/api/partner-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again or email support@recovero247.co.uk.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setErrorMessage("Something went wrong. Please try again or email support@recovero247.co.uk.");
    } finally {
      setIsSending(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('partner-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://github.com/dxk8dxk54q-ship-it/Recovero/blob/main/images/recovery-truck.jpg?raw=true"
            alt="Become a Recovery Partner with Recovero"
            className="w-full h-full object-cover opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 max-w-3xl"
            >
              <span className="inline-block bg-brand-orange text-black font-black uppercase tracking-[0.2em] text-xs px-3 py-1 mb-6 rounded-sm">
                JOIN OUR NETWORK
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 uppercase tracking-tighter">
                Get Extra <span className="text-brand-orange">Recovery Jobs</span> With Recovero
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                Join our trusted network of recovery partners and receive suitable vehicle recovery, transport and non-runner jobs in your area when jobs are available.
              </p>
              
              <div className="mb-4">
                <button 
                  onClick={scrollToForm}
                  className="inline-flex items-center bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 md:px-10 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl"
                >
                  Apply To Join
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              <p className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wider mb-8">
                No joining fee. No monthly fee. No subscription.
              </p>
            </motion.div>

            {/* Hero Trust Points */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 bg-brand-dark/95 border border-brand-orange/20 p-8 rounded-sm text-white shadow-2xl backdrop-blur-sm"
            >
              <h3 className="text-lg font-black uppercase tracking-widest text-brand-orange mb-6 border-b border-white/10 pb-4">
                Partner Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Free to join",
                  "Choose the jobs you want",
                  "Customer pays you directly",
                  "Local and long-distance jobs"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span className="text-sm md:text-base font-bold uppercase tracking-tight text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: Why Join Recovero? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="block text-xs font-black uppercase tracking-[0.3em] text-brand-orange mb-2">
                GROW YOUR BUSINESS
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight text-brand-dark">
                Extra Work Without The Hassle
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Recovero helps customers, garages and dealers arrange vehicle recovery when they need a car moved. When a suitable job comes in for your area, we send over the details and you decide whether you want to take it. There is absolutely no pressure.
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                * Note: Recovero does not guarantee a set volume of jobs. Leads are shared on an as-available basis.
              </p>
              <div className="mt-8">
                <img 
                  src="/images/securing-vehicle.jpg" 
                  alt="Securing Vehicle on Flatbed" 
                  className="w-full h-auto rounded-sm shadow-xl border border-gray-200 object-cover" 
                />
              </div>
            </div>
            <div className="bg-gray-50 p-8 md:p-12 border border-gray-100 rounded-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-6">
                Why Partners Love Working With Us
              </h3>
              <ul className="space-y-4">
                {[
                  "No joining fee",
                  "No monthly fee",
                  "No subscription",
                  "No obligation to accept every job",
                  "Jobs sent directly to you",
                  "Customer pays you directly for the recovery",
                  "Suitable for local recovery, transport, non-runners and garage movements"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-base text-brand-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Types of Jobs */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-orange block mb-2">
              OPPORTUNITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Types Of Jobs We May Send
            </h2>
            <p className="text-gray-400 mt-4">
                We cover a wide variety of requests from customers and trade partners. Depending on your equipment, we can send matching jobs in your area.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid md:grid-cols-2 gap-6 md:gap-8 mb-4">
                 <div className="relative h-64 md:h-80 rounded-sm overflow-hidden group">
                   <img src="/images/job-breakdown-recovery.jpg" alt="Breakdown Recovery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-xl font-black uppercase tracking-wider mb-2 text-white">Breakdown Recovery</h3>
                      <p className="text-gray-300 text-sm">Assisting customers stranded roadside or at home.</p>
                   </div>
                 </div>
                 <div className="relative h-64 md:h-80 rounded-sm overflow-hidden group">
                   <img src="/images/job-accident-recovery.jpg" alt="Accident Recovery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-xl font-black uppercase tracking-wider mb-2 text-white">Accident Recovery</h3>
                      <p className="text-gray-300 text-sm">Clearing and transporting vehicles after minor accidents.</p>
                   </div>
                 </div>
              </div>

              {[
                { title: "Non-runner recovery", desc: "Transporting vehicles that do not start, run, or roll." },
                { title: "Garage drop-offs", desc: "Moving vehicles directly to garages or repair centers." },
                { title: "Dealer vehicle movements", desc: "Pre-arranged transport for trade and dealerships." },
                { title: "Customer breakdowns", desc: "Direct consumer callouts requiring prompt response." },
                { title: "Local recovery", desc: "Short distance recovery trips within your immediate coverage zone." },
                { title: "Longer-distance transport", desc: "Long distance and cross-county vehicle movements." },
                { title: "Out-of-hours recovery", desc: "Late night, early morning and weekend job opportunities." }
              ].map((job, index) => (
                <div 
                  key={index} 
                  className="bg-brand-dark/50 border border-white/10 hover:border-brand-orange/40 p-6 rounded-sm transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center rounded-sm mb-4">
                    <Truck className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider mb-2 text-white">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {job.desc}
                  </p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-orange block mb-2">
              SIMPLE PROCESS
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-brand-dark">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Apply to join",
                desc: "Tell us your coverage area, vehicle type and what jobs you can handle."
              },
              {
                step: "02",
                title: "We send suitable jobs",
                desc: "When a job comes in for your area, we send you the details."
              },
              {
                step: "03",
                title: "You choose whether to accept",
                desc: "If the job works for you, you take it. If not, no problem."
              },
              {
                step: "04",
                title: "You complete the recovery",
                desc: "You carry out the job and the customer pays you directly."
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-5xl font-black text-brand-orange/20 group-hover:text-brand-orange/40 transition-colors mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-brand-dark">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Who We're Looking For */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight text-brand-dark">
                Who We’re Looking For
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We’re looking for reliable recovery partners who can communicate clearly, turn up when agreed and handle customers professionally.
              </p>
              <ul className="space-y-4">
                {[
                  "Recovery truck, transporter or suitable recovery vehicle",
                  "Valid insurance",
                  "Reliable communication",
                  "Ability to cover agreed areas",
                  "Experience with recovery or vehicle transport",
                  "Professional attitude with customers"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-base text-brand-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 relative">
               <img 
                 src="/images/happy-operator.jpg" 
                 alt="Professional Independent Recovery Operator" 
                 className="w-full h-auto rounded-sm shadow-2xl object-cover" 
               />
               <div className="absolute -bottom-6 -left-6 bg-brand-dark p-6 border border-brand-orange/20 shadow-xl hidden md:block max-w-xs z-10">
                  <h4 className="font-bold uppercase tracking-tight text-white mb-2 flex items-center">
                    <UserCheck className="w-5 h-5 text-brand-orange mr-2" />
                    Fully Independent
                  </h4>
                  <p className="text-sm text-gray-400">Run your own vehicle, work as you please. We just provide the leads.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break Section */}
      <section className="relative py-24 md:py-32 bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/customer-interaction.jpg" 
            alt="Customer Interaction at Roadside" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-brand-dark/50 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 drop-shadow-lg">
            Professionalism Built on Trust
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Our customers rely on us when things go wrong. We partner with operators who take pride in delivering a calm, reassuring, and professional service.
          </p>
          <button 
            onClick={scrollToForm}
            className="inline-block bg-brand-orange text-brand-dark font-black uppercase tracking-wider py-4 px-10 rounded-sm hover:bg-white transition-colors duration-300 shadow-lg"
          >
            Apply to Join Today
          </button>
        </div>
      </section>

      {/* Section 5: Application Form */}
      <section id="partner-application-form" className="py-16 md:py-24 bg-white Scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-dark text-white p-6 sm:p-10 md:p-12 rounded-sm shadow-2xl border border-brand-orange/20">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-orange block mb-2">
                PARTNER APPLICATION
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
                Apply To Join The Recovero Network
              </h2>
              <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                Complete the form below so we know what areas you cover, what jobs you can handle, your usual response time and your standard pricing. There’s no joining fee, no monthly fee and no obligation to accept every job.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-10 text-left"
                >
                  {/* Anti-spam Honeypot Field */}
                  <div className="hidden absolute w-0 h-0 overflow-hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      name="honeypot" 
                      tabIndex={-1} 
                      autoComplete="off" 
                      value={formData.honeypot}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* SECTION 1 — Business Details */}
                  <div className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-6 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">1</span>
                      Business Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Company Name *
                        </label>
                        <input 
                          type="text" 
                          name="companyName"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. Portsmouth Recovery Services"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Contact Name *
                        </label>
                        <input 
                          type="text" 
                          name="contactName"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="John Doe"
                          value={formData.contactName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Dispatch Phone *
                        </label>
                        <input 
                          type="tel" 
                          name="dispatchPhone"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 07366 302341"
                          value={formData.dispatchPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          WhatsApp Phone
                        </label>
                        <input 
                          type="tel" 
                          name="whatsappPhone"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 07366 302341"
                          value={formData.whatsappPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. partner@example.co.uk"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Business Postcode
                        </label>
                        <input 
                          type="text" 
                          name="businessPostcode"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. PO1 1AA"
                          value={formData.businessPostcode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                        Website or Facebook Page
                      </label>
                      <input 
                        type="text" 
                        name="websiteOrFacebook"
                        className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                        placeholder="e.g. www.facebook.com/myrecoverypage"
                        value={formData.websiteOrFacebook}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* SECTION 2 — Coverage */}
                  <div className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-6 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">2</span>
                      Coverage Area
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-1">
                          Postcode Areas Covered *
                        </label>
                        <span className="block text-[10px] text-gray-400 mb-2">Enter multiple postcode areas separated by commas.</span>
                        <input 
                          type="text" 
                          name="postcodeAreas"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. PO, SO, GU, BN"
                          value={formData.postcodeAreas}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-1">
                          Towns/Areas Covered
                        </label>
                        <span className="block text-[10px] text-gray-400 mb-2">Key towns or primary regions you operate in.</span>
                        <input 
                          type="text" 
                          name="townsCovered"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. Portsmouth, Havant, Fareham, Gosport, Waterlooville"
                          value={formData.townsCovered}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Hours Covered *
                        </label>
                        <input 
                          type="text" 
                          name="hoursCovered"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 24/7, Mon–Sat 8am–6pm, evenings only"
                          value={formData.hoursCovered}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-1">
                          Estimated ETA in minutes *
                        </label>
                        <span className="block text-[10px] text-gray-400 mb-2">Typical arrival time for local callouts.</span>
                        <input 
                          type="text" 
                          name="eta"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 35"
                          value={formData.eta}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3 — Job Capabilities */}
                  <div className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-4 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">3</span>
                      Job Capabilities
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">Select all job types you have the equipment and capacity to handle:</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { key: 'capabilityRoadside', label: 'Roadside' },
                        { key: 'capabilityHome', label: 'Home' },
                        { key: 'capabilityNonRunner', label: 'Non-Runner' },
                        { key: 'capabilityWinch', label: 'Winch' },
                        { key: 'capabilityMotorway', label: 'Motorway' },
                        { key: 'capabilityAccident', label: 'Accident' },
                        { key: 'capabilitySpecialist', label: 'Specialist' },
                        { key: 'capabilityTransport', label: 'Transport' },
                      ].map((cap) => {
                        const isChecked = !!(formData as any)[cap.key];
                        return (
                          <div 
                            key={cap.key}
                            onClick={() => handleCheckboxChange(cap.key as any)}
                            className={`cursor-pointer p-4 border rounded-sm flex flex-col items-center justify-center text-center transition-all duration-300 ${
                              isChecked 
                                ? 'bg-brand-orange/10 border-brand-orange text-white' 
                                : 'bg-brand-dark/40 border-white/10 text-gray-400 hover:border-white/25'
                            }`}
                          >
                            <div className="mb-2">
                              {isChecked ? (
                                <CheckSquare className="w-6 h-6 text-brand-orange" />
                              ) : (
                                <Square className="w-6 h-6 text-gray-600" />
                              )}
                            </div>
                            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">{cap.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* SECTION 4 — Transport Details */}
                  <div className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-6 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">4</span>
                      Transport Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Service Preference *
                        </label>
                        <select 
                          name="servicePreference"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          value={formData.servicePreference}
                          onChange={handleInputChange}
                        >
                          <option value="Recovery Only">Recovery Only</option>
                          <option value="Transport Only">Transport Only</option>
                          <option value="Recovery & Transport">Recovery & Transport</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Typical Transport Lead Time
                        </label>
                        <input 
                          type="text" 
                          name="transportLeadTime"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. Same day, 24–48 hours, pre-booked only"
                          value={formData.transportLeadTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Transport Pricing Notes
                        </label>
                        <textarea 
                          name="transportPricingNotes"
                          rows={3}
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors resize-none"
                          placeholder="Special pricing rules for transport, flat rates, long-distance pricing, multi-car discounts, etc."
                          value={formData.transportPricingNotes}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Vehicle Limits / Notes
                        </label>
                        <textarea 
                          name="vehicleLimits"
                          rows={3}
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors resize-none"
                          placeholder="e.g. cars only, vans up to 3.5t, no underground car parks, no no-key jobs"
                          value={formData.vehicleLimits}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5 — Pricing Profile */}
                  <div className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-2 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">5</span>
                      Your Standard Pricing
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">These prices help us estimate which jobs are suitable for you. You are not required to accept every job.</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Standard Local Recovery Price (£) *
                        </label>
                        <input 
                          type="text" 
                          name="priceLocalRecovery"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 60"
                          value={formData.priceLocalRecovery}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Non-Runner Price (£) *
                        </label>
                        <input 
                          type="text" 
                          name="priceNonRunner"
                          required
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 100"
                          value={formData.priceNonRunner}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Winch Add-on (£)
                        </label>
                        <input 
                          type="text" 
                          name="priceWinchAddon"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 25"
                          value={formData.priceWinchAddon}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Miles Included
                        </label>
                        <input 
                          type="text" 
                          name="milesIncluded"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 10"
                          value={formData.milesIncluded}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Extra Mile Price (£/mile)
                        </label>
                        <input 
                          type="text" 
                          name="priceExtraMile"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 2"
                          value={formData.priceExtraMile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Mileage Type
                        </label>
                        <select 
                          name="mileageType"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          value={formData.mileageType}
                          onChange={handleInputChange}
                        >
                          <option value="Loaded">Loaded</option>
                          <option value="Total journey">Total journey</option>
                          <option value="By agreement">By agreement</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Out-of-Hours Uplift (£)
                        </label>
                        <input 
                          type="text" 
                          name="priceOutOfHoursUplift"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 30"
                          value={formData.priceOutOfHoursUplift}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Motorway Minimum Price (£)
                        </label>
                        <input 
                          type="text" 
                          name="priceMotorwayMinimum"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 150"
                          value={formData.priceMotorwayMinimum}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Awkward Access Uplift (£)
                        </label>
                        <input 
                          type="text" 
                          name="priceAwkwardAccessUplift"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 40"
                          value={formData.priceAwkwardAccessUplift}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                          Accident Damaged Uplift (£)
                        </label>
                        <input 
                          type="text" 
                          name="priceAccidentUplift"
                          className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors"
                          placeholder="e.g. 100"
                          value={formData.priceAccidentUplift}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex items-end pb-3">
                        <label className="flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            name="priceSevereManualQuote"
                            checked={formData.priceSevereManualQuote}
                            onChange={() => handleCheckboxChange('priceSevereManualQuote')}
                            className="w-5 h-5 accent-brand-orange border-white/10 bg-brand-dark/50 mr-3 cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-gray-300">
                            Severe accident jobs require manual quote
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                        Pricing Notes
                      </label>
                      <textarea 
                        name="pricingNotes"
                        rows={3}
                        className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors resize-none"
                        placeholder="Add anything else we should know about your pricing."
                        value={formData.pricingNotes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* SECTION 6 — Extra Notes */}
                  <div className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-6 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">6</span>
                      Extra Notes
                    </h3>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                        Any Extra Notes
                      </label>
                      <textarea 
                        name="extraNotes"
                        rows={4}
                        className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-orange text-white py-3 px-4 outline-none transition-colors resize-none"
                        placeholder="Tell us anything else about your equipment, coverage, availability or preferred jobs."
                        value={formData.extraNotes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* SECTION 7 — Confirmation */}
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-brand-orange mb-6 flex items-center">
                      <span className="mr-3 text-sm bg-brand-orange text-black font-black w-6 h-6 rounded-full inline-flex items-center justify-center">7</span>
                      Confirmation
                    </h3>
                    <div className="bg-brand-dark/40 border border-white/5 p-6 rounded-sm">
                      <label className="flex items-start cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          name="confirmAccurate"
                          required
                          checked={formData.confirmAccurate}
                          onChange={() => handleCheckboxChange('confirmAccurate')}
                          className="w-5 h-5 accent-brand-orange border-white/10 bg-brand-dark/50 mr-4 mt-0.5 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-sm font-bold uppercase tracking-tight text-gray-200">
                          I confirm the details provided are accurate and I’m happy for Recovero to contact me about suitable recovery jobs. *
                        </span>
                      </label>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-900/50 border border-red-500/50 text-red-200 text-sm py-3 px-4 rounded-sm text-center font-bold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="text-center pt-4">
                    <button 
                      type="submit"
                      disabled={isSending}
                      className={`w-full sm:w-auto bg-brand-orange text-black font-black py-4 px-12 text-base uppercase tracking-widest transition-all rounded-full shadow-2xl ${
                        isSending 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-brand-orange/90 transform hover:scale-105'
                      }`}
                    >
                      {isSending ? 'Sending...' : 'Send Application'}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-6 bg-brand-dark/50 border border-brand-orange/30 rounded-sm"
                >
                  <div className="w-16 h-16 bg-brand-orange text-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-3">
                    Application Received
                  </h3>
                  <p className="text-gray-300 max-w-md mx-auto text-base">
                    Thanks — we’ve received your application and will be in touch shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setErrorMessage(null);
                      setFormData({
                        companyName: '',
                        contactName: '',
                        dispatchPhone: '',
                        whatsappPhone: '',
                        email: '',
                        businessPostcode: '',
                        websiteOrFacebook: '',
                        postcodeAreas: '',
                        townsCovered: '',
                        hoursCovered: '',
                        eta: '',
                        capabilityRoadside: false,
                        capabilityHome: false,
                        capabilityNonRunner: false,
                        capabilityWinch: false,
                        capabilityMotorway: false,
                        capabilityAccident: false,
                        capabilitySpecialist: false,
                        capabilityTransport: false,
                        servicePreference: 'Recovery & Transport',
                        transportLeadTime: '',
                        transportPricingNotes: '',
                        vehicleLimits: '',
                        priceLocalRecovery: '',
                        priceNonRunner: '',
                        priceWinchAddon: '',
                        milesIncluded: '',
                        priceExtraMile: '',
                        mileageType: 'Loaded',
                        priceOutOfHoursUplift: '',
                        priceMotorwayMinimum: '',
                        priceAwkwardAccessUplift: '',
                        priceAccidentUplift: '',
                        priceSevereManualQuote: false,
                        pricingNotes: '',
                        extraNotes: '',
                        confirmAccurate: false,
                        honeypot: ''
                      });
                    }}
                    className="mt-8 text-brand-orange hover:text-white font-bold uppercase tracking-wider text-sm transition-colors"
                  >
                    Submit another application
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="relative py-16 md:py-24 bg-brand-orange text-black overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
            Want Extra Recovery Work In Your Area?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-black/80 mb-8 max-w-2xl mx-auto font-medium">
            If you’re a reliable recovery partner and want to receive suitable jobs when they come in, apply below and we’ll be in touch.
          </p>
          <div className="flex flex-col items-center">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-black hover:bg-black/90 text-brand-orange font-black py-4 md:py-5 px-10 md:px-12 text-base md:text-lg uppercase tracking-widest transition-all transform hover:scale-110 rounded-full shadow-2xl inline-block"
            >
              Apply To Join
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
