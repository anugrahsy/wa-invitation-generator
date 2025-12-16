import React from 'react';
import { TEMPLATES } from '../constants';
import { MessageSquareQuote } from 'lucide-react';

interface TemplateSelectorProps {
  selectedId: number;
  setSelectedId: (id: number) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedId, setSelectedId }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Pilih Pesan</h2>
        <p className="text-gray-500">Pilih template ucapan yang akan dikirim.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {TEMPLATES.map((template) => {
            const isSelected = selectedId === template.id;
            return (
                <div
                    key={template.id}
                    onClick={() => setSelectedId(template.id)}
                    className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 relative overflow-hidden group
                    ${isSelected 
                        ? 'border-emerald-500 bg-emerald-50 shadow-md ring-1 ring-emerald-500' 
                        : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                        <span className={`text-base font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-800' : 'text-gray-700'}`}>
                            {template.label}
                        </span>
                        {isSelected ? (
                             <div className="bg-emerald-600 text-white p-1.5 rounded-full"><MessageSquareQuote size={16}/></div>
                        ) : (
                             <div className="text-gray-300"><MessageSquareQuote size={16}/></div>
                        )}
                    </div>
                    {/* Removed opacity, increased text size, removed stringent line clamp */}
                    <div className="bg-white/50 p-3 rounded-lg border border-transparent">
                        <p className={`text-sm md:text-base whitespace-pre-wrap font-sans leading-relaxed ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {template.content}
                        </p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};