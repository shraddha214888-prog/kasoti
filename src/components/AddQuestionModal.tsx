import React, { useState } from 'react';
import { QuestionBlock, SubQuestion } from '../types/paper';
import { questionBankData } from '../data/questionBankData';
import { X, Plus, BookOpen, PenTool } from 'lucide-react';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: QuestionBlock[];
  onAddSubQuestion: (targetBlockId: string, newSubQ: SubQuestion) => void;
  onAddNewBlock: (newBlock: QuestionBlock) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  blocks,
  onAddSubQuestion,
  onAddNewBlock
}) => {
  const [tab, setTab] = useState<'bank' | 'custom'>('bank');

  // Bank tab state
  const [selectedQNumber, setSelectedQNumber] = useState<string>('પ્રશ્ન-1');
  const [selectedSection, setSelectedSection] = useState<number>(2);

  // Custom tab state
  const [targetBlockId, setTargetBlockId] = useState<string>(blocks[0]?.id || '');
  const [customText, setCustomText] = useState<string>('');
  const [customMarks, setCustomMarks] = useState<number>(1);
  const [customOptions, setCustomOptions] = useState<string>('A. \nB. \nC. \nD. ');
  const [isMCQ, setIsMCQ] = useState<boolean>(false);
  const [customAnswer, setCustomAnswer] = useState<string>('');

  if (!isOpen) return null;

  const currentBankItems = questionBankData.filter(
    item => item.qNumber === selectedQNumber && item.section === selectedSection
  );

  const handleAddFromBank = (sq: SubQuestion) => {
    let target = blocks.find(b => b.qNumber === selectedQNumber);
    if (!target && blocks.length > 0) {
      target = blocks[0];
    }
    if (target) {
      const newSq: SubQuestion = {
        ...sq,
        id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        questionNumber: `${target.subQuestions.length + 1}`
      };
      onAddSubQuestion(target.id, newSq);
      onClose();
    }
  };

  const handleAddCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const target = blocks.find(b => b.id === targetBlockId) || blocks[0];
    if (!target) return;

    const optionsArray = isMCQ
      ? customOptions.split('\n').map(s => s.trim()).filter(Boolean)
      : undefined;

    const newSq: SubQuestion = {
      id: `custom_${Date.now()}`,
      questionNumber: `${target.subQuestions.length + 1}`,
      text: customText.trim(),
      options: optionsArray,
      marks: Number(customMarks) || 1,
      answer: customAnswer.trim() || undefined
    };

    onAddSubQuestion(target.id, newSq);
    setCustomText('');
    setCustomAnswer('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">નવો પ્રશ્ન ઉમેરો (Add Question)</h3>
            <p className="text-xs text-slate-500">
              GCERT સત્તાવાર પ્રશ્નબૅંકમાંથી પ્રશ્ન પસંદ કરો અથવા તમારી મરજી મુજબ જાતે નવો પ્રશ્ન લખો.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setTab('bank')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
              tab === 'bank' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>GCERT પ્રશ્નબૅંકમાંથી ઉમેરો</span>
          </button>
          <button
            onClick={() => setTab('custom')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
              tab === 'custom' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>પોતાનો નવો પ્રશ્ન લખીને ઉમેરો</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'bank' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    પ્રશ્ન પસંદ કરો:
                  </label>
                  <select
                    value={selectedQNumber}
                    onChange={(e) => setSelectedQNumber(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="પ્રશ્ન-1">પ્રશ્ન-1 (ફકરા આધારિત MCQ - 4 ગુણ)</option>
                    <option value="પ્રશ્ન-2">પ્રશ્ન-2 (વાર્તા આધારિત MCQ - 4 ગુણ)</option>
                    <option value="પ્રશ્ન-3">પ્રશ્ન-3 (જાહેરાત/પોસ્ટર આધારિત - 4 ગુણ)</option>
                    <option value="પ્રશ્ન-4">પ્રશ્ન-4 (વાક્ય શુદ્ધિ - 6 ગુણ)</option>
                    <option value="પ્રશ્ન-5(અ)">પ્રશ્ન-5(અ) (ટૂંક જવાબી પ્રશ્નો - 6 ગુણ)</option>
                    <option value="પ્રશ્ન-5(બ)">પ્રશ્ન-5(બ) (શબ્દભંડોળ / અર્થ / વાક્ય - 6 ગુણ)</option>
                    <option value="પ્રશ્ન-6(અ)">પ્રશ્ન-6(અ) (અધૂરી વાર્તા પૂર્ણતા - 5 ગુણ)</option>
                    <option value="પ્રશ્ન-6(બ)">પ્રશ્ન-6(બ) (વિચારવિસ્તાર સૂક્તિ - 5 ગુણ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    વિભાગ પસંદ કરો (૧ થી ૫):
                  </label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(Number(e.target.value))}
                    className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={1}>વિભાગ : 1</option>
                    <option value={2}>વિભાગ : 2</option>
                    <option value={3}>વિભાગ : 3</option>
                    <option value={4}>વિભાગ : 4</option>
                    <option value={5}>વિભાગ : 5</option>
                  </select>
                </div>
              </div>

              {/* Items from selected bank */}
              <div className="space-y-3 mt-4">
                <p className="text-xs font-semibold text-slate-600">
                  આ વિભાગમાંથી પ્રશ્નપત્રમાં ઉમેરવા નીચેના '+' બટન પર ક્લિક કરો:
                </p>
                {currentBankItems.map((bankItem, bIdx) => (
                  <div key={bIdx} className="space-y-2">
                    <div className="text-xs font-bold text-indigo-900 bg-indigo-50/70 p-2 rounded">
                      {bankItem.sectionTitle}
                    </div>

                    {bankItem.passageText && (
                      <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded line-clamp-2">
                        {bankItem.passageText}
                      </p>
                    )}

                    <div className="space-y-2">
                      {bankItem.subQuestions.map((sq, sqIdx) => (
                        <div
                          key={sqIdx}
                          className="flex items-start justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors"
                        >
                          <div className="text-xs">
                            <span className="font-semibold text-slate-900 mr-1.5">{sq.questionNumber}.</span>
                            <span className="text-slate-800">{sq.text}</span>
                            {sq.options && (
                              <div className="grid grid-cols-2 gap-1 mt-1 text-[11px] text-slate-500">
                                {sq.options.map((opt, oIdx) => (
                                  <div key={oIdx}>{opt}</div>
                                ))}
                              </div>
                            )}
                            <div className="mt-1 text-[11px] text-slate-500 font-mono">
                              ગુણ : {sq.marks}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddFromBank(sq)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>ઉમેરો</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleAddCustomQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  કયા મુખ્ય પ્રશ્નમાં આ પ્રશ્ન ઉમેરવો છે?
                </label>
                <select
                  value={targetBlockId}
                  onChange={(e) => setTargetBlockId(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  {blocks.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.qNumber} : {b.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  પ્રશ્નનું લખાણ (Question Text): *
                </label>
                <textarea
                  rows={3}
                  required
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="દા.ત. નર્મદા નદીને ગુજરાતની જીવાદોરી શા માટે કહેવામાં આવે છે?"
                  className="w-full text-xs font-normal border border-slate-300 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    આ પ્રશ્નના ગુણ (Marks):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={customMarks}
                    onChange={(e) => setCustomMarks(Number(e.target.value))}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    પ્રશ્નનો પ્રકાર:
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isMCQ}
                        onChange={(e) => setIsMCQ(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>બહુવિકલ્પ (MCQ) વિકલ્પો ધરાવે છે</span>
                    </label>
                  </div>
                </div>
              </div>

              {isMCQ && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ચાર વિકલ્પો (દરેક નવી લીટીમાં A, B, C, D સાથે):
                  </label>
                  <textarea
                    rows={4}
                    value={customOptions}
                    onChange={(e) => setCustomOptions(e.target.value)}
                    className="w-full text-xs font-mono border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  આદર્શ ઉત્તર / Answer Key (વૈકલ્પિક):
                </label>
                <textarea
                  rows={2}
                  value={customAnswer}
                  onChange={(e) => setCustomAnswer(e.target.value)}
                  placeholder="શિક્ષકના મૂલ્યાંકન માટેનો સાચો જવાબ..."
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer shadow-xs"
                >
                  પ્રશ્નપત્રમાં ઉમેરો
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
