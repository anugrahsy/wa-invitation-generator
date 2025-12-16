import React from 'react';
import { AppStep } from '../types';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const steps = [
  { step: AppStep.SLUG_INPUT, label: 'Slug' },
  { step: AppStep.GUEST_INPUT, label: 'Tamu' },
  { step: AppStep.TEMPLATE_SELECTION, label: 'Pesan' },
  { step: AppStep.PREVIEW, label: 'Review' },
  { step: AppStep.SENDING, label: 'Kirim' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-4 px-4 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((s, idx) => {
          const isActive = currentStep === s.step;
          const isCompleted = currentStep > s.step;

          return (
            <div key={s.step} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 
                ${isActive ? 'bg-emerald-600 border-emerald-600 text-white' : ''}
                ${isCompleted ? 'bg-emerald-100 border-emerald-600 text-emerald-600' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-50 border-gray-300 text-gray-400' : ''}
                `}
              >
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive || isCompleted ? 'text-emerald-700' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
        {/* Progress Line Background */}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-0 hidden md:block" style={{ top: '2.5rem' }}></div>
      </div>
    </div>
  );
};
