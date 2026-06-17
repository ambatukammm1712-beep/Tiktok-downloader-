import { ArrowLeft, Save } from "lucide-react";
import { downloadMedia } from "../utils";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  type: 'video' | 'audio';
  url: string;
  onBack: () => void;
}

const VISUALIZER_BARS = Array.from({ length: 24 });

export default function PreviewSection({ type, url, onBack }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Hasil
      </button>

      <div className="bg-slate-900 border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col items-center">
        
        <div className="w-full max-w-[360px] bg-black rounded-xl overflow-hidden shadow-2xl mb-6 relative aspect-[9/16] flex items-center justify-center">
          {type === 'video' ? (
            <video 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
              src={url} 
            />
          ) : (
            <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 gap-6 relative overflow-hidden">
               {/* Decorative Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/20 blur-[60px] rounded-full pointer-events-none"></div>
               
               {/* Audio Visualizer */}
               <div className="flex items-end justify-center gap-1 w-full h-40 z-10">
                 {VISUALIZER_BARS.map((_, i) => (
                   <div
                     key={i}
                     className={`w-2.5 rounded-t-sm bg-gradient-to-t from-amber-500 to-pink-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] ${isPlaying ? 'audio-bar-anim' : ''}`}
                     style={{
                       animationDelay: `${Math.random() * 0.5}s`,
                       animationDuration: `${0.4 + Math.random() * 0.8}s`,
                       height: '100%',
                       transform: isPlaying ? undefined : 'scaleY(0.1)',
                       transition: 'transform 0.3s ease',
                     }}
                   />
                 ))}
               </div>

              <audio 
                controls 
                autoPlay 
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-[54px] rounded-lg z-10"
                src={url} 
              />
            </div>
          )}
        </div>

        <button 
          onClick={() => downloadMedia(url, `AMZ_Force_${type}_`)}
          className="w-full max-w-[360px] bg-white text-slate-950 hover:bg-slate-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <Save className="w-5 h-5" />
          SIMPAN KE GALERI
        </button>
      </div>
    </motion.div>
  );
}
