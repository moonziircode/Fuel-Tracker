
import React from 'react';
import { ProcessedFuelEntry } from '../types';

interface FuelTableProps {
  processedEntries: ProcessedFuelEntry[];
}

const FuelTable: React.FC<FuelTableProps> = ({ processedEntries }) => {
  if (processedEntries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-slate-600">Belum ada data. Silakan masukkan data pengisian pertama Anda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-4 py-3">Tanggal</th>
              <th scope="col" className="px-4 py-3 text-right">Odometer (km)</th>
              <th scope="col" className="px-4 py-3 text-right">Liter (L)</th>
              <th scope="col" className="px-4 py-3 text-right">Jarak (km)</th>
              <th scope="col" className="px-4 py-3 text-right">Konsumsi (km/L)</th>
            </tr>
          </thead>
          <tbody>
            {processedEntries.map((entry, index) => (
              <tr key={entry.id} className="bg-white border-b last:border-b-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{entry.date}</td>
                <td className="px-4 py-3 text-right">{entry.odometer.toLocaleString('id-ID')}</td>
                <td className="px-4 py-3 text-right">{entry.liters.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  {entry.distance !== null ? entry.distance.toFixed(1) : '-'}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-indigo-600">
                  {entry.kmPerLiter !== null ? entry.kmPerLiter.toFixed(2) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelTable;
