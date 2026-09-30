import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import {
  Truck,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Navigation,
  Car,
  User,
  ArrowRight,
  ExternalLink,
  Radio,
  Calendar
} from 'lucide-react';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient: any = null;
const getSupabaseClient = () => {
  if (!supabaseClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase credentials');
    }
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
};

interface JobDetails {
  id?: string;
  job_number?: string;
  job_ref?: string;
  reference?: string;
  status?: string;
  service_type?: string;
  customer_name?: string;
  customer_phone?: string;
  vehicle_reg?: string;
  registration?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  vehicle?: string;
  pickup_address?: string;
  pickup_postcode?: string;
  pickup_location?: string;
  dropoff_address?: string;
  dropoff_postcode?: string;
  dropoff_location?: string;
  delivery_address?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_vehicle?: string;
  driver_rating?: number | string;
  eta?: string | number;
  eta_minutes?: number;
  eta_text?: string;
  estimated_arrival?: string;
  driver_lat?: number;
  driver_lng?: number;
  pickup_lat?: number;
  pickup_lng?: number;
  notes?: string;
  special_instructions?: string;
  created_at?: string;
  updated_at?: string;
}

const STATUS_STEPS = [
  { key: 'assigned', label: 'Driver Assigned', desc: 'Job allocated to recovery unit' },
  { key: 'en_route', label: 'En Route', desc: 'Driver travelling to pickup location' },
  { key: 'on_scene', label: 'On Scene', desc: 'Driver arrived & assessing vehicle' },
  { key: 'in_transit', label: 'In Transit', desc: 'Vehicle loaded & en route to destination' },
  { key: 'completed', label: 'Completed', desc: 'Vehicle safely delivered' }
];

