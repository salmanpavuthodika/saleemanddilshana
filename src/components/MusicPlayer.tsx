import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isMuted: boolean;
  toggleMute: () => void;
  isEnvelopeOpened: boolean;
}

export default function MusicPlayer({ isMuted, toggleMute, isEnvelopeOpened }: MusicPlayerProps) {
  if (!isEnvelopeOpened) return null;

  return (
    <div 
      id="music-player-root" 
      className="fixed bottom-6 right-6 z-40 flex items-center pointer-events-auto animate-fade-in"
    >
      <button
        id="btn-music-mute"
        onClick={toggleMute}
        className="p-3 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#C2A289]/40 hover:border-[#946A3A]/60 text-[#946A3A] hover:text-[#805B30] rounded-full shadow-[0_8px_30px_rgba(148,106,58,0.18)] active:scale-95 transition-all duration-300 flex items-center justify-center group"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-rose-700 group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>
    </div>
  );
}
