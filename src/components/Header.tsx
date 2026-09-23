import React from 'react';
import { School, Printer, FileText, CheckCircle2, BookOpen, BarChart3, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: 'editor' | 'preview' | 'answerKey' | 'blueprint' | 'library';
  setActiveTab: (tab: 'editor' | 'preview' | 'answerKey' | 'blueprint' | 'library') => void;
  totalMarks: number;
  schoolName: string;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalMarks,
  schoolName,
  onOpenAddModal
}) => {
  const isExact40 = totalMarks === 40;

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                {schoolName}
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                ધોરણ-૭ ગુજરાતી પ્રથમ સત્ર (૪૦ ગુણ બ્લૂપ્રિન્ટ પ્રશ્નપત્ર)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>પ્રશ્નપત્ર સંપાદન</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>પ્રશ્નપત્ર A4 પ્રિન્ટ</span>
            </button>

            <button
              onClick={() => setActiveTab('answerKey')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'answerKey'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ઉત્તરવહી (Answer Key)</span>
            </button>

            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'blueprint'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>GCERT બ્લૂ પ્રિન્ટ</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>પ્રશ્નબૅંક લાઇબ્રેરી</span>
            </button>
          </nav>

          {/* Right Action: Marks Counter & Print */}
          <div className="flex items-center gap-2.5">
            <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 border ${
              isExact40
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <span>{totalMarks}</span>
              <span className="text-slate-400 font-sans">/</span>
              <span>40 ગુણ</span>
            </div>

            <button
              onClick={onOpenAddModal}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>પ્રશ્ન ઉમેરો</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('preview');
                setTimeout(() => window.print(), 150);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">A4 પ્રિન્ટ</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            સંપાદન
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            A4 પ્રિન્ટ
          </button>
          <button
            onClick={() => setActiveTab('answerKey')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'answerKey' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            ઉત્તરવહી
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            બ્લૂ પ્રિન્ટ
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'library' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            પ્રશ્નબૅંક
          </button>
        </div>
      </div>
    </header>
  );
};
