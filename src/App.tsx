/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import BreakdownRecovery from './components/BreakdownRecovery';
import AccidentRecovery from './components/AccidentRecovery';
import VehicleTransport from './components/VehicleTransport';
import PortsmouthRecovery from './components/PortsmouthRecovery';
import HavantRecovery from './components/HavantRecovery';
import FarehamRecovery from './components/FarehamRecovery';
import GosportRecovery from './components/GosportRecovery';
import WaterloovilleRecovery from './components/WaterloovilleRecovery';
import PetersfieldRecovery from './components/PetersfieldRecovery';
import WinchesterRecovery from './components/WinchesterRecovery';
import AndoverRecovery from './components/AndoverRecovery';
import HaylingIslandRecovery from './components/HaylingIslandRecovery';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breakdown-recovery" element={<BreakdownRecovery />} />
          <Route path="/accident-recovery" element={<AccidentRecovery />} />
          <Route path="/vehicle-transport" element={<VehicleTransport />} />
          <Route path="/portsmouth-recovery" element={<PortsmouthRecovery />} />
          <Route path="/havant-recovery" element={<HavantRecovery />} />
          <Route path="/fareham-recovery" element={<FarehamRecovery />} />
          <Route path="/gosport-recovery" element={<GosportRecovery />} />
          <Route path="/waterlooville-recovery" element={<WaterloovilleRecovery />} />
          <Route path="/petersfield-recovery" element={<PetersfieldRecovery />} />
          <Route path="/winchester-recovery" element={<WinchesterRecovery />} />
          <Route path="/andover-recovery" element={<AndoverRecovery />} />
          <Route path="/hayling-island-recovery" element={<HaylingIslandRecovery />} />
        </Routes>
      </Layout>
    </Router>
  );
}
