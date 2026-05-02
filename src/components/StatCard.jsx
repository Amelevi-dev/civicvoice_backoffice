import React from 'react';

const StatCard = ({ title, value, label, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1 min-w-55">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
          <p className="text-[#002b5b] font-bold text-3xl mb-1">{value}</p>
          <p className="text-gray-400 text-xs font-light">{label}</p>
        </div>
        {/* Conteneur d'icône avec le style bleu spécifique */}
        <div className="p-2 bg-[#4a7ba3] rounded-lg">
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;