import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Users, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper, FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/SectionWrapper';
import { useInView } from 'framer-motion';

// Lazy load Globe — THREE.js is ~1.8MB and should NOT be in the initial bundle
const Globe = lazy(() => import('react-globe.gl'));

export const GlobalPresenceSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState('dubai');
  const globeEl = useRef<any>();
  const [globeSize, setGlobeSize] = useState(600);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '200px' });

  const locations = [
    { id: 'dubai', nameKey: 'global.dubai', descKey: 'global.dubai.desc', country: 'UAE', icon: Building2, isHQ: true, lat: 25.2048, lng: 55.2708 },
    { id: 'usa', nameKey: 'global.usa', descKey: 'global.usa.desc', country: 'USA', icon: Truck, lat: 37.0902, lng: -95.7129 },
    { id: 'europe', nameKey: 'global.europe', descKey: 'global.europe.desc', country: 'EU', icon: Users, lat: 50.8503, lng: 4.3517 },
    { id: 'brazil', nameKey: 'global.brazil', descKey: 'global.brazil.desc', country: 'BR', icon: Truck, lat: -14.2350, lng: -51.9253 },
    { id: 'paraguay', nameKey: 'global.paraguay', descKey: 'global.paraguay.desc', country: 'PY', icon: Truck, lat: -23.4425, lng: -58.4438 },
    { id: 'lebanon', nameKey: 'global.lebanon', descKey: 'global.lebanon.desc', country: 'LB', icon: Users, lat: 33.8547, lng: 35.8623 },
  ];

  // Prepare markers data for globe
  const markers = locations.map(loc => ({
    ...loc,
    size: loc.isHQ ? 1.2 : 0.8, // Marcadores refinados e elegantes
    color: loc.isHQ ? '#D4AF37' : '#F4E4C1',
    name: t(loc.nameKey)
  }));

  // Handle responsive globe sizing
  useEffect(() => {
    const updateGlobeSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setGlobeSize(320); // Small Mobile
      } else if (width < 768) {
        setGlobeSize(380); // Mobile
      } else if (width < 1024) {
        setGlobeSize(420); // Tablet - Adjusted to avoid cropping
      } else if (width < 1280) {
        setGlobeSize(500); // Small Desktop
      } else {
        setGlobeSize(600); // Large Desktop
      }
    };

    updateGlobeSize();
    window.addEventListener('resize', updateGlobeSize);
    return () => window.removeEventListener('resize', updateGlobeSize);
  }, []);

  // Auto-rotate globe
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false; // Disable zoom to prevent scroll hijacking
      globeEl.current.controls().minDistance = 200;
      globeEl.current.controls().maxDistance = 500;
    }
  }, []);

  // Auto-cycle through locations every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = locations.findIndex(loc => loc.id === activeLocation);
      const nextIndex = (currentIndex + 1) % locations.length;
      setActiveLocation(locations[nextIndex].id);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeLocation, locations]);

  // Focus on location when clicked from list or auto-cycled
  useEffect(() => {
    const location = locations.find(loc => loc.id === activeLocation);
    if (location && globeEl.current) {
      globeEl.current.pointOfView(
        { lat: location.lat, lng: location.lng, altitude: 2 },
        1000
      );
    }
  }, [activeLocation]);

  const handlePointClick = (point: any) => {
    setActiveLocation(point.id);
  };

  return (
    <SectionWrapper id="global" className="section-padding bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-gold text-xs font-medium tracking-ultra uppercase mb-4 block">
              Global Network
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-white mb-6">{t('global.title')}</h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              {t('global.description')}
            </p>
          </FadeInUp>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Globe — lazy loaded when section enters viewport */}
          <FadeInUp delay={0.3} className="relative order-2 lg:order-1 flex justify-center">
            <div ref={sectionRef} className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/5 w-fit mx-auto">
              {isInView ? (
                <Suspense fallback={
                  <div
                    style={{ width: globeSize, height: globeSize }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  </div>
                }>
                  <Globe
                    ref={globeEl}
                    // Blue Marble texture (clearer, better visibility)
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    backgroundColor="rgba(0,0,0,0)"
                    atmosphereColor="#D4AF37"
                    atmosphereAltitude={0.3}

                    // Points (markers)
                    pointsData={markers}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor="color"
                    pointAltitude={0.01}
                    pointRadius="size"
                    pointLabel={(d: any) => `
                  <div style="
                    background: rgba(0,0,0,0.9);
                    padding: 8px 12px;
                    border-radius: 8px;
                    border: 1px solid #D4AF37;
                    color: white;
                    font-family: system-ui;
                    font-size: 14px;
                    font-weight: 500;
                  ">
                    ${d.name}
                    ${d.isHQ ? '<span style="color: #D4AF37; margin-left: 6px;">★ HQ</span>' : ''}
                  </div>
                `}
                    onPointClick={handlePointClick}
                    pointsMerge={false}

                    // Arcs Layer (Routes from Dubai to highlight connections)
                    arcsData={markers
                      .filter(m => !m.isHQ)
                      .map(m => ({
                        startLat: 25.2048,
                        startLng: 55.2708,
                        endLat: m.lat,
                        endLng: m.lng
                      }))
                    }
                    arcColor={() => ['#D4AF37', '#F4E4C1']}
                    arcStroke={0.6}
                    arcDashLength={0.6}
                    arcDashGap={0.4}
                    arcDashAnimateTime={3500}
                    arcAltitude={0.3}

                    // Rings Layer (Pulsing effect on all locations)
                    ringsData={markers.map(m => ({ lat: m.lat, lng: m.lng }))}
                    ringColor={() => '#D4AF37'}
                    ringMaxRadius={3}
                    ringPropagationSpeed={1.5}
                    ringRepeatPeriod={2500}

                    // Styling
                    width={globeSize}
                    height={globeSize}

                    // Performance
                    rendererConfig={{ antialias: true, alpha: true }}
                  />
                </Suspense>
              ) : (
                <div
                  style={{ width: globeSize, height: globeSize }}
                  className="flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              )}
            </div>
          </FadeInUp>

          {/* Locations List */}
          <div className="order-1 lg:order-2">
            <StaggerContainer className="space-y-3" staggerDelay={0.08}>
              {locations.map((location) => {
                const Icon = location.icon;
                const isActive = activeLocation === location.id;

                return (
                  <StaggerItem key={location.id}>
                    <motion.button
                      onClick={() => setActiveLocation(location.id)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${isActive
                        ? 'bg-gold/10 border-gold/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Country Code Badge */}
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-sm ${isActive ? 'bg-gold text-charcoal' : 'bg-white/10 text-white'
                          }`}>
                          {location.country}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white">{t(location.nameKey)}</h3>
                            {location.isHQ && (
                              <span className="px-2 py-0.5 bg-gold text-charcoal text-[10px] font-bold rounded uppercase tracking-wide">
                                HQ
                              </span>
                            )}
                          </div>
                          <p className="text-white/50 text-sm mt-0.5">{t(location.descKey)}</p>
                        </div>

                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-gold' : 'text-white/30'}`} />
                      </div>
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
