import React from 'react';
import { QuestionBlock, PaperHeader } from '../types/paper';
import { PosterVisual } from './PosterVisual';
import { Printer, Copy, Check } from 'lucide-react';

interface PrintPaperViewProps {
  header: PaperHeader;
  blocks: QuestionBlock[];
}

export const PrintPaperView: React.FC<PrintPaperViewProps> = ({ header, blocks }) => {
  const [copied, setCopied] = React.useState(false);

  const totalMarks = blocks.reduce((acc, b) => {
    return acc + b.subQuestions.reduce((sAcc, sq) => sAcc + (Number(sq.marks) || 0), 0);
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = `${header.schoolName}\n${header.subTitle}\n${header.examTitle}\n`;
    text += `${header.grade} | ${header.subject} (${header.chapters}) | કુલ ગુણ: ${totalMarks} | ${header.duration}\n`;
    text += `વિદ્યાર્થીનું નામ: ________________________ રોલ નં: ______ વર્ગ: ____ તારીખ: _______\n\n`;

    blocks.forEach(b => {
      text += `\n==============================\n`;
      text += `${b.qNumber} ${b.title} [ગુણ: ${b.subQuestions.reduce((s, q) => s + q.marks, 0)}]\n`;
      if (b.instructions) text += `${b.instructions}\n`;
      if (b.passageText) text += `\n${b.passageText}\n\n`;

      b.subQuestions.forEach(sq => {
        text += `${sq.questionNumber}. ${sq.text} [${sq.marks} ગુણ]\n`;
        if (sq.options && sq.options.length > 0) {
          sq.options.forEach(opt => {
            text += `   ${opt}\n`;
          });
        }
      });
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Top Action Bar (Screen only, hidden when printing) */}
      <div className="no-print bg-slate-900 text-white px-5 py-3 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-amber-300">પ્રશ્નપત્ર પૂર્વાવલોકન (A4 પ્રિન્ટ માટે તૈયાર)</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">કુલ ગુણ: <strong className="text-white">{totalMarks}</strong> / 40</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            title="પેપર લખાણ ક્લિપબોર્ડમાં કોપી કરો"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'કોપી થઈ ગયું!' : 'લખાણ કોપી કરો'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>A4 પેપર પ્રિન્ટ / PDF ડાઉનલોડ કરો</span>
          </button>
        </div>
      </div>

      {/* Actual Printable Exam Paper Sheet */}
      <div className="bg-white mx-auto p-6 sm:p-10 border border-slate-300 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 max-w-[210mm] text-slate-900 leading-normal text-[13.5px]">
        {/* School Header Box */}
        <div className="border-2 border-slate-900 p-4 rounded-md mb-5 text-center bg-slate-50/50 print:bg-white print:border-2 print:border-black">
          <h1 className="text-2xl font-bold tracking-wide text-slate-950 font-serif mb-0.5 print:text-2xl">
            {header.schoolName}
          </h1>
          {header.subTitle && (
            <p className="text-xs text-slate-700 font-medium mb-1 print:text-black">
              {header.subTitle}
            </p>
          )}
          <div className="inline-block border-y border-slate-800 py-1 px-4 my-1">
            <h2 className="text-base font-bold text-slate-900 tracking-wide">
              {header.examTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold mt-2 pt-2 border-t border-slate-300 print:border-slate-800 text-slate-800">
            <div>{header.grade}</div>
            <div>{header.subject} ({header.chapters})</div>
            <div>કુલ ગુણ : {totalMarks}</div>
            <div>{header.duration}</div>
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="border border-slate-900 p-2.5 rounded-sm mb-5 text-xs grid grid-cols-1 sm:grid-cols-12 gap-y-2 gap-x-2 bg-white print:border-black">
          <div className="sm:col-span-6 flex items-baseline">
            <span className="font-bold min-w-[95px]">વિદ્યાર્થીનું નામ:</span>
            <span className="flex-1 border-b border-dotted border-slate-700 h-4"></span>
          </div>
          <div className="sm:col-span-3 flex items-baseline">
            <span className="font-bold min-w-[55px]">રોલ નં:</span>
            <span className="flex-1 border-b border-dotted border-slate-700 h-4"></span>
          </div>
          <div className="sm:col-span-3 flex items-baseline">
            <span className="font-bold min-w-[40px]">વર્ગ:</span>
            <span className="flex-1 border-b border-dotted border-slate-700 h-4 font-semibold text-center">૭</span>
          </div>

          <div className="sm:col-span-4 flex items-baseline">
            <span className="font-bold min-w-[45px]">તારીખ:</span>
            <span className="flex-1 border-b border-dotted border-slate-700 h-4"></span>
          </div>
          <div className="sm:col-span-4 flex items-baseline">
            <span className="font-bold min-w-[70px]">મેળવેલ ગુણ:</span>
            <span className="flex-1 border-b border-dotted border-slate-700 h-4"></span>
            <span className="ml-1 font-bold">/ ૪૦</span>
          </div>
          <div className="sm:col-span-4 flex items-baseline">
            <span className="font-bold min-w-[90px]">નિરીક્ષકની સહી:</span>
            <span className="flex-1 border-b border-dotted border-slate-700 h-4"></span>
          </div>
        </div>

        {/* Instructions */}
        {header.generalInstructions && header.generalInstructions.length > 0 && (
          <div className="mb-4 text-[11.5px] text-slate-700 italic border-l-2 border-slate-400 pl-2">
            <strong>સામાન્ય સૂચનાઓ:</strong> {header.generalInstructions.join(' | ')}
          </div>
        )}

        {/* Question Blocks */}
        <div className="space-y-6">
          {blocks.map((block) => {
            const blockMarks = block.subQuestions.reduce((s, sq) => s + (Number(sq.marks) || 0), 0);

            return (
              <div key={block.id} className="print-break-inside-avoid border-t border-slate-300 pt-3.5 print:border-black">
                {/* Question Header */}
                <div className="flex items-baseline justify-between gap-3 mb-2 font-bold text-slate-950">
                  <div className="text-[14px]">
                    <span>{block.qNumber}. </span>
                    <span>{block.title} </span>
                    {block.instructions && (
                      <span className="font-normal text-xs text-slate-700">{block.instructions}</span>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold shrink-0 border border-slate-800 px-2 py-0.5 rounded-sm">
                    ગુણ : {blockMarks < 10 ? `૦${blockMarks}` : blockMarks}
                  </div>
                </div>

                {/* Section Tag if present */}
                {block.sectionName && (
                  <div className="text-[11px] font-medium text-slate-500 mb-2">
                    [{block.sectionName}]
                  </div>
                )}

                {/* Passage / Story Text if present */}
                {block.passageText && (
                  <div className="my-2.5 p-3 rounded border border-slate-300 bg-slate-50/50 print:bg-white print:border-slate-400 text-[12.5px] text-justify leading-relaxed">
                    <p className="whitespace-pre-line">{block.passageText}</p>
                  </div>
                )}

                {/* Poster Graphic for Q3 */}
                {block.posterData && (
                  <PosterVisual posterData={block.posterData} />
                )}

                {/* Sub-questions List */}
                <div className="space-y-3 mt-3">
                  {block.subQuestions.map((sq, sqIdx) => (
                    <div key={sq.id || sqIdx} className="text-[13px]">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5">
                          <span className="font-semibold shrink-0">{sq.questionNumber || `${sqIdx + 1}`}.</span>
                          <span className="whitespace-pre-line leading-snug">{sq.text}</span>
                        </div>
                        {sq.marks > 1 && (
                          <span className="text-[11px] text-slate-500 font-mono shrink-0 ml-1">
                            ({sq.marks})
                          </span>
                        )}
                      </div>

                      {/* Options for MCQ */}
                      {sq.options && sq.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1.5 ml-5 text-xs text-slate-800">
                          {sq.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-baseline gap-1">
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Paper End Stamp */}
        <div className="mt-8 pt-4 border-t-2 border-slate-900 text-center text-xs font-semibold print:border-black">
          <p>*** ઉત્તમ પરિણામ માટે શુભેચ્છાઓ ***</p>
        </div>
      </div>
    </div>
  );
};
