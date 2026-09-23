import React from 'react';

interface PosterProps {
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
}

export const PosterVisual: React.FC<PosterProps> = ({ posterData }) => {
  if (!posterData) return null;

  if (posterData.type === 'book_ad') {
    return (
      <div className="my-3 p-4 border-2 border-amber-800/60 rounded-lg bg-amber-50/40 print:border-black print:bg-white text-slate-800 text-sm max-w-2xl mx-auto shadow-xs">
        <div className="text-center border-b border-amber-700/30 pb-2 mb-3">
          <p className="text-xs text-amber-900 font-medium">ગુજરાતી વ્યાકરણ માટેનું સંપૂર્ણ અને સૌથી શ્રેષ્ઠ પુસ્તક</p>
          <h3 className="text-xl font-bold text-amber-950 tracking-wide mt-0.5 print:text-black">
            {posterData.title}
          </h3>
          <p className="text-xs text-amber-800 italic mt-0.5">{posterData.subtitle}</p>
        </div>

        {posterData.highlights && (
          <div className="mb-3 bg-white/80 p-2.5 rounded border border-amber-200 print:border-slate-400 print:bg-white">
            <p className="text-xs font-semibold text-amber-900 text-center mb-1.5 underline decoration-amber-400">
              મુખ્ય વિશેષતાઓ અને સમાવિષ્ટ વિષયો:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-xs font-medium">
              {posterData.highlights.map((h, i) => (
                <span key={i} className="bg-amber-100/70 print:bg-slate-100 px-2 py-1 rounded text-amber-950">
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {posterData.details && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-amber-100/40 p-2.5 rounded border border-amber-200/60 print:border-slate-300 print:bg-white">
            {Object.entries(posterData.details).map(([k, v], i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className="font-semibold text-amber-950 min-w-[75px]">{k}:</span>
                <span className="text-slate-800">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (posterData.type === 'sports_camp') {
    return (
      <div className="my-3 p-4 border-2 border-blue-900/60 rounded-lg bg-blue-50/40 print:border-black print:bg-white text-slate-800 text-sm max-w-2xl mx-auto shadow-xs">
        <div className="text-center border-b border-blue-800/30 pb-2 mb-3">
          <h3 className="text-lg font-bold text-blue-950 tracking-wide print:text-black">
            {posterData.title}
          </h3>
          <p className="text-xs text-blue-900 font-medium mt-1">{posterData.subtitle}</p>
        </div>

        {posterData.table && (
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs text-left border-collapse border border-blue-300 print:border-black">
              <thead>
                <tr className="bg-blue-100/80 print:bg-slate-200 text-blue-950">
                  {posterData.table.headers.map((h, idx) => (
                    <th key={idx} className="border border-blue-300 print:border-black px-2 py-1 font-semibold text-center">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posterData.table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-blue-50/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`border border-blue-200 print:border-black px-2 py-1 ${cIdx === 0 || cIdx === 4 ? 'text-center font-medium' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {posterData.notes && (
          <div className="bg-white/90 p-2.5 rounded border border-blue-200 print:border-slate-400 print:bg-white text-xs space-y-1">
            <p className="font-semibold text-blue-950">કેમ્પના ખાસ નિયમો અને આકર્ષણો:</p>
            {posterData.notes.map((note, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed">{note}</p>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (posterData.type === 'bus_schedule') {
    return (
      <div className="my-3 p-4 border-2 border-emerald-900/60 rounded-lg bg-emerald-50/40 print:border-black print:bg-white text-slate-800 text-sm max-w-2xl mx-auto shadow-xs">
        <div className="text-center border-b border-emerald-800/30 pb-2 mb-3">
          <h3 className="text-xl font-bold text-emerald-950 tracking-wide print:text-black">
            {posterData.title}
          </h3>
          <p className="text-xs text-emerald-800 font-medium mt-0.5">{posterData.subtitle}</p>
        </div>

        {posterData.table && (
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs text-left border-collapse border border-emerald-300 print:border-black">
              <thead>
                <tr className="bg-emerald-100/80 print:bg-slate-200 text-emerald-950">
                  {posterData.table.headers.map((h, idx) => (
                    <th key={idx} className="border border-emerald-300 print:border-black px-2 py-1 font-semibold text-center">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posterData.table.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`border border-emerald-200 print:border-black px-2 py-1 ${cIdx === 0 ? 'font-medium' : 'text-center'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {posterData.notes && (
          <div className="bg-white/90 p-2.5 rounded border border-emerald-200 print:border-slate-400 print:bg-white text-xs space-y-1">
            <p className="font-semibold text-emerald-950">મુસાફરો માટે અગત્યની સૂચનાઓ:</p>
            {posterData.notes.map((note, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed">• {note}</p>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (posterData.type === 'job_interview') {
    return (
      <div className="my-3 p-4 border-2 border-indigo-900/60 rounded-lg bg-indigo-50/40 print:border-black print:bg-white text-slate-800 text-sm max-w-2xl mx-auto shadow-xs">
        <div className="text-center border-b border-indigo-800/30 pb-2 mb-3">
          <h3 className="text-xl font-bold text-indigo-950 tracking-wide print:text-black">
            {posterData.title}
          </h3>
          <p className="text-xs text-indigo-800 font-medium mt-0.5">{posterData.subtitle}</p>
        </div>

        {posterData.table && (
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs text-left border-collapse border border-indigo-300 print:border-black">
              <thead>
                <tr className="bg-indigo-100/80 print:bg-slate-200 text-indigo-950">
                  {posterData.table.headers.map((h, idx) => (
                    <th key={idx} className="border border-indigo-300 print:border-black px-2 py-1 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posterData.table.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="border border-indigo-200 print:border-black px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {posterData.notes && (
          <div className="bg-white/90 p-2.5 rounded border border-indigo-200 print:border-slate-400 print:bg-white text-xs space-y-1">
            {posterData.notes.map((note, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed font-medium">• {note}</p>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (posterData.type === 'book_store') {
    return (
      <div className="my-3 p-4 border-2 border-rose-900/60 rounded-lg bg-rose-50/40 print:border-black print:bg-white text-slate-800 text-sm max-w-2xl mx-auto shadow-xs">
        <div className="text-center border-b border-rose-800/30 pb-2 mb-3">
          <p className="text-xs font-semibold text-rose-900">ભવ્ય શુભારંભ...</p>
          <h3 className="text-xl font-bold text-rose-950 tracking-wide mt-0.5 print:text-black">
            {posterData.title}
          </h3>
          <p className="text-xs text-rose-800 font-medium mt-0.5">{posterData.subtitle}</p>
        </div>

        {posterData.details && (
          <div className="flex flex-wrap justify-around gap-2 text-xs bg-rose-100/50 p-2 rounded mb-3 border border-rose-200 print:border-slate-300 print:bg-white">
            {Object.entries(posterData.details).map(([k, v], i) => (
              <span key={i} className="font-semibold text-rose-950">
                {k}: <span className="font-normal text-slate-800">{v}</span>
              </span>
            ))}
          </div>
        )}

        {posterData.highlights && (
          <div className="bg-white/90 p-2.5 rounded border border-rose-200 print:border-slate-400 print:bg-white text-xs space-y-1 mb-2">
            {posterData.highlights.map((h, i) => (
              <p key={i} className="text-slate-700 leading-relaxed font-medium">★ {h}</p>
            ))}
          </div>
        )}

        {posterData.notes && (
          <p className="text-[11px] text-center text-rose-900 italic">{posterData.notes[0]}</p>
        )}
      </div>
    );
  }

  return null;
};
