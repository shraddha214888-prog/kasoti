import React, { useState } from 'react';
import { questionBankData } from '../data/questionBankData';
import { QuestionBlock } from '../types/paper';
import { PosterVisual } from './PosterVisual';
import { BookOpen, Check, Layers } from 'lucide-react';

interface QuestionBankExplorerProps {
  onApplySection: (qNumber: string, sectionNumber: number) => void;
  blocks: QuestionBlock[];
}

export const QuestionBankExplorer: React.FC<QuestionBankExplorerProps> = ({
  onApplySection,
  blocks
}) => {
  const [activeQ, setActiveQ] = useState<string>('પ્રશ્ન-1');
  const [activeSection, setActiveSection] = useState<number>(1);

  const qNumbers = [
    { id: 'પ્રશ્ન-1', title: 'પ્રશ્ન-1 (ફકરો - 4 ગુણ)' },
    { id: 'પ્રશ્ન-2', title: 'પ્રશ્ન-2 (વાર્તા - 4 ગુણ)' },
    { id: 'પ્રશ્ન-3', title: 'પ્રશ્ન-3 (જાહેરાત - 4 ગુણ)' },
    { id: 'પ્રશ્ન-4', title: 'પ્રશ્ન-4 (વાક્યશુદ્ધિ - 6 ગુણ)' },
    { id: 'પ્રશ્ન-5(અ)', title: 'પ્રશ્ન-5(અ) (ટૂંક જવાબી - 6 ગુણ)' },
    { id: 'પ્રશ્ન-5(બ)', title: 'પ્રશ્ન-5(બ) (શબ્દભંડોળ - 6 ગુણ)' },
    { id: 'પ્રશ્ન-6(અ)', title: 'પ્રશ્ન-6(અ) (વાર્તા પૂર્ણતા - 5 ગુણ)' },
    { id: 'પ્રશ્ન-6(બ)', title: 'પ્રશ્ન-6(બ) (વિચારવિસ્તાર - 5 ગુણ)' }
  ];

  const currentItem = questionBankData.find(
    item => item.qNumber === activeQ && item.section === activeSection
  );

  const currentBlock = blocks.find(b => b.qNumber === activeQ);
  const isCurrentSectionApplied = currentBlock?.selectedSection === activeSection;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            GCERT સત્તાવાર પ્રશ્નબૅંક લાઇબ્રેરી (ધોરણ-૭ ગુજરાતી પ્રથમ સત્ર)
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          પ્રશ્નબૅંકના તમામ ૫ વિભાગોનું અન્વેષણ કરો અને મનપસંદ વિભાગને તમારા પ્રશ્નપત્રમાં સીધો સામેલ કરો.
        </p>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-1.5 scrollbar-thin border-b border-slate-100">
        {qNumbers.map(q => (
          <button
            key={q.id}
            onClick={() => setActiveQ(q.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeQ === q.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {q.title}
          </button>
        ))}
      </div>

      {/* Section Selector (Vibhag 1 to 5) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-4 p-2 bg-slate-50 rounded-lg border border-slate-100">
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-slate-600 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-500" /> ઉપલબ્ધ વિભાગ:
          </span>
          {[1, 2, 3, 4, 5].map(sec => {
            const hasData = questionBankData.some(item => item.qNumber === activeQ && item.section === sec);
            if (!hasData) return null;

            return (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeSection === sec
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                }`}
              >
                વિભાગ : {sec}
              </button>
            );
          })}
        </div>

        <div>
          <button
            type="button"
            onClick={() => onApplySection(activeQ, activeSection)}
            disabled={isCurrentSectionApplied}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              isCurrentSectionApplied
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {isCurrentSectionApplied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>હાલના પ્રશ્નપત્રમાં લાગુ છે</span>
              </>
            ) : (
              <>
                <span>આ વિભાગ પ્રશ્નપત્રમાં લાગુ કરો</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Section Content Preview */}
      {currentItem ? (
        <div className="border border-slate-200 rounded-xl p-4 bg-white text-slate-900 text-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{currentItem.sectionTitle}</h3>
              <p className="text-[11px] text-slate-500 font-mono">
                L.O.: {currentItem.loCode} - {currentItem.loDescription}
              </p>
            </div>
            <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded border border-indigo-100 font-mono">
              કુલ ગુણ : {currentItem.marks}
            </span>
          </div>

          {currentItem.passageText && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-3 text-justify leading-relaxed whitespace-pre-line text-slate-800">
              {currentItem.passageText}
            </div>
          )}

          {currentItem.posterData && (
            <PosterVisual posterData={currentItem.posterData} />
          )}

          <div className="space-y-3 mt-3">
            {currentItem.subQuestions.map((sq, idx) => (
              <div key={idx} className="p-3 border border-slate-100 rounded-lg bg-slate-50/50">
                <div className="flex items-start justify-between font-semibold text-slate-900">
                  <span>{sq.questionNumber}. {sq.text}</span>
                  <span className="text-slate-500 font-mono shrink-0 ml-2">({sq.marks} ગુણ)</span>
                </div>

                {sq.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2 ml-4 text-slate-700">
                    {sq.options.map((opt, oIdx) => (
                      <div key={oIdx}>{opt}</div>
                    ))}
                  </div>
                )}

                {sq.answer && (
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50/80 p-1.5 rounded border border-emerald-100 font-medium">
                    જવાબ : {sq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400">
          આ વિભાગ માટે માહિતી ઉપલબ્ધ નથી.
        </div>
      )}
    </div>
  );
};
