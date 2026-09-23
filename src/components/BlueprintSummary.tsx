import React from 'react';
import { QuestionBlock } from '../types/paper';
import { blueprintSpec } from '../data/questionBankData';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface BlueprintSummaryProps {
  blocks: QuestionBlock[];
}

export const BlueprintSummary: React.FC<BlueprintSummaryProps> = ({ blocks }) => {
  const totalCurrentMarks = blocks.reduce((acc, b) => {
    return acc + b.subQuestions.reduce((sAcc, sq) => sAcc + (Number(sq.marks) || 0), 0);
  }, 0);

  const isExact40 = totalCurrentMarks === 40;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">GCERT બ્લૂ પ્રિન્ટ અનુસાર ગુણભાર માળખું</h2>
            <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">ધોરણ-૭ ગુજરાતી (એકમ ૧ થી ૪)</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ગુજરાત શૈક્ષણિક સંશોધન અને તાલીમ પરિષદ (GCERT) પ્રશ્નબૅંક ૨૦૨૬-૨૭ આધારિત સત્તાવાર ૪૦ ગુણ માળખું.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3.5 py-2 rounded-lg border flex items-center gap-2 font-mono text-sm ${
            isExact40 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            {isExact40 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <div>
              <span className="text-xs font-sans text-slate-500 block">કુલ ગુણ સ્થિતિ:</span>
              <span className="font-bold text-base">{totalCurrentMarks} / 40 ગુણ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <th className="py-2.5 px-3 font-semibold">પ્રશ્ન ક્રમ</th>
              <th className="py-2.5 px-3 font-semibold">L.O. કોડ</th>
              <th className="py-2.5 px-3 font-semibold">L.O. વિધાન (અધ્યયન નિષ્પત્તિ)</th>
              <th className="py-2.5 px-3 font-semibold">પ્રશ્ન પ્રકાર</th>
              <th className="py-2.5 px-3 font-semibold text-center">નિયત ગુણ</th>
              <th className="py-2.5 px-3 font-semibold text-center">હાલના ગુણ</th>
              <th className="py-2.5 px-3 font-semibold text-center">સ્થિતિ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blueprintSpec.map((spec, idx) => {
              const matchingBlock = blocks.find(b => b.qNumber === spec.qNumber);
              const currentBlockMarks = matchingBlock 
                ? matchingBlock.subQuestions.reduce((sum, sq) => sum + (Number(sq.marks) || 0), 0)
                : 0;
              const matchesTarget = currentBlockMarks === spec.marks;

              return (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2 px-3 font-bold text-slate-900">{spec.qNumber}</td>
                  <td className="py-2 px-3 font-mono font-medium text-indigo-700">{spec.lo}</td>
                  <td className="py-2 px-3 text-slate-700">{spec.desc}</td>
                  <td className="py-2 px-3 text-slate-600">{spec.type}</td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-800">{spec.marks}</td>
                  <td className="py-2 px-3 text-center font-mono font-bold">
                    <span className={matchesTarget ? 'text-emerald-700' : 'text-amber-700'}>
                      {currentBlockMarks}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    {matchesTarget ? (
                      <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> યોગ્ય
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium inline-flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> વિસંગત ({currentBlockMarks > spec.marks ? `+${currentBlockMarks - spec.marks}` : currentBlockMarks - spec.marks})
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-semibold border-t-2 border-slate-300 text-slate-900">
              <td colSpan={4} className="py-2.5 px-3 text-right">કુલ સરવાળો (Total Marks):</td>
              <td className="py-2.5 px-3 text-center font-mono font-bold text-sm">40</td>
              <td className="py-2.5 px-3 text-center font-mono font-bold text-sm">
                <span className={isExact40 ? 'text-emerald-700' : 'text-rose-700'}>
                  {totalCurrentMarks}
                </span>
              </td>
              <td className="py-2.5 px-3 text-center">
                {isExact40 ? (
                  <span className="text-emerald-800 font-bold">સંપૂર્ણ યોગ્ય</span>
                ) : (
                  <span className="text-amber-800 font-bold">
                    {totalCurrentMarks < 40 ? `${40 - totalCurrentMarks} ગુણ ખૂટે છે` : `${totalCurrentMarks - 40} ગુણ વધુ છે`}
                  </span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
