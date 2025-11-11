import React from 'react';
import { ProcessedFuelEntry } from '../types';

interface SummaryProps {
  processedEntries: ProcessedFuelEntry[];
}

interface SummaryData {
  totalDistance: number;
  totalLiters: number;
  overallKmPerLiter: number;
}

const Summary: React.FC<SummaryProps> = ({ processedEntries }) => {
  const summary: SummaryData | null = React.useMemo(() => {
    if (processedEntries.length < 2) {
      return null;
    }

    const calculableEntries = processedEntries.slice(1);
    
    const totalDistance = calculableEntries.reduce((sum, entry) => sum + (entry.distance || 0), 0);
    const totalLiters = calculableEntries.reduce((sum, entry) => sum + entry.liters, 0);

    return {
      totalDistance,
      totalLiters,
      overallKmPerLiter: totalLiters > 0 ? totalDistance / totalLiters : 0,
    };
  }, [processedEntries]);

  if (!summary) {
    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
            <p className="text-slate-400">Masukkan setidaknya dua data pengisian untuk melihat ringkasan.</p>
        </div>
    );
  }

  const StatCard: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
    <div className="bg-slate-700 p-4 rounded-lg text-center flex-1">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-100">
        {value} <span className="text-base font-normal text-slate-400">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-slate-100 mb-4 text-center">Ringkasan Total</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <StatCard label="Total Jarak" value={summary.totalDistance.toFixed(1)} unit="km" />
        <StatCard label="Total Liter" value={summary.totalLiters.toFixed(2)} unit="L" />
        <StatCard label="Rata-rata Keseluruhan" value={summary.overallKmPerLiter.toFixed(2)} unit="km/L" />
      </div>
    </div>
  );
};

export default Summary;