import { motion } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const FloatingMusicButton = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef(null);

  const musicUrl = "/Beethoven.mp3";

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.preload = "auto";

      const handleCanPlay = () => setIsAudioReady(true);

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
          audioRef.current = null;
        }
      };
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <motion.button
      onClick={toggleMusic}
      disabled={!isAudioReady}
      className="fixed left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-br from-primary/90 to-purple-600/90 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-primary/50 flex flex-col items-center gap-2 group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      initial={{ scale: 0, x: -100 }}
      animate={{ scale: 1, x: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: isAudioReady ? 1.1 : 1, x: 5 }}
      whileTap={{ scale: isAudioReady ? 0.95 : 1 }}
      title={isAudioReady ? (isMusicPlaying ? "Pausar música" : "Reproducir música") : "Cargando música..."}
      aria-label={isAudioReady ? (isMusicPlaying ? "Pausar música" : "Reproducir música") : "Cargando música"}
    >
      {/* Icono principal */}
      <div className="relative">
        {isMusicPlaying ? (
          <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
        
        {/* Icono de música pequeño */}
        {isMusicPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 bg-white text-primary rounded-full p-0.5"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Music className="h-2 w-2 sm:h-3 sm:w-3" />
          </motion.div>
        )}
      </div>

      {/* Texto (solo desktop) */}
      <span className="hidden sm:block text-[10px] font-semibold tracking-wide">
        {isMusicPlaying ? "PAUSAR" : "MÚSICA"}
      </span>

      {/* Efecto de pulso de fondo */}
      {isMusicPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Indicador de carga */}
      {!isAudioReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Ondas de sonido animadas cuando está reproduciendo */}
      {isMusicPlaying && (
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex gap-1 items-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-white rounded-full"
              animate={{
                height: ["8px", "16px", "8px"]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};
