import React, { useState, useEffect } from 'react';
import { SubQuestion } from '../types/paper';
import { X, Check } from 'lucide-react';

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subQuestion: SubQuestion | null;
  onSave: (updated: SubQuestion) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  isOpen,
  onClose,
  subQuestion,
  onSave
}) => {
  const [text, setText] = useState('');
  const [marks, setMarks] = useState(1);
  const [optionsText, setOptionsText] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (subQuestion) {
      setText(subQuestion.text || '');
      setMarks(subQuestion.marks || 1);
      setOptionsText(subQuestion.options ? subQuestion.options.join('\n') : '');
      setAnswer(subQuestion.answer || '');
    }
  }, [subQuestion]);

  if (!isOpen || !subQuestion) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOptions = optionsText.trim()
      ? optionsText.split('\n').map(s => s.trim()).filter(Boolean)
      : undefined;

    onSave({
      ...subQuestion,
      text: text.trim(),
      marks: Number(marks) || 1,
      options: updatedOptions,
      answer: answer.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-900 text-sm">પ્રશ્નમાં સુધારો કરો (Edit Question)</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              પ્રશ્ન લખાણ: *
            </label>
            <textarea
              rows={3}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              ગુણ (Marks):
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {subQuestion.options && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                વિકલ્પો (દરેક નવી લીટીમાં):
              </label>
              <textarea
                rows={4}
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                className="w-full font-mono border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              આદર્શ ઉત્તર / જવાબ:
            </label>
            <textarea
              rows={2}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="મોડેલ ઉત્તર..."
              className="w-full border border-slate-300 rounded-lg p-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
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
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>સાચવો</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
