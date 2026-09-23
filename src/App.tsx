import { useState, useEffect } from 'react';
import { defaultPaperHeader, defaultPaperBlocks, questionBankData } from './data/questionBankData';
import { QuestionBlock, SubQuestion, PaperHeader } from './types/paper';
import { Header } from './components/Header';
import { SchoolConfigBar } from './components/SchoolConfigBar';
import { QuestionEditor } from './components/QuestionEditor';
import { PrintPaperView } from './components/PrintPaperView';
import { AnswerKeyView } from './components/AnswerKeyView';
import { BlueprintSummary } from './components/BlueprintSummary';
import { QuestionBankExplorer } from './components/QuestionBankExplorer';
import { AddQuestionModal } from './components/AddQuestionModal';
import { EditQuestionModal } from './components/EditQuestionModal';

export default function App() {
  const [header, setHeader] = useState<PaperHeader>(() => {
    const saved = localStorage.getItem('nani_umarvan_paper_header');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultPaperHeader;
  });

  const [blocks, setBlocks] = useState<QuestionBlock[]>(() => {
    const saved = localStorage.getItem('nani_umarvan_paper_blocks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultPaperBlocks;
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'answerKey' | 'blueprint' | 'library'>('editor');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetBlockIdForAdd, setTargetBlockIdForAdd] = useState<string | undefined>(undefined);
  const [editingSubQ, setEditingSubQ] = useState<SubQuestion | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('nani_umarvan_paper_header', JSON.stringify(header));
  }, [header]);

  useEffect(() => {
    localStorage.setItem('nani_umarvan_paper_blocks', JSON.stringify(blocks));
  }, [blocks]);

  // Calculate live marks
  const totalMarks = blocks.reduce((acc, b) => {
    return acc + b.subQuestions.reduce((sAcc, sq) => sAcc + (Number(sq.marks) || 0), 0);
  }, 0);

  // Remove a sub-question
  const handleRemoveSubQuestion = (blockId: string, subQId: string) => {
    setBlocks(prev =>
      prev.map(b => {
        if (b.id !== blockId) return b;
        const filtered = b.subQuestions.filter(sq => sq.id !== subQId);
        // renumber
        const renumbered = filtered.map((sq, idx) => ({
          ...sq,
          questionNumber: `${idx + 1}`
        }));
        return {
          ...b,
          subQuestions: renumbered
        };
      })
    );
  };

  // Add a sub-question
  const handleAddSubQuestion = (targetBlockId: string, newSubQ: SubQuestion) => {
    setBlocks(prev =>
      prev.map(b => {
        if (b.id !== targetBlockId) return b;
        return {
          ...b,
          subQuestions: [...b.subQuestions, newSubQ]
        };
      })
    );
  };

  // Add whole new block if needed
  const handleAddNewBlock = (newBlock: QuestionBlock) => {
    setBlocks(prev => [...prev, newBlock]);
  };

  // Edit sub-question
  const handleOpenEditModal = (blockId: string, subQ: SubQuestion) => {
    setEditingBlockId(blockId);
    setEditingSubQ(subQ);
  };

  const handleSaveEditedSubQuestion = (updated: SubQuestion) => {
    if (!editingBlockId) return;
    setBlocks(prev =>
      prev.map(b => {
        if (b.id !== editingBlockId) return b;
        return {
          ...b,
          subQuestions: b.subQuestions.map(sq => (sq.id === updated.id ? updated : sq))
        };
      })
    );
    setEditingSubQ(null);
    setEditingBlockId(null);
  };

  // Update block properties (e.g. section switch)
  const handleUpdateBlock = (blockId: string, updatedFields: Partial<QuestionBlock>) => {
    setBlocks(prev =>
      prev.map(b => (b.id === blockId ? { ...b, ...updatedFields } : b))
    );
  };

  // Apply whole section preset across all blocks (1 to 5)
  const handleApplyWholeSet = (sectionNum: number) => {
    setBlocks(prev =>
      prev.map(b => {
        const item = questionBankData.find(
          q => q.qNumber === b.qNumber && q.section === sectionNum
        );
        if (item) {
          return {
            ...b,
            selectedSection: sectionNum,
            sectionName: item.sectionTitle,
            passageText: item.passageText,
            posterData: item.posterData,
            subQuestions: item.subQuestions.map(sq => ({ ...sq }))
          };
        }
        return b;
      })
    );
  };

  // Apply section from Question Bank Library Explorer
  const handleApplySectionFromLibrary = (qNumber: string, sectionNum: number) => {
    const item = questionBankData.find(
      q => q.qNumber === qNumber && q.section === sectionNum
    );
    if (!item) return;

    setBlocks(prev =>
      prev.map(b => {
        if (b.qNumber !== qNumber) return b;
        return {
          ...b,
          selectedSection: sectionNum,
          sectionName: item.sectionTitle,
          passageText: item.passageText,
          posterData: item.posterData,
          subQuestions: item.subQuestions.map(sq => ({ ...sq }))
        };
      })
    );
  };

  // Reset to default
  const handleResetDefault = () => {
    if (confirm('શું તમે મૂળ પ્રશ્નપત્ર સેટ (૪૦ ગુણ - વિભાગ ૧) પુનઃસ્થાપિત કરવા માંગો છો?')) {
      setBlocks(defaultPaperBlocks);
      setHeader(defaultPaperHeader);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalMarks={totalMarks}
        schoolName={header.schoolName}
        onOpenAddModal={() => {
          setTargetBlockIdForAdd(undefined);
          setIsAddModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Printable/Editable School Info Banner (Only in Editor/Blueprint/Library views) */}
        {activeTab !== 'preview' && activeTab !== 'answerKey' && (
          <SchoolConfigBar header={header} onChange={setHeader} />
        )}

        {/* Tab 1: Editor */}
        {activeTab === 'editor' && (
          <QuestionEditor
            blocks={blocks}
            onUpdateBlock={handleUpdateBlock}
            onRemoveSubQuestion={handleRemoveSubQuestion}
            onEditSubQuestion={handleOpenEditModal}
            onOpenAddModal={(blockId) => {
              setTargetBlockIdForAdd(blockId);
              setIsAddModalOpen(true);
            }}
            onApplyWholeSet={handleApplyWholeSet}
            onResetDefault={handleResetDefault}
          />
        )}

        {/* Tab 2: Print Preview */}
        {activeTab === 'preview' && (
          <PrintPaperView header={header} blocks={blocks} />
        )}

        {/* Tab 3: Answer Key / Solution */}
        {activeTab === 'answerKey' && (
          <AnswerKeyView header={header} blocks={blocks} />
        )}

        {/* Tab 4: Blueprint Summary */}
        {activeTab === 'blueprint' && (
          <BlueprintSummary blocks={blocks} />
        )}

        {/* Tab 5: Question Bank Library */}
        {activeTab === 'library' && (
          <QuestionBankExplorer
            onApplySection={handleApplySectionFromLibrary}
            blocks={blocks}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          {header.schoolName} · પ્રશ્નપત્ર નિર્માતા (ગુજરાતી ધોરણ ૭)
        </p>
        <p className="mt-1 text-slate-400">
          ગુજરાત શૈક્ષણિક સંશોધન અને તાલીમ પરિષદ (GCERT) પ્રશ્નબૅંક ૨૦૨૬-૨૭ ના બ્લૂપ્રિન્ટ પર આધારિત
        </p>
      </footer>

      {/* Modals */}
      <AddQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        blocks={blocks}
        onAddSubQuestion={handleAddSubQuestion}
        onAddNewBlock={handleAddNewBlock}
      />

      <EditQuestionModal
        isOpen={!!editingSubQ}
        onClose={() => {
          setEditingSubQ(null);
          setEditingBlockId(null);
        }}
        subQuestion={editingSubQ}
        onSave={handleSaveEditedSubQuestion}
      />
    </div>
  );
}
