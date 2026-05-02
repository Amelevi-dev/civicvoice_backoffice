import React from 'react';

const ChartContainer = ({ title, children }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-1">
      <h3 className="text-[#002b5b] font-bold text-xl mb-8">{title}</h3>
      {children}
    </div>
  );
};

export default ChartContainer;