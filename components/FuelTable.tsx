import React from 'react';
import { ProcessedFuelEntry } from '../types';
import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';

interface FuelTableProps {
  processedEntries: ProcessedFuelEntry[];
  onEditEntry: (id: string) => void;
  onDeleteEntry: (id: string) => void;
}

const FuelTable: React.FC<FuelTableProps> = ({ processedEntries, onEditEntry, onDeleteEntry }) => {
  if (processedEntries.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <p className="text-slate-400">Belum ada data. Silakan masukkan data pengisian pertama Anda.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-400">
          <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
            <tr>
              <th scope="col" className="px-4 py-3">Tanggal</th>
              <th scope="col" className="px-4 py-3">Tipe</th>
              <th scope="col" className="px-4 py-3 text-right">Odometer (km)</th>
              <th scope="col" className="px-4 py-3 text-right">Liter (L)</th>
              <th scope="col" className="px-4 py-3 text-right">Jarak (km)</th>
              <th scope="col" className="px-4 py-3 text-right">Konsumsi (km/L)</th>
              <th scope="col" className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {processedEntries.map((entry) => (
              <tr key={entry.id} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                <td className="px-4 py-3 font-medium text-slate-200 whitespace-nowrap">{entry.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {entry.isFullTank ? (
                    <span className="bg-sky-900/50 text-sky-300 text-xs font-medium px-2.5 py-0.5 rounded-full">Penuh</span>
                  ) : (
                    <span className="bg-slate-700 text-slate-400 text-xs font-medium px-2.5 py-0.5 rounded-full">Parsial</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">{entry.odometer.toLocaleString('id-ID')}</td>
                <td className="px-4 py-3 text-right">{entry.liters.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  {entry.distance !== null ? entry.distance.toFixed(1) : '-'}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-sky-400">
                  {entry.kmPerLiter !== null ? entry.kmPerLiter.toFixed(2) : '-'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                     <button 
                       onClick={() => onEditEntry(entry.id)} 
                       className="p-1 text-slate-400 hover:text-sky-400 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
                       aria-label="Edit"
                      >
                       <EditIcon className="h-5 w-5" />
                     </button>
                     <button 
                       onClick={() => onDeleteEntry(entry.id)} 
                       className="p-1 text-slate-400 hover:text-red-400 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500 transition-colors"
                       aria-label="Delete"
                      >
                       <TrashIcon className="h-5 w-5" />
                     </button>
                   </div>
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
