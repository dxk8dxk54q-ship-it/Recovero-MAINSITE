import React from 'react';
import { Phone, CheckCircle2, MapPin, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceLocationProps {
  serviceType: 'breakdown' | 'accident' | 'transport';
  location: string;
}

const SERVED_AREAS = [
  'Portsmouth',
  'Havant',
  'Fareham',
  'Gosport',
  'Waterlooville',
  'Petersfield',
  'Winchester',
  'Andover',
  'Hayling Island'
];

export default function ServiceLocation({ serviceType, location }: ServiceLocationProps) {
  const getContent = () => {
    switch (serviceType) {
      case 'breakdown':
        return {
          title: `Breakdown Recovery in ${location}`,
          intro: `Recovero arranges breakdown recovery in ${location} and nearby areas. Call us if your vehicle has broken down and needs recovery to your home, garage, or another location.`,
          situations: ['Engine failure on the roadside', "Flat battery or vehicle won't start", 'Punctured tyre without a spare', 'Electrical faults and breakdowns'],
          icon: <Truck className="w-16 h-16 mb-6 text-brand-orange" />
        };
      case 'accident':
        return {
          title: `Accident Recovery in ${location}`,
          intro: `Recovero arranges accident recovery in ${location} and nearby areas. Call us if you've been involved in a collision and need your vehicle safely recovered.`,
          situations: ['Collision and smash recovery', 'Wheel damage or locked wheels', 'Off-road vehicle recovery', 'Safe transit to an approved repairer'],
          icon: <ShieldCheck className="w-16 h-16 mb-6 text-brand-orange" />
        };
      case 'transport':
        return {
          title: `Vehicle Transport in ${location}`,
          intro: `Recovero arranges professional vehicle transport in ${location} and nearby areas. Call us to move your vehicle safely to your desired destination.`,
          situations: ['Private car purchases and sales', 'Non-runner vehicle transport', 'Dealership and auction collection', 'Relocation and garage drop-offs'],
          icon: <Truck className="w-16 h-16 mb-6 text-brand-orange" />
        };
    }
  };

  const content = getContent();
  const getBaseRoute = () => {
    switch (serviceType) {
      case 'breakdown': return '/breakdown-recovery';
      case 'accident': return '/accident-recovery';
      case 'transport': return '/vehicle-transport';
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-orange/10 transform -skew-y-3 origin-top-left shadow-lg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {content.icon}
            <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
              {content.title}
            </h1>
            <p className="text-xl text-gray-300 md:text-2xl font-medium mb-8 leading-relaxed">
              {content.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a 
                href="tel:07366302341" 
                className="inline-flex justify-center items-center px-8 py-4 text-base md:text-lg font-black rounded-sm text-white bg-brand-orange hover:bg-brand-orange/90 transition-all uppercase tracking-widest hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(234,88,12,0.39)]"
              >
                <Phone className="w-5 h-5 mr-3 animate-pulse" />
                Call 07366 302 341
              </a>
            </div>
            <p className="mt-6 text-xs text-gray-400 max-w-lg font-medium leading-relaxed italic border-l-2 border-brand-orange pl-3">
              We aim to connect you with a recovery operator as quickly as possible. Calling does not guarantee an immediate ETA, but we will confirm all details upfront.
            </p>
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-widest text-brand-dark">
              Common Situations We Handle
            </h2>
            <div className="space-y-4 text-lg">
              {content.situations.map((situation, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                  <span className="font-medium text-gray-800">{situation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-widest text-brand-dark">
            Nearby Areas Served
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SERVED_AREAS.filter(a => a !== location).map((area, i) => (
              <Link 
                key={i} 
                to={`${getBaseRoute()}/${area.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100 group flex items-center justify-between"
              >
                <div className="flex items-center text-brand-dark font-bold uppercase tracking-widest">
                  <MapPin className="w-5 h-5 mr-3 text-brand-orange group-hover:scale-110 transition-transform" />
                  {area}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
