import { Download, Loader2, Link2, Zap, Layers, Gift } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface Props {
  onSearch: (url: string) => Promise<void>;
  loading: boolean;
}

export default function HomeSection({ onSearch, loading }: Props) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSearch(url.trim());
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center py-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-3 flex items-center justify-center gap-3">
          AMZ Downloader
        </h1>
        <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
          Platform terbaik unduh video TikTok tanpa watermark secara instan dan gratis.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700/50 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow behind input */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 h-20 bg-pink-500/10 blur-[50px] rounded-full pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl flex items-center px-4 py-2 focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/50 transition-all">
            <Link2 className="w-5 h-5 text-slate-500 shrink-0 mr-2" />
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste url TikTok (https://vt.tiktok.com/...)"
              required
              disabled={loading}
              className="bg-transparent border-none text-white w-full py-3 outline-none text-sm placeholder:text-slate-500 disabled:opacity-50"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading || !url}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                DIPROSES...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                DOWNLOAD SEKARANG
              </>
            )}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white mb-1.5 text-sm">Super Cepat</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Ekstraksi video dalam hitungan detik didukung server premium.</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
          <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center mb-3">
            <Layers className="w-5 h-5 text-pink-400" />
          </div>
          <h3 className="font-semibold text-white mb-1.5 text-sm">Resolusi Asli</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Video jernih bersih tanpa watermark seperti aslinya.</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <Gift className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-white mb-1.5 text-sm">100% Gratis</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Tanpa langganan, tanpa daftar akun, bisa dipakai selamanya.</p>
        </div>
      </div>
      
    </motion.div>
  );
}
