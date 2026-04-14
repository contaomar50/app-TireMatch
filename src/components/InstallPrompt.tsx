import React, { useState, useEffect } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after 3 seconds of "init"
      setTimeout(() => setShowPrompt(true), 3000);
    };

    // For iOS, we show it anyway after a delay if not already in standalone mode
    if (isIOSDevice && !(window.navigator as any).standalone) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      alert('Para instalar: Toca el botón "Compartir" y luego "Añadir a pantalla de inicio".');
      setShowPrompt(false);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-accent text-black p-4 shadow-2xl z-50 flex items-center justify-between font-bold text-sm tracking-wide"
        >
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5" />
            <p>¿Quieres acceso rápido? Instala TIRE_MATCH en tu escritorio o móvil.</p>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setShowPrompt(false)}
              className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              Ahora no
            </button>
            <button
              onClick={handleInstall}
              className="bg-black text-white px-4 py-2 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-colors"
            >
              Añadir a pantalla de inicio
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
