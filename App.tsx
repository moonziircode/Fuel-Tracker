
import React, { useState, useEffect, useMemo } from 'react';
import { FuelEntry, ProcessedFuelEntry } from './types';
import FuelForm from './components/FuelForm';
import FuelTable from './components/FuelTable';
import Summary from './components/Summary';
import TrashIcon from './components/icons/TrashIcon';

const App: React.FC = () => {
  const [entries, setEntries] = useState<FuelEntry[]>(() => {
    try {
      const savedEntries = localStorage.getItem('fuelEntries');
      return savedEntries ? JSON.parse(savedEntries) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fuelEntries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [entries]);

  const handleAddEntry = (date: string, odometer: number, liters: number) => {
    const newEntry: FuelEntry = {
      id: new Date().toISOString(),
      date,
      odometer,
      liters,
    };
    const updatedEntries = [...entries, newEntry].sort((a, b) => a.odometer - b.odometer);
    setEntries(updatedEntries);
  };

  const handleClearAll = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat diurungkan.')) {
      setEntries([]);
    }
  };

  const processedEntries: ProcessedFuelEntry[] = useMemo(() => {
    return entries.map((current, index, arr) => {
      if (index === 0) {
        return { ...current, distance: null, kmPerLiter: null };
      }
      const previous = arr[index - 1];
      const distance = current.odometer - previous.odometer;
      const kmPerLiter = distance > 0 && current.liters > 0 ? distance / current.liters : 0;

      return {
        ...current,
        distance,
        kmPerLiter,
      };
    });
  }, [entries]);
  
  const lastOdometer = useMemo(() => {
      if(entries.length === 0) return 0;
      return entries[entries.length - 1].odometer;
  }, [entries]);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl font-sans">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Kalkulator Rata-rata BBM
        </h1>
        <p className="text-slate-600 mt-2">(Metode Isi Bensin ke Isi Bensin)</p>
      </header>
      
      <main className="space-y-8">
        <FuelForm onAddEntry={handleAddEntry} lastOdometer={lastOdometer} />
        <Summary processedEntries={processedEntries} />
        <FuelTable processedEntries={processedEntries} />

        {entries.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
            >
              <TrashIcon className="h-5 w-5" />
              Hapus Semua Data
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
