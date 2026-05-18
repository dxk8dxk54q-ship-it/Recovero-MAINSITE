import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ServiceLocation from './ServiceLocation';

interface ServiceLocationPageProps {
  serviceType: 'breakdown' | 'accident' | 'transport';
}

const VALID_AREAS = [
  'portsmouth', 'havant', 'fareham', 'gosport', 'waterlooville', 
  'petersfield', 'winchester', 'andover', 'hayling-island'
];

export default function ServiceLocationPage({ serviceType }: ServiceLocationPageProps) {
  const { area } = useParams<{ area: string }>();

  // If area is invalid, redirect to the main service page
  if (!area || !VALID_AREAS.includes(area.toLowerCase())) {
    const baseRoute = serviceType === 'breakdown' 
      ? '/breakdown-recovery' 
      : serviceType === 'accident' ? '/accident-recovery' : '/vehicle-transport';
    return <Navigate to={baseRoute} replace />;
  }

  const formattedArea = area
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return <ServiceLocation serviceType={serviceType} location={formattedArea} />;
}
