import React, { useState, useEffect } from 'react';
import { FuelEntry } from '../types';

interface FuelFormProps {
  onAddEntry: (date: string, odometer: number, liters: number) => void;
  onUpdateEntry: (id: string, date: string, odometer: number, liters: number) => void;
  onCancelEdit: () => void;
  editingEntry: FuelEntry | null;
  lastOdometer: number;
}

const FuelForm: React.FC<FuelFormProps> = ({ 
  onAddEntry, 
  onUpdateEntry, 
  onCancelEdit,
  editingEntry, 
  lastOdometer 
}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [odometer, setOdometer] = useState('');
  const [liters, setLiters] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date);
      setOdometer(String(editingEntry.odometer));
      setLiters(String(editingEntry.liters));
      setError('');
    } else {
      // Reset form when not editing or after cancelling/updating
      setDate(new Date().toISOString().split('T')[0]);
      setOdometer('');
      setLiters('');
      setError('');
    }
  }, [editingEntry]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const odoNum = parseFloat(odometer);
    const litersNum = parseFloat(liters);

    if (isNaN(odoNum) || isNaN(litersNum) || odoNum <= 0 || litersNum <= 0) {
      setError('Odometer dan Liter harus berupa angka positif.');
      return;
    }
    
    if (editingEntry) {
      onUpdateEntry(editingEntry.id, date, odoNum, litersNum);
    } else {
      if (odoNum <= lastOdometer) {
        setError(`Odometer harus lebih besar dari pengisian terakhir (${lastOdometer} km).`);
        return;
      }
      onAddEntry(date, odoNum, litersNum);
      // Only reset these for new entries, date can stay
      setOdometer('');
      setLiters('');
      setError('');
    }
  };
  
  const isEditing = editingEntry !== null;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-slate-100 mb-4">{isEditing ? 'Edit Data Pengisian' : 'Tambah Data Baru'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-400 mb-1">
            Tanggal Pengisian
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div>
          <label htmlFor="odometer" className="block text-sm font-medium text-slate-400 mb-1">
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
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div>
          <label htmlFor="liters" className="block text-sm font-medium text-slate-400 mb-1">
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
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors duration-300 flex-1"
          >
            {isEditing ? 'Update Data' : 'Simpan Data'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 transition-colors duration-300 sm:w-auto"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FuelForm;