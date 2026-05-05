import React from 'react';
import { motion } from 'framer-motion';
import malicarte from '../assets/malicarte.svg?raw';

const MaliMap = ({ onRegionClick, selectedRegion }) => {
  const handleMapClick = (event) => {
    const regionPath = event.target.closest('path');

    if (!regionPath) {
      return;
    }

    const regionId = regionPath.getAttribute('id') || 'mali';
    const regionName = regionPath.getAttribute('name') || 'Mali';

    onRegionClick?.({ id: regionId, name: regionName });
  };

  return (
    <div className="relative w-full h-100 bg-slate-50 rounded-3xl overflow-hidden border border-gray-100 p-4">
      <div className="absolute top-4 left-6 z-10">
        <h4 className="text-bleuFonce font-bold text-lg">
          Carte de Participation
        </h4>
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          {selectedRegion ? `Filtre actif: ${selectedRegion.name}` : 'Engagement National (Mali)'}
        </p>
      </div>

      <motion.button
        type="button"
        onClick={handleMapClick}
        className="relative flex h-full w-full items-center justify-center rounded-2xl outline-none [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain [&>svg]:select-none [&>svg]:drop-shadow-2xl [&>svg_path]:cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        aria-label="Carte du Mali interactive"
        dangerouslySetInnerHTML={{ __html: malicarte }}
      >
      </motion.button>

      <div className="absolute top-4 right-6 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-100 text-[10px] font-semibold text-gray-600 shadow-sm">
        {selectedRegion ? selectedRegion.name : 'Toutes les régions'}
      </div>

      <div className="absolute bottom-4 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 text-[10px] space-y-1 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bleuFonce" />
          <span className="font-bold text-gray-600">Forte Participation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bleuCiel" />
          <span className="font-bold text-gray-600">Moyenne</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orangeClair" />
          <span className="font-bold text-gray-600">Faible / En alerte</span>
        </div>
      </div>
    </div>
  );
};

export default MaliMap;