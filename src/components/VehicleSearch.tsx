import React, { useState } from 'react';
import { Search, Car, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface VehicleSearchProps {
  onSearch: (reference: string, tireType: string) => void;
  isLoading: boolean;
}

export function VehicleSearch({ onSearch, isLoading }: VehicleSearchProps) {
  const [reference, setReference] = useState('');
  const [tireType, setTireType] = useState('mixta');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reference.trim()) {
      onSearch(reference, tireType);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.1em] text-muted font-bold mb-2 block">
            Referencia del Vehículo
          </span>
          <div className="relative group">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ej: Toyota Corolla 2022"
              disabled={isLoading}
              className="w-full bg-card border border-border text-white p-5 text-lg font-bold outline-none focus:border-accent transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.1em] text-muted font-bold mb-3 block">
            Tipo de Llanta
          </span>
          <div className="grid grid-cols-3 gap-2">
            {['pistera', 'mixta', 'off road'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTireType(type)}
                className={cn(
                  "py-3 px-2 text-[10px] font-black uppercase tracking-widest border transition-all",
                  tireType === type 
                    ? "bg-accent text-black border-accent" 
                    : "bg-card text-muted border-border hover:border-muted"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !reference.trim()}
          className="w-full bg-text text-bg font-black uppercase tracking-widest py-5 hover:bg-accent transition-colors disabled:bg-border disabled:text-muted flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Buscar</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
