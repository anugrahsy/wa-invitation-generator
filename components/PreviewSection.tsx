import React, { useState, useMemo } from 'react';
import { Guest, Template } from '../types';
import { TEMPLATES, BASE_URL } from '../constants';
import { generateMessage } from '../utils/messageGenerator';
import { ChevronDown, MessageCircle, ExternalLink } from 'lucide-react';

interface PreviewSectionProps {
  slug: string;
  guests: Guest[];
  templateId: number;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ slug, guests, templateId }) => {
  const [previewGuestId, setPreviewGuestId] = useState<string>(guests[0]?.id || '');
  
  const selectedGuest = useMemo(() => 
    guests.find(g => g.id === previewGuestId) || guests[0], 
  [guests, previewGuestId]);

  const selectedTemplate = useMemo(() => 
    TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0], 
  [templateId]);

  const messagePreview = useMemo(() => {
    if (!selectedGuest) return '';
    return generateMessage(selectedTemplate.content, selectedGuest.name, slug);
  }, [selectedTemplate, selectedGuest, slug]);

  const fullLink = `${BASE_URL}/${slug}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Preview Pesan</h2>
        <p className="text-gray-500">Pastikan format pesan sudah sesuai sebelum dikirim.</p>
      </div>

      <div className="max-w-sm mx-auto bg-[#ECE5DD] rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden relative" style={{ minHeight: '500px' }}>
        {/* Notch/Camera Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

        {/* Header WA */}
        <div className="bg-[#075E54] text-white p-4 pt-10 flex items-center shadow-md relative z-10">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden flex items-center justify-center">
             <span className="text-gray-600 text-xs">IMG</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold truncate w-40">{selectedGuest?.name || 'Nama Tamu'}</h3>
            <p className="text-[10px] opacity-80">Online</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90 h-full overflow-y-auto pb-24">
            
            {/* Controls inside the phone for UX */}
            <div className="mb-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm text-xs">
                <label className="block text-gray-500 mb-1 font-bold">Ganti Tamu Preview:</label>
                <div className="relative">
                    <select 
                        className="w-full appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        value={previewGuestId}
                        onChange={(e) => setPreviewGuestId(e.target.value)}
                    >
                        {guests.map(g => (
                            <option key={g.id} value={g.id}>{g.name} ({g.phone})</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
                </div>
            </div>

            {/* Message Bubble */}
            <div className="bg-white rounded-lg p-3 shadow-sm relative ml-auto max-w-[90%] rounded-tr-none">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {messagePreview.split(fullLink).map((part, i, arr) => (
                         <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                                <span className="text-sky-600 break-all">{fullLink}</span>
                            )}
                         </React.Fragment>
                    ))}
                </p>
                <div className="flex justify-end items-center mt-1 space-x-1">
                    <span className="text-[10px] text-gray-400">Now</span>
                    <div className="text-sky-500">
                        {/* Double tick SVG */}
                        <svg viewBox="0 0 16 11" width="14" height="10" className="fill-current"><path d="M11.5 0L16 4.5L11.5 9L10.25 7.75L13.5 4.5L10.25 1.25L11.5 0Z"/><path d="M6 1.25L9.25 4.5L6 7.75L4.75 6.5L8 4.5L4.75 2.5L6 1.25Z"/><path d="M4.5 4.5L1.25 7.75L0 6.5L3.25 4.5L0 2.5L1.25 1.25L4.5 4.5Z" opacity="0"/></svg>
                    </div>
                </div>
            </div>

             {/* Link Preview Card Mockup (Optional aesthetic) */}
             <div className="bg-white rounded-lg shadow-sm relative ml-auto max-w-[90%] mt-2 overflow-hidden">
                <div className="h-24 bg-gray-200 w-full flex items-center justify-center text-gray-400">
                    Image Preview
                </div>
                <div className="p-2 bg-[#F0F2F5] border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-800 truncate">The Wedding of Andin & Nino</p>
                    <p className="text-[10px] text-gray-500 truncate">weddingwithyou.id</p>
                </div>
             </div>

        </div>

      </div>
    </div>
  );
};
