import { Share2, MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareWidget() {
  const [copied, setCopied] = useState(false);

  const shareText = "Download Video TikTok tanpa Watermark HD sangat mudah dari webite AMZ Downloader!";
  
  // Use origin to refer to the base app url
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://amz-downloader.com';

  const shareToWA = () => {
    const text = encodeURIComponent(`${shareText}\n\nCobain sekarang di: ${appUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full"></div>
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/30">
            <Share2 className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight">Bagikan AMZ</h3>
            <p className="text-xs text-slate-400">Export & share ke teman</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-1">
          <button 
            onClick={shareToWA}
            className="flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button 
            onClick={copyLink}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
            {copied ? 'Tersalin!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
