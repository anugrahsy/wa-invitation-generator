import React, { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { SlugForm } from './components/SlugForm';
import { GuestManager } from './components/GuestManager';
import { TemplateSelector } from './components/TemplateSelector';
import { PreviewSection } from './components/PreviewSection';
import { QueueProcess } from './components/QueueProcess';
import { AppStep, Guest } from './types';
import { TEMPLATES } from './constants';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';

export default function App() {
  // Application State
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.SLUG_INPUT);
  const [slug, setSlug] = useState<string>('');
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: '', phone: '', status: 'pending' },
  ]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(1);
  const [isProcessComplete, setIsProcessComplete] = useState(false);

  // Handlers
  const nextStep = () => {
    // Validation Logic
    if (currentStep === AppStep.SLUG_INPUT) {
        if (!slug.trim()) { alert('Mohon isi slug undangan terlebih dahulu.'); return; }
    }
    if (currentStep === AppStep.GUEST_INPUT) {
        const validGuests = guests.filter(g => g.name.trim() !== '' && g.phone.trim() !== '');
        if (validGuests.length === 0) { alert('Mohon isi minimal 1 tamu yang valid.'); return; }
        // Clean up empty rows before moving
        setGuests(validGuests.map(g => ({...g, status: 'pending'}))); 
    }

    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleGuestStatusUpdate = (id: string, status: Guest['status']) => {
      setGuests(prev => prev.map(g => g.id === id ? { ...g, status } : g));
  };

  const handleReset = () => {
      // Reset all state to initial values
      setSlug('');
      setGuests([{ id: crypto.randomUUID(), name: '', phone: '', status: 'pending' }]);
      setSelectedTemplateId(1);
      setIsProcessComplete(false);
      setCurrentStep(AppStep.SLUG_INPUT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Step Content
  const renderContent = () => {
    switch (currentStep) {
      case AppStep.SLUG_INPUT:
        return <SlugForm slug={slug} setSlug={setSlug} />;
      case AppStep.GUEST_INPUT:
        return <GuestManager guests={guests} setGuests={setGuests} />;
      case AppStep.TEMPLATE_SELECTION:
        return <TemplateSelector selectedId={selectedTemplateId} setSelectedId={setSelectedTemplateId} />;
      case AppStep.PREVIEW:
        return <PreviewSection slug={slug} guests={guests} templateId={selectedTemplateId} />;
      case AppStep.SENDING:
        return (
            <QueueProcess 
                guests={guests} 
                template={TEMPLATES.find(t => t.id === selectedTemplateId)!}
                slug={slug}
                updateGuestStatus={handleGuestStatusUpdate}
                onComplete={() => setIsProcessComplete(true)}
            />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">W</div>
            <h1 className="font-bold text-lg text-gray-800 tracking-tight">WeddingGenerator</h1>
          </div>
          <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">v1.0.0</div>
        </div>
      </header>

      {/* Progress Wizard */}
      <StepIndicator currentStep={currentStep} />

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Sticky Bottom Action Bar */}
      {currentStep !== AppStep.SENDING && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
          <div className="max-w-2xl mx-auto flex justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === AppStep.SLUG_INPUT}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center
                ${currentStep === AppStep.SLUG_INPUT 
                    ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
                    : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'}`}
            >
              <ArrowLeft size={18} className="mr-2" />
              Kembali
            </button>
            
            <button
              onClick={nextStep}
              className="flex-[2] px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-lg shadow-emerald-200 transition-all flex items-center justify-center active:scale-95"
            >
              {currentStep === AppStep.PREVIEW ? (
                <>
                  <Send size={18} className="mr-2" />
                  Send All Invitations
                </>
              ) : (
                <>
                  Lanjut
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Completion State Action */}
      {currentStep === AppStep.SENDING && isProcessComplete && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 animate-slide-up">
            <div className="max-w-2xl mx-auto">
                 <button
                    onClick={handleReset}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-all"
                 >
                    Buat Undangan Baru
                 </button>
            </div>
          </div>
      )}
    </div>
  );
}