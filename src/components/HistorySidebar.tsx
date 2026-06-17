import { History, Trash2, Clock, Play } from "lucide-react";
import { HistoryItem } from "../types";

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export default function HistorySidebar({ history, onSelect, onClear }: Props) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl flex flex-col h-[400px] xl:h-[600px] shadow-lg">
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 rounded-lg text-indigo-400">
            <History className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white">Riwayat (History)</h3>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="text-slate-500 hover:text-red-400 transition-colors p-2"
            title="Hapus riwayat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
            <Clock className="w-10 h-10 opacity-20" />
            <p className="text-sm">Belum ada riwayat unduhan.</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-slate-700/50 rounded-xl cursor-pointer transition-all group"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800 grid place-items-center">
                <img src={item.cover} alt="Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-200 truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-slate-700/50 text-slate-300 px-1.5 py-0.5 rounded font-medium truncate">
                    @{item.author}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Custom Scrollbar Styles appended globally from CSS, handled gracefully */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
}
