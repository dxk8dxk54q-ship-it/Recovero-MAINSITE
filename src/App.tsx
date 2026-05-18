/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import BreakDownRecovery from './components/BreakdownRecovery';
import AccidentRecovery from './components/AccidentRecovery';
import VehicleTransport from './components/VehicleTransport';
import ServiceLocationPage from './components/ServiceLocationPage';
import ScrollToTop from './components/ScrollToTop';

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
      <ScrollToTop />
      <ScrollToHash />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breakdown-recovery" element={<BreakDownRecovery />} />
          <Route path="/accident-recovery" element={<AccidentRecovery />} />
          <Route path="/vehicle-transport" element={<VehicleTransport />} />
          <Route path="/breakdown-recovery/:area" element={<ServiceLocationPage serviceType="breakdown" />} />
          <Route path="/accident-recovery/:area" element={<ServiceLocationPage serviceType="accident" />} />
          <Route path="/vehicle-transport/:area" element={<ServiceLocationPage serviceType="transport" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
