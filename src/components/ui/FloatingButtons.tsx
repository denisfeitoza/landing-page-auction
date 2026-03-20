import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingButtons: React.FC = () => {
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is 500vh, show button near the end of it (400vh)
      setShowSupport(window.scrollY > window.innerHeight * 4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!showSupport) return;

    const cleanWidget = () => {
      const widget = document.querySelector('elevenlabs-convai');
      if (!widget || !widget.shadowRoot) return;

      const shadow = widget.shadowRoot;
      const elements = shadow.querySelectorAll('*');

      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          const text = element.innerText || '';
          if ((text.includes('Powered by') || text.includes('ElevenLabs')) && text.length < 50) {
            element.style.display = 'none';
          }
          // Also check for specific branding classes if generic text search fails or to be thoroughly redundant
          if (element.getAttribute('class')?.includes('branding') || element.getAttribute('class')?.includes('watermark')) {
            element.style.display = 'none';
          }
        }
      });
    };

    const intervalId = setInterval(cleanWidget, 500);
    return () => clearInterval(intervalId);
  }, [showSupport]);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col gap-3 md:gap-4 items-end">
      <AnimatePresence>
        {showSupport && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            <elevenlabs-convai agent-id="agent_4601kg0f92sdfsd93ydk4aprz1kf"></elevenlabs-convai>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
