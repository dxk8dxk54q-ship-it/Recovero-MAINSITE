import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-brand-dark text-white flex items-center py-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-brand-orange font-black uppercase tracking-[0.25em] mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">Page not found</h1>
        <p className="text-gray-300 text-lg mb-10">
          The page you requested does not exist. Return to Recovero24/7 or call us if you need vehicle recovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 rounded-full">
            Back to home
          </Link>
          <a href="tel:07366302341" className="bg-brand-orange text-black font-black uppercase tracking-widest px-8 py-4 rounded-full inline-flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            Call now
          </a>
        </div>
      </div>
    </section>
  );
}
