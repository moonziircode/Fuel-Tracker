
import React, { useState } from 'react';

interface FuelFormProps {
  onAddEntry: (date: string, odometer: number, liters: number) => void;
  lastOdometer: number;
}

const FuelForm: React.FC<FuelFormProps> = ({ onAddEntry, lastOdometer }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [odometer, setOdometer] = useState('');
  const [liters, setLiters] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const odoNum = parseFloat(odometer);
    const litersNum = parseFloat(liters);

    if (isNaN(odoNum) || isNaN(litersNum) || odoNum <= 0 || litersNum <= 0) {
      setError('Odometer dan Liter harus berupa angka positif.');
      return;
    }
    
    if (odoNum <= lastOdometer) {
      setError(`Odometer harus lebih besar dari pengisian sebelumnya (${lastOdometer} km).`);
      return;
    }

    onAddEntry(date, odoNum, litersNum);
    setOdometer('');
    setLiters('');
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
            Tanggal Pengisian
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="odometer" className="block text-sm font-medium text-slate-700 mb-1">
            Odometer (km)
          </label>
          <input
            type="number"
            id="odometer"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            placeholder="e.g., 50123"
            required
            min="0"
            step="0.1"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="liters" className="block text-sm font-medium text-slate-700 mb-1">
            Liter Bensin Diisi
          </label>
          <input
            type="number"
            id="liters"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            placeholder="e.g., 35.5"
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          Simpan Data
        </button>
      </form>
    </div>
  );
};

export default FuelForm;