function normalizeStatus(status?: string): { stepIndex: number; label: string; color: string; badge: string; isComplete: boolean; isCancelled: boolean } {
  if (!status) {
    return { stepIndex: 0, label: 'Driver Assigned', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', isComplete: false, isCancelled: false };
  }

  const s = status.toLowerCase().replace(/[\s-_]+/g, '_');

  if (s.includes('cancel')) {
    return { stepIndex: -1, label: 'Cancelled', color: 'text-red-400', badge: 'bg-red-500/20 text-red-300 border-red-500/30', isComplete: false, isCancelled: true };
  }
  if (s.includes('complet') || s.includes('deliver') || s.includes('finished')) {
    return { stepIndex: 4, label: 'Job Completed', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', isComplete: true, isCancelled: false };
  }
  if (s.includes('transit') || s.includes('loaded') || s.includes('towing') || s.includes('moving')) {
    return { stepIndex: 3, label: 'Vehicle In Transit', color: 'text-brand-orange', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30', isComplete: false, isCancelled: false };
  }
  if (s.includes('scene') || s.includes('arrived') || s.includes('on_site') || s.includes('loading')) {
    return { stepIndex: 2, label: 'Driver On Scene', color: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', isComplete: false, isCancelled: false };
  }
  if (s.includes('route') || s.includes('way') || s.includes('travelling') || s.includes('dispatched')) {
    return { stepIndex: 1, label: 'Driver En Route', color: 'text-brand-orange', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30', isComplete: false, isCancelled: false };
  }

  return { stepIndex: 0, label: 'Driver Assigned', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', isComplete: false, isCancelled: false };
}

export default function CustomerTracking() {
  const { token: routeToken } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();
  const rawToken = routeToken || searchParams.get('token') || '';
  const [inputToken, setInputToken] = useState(rawToken);

  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(rawToken));
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    document.title = 'Live Recovery Tracking | Recovero247';
  }, []);

  const fetchTrackingData = useCallback(async (tokenToFetch: string, isManualRefresh = false) => {
    if (!tokenToFetch.trim()) {
      setLoading(false);
      return;
    }

    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const client = getSupabaseClient();
      const { data, error: invokeError } = await client.functions.invoke('get-customer-tracking', {
        body: { token: tokenToFetch.trim() }
      });

      if (invokeError) {
        console.error('Customer tracking invoke error:', invokeError);
        throw new Error(invokeError.message || 'Unable to retrieve tracking details');
      }

      if (!data) {
        throw new Error('No tracking data received');
      }

      if (data.error) {
        throw new Error(data.error || 'Tracking reference not found or has expired');
      }

      const jobData = data.job || data.data || data;
      setJob(jobData);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Failed to load tracking data:', err);
      setError(err?.message || 'Invalid or expired tracking link. Please check your reference or contact dispatch.');
      setJob(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (rawToken) {
      fetchTrackingData(rawToken);
    }
  }, [rawToken, fetchTrackingData]);

  // Auto poll every 25 seconds if active
  useEffect(() => {
    if (!rawToken || !job) return;

    const statusInfo = normalizeStatus(job.status);
    if (statusInfo.isComplete || statusInfo.isCancelled) return;

    const interval = setInterval(() => {
      fetchTrackingData(rawToken, true);
    }, 25000);

    return () => clearInterval(interval);
  }, [rawToken, job, fetchTrackingData]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.trim()) {
      fetchTrackingData(inputToken.trim());
    }
  };

  const statusInfo = normalizeStatus(job?.status);

  // Format vehicle display
  const vehicleName = [job?.vehicle_make, job?.vehicle_model].filter(Boolean).join(' ') || job?.vehicle || 'Vehicle';
  const registration = job?.vehicle_reg || job?.registration || '';
  const pickupAddr = job?.pickup_address || job?.pickup_location || 'Pickup Location';
  const dropoffAddr = job?.dropoff_address || job?.dropoff_location || job?.delivery_address;
  const etaDisplay = job?.eta_text || (job?.eta_minutes ? `~${job.eta_minutes} mins` : (job?.eta ? `${job.eta}` : 'Calculating...'));
  const jobRef = job?.job_ref || job?.job_number || job?.reference || rawToken.slice(0, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-brand">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Recovero Live Dispatch
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Customer Live Tracking
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {rawToken && (
              <button
                onClick={() => fetchTrackingData(rawToken, true)}
                disabled={loading || refreshing}
                className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors"
                title="Refresh Tracking Status"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-brand-orange' : ''}`} />
                <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
              </button>
            )}

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Link'}</span>
            </button>

            <a
              href="tel:07366302341"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-brand-orange/90 text-black rounded font-black text-xs uppercase tracking-wider transition-all transform hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Dispatch 24/7</span>
            </a>
          </div>
        </div>

        {/* Missing Token or Manual Entry Mode */}
        {!rawToken && !job && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#181818] border border-white/10 rounded-xl p-8 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange">
              <Navigation className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide mb-2 text-white">Track Your Recovery</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Enter your tracking token or reference code provided in your SMS or email confirmation to see live driver updates.
            </p>

            <form onSubmit={handleManualSearch} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="e.g. REC-84920 or token code"
                  className="w-full bg-[#101010] border border-white/15 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-lg px-4 py-3 text-white placeholder-gray-500 font-mono text-center uppercase tracking-widest text-sm outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-black font-black uppercase tracking-wider py-3.5 px-6 rounded-lg text-sm transition-all"
              >
                Track Live Job
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500">
              Need immediate assistance? Call our control room on{' '}
              <a href="tel:07366302341" className="text-brand-orange font-bold hover:underline">
                07366 302341
              </a>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-[#181818] border border-white/10 rounded-xl p-16 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-brand-orange/20 animate-ping"></div>
              <div className="w-16 h-16 rounded-full border-2 border-brand-orange border-t-transparent animate-spin"></div>
              <Truck className="w-6 h-6 text-brand-orange absolute inset-0 m-auto" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-1">
              Connecting to Dispatch...
            </h3>
            <p className="text-gray-400 text-xs tracking-wide">
              Retrieving live vehicle coordinates & driver status
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#181818] border border-red-500/30 rounded-xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Unable to Load Tracking Data
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {error}
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {rawToken && (
                    <button
                      onClick={() => fetchTrackingData(rawToken)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                  <a
                    href="tel:07366302341"
                    className="px-4 py-2 bg-brand-orange hover:bg-brand-orange/90 text-black rounded text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    Call Dispatch (07366 302341)
                  </a>
                  <Link
                    to="/"
                    className="px-4 py-2 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Job Tracking View */}
        {job && !loading && (
          <div className="space-y-6">
            {/* Top Status & ETA Hero Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1C1C1C] to-[#141414] border border-white/15 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${statusInfo.badge}`}>
                      <Radio className="w-3 h-3 mr-1.5 animate-pulse" />
                      {statusInfo.label}
                    </span>
                    {jobRef && (
                      <span className="text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded border border-white/10">
                        REF: #{jobRef}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                    {statusInfo.isComplete ? 'Vehicle Safely Delivered' : (statusInfo.isCancelled ? 'Job Cancelled' : 'Recovery In Progress')}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {job.service_type || '24/7 Breakdown & Vehicle Recovery Service'}
                  </p>
                </div>

                {/* ETA Box */}
                {!statusInfo.isComplete && !statusInfo.isCancelled && (
                  <div className="bg-black/60 border border-brand-orange/30 rounded-xl p-4 md:p-5 text-center shrink-0 min-w-[180px]">
                    <div className="flex items-center justify-center gap-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Estimated Arrival</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {etaDisplay}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                      Live dispatch estimate
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Stepper */}
              {!statusInfo.isCancelled && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {STATUS_STEPS.map((step, idx) => {
                      const isPast = statusInfo.stepIndex > idx;
                      const isCurrent = statusInfo.stepIndex === idx;
                      const isUpcoming = statusInfo.stepIndex < idx;

                      return (
                        <div key={step.key} className="relative flex md:flex-col items-start gap-3 md:gap-2">
                          <div className="flex items-center md:w-full">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                isPast
                                  ? 'bg-emerald-500 text-black'
                                  : isCurrent
                                  ? 'bg-brand-orange text-black ring-4 ring-brand-orange/20 animate-pulse'
                                  : 'bg-white/10 text-gray-500'
                              }`}
                            >
                              {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                            </div>
                            {idx < STATUS_STEPS.length - 1 && (
                              <div
                                className={`hidden md:block h-1 flex-1 ml-2 rounded ${
                                  isPast ? 'bg-emerald-500' : 'bg-white/10'
                                }`}
                              />
                            )}
                          </div>
                          <div>
                            <div
                              className={`text-xs font-bold uppercase tracking-wider ${
                                isCurrent ? 'text-brand-orange' : isPast ? 'text-white' : 'text-gray-500'
                              }`}
                            >
                              {step.label}
                            </div>
                            <div className="text-[11px] text-gray-400 hidden sm:block">
                              {step.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Grid Layout: Vehicle & Driver + Route Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Driver & Assignment Card */}
              <div className="bg-[#181818] border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">Assigned Recovery Unit</h3>
                      <p className="text-xs text-gray-400">Professional Recovero Partner</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-gray-400">Driver</span>
                    <span className="text-sm font-bold text-white">
                      {job.driver_name || 'Allocated Driver en route'}
                    </span>
                  </div>

                  {job.driver_vehicle && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-gray-400">Vehicle Type</span>
                      <span className="text-sm font-bold text-white">{job.driver_vehicle}</span>
                    </div>
                  )}

                  {job.driver_phone ? (
                    <div className="pt-2">
                      <a
                        href={`tel:${job.driver_phone}`}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider text-xs py-3 rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4 fill-current" />
                        <span>Call Driver ({job.driver_phone})</span>
                      </a>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <a
                        href="tel:07366302341"
                        className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Contact Control Room (07366 302341)</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicle & Customer Card */}
              <div className="bg-[#181818] border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">Vehicle Details</h3>
                      <p className="text-xs text-gray-400">Vehicle scheduled for recovery</p>
                    </div>
                  </div>

                  {/* UK Registration Badge */}
                  {registration && (
                    <div className="bg-amber-300 text-black px-3 py-1 rounded font-mono font-black text-sm tracking-wider border-2 border-black flex items-center gap-1.5 shadow-sm">
                      <span className="bg-blue-700 text-white text-[8px] font-bold px-1 py-0.5 rounded-sm">GB</span>
                      <span>{registration.toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-gray-400">Make & Model</span>
                    <span className="text-sm font-bold text-white">{vehicleName}</span>
                  </div>

                  {job.vehicle_color && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-gray-400">Color</span>
                      <span className="text-sm font-bold text-white">{job.vehicle_color}</span>
                    </div>
                  )}

                  {job.customer_name && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-gray-400">Customer</span>
                      <span className="text-sm font-bold text-white">{job.customer_name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Route & Journey Details */}
            <div className="bg-[#181818] border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-3 border-b border-white/10 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Recovery Route & Locations</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup */}
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 relative">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Pickup Location</span>
                  </div>
                  <div className="text-sm font-bold text-white">{pickupAddr}</div>
                  {job.pickup_postcode && (
                    <div className="text-xs text-brand-orange font-mono font-bold mt-1">
                      {job.pickup_postcode.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Dropoff */}
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 relative">
                  <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                    <span>Destination / Dropoff</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {dropoffAddr || 'Confirmed with driver on arrival'}
                  </div>
                  {job.dropoff_postcode && (
                    <div className="text-xs text-brand-orange font-mono font-bold mt-1">
                      {job.dropoff_postcode.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {job.notes && (
                <div className="mt-4 p-3 bg-white/5 rounded border border-white/10 text-xs text-gray-400">
                  <span className="font-bold text-gray-300 uppercase tracking-wider mr-2">Special Instructions:</span>
                  {job.notes}
                </div>
              )}
            </div>

            {/* Need Help Banner */}
            <div className="bg-gradient-to-r from-brand-orange/20 via-brand-orange/10 to-transparent border border-brand-orange/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-black uppercase tracking-wide text-white">
                  Need to speak with dispatch or change instructions?
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Our Hampshire recovery team is available 24 hours a day, 7 days a week.
                </p>
              </div>
              <a
                href="tel:07366302341"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-black font-black uppercase tracking-wider text-xs px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 shrink-0"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call 07366 302341</span>
              </a>
            </div>

            {/* Last updated timestamp */}
            {lastUpdated && (
              <div className="text-center text-[11px] text-gray-500 uppercase tracking-widest">
                Last updated at {lastUpdated.toLocaleTimeString()} • Auto-refreshing live
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
