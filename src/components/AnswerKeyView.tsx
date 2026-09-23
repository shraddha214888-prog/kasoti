import React from 'react';
import { QuestionBlock, PaperHeader } from '../types/paper';
import { Printer, CheckCircle2 } from 'lucide-react';

interface AnswerKeyViewProps {
  header: PaperHeader;
  blocks: QuestionBlock[];
}

export const AnswerKeyView: React.FC<AnswerKeyViewProps> = ({ header, blocks }) => {
  const totalMarks = blocks.reduce((acc, b) => {
    return acc + b.subQuestions.reduce((sAcc, sq) => sAcc + (Number(sq.marks) || 0), 0);
  }, 0);

  return (
    <div className="w-full">
      <div className="no-print bg-slate-900 text-white px-5 py-3 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div>
          <h2 className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> આદર્શ ઉત્તરવહી / મોડેલ સોલ્યુશન (શિક્ષક મૂલ્યાંકન માર્ગદર્શિકા)
          </h2>
          <p className="text-xs text-slate-300">
            {header.schoolName} - {header.grade} {header.subject} | કુલ ગુણ : {totalMarks}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>ઉત્તરવહી પ્રિન્ટ કરો</span>
        </button>
      </div>

      <div className="bg-white mx-auto p-6 sm:p-10 border border-slate-300 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 max-w-[210mm] text-slate-900 text-[13px]">
        <div className="border-b-2 border-slate-800 pb-3 mb-5 text-center">
          <h1 className="text-xl font-bold text-slate-950">{header.schoolName}</h1>
          <h2 className="text-sm font-semibold text-slate-700 mt-0.5">
            {header.examTitle} - આદર્શ ઉત્તરવહી (Answer Key)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            {header.grade} | {header.subject} | કુલ ગુણ : {totalMarks}
          </p>
        </div>

        <div className="space-y-6">
          {blocks.map((block) => (
            <div key={block.id} className="print-break-inside-avoid border border-slate-200 rounded-lg p-3.5 bg-slate-50/40 print:bg-white print:border-slate-300">
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-1.5 mb-2 font-bold">
                <span className="text-slate-900">
                  {block.qNumber} : {block.title}
                </span>
                <span className="text-xs font-mono text-slate-700">
                  ગુણ : {block.subQuestions.reduce((s, sq) => s + (sq.marks || 0), 0)}
                </span>
              </div>

              {block.sectionName && (
                <div className="text-[11px] text-indigo-700 font-medium mb-2">
                  {block.sectionName}
                </div>
              )}

              <div className="space-y-2.5">
                {block.subQuestions.map((sq, sIdx) => (
                  <div key={sq.id || sIdx} className="bg-white p-2 rounded border border-slate-200/80 text-xs">
                    <div className="flex items-start justify-between font-medium text-slate-800">
                      <span>પ્રશ્ન {sq.questionNumber || sIdx + 1}: {sq.text}</span>
                      <span className="font-mono text-slate-500 shrink-0 ml-2">({sq.marks} ગુણ)</span>
                    </div>

                    <div className="mt-1.5 p-2 bg-emerald-50/70 border border-emerald-200 rounded text-emerald-950">
                      <strong className="text-emerald-800">આદર્શ ઉત્તર / અપેક્ષિત જવાબ:</strong>
                      <div className="mt-0.5 whitespace-pre-line text-slate-800 font-medium">
                        {sq.answer || 'વિદ્યાર્થીના ભાષાકીય મૌલિક ચિંતન અને વિચાર મુજબ ગુણભાર આપવો.'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
