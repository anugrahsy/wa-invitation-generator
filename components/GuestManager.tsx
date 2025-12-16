import React, { useRef } from 'react';
import { Guest } from '../types';
import { Trash2, UserPlus, Users, Smartphone, User } from 'lucide-react';

interface GuestManagerProps {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

export const GuestManager: React.FC<GuestManagerProps> = ({ guests, setGuests }) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const addGuest = () => {
    const newGuest: Guest = {
      id: crypto.randomUUID(),
      name: '',
      phone: '',
      status: 'pending',
    };
    setGuests([...guests, newGuest]);
    // Scroll window to bottom slightly to show new input
    setTimeout(() => {
        scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const removeGuest = (id: string) => {
    if (guests.length <= 1) {
      alert('Minimal harus ada 1 tamu.');
      return;
    }
    setGuests(guests.filter((g) => g.id !== id));
  };

  const updateGuest = (id: string, field: keyof Guest, value: string) => {
    setGuests(
      guests.map((g) => {
        if (g.id === id) {
          if (field === 'phone') {
            const clean = value.replace(/[^0-9]/g, '');
            return { ...g, [field]: clean };
          }
          return { ...g, [field]: value };
        }
        return g;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Tamu</h2>
        <p className="text-gray-500">Masukkan data tamu undangan (Nama & WhatsApp).</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center text-emerald-800 font-medium">
            <Users size={18} className="mr-2" />
            Total Tamu: {guests.length}
          </div>
          {guests.length > 10 && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
              Mode Anti-Spam Aktif
            </span>
          )}
        </div>

        {/* Removed max-h and overflow-y-auto to fix nested scrolling issue */}
        <div className="p-4 space-y-4 bg-gray-50">
          {guests.map((guest, index) => (
            <div key={guest.id} className="flex flex-col md:flex-row gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group">
              <div className="flex-1 space-y-1">
                 <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Nama Tamu</label>
                 <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        className="w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-gray-400"
                        value={guest.name}
                        onChange={(e) => updateGuest(guest.id, 'name', e.target.value)}
                    />
                 </div>
              </div>
              <div className="flex-1 space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">No. WhatsApp</label>
                <div className="relative">
                    <Smartphone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="tel"
                        placeholder="Contoh: 08123456789"
                        className="w-full pl-10 pr-3 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-gray-400"
                        value={guest.phone}
                        onChange={(e) => updateGuest(guest.id, 'phone', e.target.value)}
                    />
                </div>
              </div>
              <div className="flex items-end justify-end md:pb-1">
                  <button
                    onClick={() => removeGuest(guest.id)}
                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    title="Hapus tamu"
                  >
                    <Trash2 size={20} />
                  </button>
              </div>
            </div>
          ))}
          <div ref={scrollEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={addGuest}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-bold text-sm hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            TAMBAH DATA TAMU
          </button>
        </div>
      </div>
    </div>
  );
};