import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Guest, Template } from '../types';
import { Loader2, CheckCircle2, XCircle, ExternalLink, Zap } from 'lucide-react';
import { generateMessage } from '../utils/messageGenerator';

interface QueueProcessProps {
  guests: Guest[];
  template: Template;
  slug: string;
  updateGuestStatus: (id: string, status: Guest['status']) => void;
  onComplete: () => void;
}

export const QueueProcess: React.FC<QueueProcessProps> = ({ 
    guests, 
    template, 
    slug, 
    updateGuestStatus,
    onComplete
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [autoOpen, setAutoOpen] = useState(true); // Toggle for auto-opening
  
  const isProcessingRef = useRef(false);
  const guestsRef = useRef(guests);
  const autoOpenRef = useRef(autoOpen); // Ref to access current autoOpen state inside callbacks

  useEffect(() => {
    guestsRef.current = guests;
    autoOpenRef.current = autoOpen;
  }, [guests, autoOpen]);

  const MIN_DELAY = 2000; 
  const MAX_DELAY = 4000; 

  const addLog = (msg: string) => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  // Helper to sanitize phone and create link
  const getWhatsappLink = (phone: string, name: string) => {
      // 1. Remove non-numeric chars
      let cleanPhone = phone.replace(/\D/g, '');

      // 2. Replace leading '0' with '62' (Indonesia code)
      if (cleanPhone.startsWith('0')) {
          cleanPhone = '62' + cleanPhone.slice(1);
      }

      // 3. Generate the message content
      const message = generateMessage(template.content, name, slug);
      
      // 4. Encode URL
      return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  const processNext = useCallback(() => {
    if (isProcessingRef.current) return;

    const currentGuests = guestsRef.current;
    const nextGuest = currentGuests.find(g => g.status === 'pending');

    if (!nextGuest) {
        const anySending = currentGuests.some(g => g.status === 'sending');
        if (!anySending) {
             onComplete();
        }
        return;
    }

    isProcessingRef.current = true;
    updateGuestStatus(nextGuest.id, 'sending');
    addLog(`⏳ Menyiapkan pesan untuk: ${nextGuest.name}...`);

    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);

    setTimeout(() => {
        // Attempt Auto Open
        if (autoOpenRef.current) {
            const link = getWhatsappLink(nextGuest.phone, nextGuest.name);
            const win = window.open(link, '_blank');
            if (win) {
                win.focus();
                addLog(`🚀 Membuka WhatsApp untuk ${nextGuest.name}`);
            } else {
                addLog(`⚠️ Popup diblokir untuk ${nextGuest.name}. Izinkan popup pada browser.`);
            }
        }

        updateGuestStatus(nextGuest.id, 'sent');
        if (!autoOpenRef.current) {
            addLog(`✅ Selesai (Manual): ${nextGuest.name}`);
        }
        
        isProcessingRef.current = false;
    }, delay);

  }, [updateGuestStatus, onComplete, template, slug]); // Dependencies for link generation

  useEffect(() => {
      const t = setTimeout(() => {
          processNext();
      }, 500);
      return () => clearTimeout(t);
  }, [guests, processNext]);


  const sentCount = guests.filter(g => g.status === 'sent').length;
  const progressPercent = Math.round((sentCount / guests.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Proses Pengiriman</h2>
            <p className="text-gray-500">Sistem sedang memproses antrian pesan.</p>
        </div>

        {/* Control Panel */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-800">
                <Zap size={18} className={autoOpen ? 'fill-emerald-600' : 'text-emerald-800'} />
                <span className="text-sm font-bold">Buka WhatsApp Otomatis</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoOpen}
                    onChange={(e) => setAutoOpen(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
        </div>
        {autoOpen && (
            <p className="text-[10px] text-center text-amber-600 -mt-4 bg-amber-50 p-2 rounded border border-amber-100">
                ⚠️ Jika WhatsApp tidak terbuka, pastikan Anda telah <b>mengizinkan Pop-ups</b> (Allow Pop-ups) untuk website ini di pengaturan browser.
            </p>
        )}

        {/* Progress Circle & Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center justify-center mb-8">
                 {/* Responsive SVG container */}
                 <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        {/* Background Circle */}
                        <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                        {/* Progress Circle */}
                        <circle 
                            cx="80" cy="80" r="70" 
                            stroke="#10b981" 
                            strokeWidth="12" 
                            fill="transparent" 
                            strokeDasharray={440} // 2 * PI * 70 ≈ 440
                            strokeDashoffset={440 - (440 * progressPercent) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-500 ease-out"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-emerald-600">{progressPercent}%</span>
                        <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Selesai</span>
                    </div>
                 </div>
                 <div className="mt-6 text-center bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100">
                     <p className="text-emerald-800 font-medium text-sm md:text-base">
                        {sentCount} dari {guests.length} Undangan Terkirim
                     </p>
                 </div>
            </div>

            {/* List with Status */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status Pengiriman
                </div>
                {/* Fixed height container for list */}
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 bg-white">
                    {guests.map(g => (
                        <div key={g.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center min-w-0 flex-1 mr-2">
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 shrink-0 font-bold text-xs md:text-sm
                                    ${g.status === 'sent' ? 'bg-emerald-100 text-emerald-600' : 
                                      g.status === 'failed' ? 'bg-red-100 text-red-600' : 
                                      'bg-gray-100 text-gray-500'}`}>
                                    {g.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="truncate min-w-0">
                                    <p className="font-bold text-gray-900 truncate text-sm">{g.name}</p>
                                    <p className="text-xs text-gray-500 font-mono truncate">{g.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center shrink-0">
                                {g.status === 'pending' && <span className="px-2 py-1 bg-gray-100 text-gray-400 text-[10px] uppercase rounded-md font-bold">Antrian</span>}
                                {g.status === 'sending' && (
                                    <Loader2 size={16} className="text-sky-500 animate-spin" />
                                )}
                                {g.status === 'sent' && (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-emerald-500" />
                                        <a 
                                            href={getWhatsappLink(g.phone, g.name)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors flex items-center font-medium"
                                            title="Kirim ulang / Cek WA"
                                        >
                                            <span className="hidden md:inline mr-1">Buka</span> WA <ExternalLink size={10} className="ml-1"/>
                                        </a>
                                    </div>
                                )}
                                {g.status === 'failed' && (
                                     <XCircle size={18} className="text-red-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Logs Console */}
        <div className="bg-gray-900 rounded-xl p-4 shadow-inner border border-gray-800">
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">System Console</h3>
            <div className="font-mono text-[10px] md:text-xs text-green-400 h-24 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
                {logs.length === 0 && <p className="opacity-50 italic">Menunggu inisialisasi worker...</p>}
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                        <span className="opacity-50 select-none text-green-700">{'>'}</span>
                        <span>{log}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};