export interface SubQuestion {
  id: string;
  questionNumber: string; // e.g. "1", "2", "3", "4"
  text: string;
  options?: string[]; // For MCQs: ["A. ...", "B. ...", "C. ...", "D. ..."]
  marks: number;
  answer?: string; // Correct answer
  explanation?: string;
}

export interface QuestionBlock {
  id: string;
  qNumber: string; // "પ્રશ્ન-1", "પ્રશ્ન-2", "પ્રશ્ન-3", "પ્રશ્ન-4", "પ્રશ્ન-5(અ)", "પ્રશ્ન-5(બ)", "પ્રશ્ન-6(અ)", "પ્રશ્ન-6(બ)"
  title: string; // "આપેલ ફકરાને આધારે પ્રશ્નોના જવાબ આપો."
  loCode: string; // e.g. "G7.3.1"
  loDescription: string;
  qType: 'MCQ' | 'હેતુલક્ષી' | 'ટૂંક જવાબી' | 'નિબંધ / સર્જનાત્મક' | 'વિચારવિસ્તાર';
  allocatedMarks: number;
  selectedSection: number; // 1 to 5
  sectionName?: string; // e.g. "વિભાગ : 1 (આદિત્ય અને રહસ્યમય ઘડિયાળ)"
  passageText?: string; // Story, passage, or prompt
  posterData?: {
    type: 'book_ad' | 'sports_camp' | 'bus_schedule' | 'job_interview' | 'book_store';
    title: string;
    subtitle?: string;
    highlights?: string[];
    details?: { [key: string]: string };
    table?: { headers: string[]; rows: string[][] };
    notes?: string[];
    contact?: string;
  };
  subQuestions: SubQuestion[];
  instructions?: string; // "(કોઇ પણ એક વિભાગ) ગુણ (04)"
  customNote?: string;
}

export interface PaperHeader {
  schoolName: string;
  subTitle: string;
  examTitle: string;
  grade: string;
  subject: string;
  chapters: string;
  year: string;
  totalMarks: number;
  duration: string;
  generalInstructions: string[];
}

export interface QuestionBankItem {
  qNumber: string;
  section: number;
  sectionTitle: string;
  loCode: string;
  loDescription: string;
  qType: 'MCQ' | 'હેતુલક્ષી' | 'ટૂંક જવાબી' | 'નિબંધ / સર્જનાત્મક' | 'વિચારવિસ્તાર';
  marks: number;
  passageText?: string;
  posterData?: any;
  subQuestions: SubQuestion[];
}
