import React from 'react';
import { Link2 } from 'lucide-react';
import { BASE_URL } from '../constants';

interface SlugFormProps {
  slug: string;
  setSlug: (val: string) => void;
}

export const SlugForm: React.FC<SlugFormProps> = ({ slug, setSlug }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic slugify: lowercase and replace spaces with dashes
    const val = e.target.value.toLowerCase().replace(/\s+/g, '-');
    setSlug(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Detail Undangan</h2>
        <p className="text-gray-500">Masukkan identitas URL undangan pasangan.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug / URL Undangan
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-emerald-600">
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm bg-gray-50 rounded-l-md pr-2 border-r border-gray-200">
            {BASE_URL.replace('https://', '')}/
          </span>
          <input
            type="text"
            className="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="andin-nino"
            value={slug}
            onChange={handleChange}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500 flex items-center">
          <Link2 size={12} className="mr-1" />
          Preview: {BASE_URL}/{slug || '...'}
        </p>
      </div>
    </div>
  );
};
