import React from 'react';
import { QuestionBlock, SubQuestion } from '../types/paper';
import { questionBankData } from '../data/questionBankData';
import { PosterVisual } from './PosterVisual';
import { 
  Trash2, 
  Edit3, 
  Plus, 
  RotateCcw, 
  Layers, 
  FileText, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface QuestionEditorProps {
  blocks: QuestionBlock[];
  onUpdateBlock: (blockId: string, updated: Partial<QuestionBlock>) => void;
  onRemoveSubQuestion: (blockId: string, subQId: string) => void;
  onEditSubQuestion: (blockId: string, subQ: SubQuestion) => void;
  onOpenAddModal: (targetBlockId?: string) => void;
  onApplyWholeSet: (sectionNum: number) => void;
  onResetDefault: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  blocks,
  onUpdateBlock,
  onRemoveSubQuestion,
  onEditSubQuestion,
  onOpenAddModal,
  onApplyWholeSet,
  onResetDefault
}) => {
  const totalMarks = blocks.reduce((acc, b) => {
    return acc + b.subQuestions.reduce((sAcc, sq) => sAcc + (Number(sq.marks) || 0), 0);
  }, 0);

  const isExact40 = totalMarks === 40;

  const handleSwitchSection = (block: QuestionBlock, sectionNum: number) => {
    const bankItem = questionBankData.find(
      item => item.qNumber === block.qNumber && item.section === sectionNum
    );

    if (bankItem) {
      onUpdateBlock(block.id, {
        selectedSection: sectionNum,
        sectionName: bankItem.sectionTitle,
        passageText: bankItem.passageText,
        posterData: bankItem.posterData,
        subQuestions: bankItem.subQuestions.map(sq => ({ ...sq }))
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Toolbar & Marks Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              પ્રશ્નપત્ર સંપાદન (પ્રશ્નો ઉમેરો, કાઢો અને બદલો)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            કોઈપણ પ્રશ્ન રદ્દ કરો, પોતાની મરજી મુજબ નવો ઉમેરો અથવા એક ક્લિકમાં વિભાગ ૧ થી ૫ બદલો.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Set Selectors */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1">
              <Layers className="w-3 h-3" /> સેટ પસંદ કરો:
            </span>
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => onApplyWholeSet(num)}
                className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-white hover:bg-indigo-50 hover:text-indigo-600 rounded-lg shadow-2xs transition-colors cursor-pointer"
                title={`બધા પ્રશ્નો વિભાગ ${num} માંથી લો`}
              >
                વિભાગ {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenAddModal()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>નવો પ્રશ્ન ઉમેરો</span>
          </button>

          <button
            onClick={onResetDefault}
            className="flex items-center gap-1 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
            title="મૂળ વિભાગ ૧ પ્રશ્નપત્ર ફરીથી લાવો"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>રીસેટ</span>
          </button>
        </div>
      </div>

      {/* Marks Alert banner if not 40 */}
      {!isExact40 && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-amber-900 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>ધ્યાન આપો:</strong> હાલમાં પ્રશ્નપત્રના કુલ ગુણ <strong>{totalMarks}</strong> છે. બ્લૂ પ્રિન્ટ મુજબ ૪૦ ગુણ હોવા જોઈએ (
              {totalMarks < 40 ? `${40 - totalMarks} ગુણ ખૂટે છે` : `${totalMarks - 40} ગુણ વધુ છે`}).
            </span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 underline cursor-pointer" onClick={() => onOpenAddModal()}>
            પ્રશ્ન ઉમેરો અથવા ગુણ સુધારો
          </span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {blocks.map((block) => {
          const currentBlockMarks = block.subQuestions.reduce((s, sq) => s + (Number(sq.marks) || 0), 0);
          const hasVibhagOptions = [1, 2, 3, 4, 5].filter(num => 
            questionBankData.some(item => item.qNumber === block.qNumber && item.section === num)
          );

          return (
            <div
              key={block.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Block Header */}
              <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">{block.qNumber} : {block.title}</span>
                    <span className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded font-medium">
                      L.O.: {block.loCode}
                    </span>
                    <span className="text-xs text-slate-500">{block.instructions}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{block.loDescription}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Section Switcher dropdown/buttons */}
                  {hasVibhagOptions.length > 1 && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-500 font-medium">વિભાગ:</span>
                      <div className="flex gap-1">
                        {hasVibhagOptions.map(num => (
                          <button
                            key={num}
                            onClick={() => handleSwitchSection(block, num)}
                            className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                              block.selectedSection === num
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-400'
                            }`}
                            title={`વિભાગ ${num} પસંદ કરો`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs font-bold font-mono px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 shadow-2xs">
                    ગુણ : {currentBlockMarks}
                  </div>
                </div>
              </div>

              {/* Block Content */}
              <div className="p-4 sm:p-5 space-y-4">
                {/* Passage or story if present */}
                {block.passageText && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800">
                    <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>વાંચન સામગ્રી / ફકરો / વાર્તા શરૂઆત ({block.sectionName || `વિભાગ : ${block.selectedSection}`})</span>
                      </span>
                    </div>
                    <p className="whitespace-pre-line leading-relaxed text-justify line-clamp-4">
                      {block.passageText}
                    </p>
                  </div>
                )}

                {/* Poster Visual for Q3 */}
                {block.posterData && (
                  <div>
                    <div className="text-xs font-semibold text-slate-700 mb-1">
                      જાહેરાત / પોસ્ટર સામગ્રી:
                    </div>
                    <PosterVisual posterData={block.posterData} />
                  </div>
                )}

                {/* Sub-Questions list with Add and Delete */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-slate-700">
                      પ્રશ્નોની યાદી ({block.subQuestions.length} પ્રશ્નો):
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenAddModal(block.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>આમાં નવો પ્રશ્ન ઉમેરો</span>
                    </button>
                  </div>

                  {block.subQuestions.length === 0 ? (
                    <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                      કોઈ પ્રશ્ન નથી. 'આમાં નવો પ્રશ્ન ઉમેરો' બટન દબાવીને પ્રશ્ન ઉમેરો.
                    </div>
                  ) : (
                    block.subQuestions.map((sq, sqIdx) => (
                      <div
                        key={sq.id || sqIdx}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                      >
                        <div className="flex-1">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-slate-900 shrink-0">
                              {sq.questionNumber || sqIdx + 1}.
                            </span>
                            <div className="flex-1">
                              <p className="text-slate-800 font-medium whitespace-pre-line leading-relaxed">
                                {sq.text}
                              </p>

                              {/* Options if MCQ */}
                              {sq.options && sq.options.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1.5 ml-1 text-[11px] text-slate-600">
                                  {sq.options.map((opt, oIdx) => (
                                    <div key={oIdx}>{opt}</div>
                                  ))}
                                </div>
                              )}

                              {sq.answer && (
                                <div className="mt-1.5 text-[11px] text-emerald-800 bg-emerald-50/60 p-1.5 rounded border border-emerald-100 font-normal">
                                  <strong>જવાબ:</strong> {sq.answer}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Marks & Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                            {sq.marks} ગુણ
                          </span>

                          <button
                            type="button"
                            onClick={() => onEditSubQuestion(block.id, sq)}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="પ્રશ્ન સંપાદિત કરો"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemoveSubQuestion(block.id, sq.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="પ્રશ્ન કાઢી નાખો (Delete)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
