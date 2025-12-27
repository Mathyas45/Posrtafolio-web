import { motion, AnimatePresence } from "framer-motion";
import { Disc3, VolumeX, Music2, Move } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const FloatingMusicButton = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);

  const musicUrl = "/Beethoven.mp3";

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        audioRef.current = new Audio(musicUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;
        audioRef.current.preload = "auto";

        const handleCanPlay = () => {
          console.log("Audio listo para reproducir");
          setIsAudioReady(true);
        };

        const handleError = (e) => {
          console.error("Error cargando audio:", e);
          setIsAudioReady(false);
        };

        audioRef.current.addEventListener("canplaythrough", handleCanPlay);
        audioRef.current.addEventListener("error", handleError);

        return () => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
            audioRef.current.removeEventListener("error", handleError);
            audioRef.current = null;
          }
        };
      } catch (error) {
        console.error("Error inicializando audio:", error);
      }
    }
  }, []);

  // Ocultar label después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady || isDragging) {
      console.log("Audio no está listo o está arrastrando");
      return;
    }

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
          console.log("Música reproduciendo");
        })
        .catch((error) => {
          console.error("Error al reproducir:", error);
        });
    }
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: -window.innerHeight / 2 + 60,
        left: -window.innerWidth / 2 + 60,
        right: window.innerWidth / 2 - 60,
        bottom: window.innerHeight / 2 - 60,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      className="fixed left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-50 cursor-move select-none"
      initial={{ scale: 0, x: -100, rotate: -180 }}
      animate={{ scale: 1, x: 0, rotate: 0 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      {/* Indicador de arrastre */}
      <motion.div
        className="absolute -top-2 -right-2 bg-white/90 dark:bg-black/90 rounded-full p-1.5 shadow-lg z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isDragging ? 1 : 0, scale: isDragging ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Move className="h-3 w-3 text-primary" />
      </motion.div>

      <motion.button
        onClick={toggleMusic}
        disabled={!isAudioReady}
        className="relative bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white p-4 sm:p-5 rounded-2xl shadow-2xl hover:shadow-primary/60 flex items-center justify-center group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        animate={{ 
          boxShadow: isMusicPlaying 
            ? ["0 20px 60px rgba(168, 85, 247, 0.4)", "0 20px 80px rgba(236, 72, 153, 0.6)", "0 20px 60px rgba(168, 85, 247, 0.4)"]
            : "0 20px 40px rgba(0, 0, 0, 0.3)"
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity }
        }}
        whileHover={{ scale: isAudioReady && !isDragging ? 1.1 : 1, rotate: isMusicPlaying && !isDragging ? 5 : 0 }}
        whileTap={{ scale: isAudioReady && !isDragging ? 0.9 : 1 }}
        title={isAudioReady ? (isMusicPlaying ? "Pausar música" : "Reproducir música") : "Cargando música..."}
        aria-label={isAudioReady ? (isMusicPlaying ? "Pausar música" : "Reproducir música") : "Cargando música"}
      >
        {/* Fondo animado con gradiente giratorio */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600"
          animate={{
            rotate: isMusicPlaying ? 360 : 0
          }}
          transition={{
            duration: 3,
            repeat: isMusicPlaying ? Infinity : 0,
            ease: "linear"
          }}
        />

        {/* Icono principal */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {!isAudioReady ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="flex items-center justify-center"
              >
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : isMusicPlaying ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0
                }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.5, repeat: Infinity }
                  }}
                >
                  <Disc3 className="h-6 w-6 sm:h-7 sm:w-7" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <VolumeX className="h-6 w-6 sm:h-7 sm:w-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Partículas flotantes cuando está reproduciendo */}
        {isMusicPlaying && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0.8 
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 40],
                  y: [0, (Math.random() - 0.5) * 40],
                  opacity: [0.8, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </motion.button>

      {/* Label con nombre de la canción */}
      <AnimatePresence>
        {showLabel && isAudioReady && !isDragging && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap hidden sm:block pointer-events-none"
          >
            <div className="flex items-center gap-2">
              <Music2 className="h-4 w-4 animate-pulse" />
              <div>
                <div className="text-xs font-bold">
                  {isMusicPlaying ? "Reproduciendo" : "Música de fondo"}
                </div>
                <div className="text-[10px] opacity-80">Beethoven • Arrastra para mover</div>
              </div>
            </div>
            {/* Flecha */}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-primary" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ondas de sonido animadas */}
      {isMusicPlaying && !isDragging && (
        <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 flex gap-1 items-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-primary to-purple-600 rounded-full"
              animate={{
                height: ["8px", "20px", "8px"]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
