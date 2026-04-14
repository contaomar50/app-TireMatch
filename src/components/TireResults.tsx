import React from 'react';
import { FileSpreadsheet, CheckCircle2, Info } from 'lucide-react';
import * as XLSX from 'xlsx';
import { VehicleTireData } from '../types';
import { motion } from 'motion/react';

interface TireResultsProps {
  data: VehicleTireData;
}

export function TireResults({ data }: TireResultsProps) {
  const exportToExcel = () => {
    const wsData = [
      ['Vehículo', data.vehicle],
      [''],
      ['Medidas Recomendadas'],
      ['Medida', 'Descripción'],
      ...data.recommendedSizes.map(s => [s.size, s.description]),
      [''],
      ['Cotización de Llantas'],
      ['Marca', 'Modelo', 'Precio', 'Moneda', 'Disponibilidad'],
      ...data.quotes.map(q => [q.brand, q.model, q.price, q.currency, q.availability])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cotización");
    XLSX.writeFile(wb, `Cotizacion_${data.vehicle.replace(/\s+/g, '_')}.xlsx`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      <div className="vehicle-tag bg-accent text-black px-3 py-1 text-xs font-black uppercase tracking-wider self-start mb-4">
        OEM RECOMENDADO
      </div>
      
      <div className="text-muted text-lg font-bold uppercase tracking-tight mb-2">
        Medida Principal
      </div>
      
      <div className="tire-size-hero text-[80px] md:text-[110px] font-black leading-[0.9] tracking-[-0.04em] mb-10">
        {data.recommendedSizes[0]?.size || "N/A"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-auto">
        {data.quotes.map((quote, idx) => (
          <div key={idx} className="bg-card p-5 border-l-4 border-accent">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">
              {quote.brand} {quote.model}
            </p>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-mono tracking-tighter">
                {quote.currency} {quote.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-muted mt-1">
                Total x4: {quote.currency} {(quote.price * 4).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-10">
        <button
          onClick={exportToExcel}
          className="flex-1 bg-text text-bg p-5 text-xs font-black uppercase tracking-widest hover:bg-accent transition-colors flex flex-col items-center justify-center"
        >
          Generar Excel
          <span className="text-[9px] opacity-60 font-bold">(.xlsx compatible)</span>
        </button>
        <button
          className="flex-1 border border-border text-text p-5 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors flex flex-col items-center justify-center"
        >
          Compartir Cotización
          <span className="text-[9px] opacity-60 font-bold">(PDF/WhatsApp)</span>
        </button>
      </div>
    </motion.div>
  );
}
