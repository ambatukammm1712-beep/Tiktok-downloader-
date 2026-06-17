import { VideoData } from "../types";
import { formatNumber, downloadMedia } from "../utils";
import { motion } from "motion/react";
import { 
  ArrowLeft, Clock, Calendar, Play, Heart, 
  MessageCircle, Share2, Download, Video, Music, Image
} from "lucide-react";

interface Props {
  data: VideoData;
  onBack: () => void;
  onPreview: (type: 'video' | 'audio', url: string) => void;
}

export default function ResultCard({ data, onBack, onPreview }: Props) {
  
  const handleDirectDownload = (url: string, prefix: string) => {
    downloadMedia(url, prefix);
  };
  
  const hasImages = data.images && data.images.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>

      {/* Meta Info */}
      <div className="bg-slate-900 border border-white/10 p-5 rounded-2xl shadow-lg">
        <div className="flex gap-4">
          <img 
            src={data.cover} 
            alt="Video cover" 
            className="w-24 h-32 object-cover rounded-xl bg-slate-800 shadow-sm shrink-0"
          />
          <div className="flex flex-col justify-center min-w-0">
            <h2 className="text-sm font-medium text-white mb-3 line-clamp-2 leading-relaxed">
              {data.title || "Video TikTok"}
            </h2>
            <div className="flex items-center gap-3 bg-slate-800/60 w-fit px-3 py-2 border border-slate-700/50 rounded-xl">
              <img 
                src={data.author.avatar} 
                alt="Author" 
                className="w-8 h-8 rounded-full border border-slate-700" 
              />
              <div>
                <p className="text-xs font-bold text-slate-200">{data.author.nickname}</p>
                <p className="text-[10px] text-slate-400">@{data.author.unique_id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex flex-col gap-1 items-center justify-center">
            <Play className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">{formatNumber(data.play_count)}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider">Views</span>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex flex-col gap-1 items-center justify-center">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-bold text-white">{formatNumber(data.digg_count)}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider">Likes</span>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex flex-col gap-1 items-center justify-center">
            <MessageCircle className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-bold text-white">{formatNumber(data.comment_count)}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider">Comments</span>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex flex-col gap-1 items-center justify-center">
            <Share2 className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-white">{formatNumber(data.share_count)}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider">Shares</span>
          </div>
        </div>
      </div>

      {/* Dynamic Content: Images or Video */}
      {!hasImages ? (
        <div id="videoSection">
          <h3 className="font-bold text-white flex items-center gap-2 mt-4"><Video className="w-5 h-5 text-pink-400" /> Video Quality</h3>
          
          <div className="space-y-3">
            {data.hdplay && (
              <div className="bg-slate-900 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl gap-4 hover:border-pink-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-500/10 rounded-lg shrink-0">
                    <Video className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      Video Asli <span className="text-[9px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded uppercase font-black tracking-wider border border-sky-500/20">HD</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">Kualitas Tinggi • Tanpa watermark</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onPreview('video', data.hdplay!)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => handleDirectDownload(data.hdplay!, "AMZ_HD_")}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-lg text-xs font-bold transition-opacity"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            )}

            {data.play && (
              <div className="bg-slate-900 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl gap-4 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg shrink-0">
                    <Video className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      Video Standar <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-black tracking-wider border border-emerald-500/20">No WM</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">Kualitas Normal • Tanpa watermark</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onPreview('video', data.play)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => handleDirectDownload(data.play, "AMZ_SD_")}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-lg text-xs font-bold transition-opacity"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div id="imageSection">
          <h3 className="font-bold text-white flex items-center gap-2 mt-4"><Image className="w-5 h-5 text-emerald-400" /> Image Slideshow</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {data.images?.map((imgUrl, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors flex flex-col">
                <div className="aspect-[3/4] relative bg-slate-800">
                  <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <button 
                    onClick={() => handleDirectDownload(imgUrl, `AMZ_Image_${idx + 1}_`)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div id="audioSection">
        <h3 className="font-bold text-white flex items-center gap-2 mt-6"><Music className="w-5 h-5 text-amber-500" /> Audio Quality</h3>
        
        {data.music && (
          <div className="bg-slate-900 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl gap-4 hover:border-amber-500/50 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5 pointer-events-none"></div>
            <div className="flex items-center gap-4 z-10 w-full">
               <img 
                 src={data.music_info.cover} 
                 alt="Music Cover" 
                 className="w-14 h-14 rounded-lg object-cover shadow-md border border-slate-800 shrink-0" 
               />
               <div className="flex-1 min-w-0">
                 <h4 className="font-bold text-sm text-amber-50 truncate">{data.music_info.title}</h4>
                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">{data.music_info.author}</p>
               </div>
               
               <button 
                 onClick={() => onPreview('audio', data.music)}
                 className="p-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl"
                 title="Preview Audio"
               >
                 <Play className="w-4 h-4 fill-amber-400" />
               </button>

               <button 
                 onClick={() => handleDirectDownload(data.music, "AMZ_Audio_")}
                 className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-amber-500/20 shrink-0"
               >
                 <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download</span> MP3
               </button>
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
}
