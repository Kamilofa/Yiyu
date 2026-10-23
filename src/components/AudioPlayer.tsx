import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Play subtle soothing African marimba/kalimba pentatonic sequence using Web Audio API
  const startAmbiance = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Pentatonic warm notes (F#, G#, A#, C#, D#)
      const notes = [185.0, 207.65, 233.08, 277.18, 311.13, 369.99, 415.3, 466.16];
      let step = 0;

      intervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        // Warm kalimba timbre
        osc.type = 'triangle';
        const noteIndex = (step * 3 + (step % 5)) % notes.length;
        osc.frequency.setValueAtTime(notes[noteIndex], audioCtxRef.current.currentTime);

        // Soft envelope
        gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, audioCtxRef.current.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.9);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.95);

        step++;
      }, 750);

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAmbiance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAmbiance = () => {
    if (isPlaying) {
      stopAmbiance();
    } else {
      startAmbiance();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={toggleAmbiance}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-md transition-all text-xs cursor-pointer ${
          isPlaying
            ? 'bg-amber-500 text-black border-amber-300 font-bold shadow-amber-500/20'
            : 'bg-[#140e09]/90 text-amber-300/80 border-amber-800/50 hover:text-white hover:border-amber-500'
        }`}
        title="Activer l'ambiance musicale Afro-Lounge"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse text-black" />
            <span className="hidden sm:inline">Ambiance Afro-Lounge</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-3 bg-black rounded-full animate-bounce"></span>
              <span className="w-1 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-3.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Ambiance Lounge</span>
          </>
        )}
      </button>
    </div>
  );
};
