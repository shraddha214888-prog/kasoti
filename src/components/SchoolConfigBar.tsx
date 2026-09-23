import React, { useState } from 'react';
import { PaperHeader } from '../types/paper';
import { School, Settings2, ChevronDown, ChevronUp } from 'lucide-react';

interface SchoolConfigBarProps {
  header: PaperHeader;
  onChange: (updated: PaperHeader) => void;
}

export const SchoolConfigBar: React.FC<SchoolConfigBarProps> = ({ header, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-6 overflow-hidden">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
            <School className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{header.schoolName}</span>
              <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                {header.examTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {header.grade} · {header.subject} · {header.duration} · કુલ ગુણ: ૪૦
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <Settings2 className="w-3.5 h-3.5" />
          <span>{isOpen ? 'માહિતી સંતાડો' : 'શાળા અને પરીક્ષા વિગતો સંપાદિત કરો'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">શાળાનું નામ (School Name):</label>
            <input
              type="text"
              value={header.schoolName}
              onChange={(e) => onChange({ ...header, schoolName: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">પેટા શીર્ષક / તાલુકો-જિલ્લો:</label>
            <input
              type="text"
              value={header.subTitle}
              onChange={(e) => onChange({ ...header, subTitle: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">પરીક્ષાનું નામ (Exam Title):</label>
            <input
              type="text"
              value={header.examTitle}
              onChange={(e) => onChange({ ...header, examTitle: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">ધોરણ (Grade):</label>
            <input
              type="text"
              value={header.grade}
              onChange={(e) => onChange({ ...header, grade: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">વિષય અને એકમ (Subject & Chapters):</label>
            <input
              type="text"
              value={`${header.subject} (${header.chapters})`}
              onChange={(e) => onChange({ ...header, subject: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">સમયગાળો (Duration):</label>
            <input
              type="text"
              value={header.duration}
              onChange={(e) => onChange({ ...header, duration: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs font-medium text-slate-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};
