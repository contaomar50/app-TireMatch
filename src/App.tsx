import React, { useState } from 'react';
import { VehicleSearch } from './components/VehicleSearch';
import { TireResults } from './components/TireResults';
import { InstallPrompt } from './components/InstallPrompt';
import { TireLogo } from './components/TireLogo';
import { getTireData } from './services/geminiService';
import { VehicleTireData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [tireData, setTireData] = useState<VehicleTireData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (reference: string, tireType: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTireData(reference, tireType);
      setTireData(data);
    } catch (err) {
      console.error(err);
      setError('No pudimos encontrar información para ese vehículo. Intenta con otra referencia.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg font-sans text-text selection:bg-accent selection:text-black overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544133782-96455832a779?q=80&w=1920&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      />
      
      <InstallPrompt />
      
      <header className="relative z-10 pt-10 pb-5 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
        <div className="flex items-center gap-4">
          <TireLogo />
          <div className="logo text-5xl font-black tracking-[-0.05em] uppercase leading-none">
            TIRE<span className="text-accent">MATCH</span>
          </div>
        </div>
        <div className="nav-meta text-[10px] uppercase tracking-[0.2em] text-muted font-bold">
          Búsqueda Técnica v4.0.2
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[2px] bg-border border-2 border-border overflow-hidden backdrop-blur-sm">
          <section className="bg-bg/90 p-8 md:p-10 flex flex-col gap-6">
            <VehicleSearch onSearch={handleSearch} isLoading={isLoading} />
            
            <div className="mt-4">
              <p className="text-sm leading-relaxed text-muted">
                Algoritmo de compatibilidad cargado. Mostrando medidas recomendadas por fabricante para terrenos mixtos y carga pesada.
              </p>
            </div>
          </section>

          <section className="bg-bg/90 p-8 md:p-10 flex flex-col min-h-[400px]">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-900/20 border border-red-900/50 p-6 text-red-400 text-sm font-bold uppercase tracking-wider"
                >
                  {error}
                </motion.div>
              )}

              {tireData && !isLoading && (
                <TireResults data={tireData} />
              )}

              {!tireData && !isLoading && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-12"
                >
                  <div className="vehicle-tag bg-accent text-black px-3 py-1 text-xs font-black uppercase tracking-wider">
                    SISTEMA LISTO
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase">
                    Inicia una búsqueda <br /> para ver resultados
                  </h2>
                  <p className="text-muted text-sm max-w-xs">
                    Ingresa marca, modelo y año en el panel lateral para generar la cotización técnica.
                  </p>
                </motion.div>
              )}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center py-12"
                >
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-accent font-bold uppercase tracking-widest text-xs">Analizando Datos...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <footer className="relative z-10 py-10 px-6 text-center text-[10px] text-muted font-bold uppercase tracking-[0.3em]">
        &copy; 2024 TireMaster AI &bull; PWA Optimized &bull; High Performance
      </footer>
    </div>
  );
}
