import React from 'react';
import { motion } from 'framer-motion';

const MaliMap = ({ data, onRegionClick }) => {
  // Simple stylized representation of Mali regions
  const regions = [
    { id: 'bamako', name: 'Bamako', path: 'M 150 280 L 170 280 L 170 300 L 150 300 Z', color: '#FF844B' },
    { id: 'kayes', name: 'Kayes', path: 'M 20 200 L 80 180 L 100 250 L 40 300 Z', color: '#003C64' },
    { id: 'koulikoro', name: 'Koulikoro', path: 'M 80 180 L 140 160 L 160 260 L 100 250 Z', color: '#32E9CD' },
    { id: 'sikasso', name: 'Sikasso', path: 'M 160 260 L 220 250 L 200 350 L 140 350 Z', color: '#003C64' },
    { id: 'segou', name: 'Ségou', path: 'M 140 160 L 220 140 L 240 220 L 160 260 Z', color: '#32E9CD' },
    { id: 'mopti', name: 'Mopti', path: 'M 220 140 L 300 120 L 320 180 L 240 220 Z', color: '#FF844B' },
    { id: 'tombouctou', name: 'Tombouctou', path: 'M 300 120 L 450 50 L 500 150 L 320 180 Z', color: '#003C64' },
    { id: 'gao', name: 'Gao', path: 'M 500 150 L 600 200 L 550 300 L 450 250 Z', color: '#32E9CD' },
    { id: 'kidal', name: 'Kidal', path: 'M 450 50 L 600 20 L 650 150 L 500 150 Z', color: '#FF844B' },
  ];

  return (
    <div className="relative w-full h-[400px] bg-slate-50 rounded-3xl overflow-hidden border border-gray-100 p-4">
      <div className="absolute top-4 left-6 z-10">
        <h4 className="text-bleuFonce font-bold text-lg">Carte de Participation</h4>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Engagement National (Mali)</p>
      </div>
      
      <svg viewBox="0 0 700 400" className="w-full h-full drop-shadow-2xl">
        {regions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            fill={region.color}
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.02, stroke: '#fff', strokeWidth: 2 }}
            className="cursor-pointer transition-all"
            onClick={() => onRegionClick?.(region)}
          >
            <title>{region.name}</title>
          </motion.path>
        ))}
      </svg>

      <div className="absolute bottom-4 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 text-[10px] space-y-1 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#003C64]" />
          <span className="font-bold text-gray-600">Forte Participation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#32E9CD]" />
          <span className="font-bold text-gray-600">Moyenne</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF844B]" />
          <span className="font-bold text-gray-600">Faible / En alerte</span>
        </div>
      </div>
    </div>
  );
};

export default MaliMap;