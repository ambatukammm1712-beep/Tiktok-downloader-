import { useEffect, useState } from "react";
import HomeSection from "./components/HomeSection";
import ResultCard from "./components/ResultCard";
import PreviewSection from "./components/PreviewSection";
import HistorySidebar from "./components/HistorySidebar";
import ShareWidget from "./components/ShareWidget";
import AboutSidebar from "./components/AboutSidebar";
import { HistoryItem, VideoData } from "./types";
import { User, Menu } from "lucide-react";

type ViewMode = "home" | "download" | "preview";

export default function App() {
  const [view, setView] = useState<ViewMode>("home");
  const [loading, setLoading] = useState(false);
  const [activeData, setActiveData] = useState<VideoData | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Preview State
  const [previewMedia, setPreviewMedia] = useState<{ type: 'video' | 'audio', url: string } | null>(null);

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("amz_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const saveHistory = (newItem: HistoryItem) => {
    setHistory(prev => {
      // Avoid duplicate IDs
      const filtered = prev.filter(item => item.id !== newItem.id);
      const updated = [newItem, ...filtered].slice(0, 15); // limit to 15 items
      localStorage.setItem("amz_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    if (window.confirm("Hapus semua riwayat pencarian?")) {
      setHistory([]);
      localStorage.removeItem("amz_history");
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setActiveData(item.data);
    setView("download");
    // Scroll to top mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFetch = async (url: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const payload = await res.json();

      if (payload.code === 0 && payload.data) {
        const data = payload.data as VideoData;
        setActiveData(data);
        
        // Save to History
        const item: HistoryItem = {
          id: data.id,
          title: data.title || 'Video TikTok',
          cover: data.cover,
          author: data.author.unique_id,
          sourceUrl: url,
          timestamp: Date.now(),
          data: data
        };
        saveHistory(item);
        setView("download");
      } else {
        alert("Link tidak valid atau video tidak ditemukan!");
      }
    } catch (error) {
      alert("Masalah koneksi saat mengambil data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (type: 'video' | 'audio', url: string) => {
    setPreviewMedia({ type, url });
    setView("preview");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-pink-500/30">
      
      {/* Top Navbar */}
      <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="p-2 -ml-2 bg-slate-900/40 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors xl:hidden block"
              title="Tentang Saya"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
              <img src="https://i.ibb.co/Sw5T3hRq/file-0000000097647230b8747dfea77ef26a.png" alt="AMZDOWNLOADER logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white relative">
              AMZDOWNLOADER
            </span>
          </div>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/5 shadow-md group"
          >
            <User className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span>Tentang Saya</span>
          </button>
        </div>
      </header>

      {/* Main Grid Dashboard Context */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 w-full">
        <div className={`grid grid-cols-1 ${view === "home" ? "xl:grid-cols-12" : "max-w-3xl mx-auto"} gap-8 items-start relative`}>
          
          {/* Main Left Content Area */}
          <div className={`${view === "home" ? "xl:col-span-8" : "w-full"} flex flex-col gap-6`}>
            {view === "home" && (
              <HomeSection onSearch={handleFetch} loading={loading} />
            )}
            
            {view === "download" && activeData && (
              <ResultCard 
                data={activeData} 
                onBack={() => setView("home")} 
                onPreview={handlePreview} 
              />
            )}

            {view === "preview" && previewMedia && (
              <PreviewSection 
                type={previewMedia.type} 
                url={previewMedia.url} 
                onBack={() => setView("download")} 
              />
            )}
          </div>

          {/* Right Sidebar Area */}
          {view === "home" && (
            <div className="xl:col-span-4 flex flex-col gap-6 sticky top-24">
              <ShareWidget />
              <HistorySidebar 
                history={history} 
                onSelect={loadFromHistory} 
                onClear={clearHistory} 
              />
            </div>
          )}

        </div>
      </main>

      {/* Slideout About Menu */}
      <AboutSidebar isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

    </div>
  );
}

