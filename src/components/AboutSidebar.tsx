import { motion, AnimatePresence } from "motion/react";
import { X, Instagram, MessageCircle, Globe, User, ArrowUpRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutSidebar({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlays */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-slate-900 border-r border-white/10 p-6 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Tentang Saya</h3>
                    <p className="text-[11px] text-slate-400">Profil Developer</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bio & Profile Image */}
              <div className="flex flex-col items-center text-center gap-4 mb-8 bg-slate-950/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-pink-500/10 blur-2xl rounded-full"></div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500 p-1 bg-slate-800 relative z-10">
                  <img
                    src="https://i.ibb.co/Sw5T3hRq/file-0000000097647230b8747dfea77ef26a.png"
                    alt="Amzdev Logo Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-white text-lg">Amzdev</h4>
                  <p className="text-xs text-pink-400 font-semibold tracking-wider uppercase mt-1">Creator & Developer</p>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed text-justify mt-3 space-y-2 border-t border-white/5 pt-4">
                  <p>
                    Halo! Saya <strong>Amzdev</strong>, seorang pengembang independen bergairah yang berdedikasi penuh untuk menciptakan alat-alat web modern bernilai tinggi yang super cepat, responsif, dan mudah dimengerti. 
                    Melalui kehadiran AMZDOWNLOADER ini, saya berkomitmen kuat menyajikan sistem ekstraksi video dan audio berkualitas tinggi secara praktis tanpa biaya sepeser pun. 
                    Dukungan hangat serta loyalitas setia Anda sekalian merupakan motor penggerak terbesar saya dalam konsisten memelihara keandalan sistem ini kedepannya. 
                    Saya senantiasa terbuka menerima kritik konstruktif, saran fungsional, maupun peluang kolaborasi menarik apa pun demi kesempurnaan fitur yang ada. 
                    Mari terus terhubung bersama saya lewat berbagai kanal sosial media resmi di bawah untuk menyimak update rilis berkala teranyar lainnya!
                  </p>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Ikuti Saluran Sosial Saya</h5>
                
                {/* Instagram Button */}
                <a
                  href="https://instagram.com/jarwo23668"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-gradient-to-r from-purple-600/10 to-pink-500/10 hover:from-purple-600/20 hover:to-pink-500/20 border border-pink-500/20 hover:border-pink-500/40 rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg text-white">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Instagram</p>
                      <p className="text-[10px] text-slate-400">@jarwo23668</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* TikTok Button */}
                <a
                  href="https://tiktok.com/@cakicaknknggedel"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-white/15 rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black rounded-lg text-white flex items-center justify-center">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.81-.74-3.94-1.69-.22-.19-.42-.39-.62-.61-.02.13-.03.26-.03.4v8.39c.01 3.39-1.92 6.75-5.36 7.42-3.14.71-6.73-.83-8.08-3.79-1.57-3.21-.32-7.61 2.91-9.16 1.17-.57 2.5-.78 3.79-.62V12c-1.28-.15-2.6.14-3.64.92-1.67 1.17-2.3 3.51-1.4 5.39.95 2.1 3.52 3.1 5.56 2.13 1.66-.75 2.53-2.6 2.52-4.41V.02h.02z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">TikTok Resmi</p>
                      <p className="text-[10px] text-slate-400">@cakicaknknggedel</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* WhatsApp Channel */}
                <a
                  href="https://whatsapp.com/channel/0029VbCFH266buMBTIPKAM1w"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#25D366] rounded-lg text-white">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#25D366]">Saluran WhatsApp</p>
                      <p className="text-[10px] text-slate-400 font-medium">Ikuti saluran WA kami</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Sticky bottom signature branding */}
            <div className="pt-6 border-t border-white/5 mt-8 text-center">
              <p className="text-[10px] text-slate-500">Terima kasih telah menggunakan layanan kami!</p>
              <p className="text-[10px] text-slate-500 mt-1">© 2026 AMZDOWNLOADER • Powered by Amzdev</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
